import ChatWindow from "@components/ChatWindow";
import LeftSidebar from "@components/LeftSidebar";
import RightSideBar from "@components/RightSideBar";

function App() {
  return (
    <div className="p-8 flex flex-col gap-4 w-screen h-screen">
      <p className="text-2xl">Chat playground</p>
      <div className="block w-full h-[1px] bg-gray-600" />
      <div className="main flex flex-1">
        <LeftSidebar />
        <ChatWindow />
        <RightSideBar />
      </div>
    </div>
  );
}

export default App;
