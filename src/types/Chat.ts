import { Message } from "@mui/icons-material";

export interface Message {
  user: string;
  assistant: string;
}

export type Conversation = Message[];
