import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card";
import Section from "../Section";
import { NeonGlow } from "../../assets";
import SearchBar from "../SearchBar";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { getAllCourses } from "../../api/services/courseService";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const dispatch = useDispatch();
  const courseState = useSelector((state) => state.course) || { courses: [], loading: false, error: null };
  const { courses, loading, error } = courseState;

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const filteredCourses = Array.isArray(courses) ? courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredCourses.slice(
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

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 border-4 border-purple-500 rounded-full animate-spin border-t-transparent"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-xl text-red-500">{error}</div>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <div className="grid w-full max-w-screen-xl grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-3">
            {currentItems.length > 0 ? (
              currentItems.map((course) => (
                <Card
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  level={`Nivo ${course.level}`}
                  duration={`${course.duration} min`}
                />
              ))
            ) : (
              <p className="text-xl text-center text-white col-span-full">
                {searchTerm
                  ? "Traženi kurs nije pronadjen..."
                  : "Nema dostupnih kurseva"}
              </p>
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
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
