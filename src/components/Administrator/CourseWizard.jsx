import React, { useState } from "react";

import Section from "../Section";
import { NeonGlow } from "../../assets";
import CourseInfoForm from "./CourseInfoForm";
import QuizForm from "./QuizForm";
import InfoPopup from "../InfoPopup";
import { createCourse } from "@/api/services/crateCourseService";
import { useDispatch } from "react-redux";
import { createQuiz } from "@/api/services/createaQuizService";
import SectionForm from "./AddLesson";

const CourseWizard = () => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    photo: null,
    sections: [],
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

  const handleSubmit = async () => {
    try {
      const { title, description, sections, quiz } = courseData;

      const coursePayload = {
        title,
        description,
        level: 1,
        duration: 120,
        photo: "",
        sections,
      };

      const courseResponse = await dispatch(createCourse(coursePayload, null));
      console.log("Course created:", courseResponse);
      const courseId = courseResponse?.data?.id;

      if (!courseId) throw new Error("Course ID not returned");

      const quizPayload = {
        title,
        description,
        courseId,
        questions: quiz.map((q) => ({
          question: q.question,
          answers: q.answers.map((a, idx) => ({
            answer: a,
            correct: idx === q.correctIndex,
          })),
        })),
      };

      await dispatch(createQuiz(quizPayload));

      setCourseData({
        title: "",
        description: "",
        sections: [],
        quiz: [],
      });
      setStep(1);
      setShowModal(true);
    } catch (err) {
      console.error("Error submitting course and quiz:", err);
    }
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
            <SectionForm
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
              onSubmit={handleSubmit}
              onUpdate={updateCourseData}
            />
          )}
        </div>
        {showModal && (
          <InfoPopup
            type={"success"}
            text={"Uspešno dodat kurs!"}
            onClose={onClose}
          />
        )}
      </div>
    </Section>
  );
};

export default CourseWizard;
