import { useState } from "react";

import { AppProvider, initialContextValue } from "@context";
import {
  IDeploymentModel,
  IImportData,
  IPromptExample,
  ISystemMessage,
} from "@types";

const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [templateId, setTemplateId] = useState<string | number | null>(null);

  const [systemPrompt, setSystemPrompt] = useState(
    initialContextValue.systemPrompt
  );
  const [examples, setExamples] = useState(initialContextValue.examples);
  const [chatParameters, setChatParameters] = useState(
    initialContextValue.chatParameters
  );

  const [isChatWindowExpanded, setIsChatWindowExpanded] = useState(
    initialContextValue.isChatWindowExpanded
  );
  const [allSystemPrompts, setAllSystemPrompts] = useState(
    initialContextValue._allSystemPrompts
  );
  const [allExamples, setAllExamples] = useState(
    initialContextValue._allExamples
  );

  const [deployments, setDeployments] = useState(
    initialContextValue.deployments
  );

  const [deploymentId, setDeploymentId] = useState(
    initialContextValue.deploymentId
  );

  const [isImported, setIsImported] = useState(initialContextValue.isImported);
  const [importData, setImportData] = useState(initialContextValue.importData);

  const handleSetDeployments = (value: IDeploymentModel[]) => {
    setDeployments(value);
  };

  const handleSetSystemPrompt = (value: string) => {
    setSystemPrompt(value);
  };

  const handleSetExamples = (value: IPromptExample[]) => {
    setExamples(value);
  };

  const handleSetDeploymentName = (value: string) => {
    setChatParameters((prev) => ({ ...prev, deploymentName: value }));
  };

  const handleSetPastMessagesToInclude = (value: number) => {
    setChatParameters((prev) => ({ ...prev, pastMessagesToInclude: value }));
  };

  const handleToggleChatWindowExpanded = () => {
    setIsChatWindowExpanded((prev: boolean) => !prev);
  };

  const handleSetAllSystemPrompts = (value: ISystemMessage[]) => {
    setAllSystemPrompts(value);
  };

  const handleSetAllExamples = (value: IPromptExample[]) => {
    setAllExamples(value);
  };

  const handleSetTemplateId = (value: string | number | null) => {
    setTemplateId(value);
  };

  const handleSetDeploymentId = (value: string | number | null) => {
    setDeploymentId(value);
  };

  const handleSetIsImported = (value: boolean) => {
    setIsImported(value);
  };

  const handleImportData = (value: IImportData) => setImportData(value);

  return (
    <AppProvider
      value={{
        templateId,
        setTemplateId: handleSetTemplateId,
        deployments,
        systemPrompt,
        examples,
        chatParameters,
        isChatWindowExpanded,
        _allSystemPrompts: allSystemPrompts,
        _allExamples: allExamples,
        deploymentId,
        isImported,
        importData,
        setIsImported: handleSetIsImported,
        setImportData: handleImportData,
        setDeploymentId: handleSetDeploymentId,
        setDeployments: handleSetDeployments,
        setSystemPrompt: handleSetSystemPrompt,
        setExamples: handleSetExamples,
        setAllExamples: handleSetAllExamples,
        setAllSystemPrompts: handleSetAllSystemPrompts,
        setDeploymentName: handleSetDeploymentName,
        setPastMessagesToInclude: handleSetPastMessagesToInclude,
        toggleChatWindowExpanded: handleToggleChatWindowExpanded,
      }}
    >
      {children}
    </AppProvider>
  );
};

export default DataProvider;
