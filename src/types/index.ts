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
