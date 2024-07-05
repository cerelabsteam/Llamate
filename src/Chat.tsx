import "./stylesheets/Chat.css";

import React, { useEffect, useRef } from "react";

import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button, Paper } from "@mui/material";

import brandConfig from "./configs/brand";
import InputWindow from "./InputWindow";
import { Conversation, Message } from "./types/Chat";

function Chat() {
  const [userInput, setUserInput] = React.useState<string>("");
  const [conversation, setConversation] = React.useState<Conversation>([]);
  const chatDisplayRef = useRef<HTMLDivElement>(null);

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

  const handleClearChat = (): void => {
    setConversation([]);
  };

  const handleExportChat = async (): Promise<void> => {
    const pdfMake = (await import("pdfmake/build/pdfmake")).default;
    const pdfFonts = await import("pdfmake/build/vfs_fonts");
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const chatContent = conversation.map((msg) => ({
      text: `User: ${msg.user}\nAssistant: ${msg.assistant}\n\n`,
    }));

    const docDefinition = {
      content: chatContent,
    };

    pdfMake
      .createPdf(docDefinition)
      .download(`${brandConfig.humanReadableAppName}.pdf`);
  };
  useEffect(() => {
    if (chatDisplayRef.current) {
      chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    <Paper square className="Chat">
      <Paper className="Chat-Button">
        <Button
          variant="outlined"
          startIcon={<DeleteSweepIcon />}
          onClick={handleClearChat}
        >
          Clear chat
        </Button>
        <Button
          variant="outlined"
          startIcon={<FileDownloadIcon />}
          onClick={handleExportChat}
        >
          Export Chat
        </Button>
      </Paper>

      <Paper className="Chat-Display" ref={chatDisplayRef} elevation={0}>
        {conversation.map((msg, index) => (
          <Paper key={index} className="Message-Container" elevation={0}>
            <Paper className="User-Message">User: {msg.user}</Paper>
            <Paper className="Assistant-Message">
              Assistant: {msg.assistant}
            </Paper>
          </Paper>
        ))}
      </Paper>

      <InputWindow
        value={userInput}
        onChange={handleChange}
        onSubmit={handleSubmit}
        disabled={Boolean(userInput)}
      ></InputWindow>
    </Paper>
  );
}

export default Chat;
