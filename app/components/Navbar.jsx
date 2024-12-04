"use client";
import React, { useState } from "react";

const DropdownItem = ({ label, items, isOpen, onClick }) => {
  return (
    <li className="relative">
      <button onClick={onClick} className="flex items-center">
        {label}
        <svg
          className={`w-2.5 h-2.5 ml-2.5 transform ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-[#1B1212] rounded-md shadow-lg z-10">
          {items.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownClick = (label) => {
    if (openDropdown === label) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(label);
    }
  };

  return (
    <>
      <div className="w-full h-auto py-2 flex justify-between items-center bg-[#1B1212] rounded-lg">
        <div className="flex gap-7 text-white list-none text-sm px-5 poppins">
          <li className="cursor-pointer">Home</li>
          <DropdownItem
            label="About RAC"
            items={["Management", "Chairman", "Director", "Our Approach"]}
            isOpen={openDropdown === "About RAC"}
            onClick={() => handleDropdownClick("About RAC")}
          />
          <DropdownItem
            label="Programmes"
            items={["Recruitment", "Assessment", "Selection for PG"]}
            isOpen={openDropdown === "Programmes"}
            onClick={() => handleDropdownClick("Programmes")}
          />
          <DropdownItem
            label="Career Opportunity"
            items={["Lateral Entry", "Direct Recruitment"]}
            isOpen={openDropdown === "Career Opportunity"}
            onClick={() => handleDropdownClick("Career Opportunity")}
          />
          <li className="cursor-pointer">DRDS</li>
          <li className="cursor-pointer">FAQs</li>
          <li className="cursor-pointer">गृहपृष्ठा</li>
        </div>

        <div className="flex gap-3 poppins px-5 text-sm items-center">
          <div className="bg-[#ffc107] rounded-md px-5 py-3 text-xs flex items-center cursor-pointer">
            Caution / चेतावनी
          </div>

          <div className="border-gray-400 border-2 text-white rounded-md px-5 py-2 text-xs flex items-center cursor-pointer">
            DRDO Website
          </div>

          <div className="relative">
            <input
              type="search"
              placeholder="Search..."
              className="bg-[#1B1212] border-gray-400 border-2 text-white rounded-md px-5 py-2 text-xs pr-8"
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
