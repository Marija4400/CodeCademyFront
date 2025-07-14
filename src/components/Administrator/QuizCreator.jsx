import React, { useState } from "react";
import Section from "../Section";
import { NeonGlow } from "../../assets";

const QuizCreator = () => {
  const [questions, setQuestions] = useState([
    {
      text: "",
      answers: [{ text: "", isCorrect: false }],
    },
  ]);

  // Dodavanje novog pitanja
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", answers: [{ text: "", isCorrect: false }] },
    ]);
  };

  // Dodavanje odgovora unutar pitanja
  const addAnswer = (questionIndex) => {
    const updated = [...questions];
    updated[questionIndex].answers.push({ text: "", isCorrect: false });
    setQuestions(updated);
  };

  // Ažuriranje teksta pitanja
  const handleQuestionText = (index, value) => {
    const updated = [...questions];
    updated[index].text = value;
    setQuestions(updated);
  };

  // Ažuriranje teksta odgovora
  const handleAnswerText = (qIndex, aIndex, value) => {
    const updated = [...questions];
    updated[qIndex].answers[aIndex].text = value;
    setQuestions(updated);
  };

  // Promena checkboxa
  const handleCheckbox = (qIndex, aIndex) => {
    const updated = [...questions];
    updated[qIndex].answers[aIndex].isCorrect =
      !updated[qIndex].answers[aIndex].isCorrect;
    setQuestions(updated);
  };

  // Slanje podataka
  const handleSubmit = () => {
    console.log("Kreirani kviz:", questions);

    // Reset forme
    setQuestions([
      {
        text: "",
        answers: [{ text: "", isCorrect: false }],
      },
    ]);
  };

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
        <div className="max-w-4xl p-6 mx-auto">
          <h1 className="mt-4 mb-4 text-2xl font-bold">Kreiraj kviz</h1>

          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="p-4 mb-8 border border-purple-600 rounded shadow bg-opacity-90"
            >
              <label className="block mb-2 font-semibold text-purple-600">
                Pitanje {qIndex + 1}
              </label>
              <textarea
                value={q.text}
                onChange={(e) => handleQuestionText(qIndex, e.target.value)}
                placeholder="Unesi tekst pitanja (možeš uneti i kod)"
                className="w-full p-2 mb-4 font-mono border border-purple-600 rounded"
                rows={5}
              />

              <div className="space-y-3">
                {q.answers.map((a, aIndex) => (
                  <div key={aIndex} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={a.isCorrect}
                      onChange={() => handleCheckbox(qIndex, aIndex)}
                    />
                    <input
                      type="text"
                      value={a.text}
                      onChange={(e) =>
                        handleAnswerText(qIndex, aIndex, e.target.value)
                      }
                      placeholder={`Odgovor ${aIndex + 1}`}
                      className="w-full p-2 border border-purple-600 rounded"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={() => addAnswer(qIndex)}
                className="px-4 py-2 mt-4 text-sm text-white bg-purple-600 rounded hover:bg-purple-700"
              >
                Dodaj odgovor
              </button>
            </div>
          ))}

          <div className="flex justify-between gap-4 mt-4">
            <button
              onClick={addQuestion}
              className="px-6 py-2 text-white border border-purple-600 rounded bg-black/75 hover:bg-purple-950"
            >
              Dodaj pitanje
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 text-white bg-purple-600 rounded hover:bg-purple-700"
            >
              Kreiraj kviz
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default QuizCreator;
