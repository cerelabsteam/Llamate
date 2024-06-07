import "./stylesheets/PromptEngineeringSidebar.css";

import { Dispatch, SetStateAction, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Drawer,
  FormControl,
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
}) {
  // state
  const [template, changeTemplate] = useState("");
  const [systemPrompt, changesystemPrompt] = useState<string>("");
  const [examples, changeExamples] = useState<Examples>([]);

  const handleChangeTemplate = (event: SelectChangeEvent) => {
    changeTemplate(event.target.value as string);
    const selectedTemplate = templates.find(
      (ele) => ele.id === event.target.value
    );
    if (selectedTemplate) {
      changesystemPrompt(selectedTemplate.systemPrompt);
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
  return (
    <Drawer
      open={props.isPromptEngineeringSidebarOpen}
      onClose={() => {
        props.changeIsPromptEngineeringSidebarOpen(false);
      }}
    >
      <Typography variant="h6">Setup</Typography>
      <form>
        <Button variant="outlined">Apply changes</Button>
        <FormControl fullWidth>
          <InputLabel id="system-template-label">
            Use a system message template
          </InputLabel>
          <Select
            labelId="system-template-label"
            id="demo-simple-select"
            value={template}
            label="Age"
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
          onChange={(e) => changesystemPrompt(e.target.value)}
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
              <AccordionDetails>
                <TextField
                  value={example.user}
                  onChange={(e) => {
                    handleChangeExampleTextField(e.target.value, idx, "user");
                  }}
                />
                <TextField
                  value={example.assistant}
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
