"use client";

import Navbar from "@/app/components/Navbar";
import axios from "axios";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const classNames = [
  {
    name: "Aadhar",
    style: "bg-red-300",
  },
  {
    name: "Pan",
    style: "bg-blue-300",
  },
  {
    name: "Gate Score Card",
    style: "bg-grey-600",
  },
  {
    name: "Caste Certificate",
    style: "bg-yellow-300",
  },
  {
    name: "Income Certificate",
    style: "bg-green-300",
  },
  {
    name: "Fail",
    style: "bg-black/10",
  },
];

const BulkFileUploader = () => {
  const [files, setFiles] = useState([]);
  const [classificationResults, setClassificationResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles); // Store selected files
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*", // Restrict to image files
    multiple: true, // Allow multiple files
  });

  const getClassStyle = (className) => {
    const classObj = classNames.find((c) => c.name == className);
    return classObj ? classObj.style : "bg-gray-200"; // Fallback style
  };

  const uploadFiles = async () => {
    if (!files.length) return alert("No files selected!");
    setLoading(true);

    // Prepare FormData for backend
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/verify/bulk/`,
        formData
      );

      const results = response.data.results;
      setClassificationResults({ results });
    } catch (error) {
      console.log("Error uploading files:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 w-full">
      <div className="hidden w-full h-auto py-2 lg:flex items-center justify-between">
        <div className="flex justify-start items-center lg:mb-0 mb-5">
          <div className="">
            <img className="w-[100%] lg:w-[70%]" src="/images/drdologo1.png" />
          </div>
          <div>
            <img className="w-[80%]" src="/images/drdologo2.png" />
          </div>
        </div>
        <div>
          <img className="w-[25%]" src="/images/satyamev.png" />
        </div>

        <div className="flex flex-col gap-3">
          <img className="h-[50px] w-[80%]" src="/images/flag.png" />
        </div>
      </div>

      <div className="py-5 w-full items-center flex flex-col lg:hidden">
        <div className="flex w-full justify-between">
          <img className="w-[20%]" src="/images/drdologo1.png" />
          <img className="w-[50%]" src="/images/drdologo2.png" />
          <img className="w-[15%]" src="/images/satyamev.png" />
        </div>
      </div>
      <div className="mb-7">
        <Navbar />
      </div>
      {/* Drag-and-Drop Area */}

      {!classificationResults && (
        <div
          {...getRootProps()}
          style={{
            border: "2px dashed #ccc",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            backgroundColor: isDragActive ? "#f0f0f0" : "#fafafa",
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <div className="w-full flex flex-col items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>

              <p>Drag and drop some files here, or click to select files</p>
            </div>
          )}
        </div>
      )}

      {/* File Preview */}
      {files.length > 0 && (
        <div style={{ marginTop: "20px" }} className="w-full">
          <h4 className="text-2xl mb-3 font-semibold">Files Selected:</h4>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload Button */}
      <div className="w-full flex items-center justify-center gap-24">
        {!classificationResults && (
          <button
            onClick={uploadFiles}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            className="w-60 m-auto text-center mb-7"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Classify Files"}
          </button>
        )}
        {classificationResults && (
          <div className="w-full flex items-center justify-center">
            <input type="file" multiple />
          </div>
        )}
      </div>

      {/* Classification Results */}
      {classificationResults && (
        <div style={{ marginTop: "20px" }}>
          <h4 className="text-2xl mb-3 font-semibold">
            Classification Results:
          </h4>
          <ul>
            {classificationResults.results.map((result, index) => (
              <li key={index} className="flex justify-between w-2/3 m-auto">
                File {index + 1}: {result.class} (Confidence:{" "}
                {result.confidence_score})
                <button
                  type="button"
                  className={`p-2 rounded ${getClassStyle(result.class)}`}
                >
                  {result.class}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BulkFileUploader;
