import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

const IconButton: React.FC<{
  iconUrl: string;
  iconSize: number;
  classes?: string;
  onClick: (e?: any) => void;
  text?: string;
  disabled?: boolean;
  type?: "submit" | "button";
}> = ({
  iconSize,
  iconUrl,
  classes,
  text,
  onClick,
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "flex-center button gap-2 p-1 cursor-pointer border-2 border-solid border-gray-400 hover:border-gray-500 rounded-md",
        clsx(classes, {
          "border-gray-300 cursor-not-allowed hover:border-gray-300": disabled,
          "border-gray-400": !disabled,
        })
      )}
      disabled={disabled}
      type={type}
    >
      <img
        src={iconUrl}
        alt="icon"
        className={`w-full h-full object-contain`}
        style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
      />
      {text && <p className="text-gray-500">{text}</p>}
    </button>
  );
};

export default IconButton;
