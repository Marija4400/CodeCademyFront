import React, { useEffect, useState } from "react";
import { NeonGlow } from "../../assets";
import Section from "../Section";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourseTestsC } from "@/api/services/testChildService";
import CodeQuizCard from "./CodeQuizCard";
import { Button } from "../ui/button";

const ITEMS_PER_PAGE = 6;

export default function CodeQuizAll() {
  const dispatch = useDispatch();
  const { tests } = useSelector((state) => state.testChild);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllCourseTestsC());
  }, [dispatch]);

  const totalPages = Math.ceil(tests.length / ITEMS_PER_PAGE);

  const paginatedTests = tests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <Section>
      <div className="relative min-h-screen px-4 pt-10 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <img
            src={NeonGlow}
            className="object-cover w-full h-full"
            alt="hero"
          />
        </div>

        <div className="grid w-full max-w-screen-xl grid-cols-1 gap-6 mx-auto mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedTests.length > 0 ? (
            paginatedTests.map((feature) => (
              <CodeQuizCard key={feature.id} {...feature} />
            ))
          ) : (
            <p className="text-xl text-center text-white col-span-full">
              Trenutno nema dostupnih kvizova.
            </p>
          )}
        </div>

        {/* Pagination Controls */}
        {tests.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center mt-10 space-x-4">
            <Button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="text-white bg-purple-700"
            >
              ⬅️ Prethodna
            </Button>
            <span className="self-center text-white">
              Stranica {currentPage} od {totalPages}
            </span>
            <Button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="text-white bg-purple-700"
            >
              Sledeća ➡️
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
}
