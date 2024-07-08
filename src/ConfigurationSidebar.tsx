import "./stylesheets/ConfigurationSidebar.css";

import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { IconButton, TextField, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Slider from "@mui/material/Slider";

import { ConfigurationSidebarProps } from "./types/ConfigurationSidebar";

const ConfigurationSidebar: React.FC<ConfigurationSidebarProps> = ({
  isOpen,
  onClose,
  deployment,
  setDeployment,
  messageHistoryLimit,
  setMessageHistoryLimit,
}) => {
  const handleDeploymentChange = (event: SelectChangeEvent<string>) => {
    setDeployment(event.target.value as string);
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setMessageHistoryLimit(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (newValue >= 1 && newValue <= 100) {
      setMessageHistoryLimit(newValue);
    }
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div className="ConfigurationSidebar-HeadingContainer">
        <Typography variant="h6" noWrap component="div">
          Configuration
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <form className="Configuration-Sidebar">
        <FormControl fullWidth>
          <InputLabel>Deployment</InputLabel>
          <Select
            labelId="deployment-select-label"
            label="Deployment"
            value={deployment}
            onChange={handleDeploymentChange}
          >
            <MenuItem value={"cere-gpt-4"}>cere-gpt-4</MenuItem>
            <MenuItem value={"cere-gpt-35-turbo"}>cere-gpt-35-turbo</MenuItem>
            <MenuItem value={"cere-gptturbo16k"}>cere-gptturbo16k</MenuItem>
          </Select>
        </FormControl>
        <Typography className="ConfigurationSidebar-SliderName">
          Past Messages Included
        </Typography>
        <div className="ConfigurationSidebar-Slider">
          <Slider
            value={messageHistoryLimit}
            onChange={handleSliderChange}
            aria-labelledby="message-history-slider"
            valueLabelDisplay="auto"
            min={1}
            max={20}
          />
          <TextField
            value={messageHistoryLimit}
            onChange={handleInputChange}
            type="number"
            inputProps={{ min: 1, max: 20 }}
            className="ConfigurationSidebar-TextField"
          />
        </div>
      </form>
    </Drawer>
  );
};

export default ConfigurationSidebar;
