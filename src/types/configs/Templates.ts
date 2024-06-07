interface TemplateExample {
  userInput: string;
  chatbotResponse: string;
}
interface Template {
  id: string;
  humanReadableName: string;
  systemPrompt: string;
  fewShotExamples: TemplateExample[];
  chatParameters: {
    deploymentName: string;
    maxResponseLength: number;
    temperature: number;
    topProbablities: number;
    stopSequences: null;
    pastMessagesToInclude: number;
    frequencyPenalty: number;
    presencePenalty: number;
  };
}
type Templates = Template[];
export type { Template, TemplateExample, Templates };
