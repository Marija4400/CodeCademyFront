import React, { useState, useRef } from "react";
import Section from "../Section";
import { correct, incorrect, NeonGlow } from "../../assets";

const AssignedCourseDetails = () => {
  const course = {
    title: "Osnovni kurs programiranja",
    sections: [
      {
        title: "Uvod",
        lessons: [
          {
            title: "Šta je programiranje?",
            content:
              "Programiranje je proces pisanja uputstava koja računari izvršavaju.",
          },
          {
            title: "Računari i kod",
            content: "Računari izvršavaju kod koji programeri napišu.",
          },
        ],
      },
      {
        title: "Prvi koraci",
        lessons: [
          {
            title: "Pisanje prve komande",
            content: "console.log('Zdravo!'); prikazuje tekst u konzoli.",
          },
          {
            title: "Promenljive",
            content: "Promenljive čuvaju informacije: let ime = 'Ana';",
          },
        ],
        test: {
          title: "Test 1",
          questions: [
            {
              question: "conts(aa) >= 4",
              options: ["int i = 1", "int i = 14", "int i = 155"],
              correct: 1,
            },
            {
              question: "drugoo",
              options: ["int i = 1", "int i = 14", "int i = 155"],
              correct: 1,
            },
            {
              question: "trecee",
              options: ["int i = 1", "int i = 14", "int i = 155"],
              correct: 1,
            },
          ],
        },
      },
    ],
  };
  const [currentIndex, setCurrentIndex] = useState({ section: 0, item: 0 });
  const [progress, setProgress] = useState({});
  const [selectedTestAnswers, setSelectedTestAnswers] = useState({});

  const section = course.sections[currentIndex.section];
  const items = [...section.lessons, ...(section.test ? [section.test] : [])];
  const item = items[currentIndex.item];

  const markCompleted = () => {
    const key = `${currentIndex.section}-${currentIndex.item}`;
    setProgress((prev) => ({ ...prev, [key]: true }));
  };

  const goNext = () => {
    const isLastItem = currentIndex.item + 1 >= items.length;
    const isLastSection = currentIndex.section + 1 >= course.sections.length;

    if (!isLastItem) {
      setCurrentIndex((prev) => ({ ...prev, item: prev.item + 1 }));
    } else if (!isLastSection) {
      setCurrentIndex({ section: currentIndex.section + 1, item: 0 });
    } else if (isLastItem) {
      alert("Uspesno ste zavrsili kurs!");
    }
  };

  const handleTestAnswer = (qIdx, optIdx) => {
    setSelectedTestAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));

    const isCorrect = item.questions[qIdx].correct === optIdx;
    if (isCorrect) {
      correctSoundRef.current?.play();
    } else {
      wrongSoundRef.current?.play();
    }
  };

  const isTest = item.questions;

  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  //OVO JE ZA PRIKAZ HTML-A kao obican tekst
  //   const createMarkup = (htmlString) => {
  //     return { __html: htmlString };
  //   };

  //    <div dangerouslySetInnerHTML={createMarkup(lesson?.rawHtmlContent)} />

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

        {/* Glavni sadržaj */}
        <div className="flex flex-col w-full gap-4 px-4 mt-10 font-sans lg:flex-row lg:px-20">
          {/* Leva strana */}
          <div className="w-full p-4 overflow-y-auto border border-purple-600 rounded-lg lg:w-1/3 bg-n-8 lg:h-[800px]">
            <h2 className="mb-4 text-xl font-bold">{course.title}</h2>
            {course.sections.map((sec, secIndex) => (
              <div key={secIndex} className="mb-4">
                <h3 className="font-semibold text-gray-700">{sec.title}</h3>
                <ul className="mt-2 ml-4 space-y-1">
                  {sec.lessons.map((lesson, lessonIndex) => (
                    <li
                      key={lessonIndex}
                      className={`cursor-pointer hover:underline ${
                        progress[`${secIndex}-${lessonIndex}`]
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                      onClick={() =>
                        setCurrentIndex({
                          section: secIndex,
                          item: lessonIndex,
                        })
                      }
                    >
                      📘 {lesson.title}
                    </li>
                  ))}
                  {sec.test && (
                    <li
                      className={`cursor-pointer hover:underline ${
                        progress[`${secIndex}-${sec.lessons.length}`]
                          ? "text-green-600"
                          : "text-green-700"
                      }`}
                      onClick={() =>
                        setCurrentIndex({
                          section: secIndex,
                          item: sec.lessons.length,
                        })
                      }
                    >
                      📝 {sec.test.title}
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>

          {/* Desna strana */}
          <div className="w-full p-6 border border-purple-600 rounded-lg lg:w-2/3 bg-n-8">
            <h1 className="mb-4 text-2xl font-bold">{item.title}</h1>

            {isTest ? (
              <div className="flex flex-col justify-center p-4 border border-purple-600 rounded-lg">
                <div className="flex flex-col w-full mb-4 lg:w-1/2">
                  <p className="font-semibold">
                    {item.questions[currentQuestionIndex].question}
                  </p>
                  {item.questions[currentQuestionIndex].options.map(
                    (opt, optIdx) => (
                      <div
                        key={optIdx}
                        className="p-3 mb-2 ml-4 bg-red-400 border border-purple-700 rounded-lg cursor-pointer"
                        onClick={() =>
                          handleTestAnswer(currentQuestionIndex, optIdx)
                        }
                      >
                        <label>
                          <input
                            type="radio"
                            name={`q${currentQuestionIndex}`}
                            checked={
                              selectedTestAnswers[currentQuestionIndex] ===
                              optIdx
                            }
                            onChange={() =>
                              handleTestAnswer(currentQuestionIndex, optIdx)
                            }
                            className="mr-2 cursor-pointer"
                          />
                          {opt}{" "}
                          {selectedTestAnswers[currentQuestionIndex] ===
                            optIdx &&
                            (optIdx ===
                            item.questions[currentQuestionIndex].correct
                              ? "✅"
                              : "❌")}
                        </label>
                      </div>
                    )
                  )}
                </div>

                <div className="mt-6 space-x-4">
                  <button
                    onClick={() => {
                      if (currentQuestionIndex === item.questions.length - 1) {
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
                    {currentQuestionIndex === item.questions.length - 1
                      ? "Završi kurs"
                      : "Dalje ➡️"}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="whitespace-pre-wrap">{item.content}</p>
                <div className="mt-6 space-x-4">
                  <button
                    onClick={() => {
                      markCompleted();
                      goNext();
                    }}
                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    {currentIndex.section === course.sections.length - 1 &&
                    currentIndex.item === items.length - 1
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
