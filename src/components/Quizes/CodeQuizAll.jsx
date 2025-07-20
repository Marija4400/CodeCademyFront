import React, { useEffect, useState } from "react";
import { NeonGlow } from "../../assets";
import { useWindowSize } from "react-use";
import Section from "../Section";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourseTestsC } from "@/api/services/testChildService";
import CodeQuizCard from "./CodeQuizCard";

export default function CodeQuizAll() {
  const dispatch = useDispatch();
  const { tests } = useSelector((state) => state.testChild);
  useEffect(() => {
    dispatch(getAllCourseTestsC());
  }, [dispatch]);

  console.log("Tests:", tests);

  return (
    <Section>
      <div className="relative min-h-screen px-4 pt-10 pb-20 overflow-hidden ">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <img
            src={NeonGlow}
            className="object-cover w-full h-full"
            alt="hero"
          />
        </div>
        <div className="grid w-full max-w-screen-xl grid-cols-1 gap-6 mx-auto mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {tests.length > 0 ? (
            tests.map((feature) => (
              <CodeQuizCard key={feature.id} {...feature} />
            ))
          ) : (
            <p className="text-xl text-center text-white col-span-full">
              Traženi kurs nije pronadjen...
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}
