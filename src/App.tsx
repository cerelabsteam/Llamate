import { PanelLeft, PanelRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";

import IconButton from "@components/buttons/IconButton";
import ChatWindow from "@components/ChatWindow";
import LeftSidebar from "@components/LeftSidebar";
import RightSideBar from "@components/RightSideBar";
import { BREAK_POINT, IMPORT_DELIMITER } from "@config";
import { EMPTY_TEMPLATE_VALUE } from "@constants";
import AppContext from "@context";
import { IDeploymentModel, IPromptExample, ISystemMessage } from "@types";
import {
  cn,
  exportToJson,
  takeFileInput,
  transformToExportFormat,
  validateJsonStructure,
} from "@utils";

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

  const handleImportButtonClick = async () => {
    // accept json file from user
    const jsonData = await takeFileInput([".json"]);

    if (jsonData) {
      // validate json data
      const isValidJson = validateJsonStructure(jsonData);
      if (isValidJson) {
        // before importing new data remove previous imported data
        appData.setAllExamples(
          appData._allExamples?.filter(
            (example) => !example.id.toString().includes(IMPORT_DELIMITER)
          ) ?? []
        );
        appData.setDeployments(
          appData.deployments?.filter(
            (dep) => !dep.id.toString().includes(IMPORT_DELIMITER)
          ) ?? []
        );

        // set is imported to true
        appData.setIsImported(true);
        const importedExamples = jsonData?.fewShotExamples?.map(
          (example, index: number) => ({
            pid: EMPTY_TEMPLATE_VALUE,
            user: example.userInput,
            assistant: example.chatbotResponse,
            id: IMPORT_DELIMITER + Date.now().toString() + index,
          })
        );
        // console.log(importedExamples);
        appData.setExamples(importedExamples);

        appData.setAllExamples([
          ...(appData._allExamples ?? []),
          ...importedExamples,
        ]);

        if (jsonData?.chatParameters) {
          const importedDeploymentName =
            jsonData?.chatParameters?.deploymentName;
          if (importedDeploymentName) {
            const deploymentId = IMPORT_DELIMITER + Date.now().toString();
            appData.setDeploymentName(importedDeploymentName);
            appData.setDeployments([
              ...(appData?.deployments ? appData.deployments : []),
              {
                id: deploymentId,
                name: importedDeploymentName,
                maxTokens: 0,
              },
            ]);
            appData.setDeploymentId(deploymentId);
          }
          if (jsonData?.chatParameters?.pastMessagesToInclude)
            appData.setPastMessagesToInclude(
              jsonData?.chatParameters?.pastMessagesToInclude
            );
        }

        appData.setSystemPrompt(jsonData?.systemPrompt);
        appData.setTemplateId(EMPTY_TEMPLATE_VALUE);
      }
    }
  };

  useEffect(() => {
    // fetch jsons from backend
    const fetchData = async () => {
      const templatesResponse = await fetch("data/templates.json");
      const templates: ISystemMessage[] = await templatesResponse.json();

      const examplesResponse = await fetch("data/examples.json");
      const examples: IPromptExample[] = await examplesResponse.json();

      const deploymentsResponse = await fetch("data/deployments.json");
      const deployments: IDeploymentModel[] = await deploymentsResponse.json();

      if (deployments && deployments?.length) {
        appData.setDeployments(deployments);
        appData.setDeploymentId(deployments[0].id);
        appData.setDeploymentName(deployments[0].name);
      }

      if (templates && templates?.length) {
        appData.setAllSystemPrompts(templates);
        appData.setTemplateId(templates[0].id);
      }
      if (examples && examples?.length) appData.setAllExamples(examples);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // when device is small then close both panels
    if (window.innerWidth < BREAK_POINT) {
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
              onClick={handleImportButtonClick}
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
