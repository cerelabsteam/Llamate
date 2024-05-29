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

export interface IImportData {
  chatParameters: {
    deploymentName: string;
    pastMessagesToInclude: number;
  };
  examples: IPromptExample[];
  systemPrompt: string;
}

export interface IAppContext {
  templateId: number | string | null;

  systemPrompt: string | null;
  examples: IPromptExample[] | null;
  chatParameters: {
    deploymentName: string | null;
    pastMessagesToInclude: number;
  };
  isChatWindowExpanded: boolean;
  _allExamples: IPromptExample[] | null;
  _allSystemPrompts: ISystemMessage[] | null;
  deployments: IDeploymentModel[] | null;
  deploymentId: string | null | number;
  isImported: boolean;
  importData: IImportData | null;
  setImportData: (value: IImportData) => void;
  setIsImported: (value: boolean) => void;
  setDeploymentId: (value: string | number) => void;
  setDeployments: (value: IDeploymentModel[]) => void;
  setSystemPrompt: (value: string) => void;
  setExamples: (value: IPromptExample[]) => void;
  setDeploymentName: (value: string) => void;
  setPastMessagesToInclude: (value: number) => void;
  toggleChatWindowExpanded: () => void;
  setAllExamples: (value: IPromptExample[]) => void;
  setAllSystemPrompts: (value: ISystemMessage[]) => void;
  setTemplateId: (value: string | null | number) => void;
}

export interface IImportExport {
  systemPrompt: string;
  fewShotExamples: { userInput: string; chatbotResponse: string }[];
  chatParameters: {
    deploymentName: string;
    pastMessagesToInclude: number;
  };
}
