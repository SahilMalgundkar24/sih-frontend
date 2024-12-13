import React from "react";
import Link from "next/link";
import { UserButton, UserProfile } from "@clerk/nextjs";
import Navbar from "./components/Navbar";
import StatusCard from "./components/StatusCard";

const page = () => {
  const cards = [
    {
      title: "Cut-offs and Interview Marks",
      lastUpdated: "29 Nov, 2024 16:00 hrs.",
      content:
        "Discipline-wise Cut-offs and Interview Marks and can be viewed through Candidate Login.",
    },
    {
      title: "Technical Screening Status",
      lastUpdated: "26 Nov, 2024 17:02 hrs.",
      content: (
        <div className="space-y-4">
          <p>
            Please note that the results for Technical Screening for all Items
            (Item No. 2, 25, 40, 41 & 42) under Computer Science & Engineering
            discipline vide Advt. No. 147 have been updated and are available
            upon candidate's login at RAC website.
          </p>
          <p>
            It is also informed that interview schedule of Final Personal
            Interview for all Items under Computer Science & Engineering
            discipline vide Advt. No. 147 will be updated upon candidates' login
            at RAC website in due course. All concerned candidates are advised
            to remain prepared for aforesaid interview at short notice.
          </p>
          <p className="text-sm text-gray-600">Published on : 26 Nov, 2024</p>
        </div>
      ),
    },
    {
      title: "Recommendation status",
      lastUpdated: "29 Oct, 2024 18:46 hrs.",
      content:
        "Recommendations for Selection for Vacancies in Electronics & Communication Engg. (Item No. 1), Mechanical Engg (Item no. 2),Computer Science & Engg (Item no. 3) , Electrical Engg. (Item No. 4),Material Science & Engg (Item no. 5), Physics (Item No. 06), Chemistry (Item No. 7), Chemical Engg (Item No. 8), Aeronautical Engg. (Item No. 9), Mathematics (Item No. 10), Civil Engg. (Item No. 11), Geology & Geophysics (Item No. 13) and Petroleum Engg. (Item No. 14), Production & Industrial Engg (Item no. 15).",
    },
    {
      title: "Interview Letters",
      lastUpdated: "8 Oct, 2024 17:04 hrs.",
      content: "Content for Interview Letters",
    },
    {
      title: "Interview Calender",
      lastUpdated: "26 Sep, 2024 17:20 hrs.",
      content: "Content for Interview Calender",
    },
  ];
  return (
    <>
      <div className="px-3">
        <div className="hidden w-full h-auto py-2 lg:flex items-center justify-between">
          <div className="flex justify-start items-center lg:mb-0 mb-5">
            <div className="">
              <img
                className="w-[100%] lg:w-[70%]"
                src="/images/drdologo1.png"
              />
            </div>
            <div>
              <img className="w-[80%]" src="/images/drdologo2.png" />
            </div>
          </div>
          <div>
            <img className="w-[25%]" src="/images/satyamev.png" />
          </div>

          <div className="flex flex-col gap-3">
            <UserButton showName />
            <img className="h-[50px] w-[80%]" src="/images/flag.png" />
          </div>
        </div>
        <div className="py-5 w-full items-center flex flex-col lg:hidden">
          <div className="flex w-full justify-between">
            <img className="w-[20%]" src="/images/drdologo1.png" />
            <img className="w-[50%]" src="/images/drdologo2.png" />
            <img className="w-[15%]" src="/images/satyamev.png" />
          </div>
          <div className="mt-7 flex justify-end w-full">
            <UserButton showName />
          </div>
        </div>
        <Navbar />

        <div className="w-full py-5 block lg:flex justify-between gap-3">
          <div className="mb-3 lg:mb-0 w-full lg:w-1/3 flex flex-col gap-3">
            <div className="w-full bg-blue-100 p-3 rounded-lg">
              <h1 className="text-xl font-semibold mb-2">Scientist 'B'</h1>
              <p className="mb-2">
                This is the entry-level position for fresh graduates in
                engineering or science disciplines. It offers opportunities to
                work on cutting-edge research and development projects in
                various fields like electronics, computer science, mechanical
                engineering, and more.
              </p>
              <Link href="/forms">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg mt-7">
                  Apply
                </button>
              </Link>
            </div>

            <div className="w-full bg-blue-100 p-3 rounded-lg">
              <h1 className="text-xl font-semibold mb-2">Scientist 'C'</h1>
              <p className="mb-2">
                This position is typically recruited for experienced
                professionals with a few years of relevant experience. It
                involves more responsibility and leadership roles in research
                and development projects.
              </p>
              <Link href="/forms">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg mt-7">
                  Apply
                </button>
              </Link>
            </div>
          </div>
          <div className="mb-3 lg:mb-0 w-full lg:w-1/3 flex flex-col gap-3">
            <div className="w-full bg-blue-100 p-3 rounded-lg">
              <h1 className="text-xl font-semibold mb-2">Engineer 'B'</h1>
              <p className="mb-2">
                This position is specifically for engineers who want to work in
                the design and development of defense equipment and systems. It
                requires strong engineering skills and knowledge of relevant
                technologies.
              </p>
              <Link href="/forms">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg mt-7">
                  Apply
                </button>
              </Link>
            </div>
            <div className="w-full bg-blue-100 p-3 rounded-lg">
              <h1 className="text-xl font-semibold mb-2">
                Junior Research Fellow (JRF)
              </h1>
              <p className="mb-2">
                This is a research position for postgraduate students or fresh
                PhDs who want to pursue research in a specific area related to
                defense and security. It offers opportunities to work with
                experienced scientists.
              </p>
              <Link href="/forms">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg mt-7">
                  Apply
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/3 flex flex-col gap-3">
            <h1 className="mt-7 lg:mt-0 text-3xl font-semibold poppins">
              Public Notices
            </h1>
            {cards.map((card, index) => (
              <StatusCard
                key={index}
                title={card.title}
                lastUpdated={card.lastUpdated}
                content={card.content}
              />
            ))}
          </div>
        </div>
        <div className="mb-7 flex justify-around">
          <Link href="/classify">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg mt-7">
              Classify
            </button>
          </Link>

          <Link href="/verify">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg mt-7">
              Verify
            </button>
          </Link>

          <Link href="/ocr">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg mt-7">
              OCR
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default page;
