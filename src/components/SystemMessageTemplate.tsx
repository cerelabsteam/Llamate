import { useState } from "react";

import { systemMessages } from "@/config";
import { ISystemMessage } from "@types";

import SMExamples from "./SMExamples";

const SystemMessageTemplate = () => {
  // todo: fix this
  // const [currentPromptId, setCurrentPromptId] = useState<number | null>(
  //   systemMessages.length ? systemMessages[0]["id"] : null
  // );
  const [currentPromptId, setCurrentPromptId] = useState<number | null>(null);

  const handleOptionChange = (currentTemplateId: number) => {
    setCurrentPromptId(currentTemplateId);
  };

  const renderSystemOptions = (systemMessage: ISystemMessage[]) =>
    systemMessage.map((message) => (
      <option value={message.id} key={message.id}>
        {message.option}
      </option>
    ));

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="form-group">
        <p className="font-bold">Use a system message template</p>
        <select
          name="system-message"
          id="system-message"
          className="block w-full border border-solid border-gray-500 outline-none p-1 rounded-sm"
          onChange={(e) => handleOptionChange(+e.target.value)}
        >
          {renderSystemOptions(systemMessages)}
        </select>
      </div>
      <SMExamples promptId={currentPromptId ?? -1} />
    </div>
  );
};

export default SystemMessageTemplate;
