import "./stylesheets/PromptEngineeringSidebar.css";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

import templates from "./configs/templates";
import { Example, Examples } from "./types/PromptEngineeringSidebar";

function PromptEngineeringSidebar(props: {
  isPromptEngineeringSidebarOpen: boolean;
  changeIsPromptEngineeringSidebarOpen: Dispatch<SetStateAction<boolean>>;
  activeSystemPrompt: string;
  activeExamples: Examples;
}) {
  // state
  const [template, changeTemplate] = useState(templates[0].id);
  const [systemPrompt, changeSystemPrompt] = useState<string>(
    templates[0].systemPrompt
  );
  const [examples, changeExamples] = useState<Examples>(
    templates[0].fewShotExamples.map((ele) => {
      return { user: ele.userInput, assistant: ele.chatbotResponse };
    })
  );
  const [isApplyChangesDisabled, changeIsApplyChangesDisabled] =
    useState<boolean>(true);

  // function
  const handleChangeTemplate = (event: SelectChangeEvent) => {
    changeTemplate(event.target.value as string);
    const selectedTemplate = templates.find(
      (ele) => ele.id === event.target.value
    );
    if (selectedTemplate) {
      changeSystemPrompt(selectedTemplate.systemPrompt);
      changeExamples(
        selectedTemplate.fewShotExamples.map((ele) => {
          return { user: ele.userInput, assistant: ele.chatbotResponse };
        })
      );
    } else {
      console.error("Invalid template id: " + event.target.value);
    }
  };
  const handleAddExample = () => {
    changeExamples((oldExamples) => {
      const newExamples: Examples = JSON.parse(JSON.stringify(oldExamples));
      newExamples.push({ user: "", assistant: "" });
      return newExamples;
    });
  };
  const handleExampleDelete = (idx: number) => {
    changeExamples((oldExamples) => {
      const newExamples: Examples = JSON.parse(JSON.stringify(oldExamples));
      newExamples.splice(idx, 1);
      return newExamples;
    });
  };
  const handleChangeExampleTextField = (
    text: string,
    idx: number,
    category: keyof Example
  ) => {
    changeExamples((oldExamples) => {
      const newExamples: Examples = JSON.parse(JSON.stringify(oldExamples));
      newExamples[idx][category] = text;
      return newExamples;
    });
  };

  // effect
  useEffect(() => {
    if (
      systemPrompt !== props.activeSystemPrompt ||
      JSON.stringify(examples) !== JSON.stringify(props.activeExamples)
    ) {
      changeIsApplyChangesDisabled(false);
    }
  }, [systemPrompt, examples]);

  // misc

  return (
    <Drawer
      open={props.isPromptEngineeringSidebarOpen}
      onClose={() => {
        props.changeIsPromptEngineeringSidebarOpen(false);
      }}
    >
      <form className="PromptEngineeringSidebar">
        <div className="PromptEngineeringSidebar-HeadingContainer">
          <Typography variant="h6" noWrap component="div">
            Setup
          </Typography>
          <IconButton
            onClick={() => props.changeIsPromptEngineeringSidebarOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <Button variant="contained" disabled={isApplyChangesDisabled}>
          Apply changes
        </Button>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => props.changeIsPromptEngineeringSidebarOpen(false)}
        >
          Reset
        </Button>
        <FormControl fullWidth>
          <InputLabel id="system-template-label">
            Use a system message template
          </InputLabel>
          <Select
            labelId="system-template-label"
            value={template}
            label="Use a system message template"
            onChange={handleChangeTemplate}
          >
            {templates.map((template) => {
              return (
                <MenuItem value={template.id} key={template.id}>
                  {template.humanReadableName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          label="System message"
          multiline
          rows={4}
          value={systemPrompt}
          onChange={(e) => changeSystemPrompt(e.target.value)}
        />
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddExample}
        >
          Add example
        </Button>
        {examples.map((example, idx) => {
          return (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Example {idx + 1}
              </AccordionSummary>
              <AccordionDetails className="PromptEngineeringSidebar-ExampleAccordionDetails">
                <TextField
                  value={example.user}
                  label="User:"
                  onChange={(e) => {
                    handleChangeExampleTextField(e.target.value, idx, "user");
                  }}
                />
                <TextField
                  value={example.assistant}
                  label="Assistant:"
                  onChange={(e) => {
                    handleChangeExampleTextField(
                      e.target.value,
                      idx,
                      "assistant"
                    );
                  }}
                />
              </AccordionDetails>
              <AccordionActions>
                <Button color="error" onClick={() => handleExampleDelete(idx)}>
                  Delete
                </Button>
              </AccordionActions>
            </Accordion>
          );
        })}
      </form>
    </Drawer>
  );
}

export default PromptEngineeringSidebar;
