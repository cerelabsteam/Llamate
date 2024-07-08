import "./stylesheets/InputWindow.css";

import * as React from "react";

import SendIcon from "@mui/icons-material/Send";
import { IconButton, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function InputWindow({
  value,
  onChange,
  onSubmit,
  disabled,
}: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
  disabled: boolean;
}) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (disabled == true) {
        if (formRef.current) {
          formRef.current.requestSubmit();
        }
      }
    }
  };

  return (
    <form
      className="inputWindow"
      onSubmit={onSubmit}
      autoComplete="off"
      ref={formRef}
    >
      <TextField
        required
        placeholder="Enter your query"
        label="User message"
        onChange={onChange}
        value={value}
        multiline
        onKeyDown={handleKeyDown}
        maxRows={4}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" color="primary" disabled={!disabled}>
                <SendIcon fontSize="medium" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
