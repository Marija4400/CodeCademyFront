import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import React from "react";

const InfoPopup = ({ type, text, onClose }) => {
  switch (type) {
    case "success":
      return (
        <div className="absolute flex items-center justify-between flex-1 w-1/5 p-4 border border-green-300 rounded-lg bg-opacity-90 right-12 bottom-4">
          <div className="flex">
            <CheckCircleIcon className="mr-4 text-green-400 w-7 h-7" />
            {text}
          </div>

          <div className="flex justify-end" onClick={onClose}>
            <XMarkIcon className="cursor-pointer w-7 h-7" />
          </div>
        </div>
      );
    case "error":
      return (
        <div className="absolute flex items-center flex-1 w-1/5 p-4 border border-red-500 rounded-lg bg-opacity-90 right-12 bottom-4">
          <ExclamationCircleIcon className="mr-4 text-red-500 w-7 h-7" />
          {text}
        </div>
      );
    default:
      return null;
  }
};

export default InfoPopup;
