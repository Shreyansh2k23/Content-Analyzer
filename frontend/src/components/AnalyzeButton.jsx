// src/components/AnalyzeButton.js

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagic } from "@fortawesome/free-solid-svg-icons";

const AnalyzeButton = ({ onAnalyze, disabled }) => (
  <div className="flex justify-center mt-6">
    <button
      onClick={onAnalyze}
      disabled={disabled}
      className={`btn btn-primary gap-2 px-6 ${
        disabled ? "btn-disabled opacity-60 cursor-not-allowed" : ""
      }`}
    >
      <FontAwesomeIcon icon={faMagic} className="text-lg" />
      Analyze Content
    </button>
  </div>
);

export default AnalyzeButton;
