import clsx from "clsx";
import { useContext } from "react";

import AppContext from "@context";

import IconButton from "./buttons/IconButton";
import ChatInfoMessage from "./ChatInfoMessage";
import ChatInput from "./inputs/ChatInput";

const ChatWindow = () => {
  const appData = useContext(AppContext);

  const isChatWindowExpanded = appData?.isChatWindowExpanded;
  return (
    <section
      className={clsx(" flex flex-col p-6 bg-gray-100", {
        "w-full": isChatWindowExpanded,
        "w-3/5": !isChatWindowExpanded,
      })}
    >
      {/* action buttons */}
      <div className="flex items-center gap-4">
        <IconButton
          iconSize={18}
          iconUrl="assets/sweep.png"
          onClick={() => {}}
          text="Clear chat"
        />
        <div className="h-3/5 w-[2px] bg-gray-500 rounded-sm " />
        <div className="flex flex-1 items-center gap-4">
          <IconButton
            iconSize={18}
            iconUrl="assets/export.png"
            onClick={() => {}}
            text="Export chat"
          />
          {/* <IconButton
            iconSize={18}
            iconUrl="assets/code.png"
            onClick={() => {}}
            text="View code"
            disabled={true}
          /> */}
          <IconButton
            iconSize={18}
            iconUrl={`assets/${
              isChatWindowExpanded ? "shrink-screen" : "fullscreen"
            }.png`}
            onClick={appData!.toggleChatWindowExpanded}
            classes="border-none ml-auto flex-shrink-0"
          />
        </div>
      </div>

      {/* chats */}
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatInfoMessage />
      </div>

      {/* chat text area */}
      <div className="flex flex-col gap-2">
        <ChatInput onSubmit={() => {}} />
        <div className="flex justify-end gap-4 items-center">
          <p className="text-gray-500 text-sm">11/8192 tokens to be sent</p>
          <IconButton
            iconSize={20}
            classes="border-none"
            onClick={() => {}}
            iconUrl="assets/mic.png"
          />
          <IconButton
            iconSize={20}
            classes="border-none"
            onClick={() => {}}
            iconUrl="assets/send.png"
          />
        </div>
      </div>
    </section>
  );
};

export default ChatWindow;
