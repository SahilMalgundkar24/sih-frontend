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
    {
      title: "Shortlisting Status",
      lastUpdated: "12 Sep, 2024 17:30 hrs.",
      content: "Content for Shortlisting Status",
    },
    {
      title: "Public Notice",
      lastUpdated: "",
      content:
        "Requirement of Valid GATE Score for Direct Recruitment of Scientist 'B' in DRDO",
    },
  ];
  return (
    <>
      <div className="px-3">
        <div className="w-full h-auto py-2 flex items-center justify-between">
          <div className="flex justify-start items-center lg:mb-0 mb-5">
            <div className="">
              <img className="w-[70%]" src="/images/drdologo1.png" />
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

        <Navbar />

        <div className="w-full py-5 flex justify-between gap-3">
          <div className="w-1/3 flex flex-col gap-3">
            {cards.slice(0, 3).map((card, index) => (
              <StatusCard
                key={index}
                title={card.title}
                lastUpdated={card.lastUpdated}
                content={card.content}
              />
            ))}
          </div>
          <div className="w-1/3 flex flex-col gap-3">
            {cards.slice(3, 6).map((card, index) => (
              <StatusCard
                key={index}
                title={card.title}
                lastUpdated={card.lastUpdated}
                content={card.content}
              />
            ))}
          </div>
          <div className="w-1/3 flex flex-col gap-3">
            {cards.slice(6, 7).map((card, index) => (
              <StatusCard
                key={index}
                title={card.title}
                lastUpdated={card.lastUpdated}
                content={card.content}
              />
            ))}
            <div className="w-full bg-blue-100 p-3 rounded-lg">
              <h1 className="text-xl font-semibold mb-2">Disclaimer</h1>
              <p className="mb-2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptate, corrupti odit esse quisquam, debitis ab maxime ipsum
                sint hic error, asperiores exercitationem earum aspernatur
                suscipit! Ipsa voluptates voluptatem illum tempora?
              </p>
              <Link href="/forms">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg mt-7">
                  Form 1
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
