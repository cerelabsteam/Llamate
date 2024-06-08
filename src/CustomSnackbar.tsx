import { AlertTitle } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import uiConfig from "./configs/ui";
import { toTitleCase } from "./utils/commonFunctions";

import type { AlertProps } from "@mui/material";
function CustomSnackbar(props: {
  isSnackbarOpen: boolean;
  snackbarMessage: string;
  alertSeverity: AlertProps["severity"];
  alertVariant: AlertProps["variant"];
  handleSnackbarClose: () => void;
  showAlertTitle: boolean;
}) {
  return (
    <Snackbar
      open={props.isSnackbarOpen}
      autoHideDuration={uiConfig.snackbarCloseTimeInMS}
      onClose={props.handleSnackbarClose}
    >
      <Alert
        variant={props.alertVariant}
        severity={props.alertSeverity}
        onClose={props.handleSnackbarClose}
        sx={{ width: "100%" }}
      >
        {props.showAlertTitle && (
          <AlertTitle>{toTitleCase(props.alertSeverity || "")}</AlertTitle>
        )}

        {props.snackbarMessage}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
