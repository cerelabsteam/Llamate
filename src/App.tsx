import "./stylesheets/App.css";

import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Paper } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Chat from "./Chat";
import templates from "./configs/templates";
import uiConfig from "./configs/ui";
import CustomSnackbar from "./CustomSnackbar";
import PromptEngineeringSidebar from "./PromptEngineeringSidebar";
import ThemeToggleFAB from "./ThemeToggleFAB";
import { Examples } from "./types/PromptEngineeringSidebar";

import type { AlertProps } from "@mui/material";

function App() {
  // state
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
  const [isSnackbarOpen, changeIsSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, changeSnackbarMessage] = useState<string>("success");
  const [alertSeverity, changeAlertSeverity] =
    useState<AlertProps["severity"]>("info");
  const [alertVariant, changeAlertVariant] = useState<AlertProps["variant"]>();
  const [showAlertTitle, changeShowAlertTitle] = useState(false);
  // functions

  const handleThemeToggle = () => {
    if (currentThemePalette === "dark") {
      changeCurrentThemePalette("light");
    } else {
      changeCurrentThemePalette("dark");
    }
  };

  const handleSnackbarOpen = (
    snackbarMessage: string,
    alertSeverity: AlertProps["severity"],
    alertVariant: AlertProps["variant"] = "filled",
    showAlertTitle: boolean = true
  ) => {
    changeIsSnackbarOpen(true);
    changeSnackbarMessage(snackbarMessage);
    changeAlertSeverity(alertSeverity);
    changeAlertVariant(alertVariant);
    changeShowAlertTitle(showAlertTitle);
  };

  const handleSnackbarClose = () => {
    changeIsSnackbarOpen(false);
    // changeSnackbarMessage("");
    // changeAlertSeverity("info");
    // changeAlertVariant("filled");
    // changeShowAlertTitle(true);
  };
  // use effect
  // misc
  const darkTheme = createTheme({
    palette: {
      mode: currentThemePalette,
    },
  });
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
          changeActiveSystemPrompt={changeActiveSystemPrompt}
          changeActiveExamples={changeActiveExamples}
          handleSnackbarOpen={handleSnackbarOpen}
        />
        <ThemeToggleFAB
          handleThemeToggle={handleThemeToggle}
          currentThemePalette={currentThemePalette}
        />
        <CustomSnackbar
          isSnackbarOpen={isSnackbarOpen}
          snackbarMessage={snackbarMessage}
          alertSeverity={alertSeverity}
          alertVariant={alertVariant}
          handleSnackbarClose={handleSnackbarClose}
          showAlertTitle={showAlertTitle}
        />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
