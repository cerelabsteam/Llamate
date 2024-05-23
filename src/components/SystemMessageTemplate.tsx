import { useContext, useRef, useState } from "react";

import AppContext from "@context";
import { ISystemMessage } from "@types";

import SMTextGroup from "./inputs/SMTextGroup";
import SMExamples from "./SMExamples";

const EMPTY_TEMPLATE_VALUE = "empty-sm";

const SystemMessageTemplate = () => {
  const appData = useContext(AppContext);
  const { _allSystemPrompts } = appData;

  const [currentPromptId, setCurrentPromptId] = useState<
    number | string | null
  >(_allSystemPrompts?.length ? _allSystemPrompts![0]?.id : null);

  const [systemErrorText] = useState<string | null>(null);

  const systemInputRef = useRef<HTMLTextAreaElement>(null);

  // set system message on initial load
  if (!appData.systemPrompt) {
    if (_allSystemPrompts?.length) {
      appData.setSystemPrompt(_allSystemPrompts![0].system);
    }
  }

  const handleOptionChange = (currentTemplateId: number | string) => {
    if (currentTemplateId === EMPTY_TEMPLATE_VALUE) {
      if (systemInputRef.current) {
        systemInputRef.current.value = "";
      }
    }
    const existingSystemMessage = _allSystemPrompts?.find(
      (sm) => sm.id === +currentTemplateId
    );

    if (existingSystemMessage) {
      if (systemInputRef.current) {
        systemInputRef.current.value = existingSystemMessage.system;
      }
      appData.setSystemPrompt(existingSystemMessage.system);
    }

    // set examples to empty array
    appData.setExamples([]);
    setCurrentPromptId(currentTemplateId);
  };

  const renderSystemOptions = (systemMessage: ISystemMessage[] | null) => {
    if (systemMessage?.length) {
      // setCurrentPromptId(systemMessage[0].id);
      setTimeout(() => {
        if (systemInputRef.current) {
          systemInputRef.current.value = systemMessage[0].system;
        }
      }, 200);
    }

    return systemMessage?.map((message) => (
      <option value={message.id} key={message.id}>
        {message.option}
      </option>
    ));
  };

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
          {renderSystemOptions(_allSystemPrompts)}
          <option value={EMPTY_TEMPLATE_VALUE}>Empty template</option>
        </select>
      </div>
      <SMTextGroup
        disabled={false}
        errorText={systemErrorText}
        labelText="System"
        textRef={systemInputRef}
        minRows={4}
      />
      {currentPromptId !== EMPTY_TEMPLATE_VALUE ? (
        <SMExamples promptId={currentPromptId ?? -1} />
      ) : null}
    </div>
  );
};

export default SystemMessageTemplate;
