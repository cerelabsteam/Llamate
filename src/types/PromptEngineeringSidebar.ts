import { Dispatch, SetStateAction } from "react";

import { AlertProps } from "@mui/material";

export interface Example {
  user: string;
  assistant: string;
}

export type Examples = Example[];

export interface PromptEngineeringSidebarProps {
  isPromptEngineeringSidebarOpen: boolean;
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
  systemPrompt: string;
  changeSystemPrompt: Dispatch<SetStateAction<string>>;
  examples: Examples;
  changeExamples: Dispatch<SetStateAction<Examples>>;
}

export interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
  cancelLabel?: string;
  confirmLabel?: string;
}
