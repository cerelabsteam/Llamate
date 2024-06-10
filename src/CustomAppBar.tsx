import "./stylesheets/CustomAppBar.css";

import { Dispatch, SetStateAction } from "react";

import DownloadIcon from "@mui/icons-material/Download";
import MenuIcon from "@mui/icons-material/Menu";
import PublishIcon from "@mui/icons-material/Publish";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import brandConfig from "./configs/brand";
import { SetupJson } from "./types/CustomAppBar";
import { Examples } from "./types/PromptEngineeringSidebar";

import type { AlertProps } from "@mui/material";

function CustomAppBar(props: {
  changeIsPromptEngineeringSidebarOpen: Dispatch<SetStateAction<boolean>>;
  activeSystemPrompt: string;
  activeExamples: Examples;
  changeActiveSystemPrompt: Dispatch<SetStateAction<string>>;
  changeActiveExamples: Dispatch<SetStateAction<Examples>>;
  handleSnackbarOpen: (
    snackbarMessage: string,
    alertSeverity: AlertProps["severity"],
    alertVariant?: AlertProps["variant"],
    showAlertTitle?: boolean
  ) => void;
  changeSystemPrompt: Dispatch<SetStateAction<string>>;
  changeExamples: Dispatch<SetStateAction<Examples>>;
}) {
  // state
  const isDesktopView = useMediaQuery("(min-width: 768px)");

  // function
  const transformToExportFormat = (): SetupJson => {
    return {
      systemPrompt: props.activeSystemPrompt,
      fewShotExamples:
        props.activeExamples?.map((example) => ({
          userInput: example.user,
          chatbotResponse: example.assistant,
        })) ?? [],
    };
  };
  const exportToJson = (exportData: object, filename = "ChatSetup") => {
    const jsonBlob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    // Create a URL for the Blob
    const url = URL.createObjectURL(jsonBlob);

    // Create an anchor element and set the URL as href
    const a = document.createElement("a");
    a.href = url;
    a.download = filename + ".json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Release the URL object
    URL.revokeObjectURL(url);

    props.handleSnackbarOpen("Setup exported successfully", "success");
  };
  const takeFileInput = async (fileTypes: string[]) => {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = fileTypes.join(",");

      input.onchange = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            try {
              const result = e.target?.result;
              if (result) {
                resolve(JSON.parse(result as string));
              } else {
                resolve(null);
              }
            } catch (err) {
              console.error(err);
              reject(new Error("Invalid JSON file"));
            }
          };
          reader.onerror = (err) => {
            reject(err);
          };
          reader.readAsText(file);
        } else {
          resolve(null);
        }
      };

      input.click();
    });
  };
  const handleImportSetup = async () => {
    // accept setup json file from user
    const inputSetupJson = await takeFileInput([".json"]);

    if (inputSetupJson) {
      // validate setup json
      const isValidSetupJson = validateSetupJson(inputSetupJson);
      if (isValidSetupJson) {
        // update global system prompt and examples
        props.changeActiveSystemPrompt(inputSetupJson.systemPrompt);
        let exampleData: Examples = [];
        inputSetupJson.fewShotExamples.forEach((example) => {
          exampleData.push({
            user: example.userInput,
            assistant: example.chatbotResponse,
          });
        });
        props.changeActiveExamples(exampleData);

        // update sidebar system prompt and example
        props.changeSystemPrompt(inputSetupJson.systemPrompt);
        props.changeExamples(exampleData);
      } else {
        props.handleSnackbarOpen("Invalid setup format.", "error");
      }
    }
  };
  const validateSetupJson = (data: any): data is SetupJson => {
    if (typeof data !== "object" || data === null) return false;

    if (typeof data.systemPrompt !== "string") return false;

    if (!Array.isArray(data.fewShotExamples)) return false;

    for (const example of data.fewShotExamples) {
      if (typeof example !== "object" || example === null) return false;
      if (typeof example.userInput !== "string") return false;
      if (typeof example.chatbotResponse !== "string") return false;
    }

    return true;
  };

  // effect
  // misc

  return (
    <AppBar position="sticky">
      <Toolbar className="AppBar">
        <IconButton
          onClick={() => props.changeIsPromptEngineeringSidebarOpen(true)}
          color="inherit"
        >
          <MenuIcon className="AppBar-MenuIcon" />
        </IconButton>
        <Typography variant="h6">{brandConfig.humanReadableAppName}</Typography>
        <div className="AppBar-Elements">
          {isDesktopView ? (
            <Button
              className="AppBar-Elements-Buttons"
              startIcon={<PublishIcon />}
              onClick={handleImportSetup}
              color="inherit"
            >
              Import setup
            </Button>
          ) : (
            <Tooltip title="Import setup">
              <IconButton
                className="AppBar-Elements-Buttons"
                color="inherit"
                onClick={handleImportSetup}
              >
                <PublishIcon />
              </IconButton>
            </Tooltip>
          )}
          {isDesktopView ? (
            <Button
              className="AppBar-Elements-Buttons"
              startIcon={<DownloadIcon />}
              onClick={() => {
                const exportData = transformToExportFormat();
                exportToJson(exportData);
              }}
              color="inherit"
            >
              Export setup
            </Button>
          ) : (
            <Tooltip title="Export setup">
              <IconButton
                className="AppBar-Elements-Buttons"
                color="inherit"
                onClick={() => {
                  const exportData = transformToExportFormat();
                  exportToJson(exportData);
                }}
              >
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default CustomAppBar;
