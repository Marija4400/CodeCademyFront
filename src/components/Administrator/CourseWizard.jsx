import React, { useState } from "react";

import Section from "../Section";
import { NeonGlow } from "../../assets";
import CourseInfoForm from "./CourseInfoForm";
import QuizForm from "./QuizForm";
import LessonForm from "./AddLesson";
import InfoPopup from "../InfoPopup";

const CourseWizard = () => {
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    lessons: [],
    quiz: [],
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateCourseData = (newData) => {
    setCourseData((prev) => ({ ...prev, ...newData }));
  };

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <Section>
      <div className="relative items-center justify-center min-h-screen overflow-y-auto ">
        <div className="absolute inset-0 -z-10">
          <img
            src={NeonGlow}
            className="object-cover w-full h-full "
            alt="hero"
          />
        </div>
        <div className="p-6 mt-48 border border-purple-600 rounded-lg shadow-md lg:mx-auto sm:px-4 lg:px-6 lg:max-w-3xl">
          {step === 1 && (
            <CourseInfoForm
              data={courseData}
              onNext={nextStep}
              onUpdate={updateCourseData}
            />
          )}
          {step === 2 && (
            <LessonForm
              data={courseData}
              onNext={nextStep}
              onBack={prevStep}
              onUpdate={updateCourseData}
            />
          )}
          {step === 3 && (
            <QuizForm
              data={courseData}
              onBack={prevStep}
              onSubmit={() => {
                console.log("Final Data", courseData);
                setCourseData({
                  title: "",
                  description: "",
                  lessons: [],
                  quiz: [],
                });
                setStep(1);
                setShowModal(true);
              }}
              onUpdate={updateCourseData}
            />
          )}
        </div>
        {showModal && (
          <InfoPopup
            type={"success"}
            text={"Uspesno dodat kurs!"}
            onClose={onClose}
          />
        )}
      </div>
    </Section>
  );
};

export default CourseWizard;
