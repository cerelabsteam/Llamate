import { useContext } from "react";

import IconButton from "@components/buttons/IconButton";
import ChatWindow from "@components/ChatWindow";
import LeftSidebar from "@components/LeftSidebar";
import RightSideBar from "@components/RightSideBar";
import AppContext from "@context";
import { exportToJson, transformToExportFormat } from "@utils";

function App() {
  const appData = useContext(AppContext);

  const isChatWindowExpanded = appData?.isChatWindowExpanded;
  return (
    <div className="p-8 flex flex-col gap-4 w-screen h-screen">
      <div className="flex justify-between items-center">
        <p className="text-2xl">Chat playground</p>
        <div className="flex gap-4">
          <IconButton
            iconSize={18}
            iconUrl="assets/arrow-down.png"
            onClick={() => {}}
            text="Import"
            classes="border-none bg-primary rounded-none px-2 gap-1"
            textClasses="text-white"
          />

          <IconButton
            iconSize={18}
            iconUrl="assets/arrow-up.png"
            onClick={() => {
              const exportData = transformToExportFormat(appData);
              exportToJson(exportData);
            }}
            text="Export"
            classes="border-none bg-primary rounded-none px-2 gap-1"
            textClasses="text-white"
          />
        </div>
      </div>
      <div className="w-full h-[2px] bg-gray-600" />
      <div className="main flex flex-1">
        {!isChatWindowExpanded && <LeftSidebar />}
        <ChatWindow />
        {!isChatWindowExpanded && <RightSideBar />}
      </div>
    </div>
  );
}

export default App;
