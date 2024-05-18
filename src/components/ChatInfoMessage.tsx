const ChatInfoMessage = () => {
  return (
    <div className="w-4/5 flex p-8 bg-white shadow-lg rounded-sm m-auto gap-8">
      <div className="w-16 h-16">
        <img
          src="assets/robot.png"
          alt="Chatbot"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex flex-col">
        <p className="font-bold">Start chatting</p>
        <p>
          Test your assitant by sending queries below. Then adjust your
          assistant to improve your assistant's responses
        </p>
      </div>
    </div>
  );
};

export default ChatInfoMessage;
