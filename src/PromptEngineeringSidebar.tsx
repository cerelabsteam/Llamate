import "./stylesheets/PromptEngineeringSidebar.css";

import { Dispatch, SetStateAction } from "react";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Accordion,
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
import React from "react";

function PromptEngineeringSidebar(props: {
  isPromptEngineeringSidebarOpen: boolean;
  changeIsPromptEngineeringSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
  // state
  const [template, changeTemplate] = React.useState("");

  const handleChangeTemplate = (event: SelectChangeEvent) => {
    changeTemplate(event.target.value as string);
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
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={template}
            label="Age"
            onChange={handleChangeTemplate}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-multiline-static"
          label="System message"
          multiline
          rows={4}
          defaultValue="Default Value"
        />
        <Button variant="outlined" startIcon={<AddIcon />}>
          Add example
        </Button>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Example 1
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
      </form>
    </Drawer>
  );
}

export default PromptEngineeringSidebar;
