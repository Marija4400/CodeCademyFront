import React, { useState, useEffect, useRef } from "react";
import Section from "../Section";
import { correct, incorrect, NeonGlow } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourseQuizzesC } from "@/api/services/quizChildService";
import { getChildCourseSections } from "@/api/services/childCourseSectionService";

const AssignedCourseDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state) => state.quizChild);
  const { sections } = useSelector((state) => state.childCourseSection);

  useEffect(() => {
    dispatch(getChildCourseSections(id));
    dispatch(getCourseQuizzesC(id));
  }, [dispatch, id]);

  // show sections and quizzes in the left sidebar
  const sectionItems = sections.map((sec, index) => ({
    ...sec,
    type: "section",
  }));

  const quizItem =
    quizzes && quizzes.questions ? [{ ...quizzes, type: "quiz" }] : [];

  const items = [...sectionItems, ...quizItem];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState({});
  const [selectedTestAnswers, setSelectedTestAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);

  const currentItem = items[currentIndex];
  const isQuiz = currentItem?.type === "quiz";

  const markCompleted = () => {
    const key = isQuiz ? `quiz` : `${currentIndex}`;
    setProgress((prev) => ({ ...prev, [key]: true }));
  };

  const goNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < items.length) {
      setCurrentIndex(nextIndex);
      setCurrentQuestionIndex(0); // reset pitanja za kviz
    } else {
      alert("Uspešno ste završili kurs!");
    }
  };

  const handleTestAnswer = (qIdx, answerId) => {
    setSelectedTestAnswers((prev) => ({ ...prev, [qIdx]: answerId }));

    const isCorrect = currentItem.questions[qIdx].answers.find(
      (a) => a.id === answerId
    )?.correct;

    if (isCorrect) {
      correctSoundRef.current?.play();
    } else {
      wrongSoundRef.current?.play();
    }
  };

  return (
    <Section>
      <div className="relative flex flex-col min-h-screen px-4 pt-10 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={NeonGlow}
            className="object-cover w-full h-full"
            alt="hero"
          />
        </div>

        <div className="flex flex-col w-full gap-4 px-4 mt-10 font-sans lg:flex-row lg:px-20">
          {/* Sidebar */}
          <div className="w-full p-4 overflow-y-auto border border-purple-600 rounded-lg lg:w-1/3 bg-n-8 lg:h-[800px]">
            <h2 className="mb-4 text-xl font-bold">Kurs</h2>
            {sections.map((sec, index) => (
              <div key={sec.id} className="mb-4">
                <h3 className="font-semibold text-gray-700">{sec.title}</h3>
                <ul className="mt-2 ml-4 space-y-1">
                  <li
                    className={`cursor-pointer hover:underline ${
                      progress[`${index}`] ? "text-green-600" : "text-blue-600"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    📘 Lekcija
                  </li>
                </ul>
              </div>
            ))}

            {quizzes?.questions?.length > 0 && (
              <div className="pt-2 mt-4 border-t border-gray-300">
                <h3 className="font-semibold text-gray-700">Završni test</h3>
                <ul className="mt-2 ml-4">
                  <li
                    className={`cursor-pointer hover:underline ${
                      progress[`quiz`] ? "text-green-600" : "text-green-700"
                    }`}
                    onClick={() => setCurrentIndex(items.length - 1)}
                  >
                    📝 {quizzes.title}
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Glavni prikaz */}
          <div className="w-full p-6 border border-purple-600 rounded-lg lg:w-2/3 bg-n-8">
            <h1 className="mb-4 text-2xl font-bold">{currentItem?.title}</h1>

            {isQuiz ? (
              <div className="flex flex-col justify-center p-4 border border-purple-600 rounded-lg">
                <div className="flex flex-col w-full mb-4 lg:w-1/2">
                  <p className="font-semibold">
                    {currentItem.questions[currentQuestionIndex].question}
                  </p>
                  {currentItem.questions[currentQuestionIndex].answers.map(
                    (opt) => (
                      <div
                        key={opt.id}
                        className="p-3 mb-2 ml-4 bg-red-400 border border-purple-700 rounded-lg cursor-pointer"
                        onClick={() =>
                          handleTestAnswer(currentQuestionIndex, opt.id)
                        }
                      >
                        <label>
                          <input
                            type="radio"
                            name={`q${currentQuestionIndex}`}
                            checked={
                              selectedTestAnswers[currentQuestionIndex] ===
                              opt.id
                            }
                            onChange={() =>
                              handleTestAnswer(currentQuestionIndex, opt.id)
                            }
                            className="mr-2 cursor-pointer"
                          />
                          {opt.answer}{" "}
                          {selectedTestAnswers[currentQuestionIndex] ===
                            opt.id && (opt.correct ? "✅" : "❌")}
                        </label>
                      </div>
                    )
                  )}
                </div>

                <div className="mt-6 space-x-4">
                  <button
                    onClick={() => {
                      if (
                        currentQuestionIndex ===
                        currentItem.questions.length - 1
                      ) {
                        markCompleted();
                        goNext();
                      } else {
                        setCurrentQuestionIndex(currentQuestionIndex + 1);
                      }
                    }}
                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                    disabled={
                      selectedTestAnswers[currentQuestionIndex] === undefined
                    }
                  >
                    {currentQuestionIndex === currentItem.questions.length - 1
                      ? "Završi test"
                      : "Dalje ➡️"}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="whitespace-pre-wrap">{currentItem?.content}</p>
                <div className="mt-6 space-x-4">
                  <button
                    onClick={() => {
                      markCompleted();
                      goNext();
                    }}
                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    {currentIndex === items.length - 1
                      ? "Završi kurs"
                      : "Dalje ➡️"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <audio ref={correctSoundRef} src={correct} />
        <audio ref={wrongSoundRef} src={incorrect} />
      </div>
    </Section>
  );
};

export default AssignedCourseDetails;
