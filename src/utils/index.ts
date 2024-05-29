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

/**
 * Opens a file input dialog and reads the selected JSON file.
 * @param {string} fileTypes - The extension of the file to accept. Examples: ".json"
 * @returns {Promise<unknown|null>} A promise that resolves with the parsed JSON data, or null if no file was selected or if there was an error.
 */
export const takeFileInput = async (
  fileTypes: string[]
): Promise<IImportExport | null> => {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = fileTypes.join(",");

    input.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          try {
            const result = e.target?.result;
            if (result) {
              resolve(JSON.parse(result as string));
            } else {
              resolve(null);
            }
          } catch (err) {
            console.error(err);
            reject(new Error("Invalid JSON file"));
          }
        };
        reader.onerror = (err) => {
          reject(err);
        };
        reader.readAsText(file);
      } else {
        resolve(null);
      }
    };

    input.click();
  });
};

/**
 * Validates the structure of the JSON data.
 * @param {Object} data - The JSON data to validate.
 * @returns {boolean} - Returns true if the structure is valid, otherwise false.
 */
export const validateJsonStructure = (data: any) => {
  if (typeof data !== "object" || data === null) return false;

  const hasSystemPrompt = typeof data.systemPrompt === "string";
  const hasFewShotExamples =
    Array.isArray(data.fewShotExamples) &&
    data.fewShotExamples.every(
      (example: any) =>
        typeof example.userInput === "string" &&
        typeof example.chatbotResponse === "string"
    );
  const hasChatParameters =
    typeof data.chatParameters === "object" &&
    data.chatParameters !== null &&
    typeof data.chatParameters.deploymentName === "string" &&
    typeof data.chatParameters.pastMessagesToInclude === "number";

  return hasSystemPrompt && hasFewShotExamples && hasChatParameters;
};
export { exportToJson, transformToExportFormat };
