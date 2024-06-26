import "./stylesheets/PromptEngineeringSidebar.css";

import React, { FormEvent, useEffect, useState } from "react";

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
import ConfirmationDialog from "./ConfirmationDialog";
import {
  Example,
  Examples,
  PromptEngineeringSidebarProps,
} from "./types/PromptEngineeringSidebar";

import type { AlertProps } from "@mui/material";

function PromptEngineeringSidebar(props: PromptEngineeringSidebarProps) {
  const [template, changeTemplate] = useState(templates[0].id);
  const [isApplyChangesDisabled, changeIsApplyChangesDisabled] =
    useState<boolean>(true);
  const [isResetDisabled, changeIsResetDisabled] = useState<boolean>(true);
  const [isApplyChangesDialogOpen, setIsApplyChangesDialogOpen] =
    useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  const handleChangeTemplate = (event: SelectChangeEvent) => {
    changeTemplate(event.target.value as string);
    const selectedTemplate = templates.find(
      (ele) => ele.id === event.target.value
    );
    if (selectedTemplate) {
      props.changeSystemPrompt(selectedTemplate.systemPrompt);
      props.changeExamples(
        selectedTemplate.fewShotExamples.map((ele) => ({
          user: ele.userInput,
          assistant: ele.chatbotResponse,
        }))
      );
    } else {
      console.error("Invalid template id: " + event.target.value);
    }
  };

  const confirmApplyChanges = (e: FormEvent) => {
    e.preventDefault();
    setIsApplyChangesDialogOpen(true);
  };

  const handleAddExample = () => {
    props.changeExamples((oldExamples) => {
      const newExamples: Examples = JSON.parse(JSON.stringify(oldExamples));
      newExamples.push({ user: "", assistant: "" });
      return newExamples;
    });
  };
  const handleExampleDelete = (idx: number) => {
    props.changeExamples((oldExamples) => {
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
    props.changeExamples((oldExamples) => {
      const newExamples: Examples = JSON.parse(JSON.stringify(oldExamples));
      newExamples[idx][category] = text;
      return newExamples;
    });
  };

  const handleApplyChanges = () => {
    props.changeActiveSystemPrompt(props.systemPrompt);
    props.changeActiveExamples(props.examples);
    props.changeIsPromptEngineeringSidebarOpen(false);
    changeIsApplyChangesDisabled(true);
    changeIsResetDisabled(true);
    props.handleSnackbarOpen("Successfully submitted", "success");
    setIsApplyChangesDialogOpen(false);
  };

  const confirmReset = () => {
    setIsResetDialogOpen(true);
  };

  const resetConfirmed = () => {
    props.changeSystemPrompt(props.activeSystemPrompt);
    props.changeExamples(props.activeExamples);
    setIsResetDialogOpen(false);
  };
  useEffect(() => {
    const isChanged =
      props.systemPrompt !== props.activeSystemPrompt ||
      JSON.stringify(props.examples) !== JSON.stringify(props.activeExamples);
    changeIsApplyChangesDisabled(!isChanged);
    changeIsResetDisabled(!isChanged);
  }, [
    props.systemPrompt,
    props.examples,
    props.activeSystemPrompt,
    props.activeExamples,
  ]);

  return (
    <Drawer
      open={props.isPromptEngineeringSidebarOpen}
      onClose={() => props.changeIsPromptEngineeringSidebarOpen(false)}
    >
      <form className="PromptEngineeringSidebar" onSubmit={confirmApplyChanges}>
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

        <Button
          type="submit"
          variant="contained"
          disabled={isApplyChangesDisabled}
        >
          Apply changes
        </Button>
        <Button
          variant="outlined"
          color="warning"
          onClick={confirmReset}
          disabled={isResetDisabled}
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
            {templates.map((template) => (
              <MenuItem key={template.id} value={template.id}>
                {template.humanReadableName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="System message"
          multiline
          rows={4}
          value={props.systemPrompt}
          onChange={(e) => props.changeSystemPrompt(e.target.value)}
        />

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() =>
            props.changeExamples([
              ...props.examples,
              { user: "", assistant: "" },
            ])
          }
        >
          Add example
        </Button>

        {props.examples.map((example, idx) => (
          <Accordion key={idx}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Example {idx + 1}
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                required
                value={example.user}
                multiline
                rows={4}
                label="User:"
                onChange={(e) =>
                  props.changeExamples(
                    props.examples.map((ex, i) =>
                      i === idx ? { ...ex, user: e.target.value } : ex
                    )
                  )
                }
              />
              <TextField
                required
                value={example.assistant}
                multiline
                rows={4}
                label="Assistant:"
                onChange={(e) =>
                  props.changeExamples(
                    props.examples.map((ex, i) =>
                      i === idx ? { ...ex, assistant: e.target.value } : ex
                    )
                  )
                }
              />
            </AccordionDetails>
            <AccordionActions>
              <Button
                color="error"
                onClick={() =>
                  props.changeExamples(
                    props.examples.filter((_, i) => i !== idx)
                  )
                }
              >
                Delete
              </Button>
            </AccordionActions>
          </Accordion>
        ))}

        <ConfirmationDialog
          open={isApplyChangesDialogOpen}
          onClose={() => setIsApplyChangesDialogOpen(false)}
          onConfirm={handleApplyChanges}
          title="Confirm Apply Changes"
          content="Are you sure you want to apply these changes?"
        />

        <ConfirmationDialog
          open={isResetDialogOpen}
          onClose={() => setIsResetDialogOpen(false)}
          onConfirm={resetConfirmed}
          title="Confirm Reset"
          content="Are you sure you want to reset the changes?"
        />
      </form>
    </Drawer>
  );
}

export default PromptEngineeringSidebar;
