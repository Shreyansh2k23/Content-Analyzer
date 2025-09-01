// src/components/FileInfo.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faTimes } from '@fortawesome/free-solid-svg-icons';

const FileInfo = ({ file, onRemove }) => (
  <div className="card bg-base-100 shadow-md rounded-lg p-4 flex items-center justify-between w-full max-w-md">
    <div className="flex items-center gap-3">
      <FontAwesomeIcon icon={faFile} className="text-primary text-xl" />
      <span className="font-medium text-gray-700 truncate">{file.name}</span>
    </div>
    <button 
      className="btn btn-sm btn-error text-white"
      onClick={onRemove}
    >
      <FontAwesomeIcon icon={faTimes} />
    </button>
  </div>
);

export default FileInfo;
