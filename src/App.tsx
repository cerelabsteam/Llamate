import "./stylesheets/App.css";

import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

import PromptEngineeringSidebar from "./PromptEngineeringSidebar";

function App() {
  const [isPromptEngineeringSidebarOpen, changeIsPromptEngineeringSidebarOpen] =
    useState(false);

  return (
    <>
      <IconButton onClick={() => changeIsPromptEngineeringSidebarOpen(true)}>
        <MenuIcon />
      </IconButton>
      <PromptEngineeringSidebar
        isPromptEngineeringSidebarOpen={isPromptEngineeringSidebarOpen}
        changeIsPromptEngineeringSidebarOpen={
          changeIsPromptEngineeringSidebarOpen
        }
      />
    </>
  );
}

export default App;
