"use client";

import Navbar from "@/app/components/Navbar";
import axios from "axios";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const classNames = [
  { name: "Aadhar", style: "bg-red-300" },
  { name: "Pan", style: "bg-blue-300" },
  { name: "Gate Score Card", style: "bg-gray-600" },
  { name: "Caste Certificate", style: "bg-yellow-300" },
  { name: "Income Certificate", style: "bg-green-300" },
  { name: "Fail", style: "bg-black/10" },
];

const Page = () => {
  const [files, setFiles] = useState([]);
  const [classificationResults, setClassificationResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  const getClassStyle = (className) => {
    const classObj = classNames.find((c) => c.name === className);
    return classObj ? classObj.style : "bg-gray-200";
  };

  const uploadFiles = async () => {
    if (!files.length) return alert("No files selected!");
    setLoading(true);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/validate/bulk/`,
        formData
      );

      setClassificationResults(response.data.results);
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 w-full">
      {/* Navbar */}
      <div className="mb-7">
        <Navbar />
      </div>

      {/* Drag-and-Drop Area */}
      {!classificationResults && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center transition-all duration-200 ${isDragActive ? "bg-gray-100" : "bg-white"
            }`}
        >
          <input {...getInputProps()} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-16 h-16 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          <p className="mt-4 text-gray-600">
            Drag and drop some files here, or click to select files
          </p>
        </div>
      )}

      {/* Selected Files Preview */}
      {files.length > 0 && (
        <div className="mt-5">
          <h4 className="text-xl font-semibold mb-3">Files Selected:</h4>
          <ul className="list-disc pl-5">
            {files.map((file, index) => (
              <li key={index} className="text-gray-700">
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload Button */}
      {!classificationResults && (
        <div className="flex justify-center mt-5">
          <button
            onClick={uploadFiles}
            disabled={loading}
            className={`px-6 py-2 font-medium text-white rounded-lg transition-colors duration-200 ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Uploading..." : "Perform OCR"}
          </button>
        </div>
      )}

      {/* Classification Results */}
      {classificationResults && (
        <div className="mt-10">
          <h4 className="text-2xl font-semibold mb-5">Classification Results:</h4>
          <div className="space-y-5">
            {classificationResults.map((result, index) => (
              <div
                key={index}
                className="p-5 bg-gray-100 rounded-lg shadow-md flex flex-col md:flex-row md:justify-between"
              >
                {/* Classification details */}
                <div className="mb-3 md:mb-0 flex-1">
                  <p className="text-lg font-medium">File {index + 1}:</p>
                  <p className="text-sm text-gray-600">{result.fileName}</p>
                  <p className="mt-2 text-gray-800">Extracted Text:</p>
                  <pre className="bg-gray-200 p-3 rounded text-sm text-gray-700">
                    {result.ocr_text}
                  </pre>
                </div>

                {/* File preview */}
                <div className="flex items-center gap-4">
                  <button
                    className={`px-4 py-2 rounded-lg text-white ${getClassStyle(
                      result.class
                    )}`}
                  >
                    {result.class}
                  </button>
                  <div className="w-full md:w-40">
                    {files[index].type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(files[index])}
                    className="w-full h-auto border rounded-md"
                />
                    ) : (
                    <a
                      href={URL.createObjectURL(files[index])}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Document
                    </a>
              )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Page;
