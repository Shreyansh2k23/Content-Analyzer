// src/components/Loader.js

import React from "react";

const Loader = () => (
  <div className="flex flex-col items-center justify-center space-y-4 py-8">
    <span className="loading loading-spinner loading-lg text-primary"></span>
    <p className="text-lg font-medium text-gray-600">Analyzing your content...</p>
  </div>
);

export default Loader;
