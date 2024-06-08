import "./stylesheets/App.css";

import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Paper } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Chat from "./Chat";
import templates from "./configs/templates";
import uiConfig from "./configs/ui";
import PromptEngineeringSidebar from "./PromptEngineeringSidebar";
import ThemeToggleFAB from "./ThemeToggleFAB";
import { Examples } from "./types/PromptEngineeringSidebar";

function App() {
  const [isPromptEngineeringSidebarOpen, changeIsPromptEngineeringSidebarOpen] =
    useState(false);
  const [currentThemePalette, changeCurrentThemePalette] = useState(
    uiConfig.defaultThemePalette
  );
  const [activeSystemPrompt, changeActiveSystemPrompt] = useState<string>(
    templates[0].systemPrompt
  );
  const [activeExamples, changeActiveExamples] = useState<Examples>(
    templates[0].fewShotExamples.map((ele) => {
      return { user: ele.userInput, assistant: ele.chatbotResponse };
    })
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
        <Chat
          activeSystemPrompt={activeSystemPrompt}
          activeExamples={activeExamples}
        />
        <PromptEngineeringSidebar
          isPromptEngineeringSidebarOpen={isPromptEngineeringSidebarOpen}
          changeIsPromptEngineeringSidebarOpen={
            changeIsPromptEngineeringSidebarOpen
          }
          activeSystemPrompt={activeSystemPrompt}
          activeExamples={activeExamples}
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
