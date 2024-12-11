"use client";

import { UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import { HomeIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// Mock data for recent applicants
const recentApplicants = [
  {
    id: 1,
    name: "Sahil Malgundkar",
    status: "Success",
    email: "sahilmalgundkar321@gmail.com",
    phone: "9999999999",
  },
  {
    id: 2,
    name: "Sahil Malgundkar",
    status: "Success",
    email: "sahilmalgundkar321@gmail.com",
    phone: "9999999999",
  },
  {
    id: 3,
    name: "Sahil Malgundkar",
    status: "Success",
    email: "sahilmalgundkar321@gmail.com",
    phone: "9999999999",
  },
];

// Mock data for all candidates
const allCandidates = [
  ...recentApplicants,
  {
    id: 4,
    name: "John Doe",
    status: "Pending",
    email: "johndoe@example.com",
    phone: "1234567890",
  },
  {
    id: 5,
    name: "Jane Smith",
    status: "Rejected",
    email: "janesmith@example.com",
    phone: "0987654321",
  },
];

const DashboardContent = () => (
  <>
    <div className="flex justify-between items-start mb-10">
      <div>
        <h1 className="text-3xl font-medium mb-1">Welcome, Admin</h1>
        <p className="font-light text-[#878787]">
          Monitor verification progress and analysis of Form 1
        </p>
      </div>
      <UserButton showName />
    </div>

    {/* Stats Cards */}
    <div className="flex gap-x-5 justify-between mb-8">
      <div className="bg-[#6E62E5] w-1/3 rounded-lg p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium mb-2">Total Applications</h3>
            <p className="text-3xl font-bold mb-2">1000</p>
            <p className="text-sm">900 verified | 100 Flagged</p>
          </div>
          <div className="bg-indigo-400 rounded-lg p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#6E62E5] w-1/3 rounded-lg p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium mb-2">Avg. Processing Time</h3>
            <p className="text-3xl font-bold">2.5s</p>
          </div>
          <div className="bg-indigo-400 rounded-lg p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#6E62E5] w-1/3 rounded-lg p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium mb-2">Avg. Processing Time</h3>
            <p className="text-3xl font-bold">2.5s</p>
          </div>
          <div className="bg-indigo-400 rounded-lg p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div className="w-full h-48 rounded-xl flex justify-center items-center border-2 border-[#DEDEDE] my-7">
      <h1 className="text-4xl">POWER BI</h1>
    </div>

    <div className=" rounded-lg">
      <h2 className="text-2xl font-medium mb-6">Recent Applicants</h2>
      <div className="space-y-4">
        <div className="flex justify-between text-left text-[#C0C0C0] text-sm font-medium">
          <div className="w-1/4">Name</div>
          <div className="w-[15%]">Status</div>
          <div className="w-[30%]">Email</div>
          <div className="w-[30%]">Phone</div>
        </div>

        {recentApplicants.map((applicant) => (
          <div
            key={applicant.id}
            className="flex items-center py-4 border-b border-gray-200 text-sm"
          >
            <div className="w-1/4">{applicant.name}</div>
            <div className="w-[15%]">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {applicant.status}
              </span>
            </div>
            <div className="w-[30%]">{applicant.email}</div>
            <div className="w-[30%]">{applicant.phone}</div>
          </div>
        ))}
      </div>
    </div>
  </>
);

const AppliedCandidatesContent = () => (
  <>
    <div className="flex justify-between items-start mb-10">
      <div>
        <h1 className="text-3xl font-medium mb-1">Applied Candidates</h1>
        <p className="font-light text-[#878787]">
          View and manage all applied candidates
        </p>
      </div>
      <UserButton showName />
    </div>

    <div className="rounded-lg">
      <h2 className="text-2xl font-medium mb-6">All Candidates</h2>
      <div className="space-y-4">
        <div className="flex justify-between text-left text-[#C0C0C0] text-sm font-medium">
          <div className="w-1/4">Name</div>
          <div className="w-[15%]">Status</div>
          <div className="w-[30%]">Email</div>
          <div className="w-[30%]">Phone</div>
        </div>

        {allCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="flex items-center py-4 border-b border-gray-200 text-sm"
          >
            <div className="w-1/4">{candidate.name}</div>
            <div className="w-[15%]">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  candidate.status === "Success"
                    ? "bg-green-100 text-green-800"
                    : candidate.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {candidate.status}
              </span>
            </div>
            <div className="w-[30%]">{candidate.email}</div>
            <div className="w-[30%]">{candidate.phone}</div>
          </div>
        ))}
      </div>
    </div>
  </>
);

const Page = () => {
  const [activeNav, setActiveNav] = useState("dashboard");

  return (
    <div className="flex w-full poppins py-6">
      {/* Left Sidebar */}
      <div className="w-1/5 border-r">
        <div className="px-6">
          <h1 className="text-xl font-semibold mb-8">Verisure</h1>

          <nav className="space-y-2">
            <Link
              href="#"
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
                activeNav === "dashboard"
                  ? "bg-[#6E62E5] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveNav("dashboard")}
            >
              <HomeIcon className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="#"
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
                activeNav === "applied"
                  ? "bg-[#6E62E5] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveNav("applied")}
            >
              <UserGroupIcon className="h-5 w-5" />
              <span>Applied Candidates</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-4/5">
        <div className="px-6">
          {activeNav === "dashboard" ? (
            <DashboardContent />
          ) : (
            <AppliedCandidatesContent />
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-1/5 border-l px-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Generate Report
          </button>
          <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Feedback
          </button>
          <button className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
            Create new form
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
