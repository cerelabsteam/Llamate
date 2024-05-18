import IconButton from "./buttons/IconButton";

const ChatWindow = () => {
  return (
    <section className="w-3/5 flex flex-col p-6 bg-gray-100">
      {/* action buttons */}
      <div className="flex items-center gap-4">
        <IconButton
          iconSize={18}
          iconUrl="/assets/sweep.png"
          onClick={() => {}}
          text="Clear chat"
        />
        <div className="h-3/5 w-[2px] bg-gray-500 rounded-sm " />
        <div className="flex flex-1 items-center gap-4">
          <IconButton
            iconSize={18}
            iconUrl="/assets/setting.png"
            onClick={() => {}}
            text="Playground settings"
          />
          <IconButton
            iconSize={18}
            iconUrl="/assets/code.png"
            onClick={() => {}}
            text="View code"
            disabled={true}
          />
          <IconButton
            iconSize={18}
            iconUrl="/assets/sound.png"
            onClick={() => {}}
            classes="border-none ml-auto"
          />
        </div>
      </div>

      {/* chat text area */}
    </section>
  );
};

export default ChatWindow;
