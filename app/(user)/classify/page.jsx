"use client";

import Navbar from "@/app/components/Navbar";
import axios from "axios";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactMarkdown from "react-markdown";


const classNames = [
  { name: "Aadhar", style: "bg-red-300" },
  { name: "Pan", style: "bg-blue-300" },
  { name: "Gate Score Card", style: "bg-yellow-300" },
  { name: "Caste Certificate", style: "bg-aqua-300" },
  { name: "Income Certificate", style: "bg-green-300" },
  { name: "Fail", style: "bg-black/10" },
  { name: "10th", style: "bg-pink-400" },
];

const BulkFileUploader = () => {
  const [time, setTime] = useState(0);
  const [files, setFiles] = useState([]);
  const [classificationResults, setClassificationResults] = useState();
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

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/final/bulk`,
        formData
      );

      setClassificationResults(response.data.results);
      setTime(response.data.processing_time);
    } catch (error) {
      console.log("Error uploading files:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 w-full poppins">
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
      <div className="pt-3 pb-7">
        <Navbar />
      </div>

      {/* Drag-and-Drop Area */}
      {!classificationResults && (
        <div
          {...getRootProps()}
          className={`w-full max-w-5xl mx-auto border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-300 ${
            isDragActive
              ? "bg-gray-100 border-blue-500"
              : "bg-gray-50 border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
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
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            <p className="text-lg text-gray-600">
              Drag and drop files here, or click to select files
            </p>
          </div>
        </div>
      )}

      {/* File Preview */}
      {files.length > 0 && !classificationResults && (
        <div className="mt-5 w-full max-w-5xl mx-auto">
          <h4 className="text-2xl font-semibold mb-3">Files Selected:</h4>
          <ul className="list-disc list-inside">
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
        <div className="mt-5 flex justify-center">
          <button
            onClick={uploadFiles}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-300"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Classify Files"}
          </button>
        </div>
      )}

      {/* Classification Results */}
      {classificationResults && (
        <div className="mt-10 w-full max-w-4xl mx-auto">
          
              {classificationResults && (
                <div className="mt-10">
                  <h4 className="text-2xl font-semibold mb-5">Classification Results: Processing Time {time}</h4>
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
                          <ReactMarkdown className="bg-gray-200 p-3 rounded text-sm text-gray-700">
                            {result.ocr_text}
                          </ReactMarkdown>
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
      )}
    </div>
  );
};

export default BulkFileUploader;
