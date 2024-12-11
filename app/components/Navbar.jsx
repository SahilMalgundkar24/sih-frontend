"use client";

import React, { useState } from "react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const DropdownItem = ({ label, items, isOpen, onClick, isMobile }) => {
  return (
    <li className={`relative ${isMobile ? "w-full" : ""}`}>
      <button
        onClick={onClick}
        className={`flex items-center ${
          isMobile ? "w-full py-2" : ""
        } hover:text-gray-300`}
      >
        {label}
        <ChevronDownIcon
          className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <ul
          className={`
          ${
            isMobile
              ? "relative w-full bg-[#2a1f1f] pl-4"
              : "absolute left-0 mt-2 w-48 bg-[#1B1212] rounded-md shadow-lg z-10"
          }
        `}
        >
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDropdownClick = (label) => {
    if (openDropdown === label) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(label);
    }
  };

  const navItems = [
    { label: "Home", type: "link" },
    {
      label: "About RAC",
      type: "dropdown",
      items: ["Management", "Chairman", "Director", "Our Approach"],
    },
    {
      label: "Programmes",
      type: "dropdown",
      items: ["Recruitment", "Assessment", "Selection for PG"],
    },
    {
      label: "Career Opportunity",
      type: "dropdown",
      items: ["Lateral Entry", "Direct Recruitment"],
    },
    { label: "DRDS", type: "link" },
    { label: "FAQs", type: "link" },
    { label: "गृहपृष्ठा", type: "link" },
  ];

  return (
    <div className="w-full h-auto py-2 bg-[#1B1212] rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-7 text-white list-none text-sm poppins">
            {navItems.map((item, index) =>
              item.type === "link" ? (
                <li key={index} className="cursor-pointer hover:text-gray-300">
                  {item.label}
                </li>
              ) : (
                <DropdownItem
                  key={index}
                  label={item.label}
                  items={item.items}
                  isOpen={openDropdown === item.label}
                  onClick={() => handleDropdownClick(item.label)}
                />
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Right Side Items */}
          <div className="flex gap-3 poppins text-sm items-center">
            <div className="hidden sm:flex gap-3">
              <div className="bg-[#ffc107] rounded-md px-5 py-3 text-xs flex items-center cursor-pointer whitespace-nowrap">
                Caution / चेतावनी
              </div>

              <div className="border-gray-400 border-2 text-white rounded-md px-5 py-2 text-xs flex items-center cursor-pointer whitespace-nowrap">
                DRDO Website
              </div>
            </div>

            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                className="bg-[#1B1212] border-gray-400 border-2 text-white rounded-md px-5 py-2 text-xs pr-8 w-full sm:w-auto"
              />
              <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4">
            <ul className="flex flex-col text-white space-y-2">
              {navItems.map((item, index) =>
                item.type === "link" ? (
                  <li
                    key={index}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-700"
                  >
                    {item.label}
                  </li>
                ) : (
                  <DropdownItem
                    key={index}
                    label={item.label}
                    items={item.items}
                    isOpen={openDropdown === item.label}
                    onClick={() => handleDropdownClick(item.label)}
                    isMobile={true}
                  />
                )
              )}
              <li className="px-4 py-2">
                <div className="flex flex-col space-y-2 sm:hidden">
                  <div className="bg-[#ffc107] rounded-md px-5 py-3 text-xs flex items-center cursor-pointer">
                    Caution / चेतावनी
                  </div>
                  <div className="border-gray-400 border-2 text-white rounded-md px-5 py-2 text-xs flex items-center cursor-pointer">
                    DRDO Website
                  </div>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
