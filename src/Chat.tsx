import "./stylesheets/Chat.css";

import { Paper } from "@mui/material";

import { Examples } from "./types/PromptEngineeringSidebar";

function Chat(props: { activeSystemPrompt: string; activeExamples: Examples }) {
  return (
    <Paper square className="Chat">
      active system prompt : {props.activeSystemPrompt}
      <br />
      active examples : {JSON.stringify(props.activeExamples)}
    </Paper>
  );
}

export default Chat;
