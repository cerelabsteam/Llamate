import "./stylesheets/Chat.css";

import React from "react";

import CodeIcon from "@mui/icons-material/Code";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { Button, Paper } from "@mui/material";

import InputWindow from "./InputWindow";
import { Conversation, Message } from "./types/Chat";

function Chat() {
  const [userInput, setUserInput] = React.useState<string>("");
  const [conversation, setConversation] = React.useState<Conversation>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const newMessage: Message = {
      user: userInput,
      assistant: "Hi there!",
    };

    const conversationsClone = JSON.parse(JSON.stringify(conversation));
    setConversation([...conversationsClone, newMessage]);
    setUserInput("");
  };

  return (
    <Paper square className="Chat">
      <Paper className="Chat-Button">
        <Button variant="outlined" startIcon={<DeleteSweepIcon />}>
          Clear chat
        </Button>
        <Button variant="outlined" startIcon={<CodeIcon />}>
          View Code
        </Button>
      </Paper>
      <Paper className="Chat-Display">
        {conversation.map((msg, index) => (
          <Paper key={index}>
            <Paper>User: {msg.user}</Paper>
            <Paper>Assistant: {msg.assistant}</Paper>
          </Paper>
        ))}
      </Paper>

      <InputWindow
        value={userInput}
        onChange={handleChange}
        onSubmit={handleSubmit}
      ></InputWindow>
    </Paper>
  );
}

export default Chat;
