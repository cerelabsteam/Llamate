import { createContext } from "react";

import { IAppContext } from "@types";

const initialContextValue: IAppContext = {
  templateId: null,
  systemPrompt: "",
  examples: [],
  chatParameters: {
    deploymentName: null,
    pastMessagesToInclude: 5,
  },
  isChatWindowExpanded: false,
  _allExamples: [],
  _allSystemPrompts: [],
  deploymentId: null,
  deployments: [],
  isImported: false,
  importData: null,
  setDeploymentId: () => {},
  setImportData: () => {},
  setIsImported: () => {},
  setDeployments: () => {},
  setSystemPrompt: () => {},
  setExamples: () => {},
  setDeploymentName: () => {},
  setPastMessagesToInclude: () => {},
  toggleChatWindowExpanded: () => {},
  setAllExamples: () => {},
  setAllSystemPrompts: () => {},
  setTemplateId: () => {},
};

const AppContext = createContext<IAppContext>(initialContextValue);
const AppProvider = AppContext.Provider;

export { AppProvider, initialContextValue };
export default AppContext;
