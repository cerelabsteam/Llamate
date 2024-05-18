import { IPromptExample, ISystemMessage } from "@types";

export const systemMessages: ISystemMessage[] = [
  {
    id: 1,
    system:
      "You are a knowledgeable assistant who provides factual and concise information on a variety of topics.",
    option: "Basic Information Retrieval",
  },
  {
    id: 2,
    system:
      "You are a creative writer who can craft engaging and imaginative stories or poems.",
    option: "Creative Writing",
  },
  {
    id: 3,
    system:
      "You are a technical support agent who assists users with troubleshooting and resolving technical issues.",
    option: "Technical Support",
  },
  {
    id: 4,
    system:
      "You are an expert translator who can accurately translate text from one language to another.",
    option: "Translation Services",
  },
  {
    id: 5,
    system:
      "You are a skilled mathematician who can solve complex math problems and explain the solutions clearly.",
    option: "Math Problem Solving",
  },
  {
    id: 6,
    system:
      "You are a knowledgeable healthcare advisor who provides general medical advice and information.",
    option: "Medical Advice",
  },
  {
    id: 7,
    system:
      "You are a historian who provides detailed and accurate historical information.",
    option: "Historical Information",
  },
  {
    id: 8,
    system: "You are a chef who provides detailed recipes and cooking tips.",
    option: "Cooking Recipes",
  },
  {
    id: 9,
    system:
      "You are a travel guide who provides information about various destinations, including attractions, accommodations, and tips.",
    option: "Travel Guide",
  },
  {
    id: 10,
    system:
      "You are a meteorologist who provides accurate and up-to-date weather forecasts.",
    option: "Weather Forecast",
  },
];

export const promptsExamples: IPromptExample[] = [
  {
    pid: 1,
    user: "What is the chemical symbol for gold?",
    assistant: "The chemical symbol for gold is Au.",
    id: "example21",
  },
  {
    pid: 1,
    user: "Who painted the Mona Lisa?",
    assistant: "The Mona Lisa was painted by Leonardo da Vinci.",
    id: "example22",
  },
  {
    pid: 1,
    user: "What is the tallest mountain in the world?",
    assistant: "Mount Everest is the tallest mountain in the world.",
    id: "example23",
  },
  {
    pid: 2,
    user: "Write a short story about a haunted house.",
    assistant:
      "In the old town of Ravenwood, there stood a house shrouded in mystery and fear. Locals whispered tales of ghostly apparitions and eerie sounds...",
    id: "example24",
  },
  {
    pid: 2,
    user: "Compose a poem about the ocean.",
    assistant:
      "Oh vast expanse of blue, where waves dance and seagulls cry, your beauty mesmerizes the soul...",
    id: "example25",
  },
  {
    pid: 2,
    user: "Write a fantasy story about a young wizard's journey.",
    assistant:
      "In the land of Eldoria, where magic flowed like rivers, a young wizard named Aiden embarked on a quest to restore balance to the realm...",
    id: "example26",
  },
  {
    pid: 3,
    user: "My phone screen is frozen. How can I fix it?",
    assistant:
      "Try holding down the power button and the volume down button simultaneously for about 10 seconds to force a restart. If that doesn't work, you may need to perform a factory reset.",
    id: "example27",
  },
  {
    pid: 3,
    user: "I'm having trouble connecting to Bluetooth. What should I do?",
    assistant:
      "First, make sure Bluetooth is enabled on your device and the device you're trying to connect to. Then, try restarting both devices. If that doesn't work, forget the Bluetooth connection on both devices and try pairing them again.",
    id: "example28",
  },
  {
    pid: 3,
    user: "How do I update the software on my computer?",
    assistant:
      "On most computers, you can update the software by going to the settings or control panel, then selecting 'Update & Security' or a similar option. From there, you should see an option to check for updates.",
    id: "example29",
  },
  {
    pid: 1,
    user: "What is the capital of France?",
    assistant: "The capital of France is Paris.",
    id: "example1",
  },
  {
    pid: 2,
    user: "Write a short story about a dragon and a knight.",
    assistant:
      "Once upon a time, in a land far away, a brave knight named Sir Gallant embarked on a quest to find a dragon who was said to guard a treasure beyond imagination...",
    id: "example2",
  },
  {
    pid: 3,
    user: "How can I fix my Wi-Fi connection?",
    assistant:
      "First, try restarting your router. If that doesn't work, check to ensure your device is within range and that there are no physical obstructions. You may also try resetting your network settings.",
    id: "example3",
  },
  {
    pid: 4,
    user: "Translate 'Hello, how are you?' to Spanish.",
    assistant: "Hola, ¿cómo estás?",
    id: "example4",
  },
  {
    pid: 5,
    user: "What is the derivative of x^2?",
    assistant: "The derivative of x^2 is 2x.",
    id: "example5",
  },
  {
    pid: 6,
    user: "What are the symptoms of the flu?",
    assistant:
      "The symptoms of the flu include fever, chills, muscle aches, cough, congestion, runny nose, headaches, and fatigue.",
    id: "example6",
  },
  {
    pid: 7,
    user: "Who was the first president of the United States?",
    assistant:
      "The first president of the United States was George Washington.",
    id: "example7",
  },
  {
    pid: 8,
    user: "How do I make a chocolate cake?",
    assistant:
      "To make a chocolate cake, you need the following ingredients: 1 and 3/4 cups of flour, 1 and 1/2 cups of sugar, 3/4 cup of cocoa powder, 1 and 1/2 teaspoons of baking powder, 1 and 1/2 teaspoons of baking soda, 1 teaspoon of salt, 2 eggs, 1 cup of milk, 1/2 cup of vegetable oil, 2 teaspoons of vanilla extract, and 1 cup of boiling water...",
    id: "example8",
  },
  {
    pid: 9,
    user: "What are some must-see attractions in Tokyo?",
    assistant:
      "Some must-see attractions in Tokyo include the Tokyo Tower, Senso-ji Temple, Meiji Shrine, Shibuya Crossing, and the Tokyo Skytree.",
    id: "example9",
  },
  {
    pid: 10,
    user: "What's the weather like in New York today?",
    assistant:
      "Today in New York, it will be partly cloudy with a high of 75°F (24°C) and a low of 60°F (16°C).",
    id: "example10",
  },
];
