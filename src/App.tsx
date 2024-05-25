import { PanelLeft, PanelRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";

import IconButton from "@components/buttons/IconButton";
import ChatWindow from "@components/ChatWindow";
import LeftSidebar from "@components/LeftSidebar";
import RightSideBar from "@components/RightSideBar";
import AppContext from "@context";
import { IPromptExample, ISystemMessage } from "@types";
import { cn, exportToJson, transformToExportFormat } from "@utils";

function App() {
  const appData = useContext(AppContext);

  const isChatWindowExpanded = appData?.isChatWindowExpanded;

  const [isLeftSidebarOpen, setisLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setisRightSidebarOpen] = useState(false);

  const panelButtonsClass = "text-gray-600 hover:text-gray-700 cursor-pointer";

  const toggleLeftSidebarState = () => {
    setisLeftSidebarOpen((prev) => !prev);
  };

  const toggleRightSidebarState = () => {
    setisRightSidebarOpen((prev) => !prev);
  };

  // fetch jsons from api
  useEffect(() => {
    const fetchData = async () => {
      const templatesResponse = await fetch("data/templates.json");
      const templates: ISystemMessage[] = await templatesResponse.json();

      const examplesResponse = await fetch("data/examples.json");
      const examples: IPromptExample[] = await examplesResponse.json();

      if (templates && templates?.length)
        appData.setAllSystemPrompts(templates);
      if (examples && examples?.length) appData.setAllExamples(examples);
    };

    fetchData();
  }, []);

  // when device is small then close both panels
  useEffect(() => {
    const breakPoint = 768;
    if (window.innerWidth < breakPoint) {
      setisLeftSidebarOpen(false);
      setisRightSidebarOpen(false);
    } else {
      setisLeftSidebarOpen(true);
      setisRightSidebarOpen(true);
    }
  }, []);

  return (
    <div className={"p-1 xs:p-8 flex flex-col w-screen h-screen relative"}>
      {/* backdrop component */}
      <div
        className={cn(
          "w-full h-full absolute top-0 left-0 z-10 hidden bg-gray-500 opacity-85",
          {
            "block sm:hidden": isLeftSidebarOpen || isRightSidebarOpen,
          }
        )}
      />

      {!isChatWindowExpanded && (
        <div className="flex justify-between items-center mb-6">
          <div className="flex-center gap-3">
            <PanelLeft
              className={panelButtonsClass}
              onClick={toggleLeftSidebarState}
            />

            <p className="text-2xl">Chat playground</p>
          </div>
          <div className="flex-center gap-4">
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

            <PanelRight
              className={panelButtonsClass}
              onClick={toggleRightSidebarState}
            />
          </div>
        </div>
      )}
      {/* <div className="w-full h-[2px] bg-gray-600" /> */}
      <div
        className={cn("flex flex-1", {
          main: !isChatWindowExpanded,
          "h-screen": isChatWindowExpanded,
        })}
      >
        {!isChatWindowExpanded && isLeftSidebarOpen && (
          <LeftSidebar toggleSidebarState={toggleLeftSidebarState} />
        )}
        <ChatWindow />
        {!isChatWindowExpanded && isRightSidebarOpen && (
          <RightSideBar toggleSidebarState={toggleRightSidebarState} />
        )}
      </div>
    </div>
  );
}

export default App;
