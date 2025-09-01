// src/components/Results.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faFileAlt, faChartBar, faRocket } from '@fortawesome/free-solid-svg-icons';

const Results = ({ data }) => (
  <div className="results-section p-6 pt-13">
    <h2 className="text-3xl font-bold  mb-6 flex items-center gap-2">
      <FontAwesomeIcon className='text-yellow-500 animate-pulse text-4xl' icon={faLightbulb} /> Analysis Results
    </h2>



    
    {/* Extracted Text */}
    <div className="card bg-base-100 shadow-xl mb-6">
      <div className="card-body">
        <h3 className="card-title flex font-serif items-center gap-2 text-2xl">
          <FontAwesomeIcon className='text-blue-400' icon={faFileAlt} /> Extracted Text
        </h3>
        <div className="extracted-text text-lg font-mono p-3 bg-base-200 rounded-md max-h-60 overflow-y-auto">
          {data.extracted_text}
        </div>
      </div>
    </div>

    {/* Content Analysis & Recommendations Side by Side */}
    <div className="grid md:grid-cols-2 gap-6">
      {/* Content Analysis */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title flex items-center gap-2 text-2xl font-serif">
            <FontAwesomeIcon className='text-green-300 ' icon={faChartBar} /> Content Analysis
          </h3>
          <div
            className="analysis-content text-lg font-mono p-3 bg-base-200 rounded-md max-h-60 overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: data.analysis }}
          />
        </div>
      </div>

      {/* Recommendations */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title flex items-center gap-2 text-2xl font-serif">
            <FontAwesomeIcon className='text-pink-400' icon={faRocket} /> Recommendations
          </h3>
          <div
            className="recommendations text-lg font-mono p-3 bg-base-200 rounded-md max-h-60 overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: data.recommendations }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default Results;
