import "./stylesheets/Chat.css";

import MuiMarkdown from "mui-markdown";
import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";
import React, { useEffect, useRef } from "react";

import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button, Paper } from "@mui/material";

import brandConfig from "./configs/brand";
import InputWindow from "./InputWindow";
import { Conversation, Message } from "./types/Chat";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
      assistant:
        "Yes, you're right. Using markdown syntax, I can lay out the information in a table-like structure. Here's an example for the Indian Income Tax slabs for FY 2021-22 (AY 2022-23):\n\nFor Individuals (below 60 years) & HUF:\n\n| Income | Tax Rate |\n|---|---|\n| Up to ₹2.5 lakhs | Nil |\n| ₹2.5 lakhs to ₹5 lakhs | 5% |\n| ₹5 lakhs to ₹10 lakhs | 20% |\n| Above ₹10 lakhs | 30% |\n\nFor Senior Citizens (60 years to 80 years):\n\n| Income | Tax Rate |\n|---|---|\n| Up to ₹3 lakhs | Nil |\n| ₹3 lakhs to ₹5 lakhs | 5% |\n| ₹5 lakhs to ₹10 lakhs | 20% |\n| Above ₹10 lakhs | 30% |\n\nFor Super Senior Citizens (Above 80 years):\n\n| Income | Tax Rate |\n|---|---|\n| Up to ₹5 lakhs | Nil |\n| ₹5 lakhs to ₹10 lakhs | 20% |\n| Above ₹10 lakhs | 30% |\n\nPlease note that these slabs are subject to changes and it's always a good idea to check the latest updates from reliable sources.",
    };

    const conversationsClone = JSON.parse(JSON.stringify(conversation));
    setConversation([...conversationsClone, newMessage]);
    setUserInput("");
  };

  const handleClearChat = (): void => {
    setConversation([]);
  };

  const handleExportChat = (): void => {
    const chatContent = conversation.map((msg) => ({
      user: `User: ${msg.user}\n`,
      assistant: msg.assistant,
    }));

    const docDefinition = {
      content: [
        {
          text: `${brandConfig.humanReadableAppName} Chat Export\n\n`,
          style: "header",
        },
        ...chatContent.map((msg) => [
          { text: msg.user, bold: true },
          { text: msg.assistant, style: "assistantMessage" },
        ]),
      ],
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
    <Paper square className="Chat" variant="outlined">
      <div className="Chat-Button">
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
      </div>

      <Paper
        className="Chat-Display"
        ref={chatDisplayRef}
        elevation={0}
        variant="outlined"
      >
        {conversation.map((msg, index) => (
          <Paper key={index} className="Message-Container" elevation={0}>
            <Paper className="User-Message" color="primary">
              {msg.user}
            </Paper>
            <Paper className="Assistant-Message" color="success">
              <MuiMarkdown>{msg.assistant}</MuiMarkdown>
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
