import React, { useRef, useState } from "react";

import { IPromptExample } from "@types";

import IconButton from "./buttons/IconButton";
import SMTextGroup from "./inputs/SMTextGroup";

const SMForm: React.FC<{
  isEditable: boolean;
  prevData?: Partial<IPromptExample>;
  handleSubmit?: (user: string, assistant: string) => void;
  handleCancel?: () => void;
}> = ({ isEditable, prevData, handleSubmit, handleCancel }) => {
  const [userError, setUserError] = useState<string | null>(null);
  const [assistantError, setAssistantError] = useState<string | null>(null);

  const userRef = useRef<HTMLTextAreaElement>(null);
  const assistantRef = useRef<HTMLTextAreaElement>(null);

  const resetForm = () => {
    if (isEditable) {
      if (userRef.current) userRef.current.value = "";
      if (assistantRef.current) assistantRef.current.value = "";
      setUserError(null);
      setAssistantError(null);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e?.preventDefault();
    const userValue = userRef.current?.value;
    const assistantValue = assistantRef.current?.value;

    // Basic validation
    if (!userValue) {
      setUserError("User text cannot be empty");
      return;
    } else {
      setUserError(null);
    }

    if (!assistantValue) {
      setAssistantError("Assistant text cannot be empty");
      return;
    } else {
      setAssistantError(null);
    }

    // Proceed with form submission
    if (isEditable && handleSubmit) {
      handleSubmit(userValue, assistantValue);
    }
  };

  return (
    <form className="flex flex-col gap-2 relative ">
      {isEditable && (
        <IconButton
          onClick={resetForm}
          iconUrl={"/assets/delete.png"}
          iconSize={15}
          classes="absolute top-0 right-0"
        />
      )}
      <SMTextGroup
        disabled={!isEditable}
        errorText={userError}
        labelText="User:"
        textRef={userRef}
        textValue={prevData?.user}
      />
      <SMTextGroup
        disabled={!isEditable}
        errorText={assistantError}
        labelText="Assistant:"
        textRef={assistantRef}
        textValue={prevData?.assistant}
      />

      {isEditable && (
        <div className="w-full flex gap-4">
          <IconButton
            iconSize={15}
            iconUrl="/assets/plus.png"
            text="Add"
            onClick={handleFormSubmit}
            type="submit"
          />
          <IconButton
            iconSize={15}
            iconUrl="/assets/cancel.png"
            text="Cancel"
            onClick={handleCancel!}
          />
        </div>
      )}
    </form>
  );
};

export default SMForm;
