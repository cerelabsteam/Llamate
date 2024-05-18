import clsx from "clsx";
import React, { KeyboardEvent, useRef, useState } from "react";

interface ChatInputProps {
  onSubmit: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit }) => {
  const [rows, setRows] = useState<number>(3);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFocus = () => {
    setRows(4);
    setIsFocused(true);
    if (textareaRef.current) {
      textareaRef.current.style.overflowY = "auto";
    }
  };

  const handleBlur = () => {
    setRows(3);
    setIsFocused(false);
    if (textareaRef.current) {
      textareaRef.current.style.overflowY = "hidden";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (textareaRef.current) {
        onSubmit(textareaRef.current.value);
        textareaRef.current.value = "";
      }
    }
  };

  return (
    <textarea
      ref={textareaRef}
      name="chat-input"
      id="chat-input"
      placeholder="Type user query here. (Shift + Enter for new line)"
      className={clsx(
        "p-2 outline-none shadow-sm transition-all duration-300 ease-in-out",
        isFocused ? "scale-y-105 border-2 border-blue-500" : "scale-100 border"
      )}
      rows={rows}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      style={{ overflowY: "hidden", resize: "none" }}
    />
  );
};

export default ChatInput;
