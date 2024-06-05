import "./stylesheets/App.css";

import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Paper } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import uiConfig from "./configs/ui";
import PromptEngineeringSidebar from "./PromptEngineeringSidebar";
import ThemeToggleFAB from "./ThemeToggleFAB";

function App() {
  const [isPromptEngineeringSidebarOpen, changeIsPromptEngineeringSidebarOpen] =
    useState(false);
  const [currentThemePalette, changeCurrentThemePalette] = useState(
    uiConfig.defaultThemePalette
  );
  const darkTheme = createTheme({
    palette: {
      mode: currentThemePalette,
    },
  });
  const handleThemeToggle = () => {
    if (currentThemePalette === "dark") {
      changeCurrentThemePalette("light");
    } else {
      changeCurrentThemePalette("dark");
    }
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Paper square className="App">
        <IconButton onClick={() => changeIsPromptEngineeringSidebarOpen(true)}>
          <MenuIcon />
        </IconButton>
        <PromptEngineeringSidebar
          isPromptEngineeringSidebarOpen={isPromptEngineeringSidebarOpen}
          changeIsPromptEngineeringSidebarOpen={
            changeIsPromptEngineeringSidebarOpen
          }
        />
        <ThemeToggleFAB
          handleThemeToggle={handleThemeToggle}
          currentThemePalette={currentThemePalette}
        />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
