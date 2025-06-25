import React, { useState } from "react";
import Card from "../Card";
import Section from "../Section";
import { NeonGlow } from "../../assets";
import SearchBar from "../SearchBar";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

const Courses = () => {
  const features = [
    { id: 1, title: "Interaktivne lekcije", description: "..." },
    { id: 2, title: "Improved Portion Understanding", description: "..." },
    { id: 3, title: "Hygienic and Contact-Free", description: "..." },
    { id: 4, title: "Innovative Dining Experience", description: "..." },
    { id: 5, title: "Improved Portion Understanding", description: "..." },
    { id: 6, title: "Hygienic and Contact-Free", description: "..." },
    { id: 7, title: "AAAAAA", description: "..." },
    { id: 8, title: "IBBBBBBnding", description: "..." },
    { id: 9, title: "CCCCCCCC", description: "..." },
    { id: 10, title: "DDDDDD", description: "..." },
    { id: 11, title: "RRRRRRRR", description: "..." },
    { id: 12, title: "Hygienic and Contact-Free", description: "..." },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const filteredFeatures = features.filter((feature) =>
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

        {/* Search bar */}
        <div className="flex justify-end w-full max-w-screen-xl mx-auto mt-20 mb-6">
          <SearchBar
            searchQuery={searchTerm}
            onSearchChange={(e) => handleSearchChange(e.target.value)}
            type="search"
            searchBy="Imenu kursa"
            position="left"
          />
        </div>

        {/* Grid */}
        <div className="grid w-full max-w-screen-xl grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-3">
          {currentItems.length > 0 ? (
            currentItems.map((feature) => (
              <Card key={feature.id} {...feature} />
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

export default Courses;
