import React from "react";

const SMTextGroup: React.FC<{
  textRef: React.RefObject<HTMLTextAreaElement>;
  disabled: boolean;
  textValue?: string;
  errorText: string | null;
  labelText: string;
  minRows?: number;
}> = ({ textRef, disabled, textValue, errorText, labelText, minRows = 3 }) => {
  return (
    <div className="form-group">
      <label htmlFor={labelText + "__SMText"}>{labelText}</label>
      <textarea
        className="input"
        name={labelText}
        id={labelText + "__SMText"}
        ref={textRef}
        rows={minRows}
        disabled={disabled}
        value={textValue}
      />
      {errorText && <p className="error">{errorText}</p>}
    </div>
  );
};

export default SMTextGroup;
