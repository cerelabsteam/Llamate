interface SetupJsonExample {
  userInput: string;
  chatbotResponse: string;
}

type SetupJson = {
  systemPrompt: string;
  fewShotExamples: SetupJsonExample[];
};

export type { SetupJson };
