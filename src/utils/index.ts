import { ClassValue, clsx } from "clsx";
import { saveAs } from "file-saver";
import { twMerge } from "tailwind-merge";

import { IAppContext, IImportExport } from "@types";

const transformToExportFormat = (contextState: IAppContext): IImportExport => {
  const { systemPrompt, examples, chatParameters } = contextState;

  // Transform the data to match the IImportExport format
  return {
    systemPrompt: systemPrompt ?? "",
    // TODO check the format for examples export format
    fewShotExamples:
      examples?.map((example) => ({
        userInput: example.user,
        chatbotResponse: example.assistant,
      })) ?? [], // Assuming examples are strings
    chatParameters: {
      deploymentName: chatParameters.deploymentName || "",
      pastMessagesToInclude: chatParameters.pastMessagesToInclude,
    },
  };
};

// Function to export the transformed data as a JSON file
const exportToJson = (exportData: object, filename = "ChatSetup") => {
  const jsonBlob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: "application/json",
  });
  saveAs(jsonBlob, `${filename}.json`);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { exportToJson, transformToExportFormat };
