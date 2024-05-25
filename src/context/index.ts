import { createContext } from "react";

import { IAppContext } from "@types";

const initialContextValue: IAppContext = {
  systemPrompt: "",
  examples: [],
  chatParameters: {
    deploymentName: null,
    pastMessagesToInclude: 5,
  },
  isChatWindowExpanded: false,
  _allExamples: [],
  _allSystemPrompts: [],
  setSystemPrompt: () => {},
  setExamples: () => {},
  setDeploymentName: () => {},
  setPastMessagesToInclude: () => {},
  toggleChatWindowExpanded: () => {},
  setAllExamples: () => {},
  setAllSystemPrompts: () => {},
};

const AppContext = createContext<IAppContext>(initialContextValue);
const AppProvider = AppContext.Provider;

export { AppProvider, initialContextValue };
export default AppContext;
