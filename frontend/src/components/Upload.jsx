// src/components/Upload.js
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

const Upload = ({ onFileSelect }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpg', '.jpeg', '.png'],
    },
    multiple: false,
  });

  return (
    <div className="flex justify-center mt-6">
      <div
        {...getRootProps({
          className: `w-full max-w-4xl p-12 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer transition
            ${isDragActive ? 'border-primary bg-base-200' : 'border-base-300 bg-base-100'}`,
        })}
      >
        <input {...getInputProps()} />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'> 
          <div>
            {/* Upload Icon */}
        <div className="flex justify-center text-primary text-5xl mb-4">
          <FontAwesomeIcon icon={faCloudUploadAlt} />
        </div>

        {/* Upload Text */}
        <h3 className="text-lg font-bold text-center">Upload Your Document</h3>
        <p className="text-center text-sm text-base-content/70">
          Drag & drop files here or click to browse
        </p>
        <p className="text-center text-xs mt-1 text-base-content/50">
          Supports PDF and Image files (JPG, PNG)
        </p>

        {/* Selected File */}
        {acceptedFiles.length > 0 && (
          <p className="text-center mt-2 text-success font-medium">
            Selected: {acceptedFiles[0].name}
          </p>
        )}

        {/* Choose File Button */}
        <div className="flex justify-center mt-4">
          <button className="btn btn-primary btn-sm" aria-label="Upload file">
            <FontAwesomeIcon icon={faFolderOpen} className="mr-2" />
            Choose File
          </button>
        </div>
          </div>
          <div>
            {/* Image Preview */}
        {acceptedFiles[0] && acceptedFiles[0].type.startsWith('image/') && (
          <div className="mt-4 flex justify-center">
            <img
              src={URL.createObjectURL(acceptedFiles[0])}
              alt="Preview"
              className="max-h-40 rounded-lg shadow-md"
            />
          </div>
        )}
          </div>

        </div>

        
      </div>
    </div>
  );
};

export default Upload;
