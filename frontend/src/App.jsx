// src/App.js
import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import Upload from "./components/Upload";
import FileInfo from "./components/FileInfo";
import AnalyzeButton from "./components/AnalyzeButton";
import Loader from "./components/Loader";
import Results from "./components/Results";
import ErrorMessage from "./components/ErrorMessage";
import ScrollFloat from "./animations/ScrollFloat";
import ElectricBorder from "./animations/ElectricBorder";

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setResults(null);
    setError("");
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);
    setResults(null);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
  `${API_URL}/analyze`,
  formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResults(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div
        data-theme="dark"
        className=" min-h-screen flex flex-col items-center bg-base-200 p-6"
      >
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          Upload Your Document
        </ScrollFloat>
        <span className="text-4xl animate-bounce">&#128012;</span>

        <ElectricBorder
          color="#7df9ff"
          speed={1}
          chaos={0.5}
          thickness={2}
          style={{ borderRadius: 16 }}
        >
          <div className="min-w-[1000px]">
            <p style={{ margin: "6px 0 0", opacity: 0.7, width: "100%" }}>
              <div className="w-full max-w-8xl card bg-base-100 shadow-xl p-6 ">
                <Upload onFileSelect={handleFileSelect} />

                {/* {file && <FileInfo file={file} onRemove={handleRemoveFile} />} */}

                <AnalyzeButton
                  onAnalyze={handleAnalyze}
                  disabled={!file || loading}
                />
              </div>
            </p>
          </div>
        </ElectricBorder>
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {results && <Results data={results} />}
        <footer className="mt-6 text-center text-sm text-gray-500 animate-pulse">
          <p>
            Built with ❤️ by{" "}
            <span className="font-bold text-primary">Shreyansh Gupta</span>
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
