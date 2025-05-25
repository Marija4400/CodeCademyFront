import React, { useState } from "react";
import Section from "../Section";
import { NeonGlow } from "../../assets";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import AssignedCourseCard from "./AssignedCourseCard";

const AssignedCourses = () => {
  const assignedCourses = [
    { id: 1, title: "Innovative Dining Experience", description: "..." },
    { id: 2, title: "Improved Portion Understanding", description: "..." },
    { id: 3, title: "Hygienic and Contact-Free", description: "..." },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;
  const filteredFeatures = assignedCourses.filter((feature) =>
    feature.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFeatures.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredFeatures.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <Section>
      <div className="relative flex flex-col min-h-screen px-4 pt-10 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <img
            src={NeonGlow}
            className="object-cover w-full h-full"
            alt="hero"
          />
        </div>
        {/* Grid */}
        <div className="grid w-full max-w-screen-xl grid-cols-1 gap-6 mx-auto mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {currentItems.length > 0 ? (
            currentItems.map((feature) => (
              <AssignedCourseCard key={feature.id} {...feature} />
            ))
          ) : (
            <p className="text-xl text-center text-white col-span-full">
              Traženi kurs nije pronadjen...
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-white bg-purple-600 rounded disabled:opacity-50"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <span className="px-4 py-2 text-white bg-purple-700 rounded">
              Strana {currentPage} od {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-white bg-purple-600 rounded disabled:opacity-50"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </Section>
  );
};

export default AssignedCourses;
