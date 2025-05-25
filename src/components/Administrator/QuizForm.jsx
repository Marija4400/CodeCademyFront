import React, { useState } from "react";

const QuizForm = ({ data, onBack, onSubmit, onUpdate }) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", ""]); // Početna dva odgovora
  const [correctIndex, setCorrectIndex] = useState(null);
  const [quiz, setQuiz] = useState(data.quiz || []);

  const addQuestion = () => {
    const trimmedAnswers = answers.map((a) => a.trim());
    if (
      question.trim() &&
      correctIndex !== null &&
      trimmedAnswers.every((a) => a)
    ) {
      const newQuiz = [
        ...quiz,
        { question: question.trim(), answers: trimmedAnswers, correctIndex },
      ];
      setQuiz(newQuiz);
      onUpdate({ quiz: newQuiz });
      setQuestion("");
      setAnswers(["", ""]);
      setCorrectIndex(null);
    }
  };

  const addAnswerField = () => {
    if (answers.length < 6) {
      setAnswers([...answers, ""]);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Dodaj pitanje za kviz</h2>

      <input
        type="text"
        placeholder="Pitanje"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      {answers.map((a, i) => (
        <div key={i} className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={correctIndex === i}
            onChange={() => setCorrectIndex(i)}
            className="mr-2"
          />
          <input
            type="text"
            placeholder={`Odgovor ${i + 1}`}
            value={a}
            onChange={(e) => {
              const newAnswers = [...answers];
              newAnswers[i] = e.target.value;
              setAnswers(newAnswers);
            }}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}

      {answers.length < 6 && (
        <button
          type="button"
          onClick={addAnswerField}
          className="mb-4 text-sm text-blue-600 hover:underline"
        >
          + Dodaj još odgovora
        </button>
      )}

      <button
        onClick={addQuestion}
        className="flex flex-col px-4 py-2 mb-4 text-white bg-green-600 rounded"
      >
        Dodaj pitanje
      </button>

      <div className="mb-4">
        <h3 className="mb-2 font-semibold">Dodata pitanja:</h3>
        <ul className="ml-6 space-y-1 list-disc">
          {quiz.map((q, i) => (
            <li key={i}>{q.question}</li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 text-white bg-gray-400 rounded"
        >
          Nazad
        </button>
        <button
          onClick={onSubmit}
          className="px-4 py-2 text-white bg-blue-600 rounded"
        >
          Sačuvaj kurs
        </button>
      </div>
    </div>
  );
};

export default QuizForm;
