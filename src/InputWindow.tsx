import "./stylesheets/InputWindow.css";

import * as React from "react";

import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function InputWindow({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
}) {
  return (
    <form className="inputWindow" onSubmit={onSubmit} autoComplete="off">
      <TextField
        required
        placeholder="Enter your query"
        label="User message"
        onChange={onChange}
        value={value}
        multiline
        maxRows={4}
      />
      <IconButton type="submit" color="primary">
        <SendIcon fontSize="large" />
      </IconButton>
    </form>
  );
}
