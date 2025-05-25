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
              question: "Šta je promenljiva?",
              options: ["Broj", "Mesto za čuvanje vrednosti", "Funkcija"],
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
        <div className="flex h-screen px-20 mt-20 font-sans">
          {/* leva strana */}
          <div className="w-1/3 p-4 mr-2 overflow-y-auto border border-purple-600 rounded-lg bg-n-8">
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
          {/* desna strana */}
          <div className="w-2/3 p-6 border border-purple-600 rounded-lg bg-n-8">
            <h1 className="mb-4 text-2xl font-bold">{item.title}</h1>

            {isTest ? (
              <div>
                {item.questions.map((q, qIdx) => (
                  <div key={qIdx} className="mb-4">
                    <p className="font-semibold">{q.question}</p>
                    {q.options.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className="w-1/2 p-3 mb-2 ml-4 border border-purple-700 rounded-lg cursor-pointer"
                      >
                        <label>
                          <input
                            type="radio"
                            name={`q${qIdx}`}
                            checked={selectedTestAnswers[qIdx] === optIdx}
                            onChange={() => handleTestAnswer(qIdx, optIdx)}
                            className="mr-2 cursor-pointer"
                          />
                          {opt}{" "}
                          {selectedTestAnswers[qIdx] === optIdx &&
                            (optIdx === q.correct ? "✅" : "❌")}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <p className="whitespace-pre-wrap">{item.content}</p>
            )}

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
          </div>
        </div>
        <audio ref={correctSoundRef} src={correct} />
        <audio ref={wrongSoundRef} src={incorrect} />
      </div>
    </Section>
  );
};

export default AssignedCourseDetails;
