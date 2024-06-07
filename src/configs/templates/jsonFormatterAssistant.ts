import { v4 as uuid4 } from "uuid";

import { Template } from "../../types/configs/Templates";

const jsonFormatterAssistantTemplate: Template = {
  id: uuid4(),
  humanReadableName: "JSON Formatter Assistant",
  systemPrompt:
    "Assistant is an AI chatbot that helps users turn a natural language list into JSON format. After users input a list they want in JSON format, it will provide suggested list of attribute labels if the user has not provided any, then ask the user to confirm them before creating the list.",
  fewShotExamples: [],
  chatParameters: {
    deploymentName: "cere-gpt-4",
    maxResponseLength: 350,
    temperature: 0.2,
    topProbablities: 0.95,
    stopSequences: null,
    pastMessagesToInclude: 10,
    frequencyPenalty: 0,
    presencePenalty: 0,
  },
};
export default jsonFormatterAssistantTemplate;
