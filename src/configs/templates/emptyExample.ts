import { v4 as uuid4 } from "uuid";

import { Template } from "../../types/configs/Templates";

const emptyExampleTemplate: Template = {
  id: uuid4(),
  humanReadableName: "Empty Example",
  systemPrompt: "",
  fewShotExamples: [],
  chatParameters: {
    deploymentName: "cere-gpt-4",
    maxResponseLength: 800,
    temperature: 0.5,
    topProbablities: 0.95,
    stopSequences: null,
    pastMessagesToInclude: 10,
    frequencyPenalty: 0,
    presencePenalty: 0,
  },
};
export default emptyExampleTemplate;
