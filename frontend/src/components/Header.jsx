// src/components/Header.js

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import LetterGlitch from "../animations/LetterGlitch";


const Header = () => (
  <header className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden">
    {/* Fullscreen glitch background */}
    <div className="absolute inset-0 z-0">
      <LetterGlitch
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={false}
        smooth={true}
      />
    </div>

    {/* Foreground text */}
    <div className="relative z-10 text-white px-6">
      <h1 className="text-4xl md:text-6xl font-extrabold px-6">
        <FontAwesomeIcon icon={faChartLine} /> Social Media Content Analyzer
      </h1>
      <div className="mt-5 p-2 border-radius-10 bg-gray-900 rounded-full"><p className=" text-lg md:text-2xl">
        
        Upload documents and get AI-powered social media insights with engagement metrics.
      </p></div>
      
    </div>
  </header>
);

export default Header;
