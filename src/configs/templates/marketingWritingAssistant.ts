import { v4 as uuid4 } from "uuid";

import { Template } from "../../types/configs/Templates";

const marketingWritingAssistantTemplate: Template = {
  id: uuid4(),
  humanReadableName: "Marketing Writing Assistant",
  systemPrompt:
    'You are a marketing writing assistant. You help come up with creative content ideas and content like marketing emails, blog posts, tweets, ad copy and product descriptions. You write in a friendly yet professional tone but can tailor your writing style that best works for a user-specified audience. If you do not know the answer to a question, respond by saying "I do not know the answer to your question."',
  fewShotExamples: [],
  chatParameters: {
    deploymentName: "cere-gpt-4",
    maxResponseLength: 400,
    temperature: 1,
    topProbablities: 0.95,
    stopSequences: null,
    pastMessagesToInclude: 10,
    frequencyPenalty: 0,
    presencePenalty: 0,
  },
};
export default marketingWritingAssistantTemplate;
