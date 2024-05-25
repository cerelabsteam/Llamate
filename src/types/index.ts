export interface ISystemMessage {
  id: string | number;
  system: string;
  option: string;
}

export interface IPromptExample {
  pid: number | string;
  user: string;
  assistant: string;
  id: string | number;
}

export interface IDeploymentModel {
  id: string | number;
  name: string;
  maxTokens: number;
}

export interface IAppContext {
  systemPrompt: string | null;
  examples: IPromptExample[] | null;
  chatParameters: {
    deploymentName: string | null;
    pastMessagesToInclude: number;
  };
  isChatWindowExpanded: boolean;
  _allExamples: IPromptExample[] | null;
  _allSystemPrompts: ISystemMessage[] | null;
  setSystemPrompt: (value: string) => void;
  setExamples: (value: IPromptExample[]) => void;
  setDeploymentName: (value: string) => void;
  setPastMessagesToInclude: (value: number) => void;
  toggleChatWindowExpanded: () => void;
  setAllExamples: (value: IPromptExample[]) => void;
  setAllSystemPrompts: (value: ISystemMessage[]) => void;
}

export interface IImportExport {
  systemPrompt: string;
  fewShotExamples: { userInput: string; chatbotResponse: string }[];
  chatParameters: {
    deploymentName: string;
    pastMessagesToInclude: number;
  };
}
