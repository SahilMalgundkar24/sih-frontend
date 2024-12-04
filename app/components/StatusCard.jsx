"use client";
import React, { useState } from "react";

const StatusCard = ({ title, lastUpdated, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <div
        className="bg-[#FFF3D4] rounded-lg shadow-sm cursor-pointer transition-colors hover:bg-[#FFE9B8]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="p-4 items-center justify-between">
          <div className="flex justify-between items-center gap-2 mb-3">
            <span className="text-[#8B6F3D] text-lg font-medium">{title}</span>
            <button className="w-6 h-6 rounded-full border border-[#8B6F3D] flex items-center justify-center text-[#8B6F3D]">
              i
            </button>
          </div>
          <div className="flex items-center">
            <div className="text-sm text-[#666]">
              Last updated on :{" "}
              <span className="bg-[#90EE90] px-2 py-0.5 rounded">
                {lastUpdated}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="p-4 border-t border-[#E6D5A7] text-sm bg-gray-100">
            {content}
          </div>
          <div className="bg-gray-200 rounded-b-lg w-full p-3">
            <div className="text-sm text-[#666]">
              Last updated on : {lastUpdated}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
