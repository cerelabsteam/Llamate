import { useState } from "react";

import { AppProvider, initialContextValue } from "@context";
import { IPromptExample, ISystemMessage } from "@types";

const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [systemPrompt, setSystemPrompt] = useState(
    initialContextValue.systemPrompt
  );
  const [examples, setExamples] = useState(initialContextValue.examples);
  const [chatParameters, setChatParameters] = useState(
    initialContextValue.chatParameters
  );

  // const systemPrompt = initialContextValue.systemPrompt;
  // const examples = initialContextValue.examples;
  // const chatParameters = initialContextValue.chatParameters;

  const [isChatWindowExpanded, setIsChatWindowExpanded] = useState(
    initialContextValue.isChatWindowExpanded
  );
  const [allSystemPrompts, setAllSystemPrompts] = useState(
    initialContextValue._allSystemPrompts
  );
  const [allExamples, setAllExamples] = useState(
    initialContextValue._allExamples
  );

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

  // const handleSetExamples = (value: IPromptExample[]) => {
  //   initialContextValue.examples = value;
  // };
  // const handleSetDeploymentName = (value: string) => {
  //   initialContextValue.chatParameters.deploymentName = value;
  // };
  // const handleSetPastMessagesToInclude = (value: number) => {
  //   initialContextValue.chatParameters.pastMessagesToInclude = value;
  // };
  // const handleSetSystemPrompt = (value: string) => {
  //   initialContextValue.systemPrompt = value;
  // };

  const handleToggleChatWindowExpanded = () => {
    setIsChatWindowExpanded((prev: boolean) => !prev);
  };

  const handleSetAllSystemPrompts = (value: ISystemMessage[]) => {
    setAllSystemPrompts(value);
  };

  const handleSetAllExamples = (value: IPromptExample[]) => {
    setAllExamples(value);
  };

  return (
    <AppProvider
      value={{
        systemPrompt,
        examples,
        chatParameters,
        isChatWindowExpanded,
        _allSystemPrompts: allSystemPrompts,
        _allExamples: allExamples,
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
