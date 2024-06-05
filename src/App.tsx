import "./stylesheets/App.css";

import { useState } from "react";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import { Fab, IconButton, Paper } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import uiConfig from "./configs/ui";
import PromptEngineeringSidebar from "./PromptEngineeringSidebar";

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
      <Paper square>
        <IconButton onClick={() => changeIsPromptEngineeringSidebarOpen(true)}>
          <MenuIcon />
        </IconButton>
        <PromptEngineeringSidebar
          isPromptEngineeringSidebarOpen={isPromptEngineeringSidebarOpen}
          changeIsPromptEngineeringSidebarOpen={
            changeIsPromptEngineeringSidebarOpen
          }
        />
        <Fab onClick={handleThemeToggle}>
          {currentThemePalette === "light" ? (
            <DarkModeIcon />
          ) : (
            <LightModeIcon />
          )}
        </Fab>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
