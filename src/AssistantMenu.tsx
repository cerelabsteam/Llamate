import { useState } from "react";

import { Alert, Menu, MenuItem, Snackbar } from "@mui/material";

interface AssistantMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  value: string;
}

export default function AssistantMenu({
  anchorEl,
  open,
  handleClose,
  value,
}: AssistantMenuProps) {
  const [alertOpen, setAlertOpen] = useState(false);

  const handleCopyToClipboard = (text: string): void => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Copied to clipboard");
        setAlertOpen(true);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
    handleClose();
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => handleCopyToClipboard(value)}>
          Copy to Clipboard
        </MenuItem>
      </Menu>
      <Snackbar
        open={alertOpen}
        autoHideDuration={1000}
        onClose={handleAlertClose}
        className="AssistantMenu-Alert-Container"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleAlertClose}
          severity="success"
          sx={{ width: "auto", minWidth: "200px" }}
        >
          Text copied to clipboard!
        </Alert>
      </Snackbar>
    </div>
  );
}
