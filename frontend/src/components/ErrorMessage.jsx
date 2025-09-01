// src/components/ErrorMessage.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const ErrorMessage = ({ message }) => (
  <div className="alert alert-error shadow-lg mt-4">
    <div>
      <FontAwesomeIcon icon={faExclamationTriangle} className="text-white text-lg" />
      <span className="ml-2">{message}</span>
    </div>
  </div>
);

export default ErrorMessage;
