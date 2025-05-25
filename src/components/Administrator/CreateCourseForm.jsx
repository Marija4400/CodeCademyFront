import React, { useState } from "react";

const CreateCourseForm = () => {
  const [course, setCourse] = useState({
    name: "",
    description: "",
    lessons: [],
    quiz: [],
  });

  const [lesson, setLesson] = useState({
    text: "",
    image: "",
    video: "",
  });

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([{ text: "", isCorrect: false }]);

  // Dodaj lekciju
  const handleAddLesson = () => {
    setCourse((prev) => ({
      ...prev,
      lessons: [...prev.lessons, lesson],
    }));
    setLesson({ text: "", image: "", video: "" });
  };

  // Dodaj kviz pitanje
  const handleAddQuestion = () => {
    setCourse((prev) => ({
      ...prev,
      quiz: [...prev.quiz, { question, answers }],
    }));
    setQuestion("");
    setAnswers([{ text: "", isCorrect: false }]);
  };

  return (
    <div className="max-w-4xl p-6 mx-auto mt-10 space-y-8 bg-black rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center">Kreiraj Kurs</h1>

      {/* Kurs info */}
      <div>
        <label className="block mb-1 font-semibold">Naziv kursa</label>
        <input
          className="w-full p-2 border rounded-md"
          value={course.name}
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />

        <label className="block mt-4 mb-1 font-semibold">Opis kursa</label>
        <textarea
          className="w-full p-2 border rounded-md"
          rows={3}
          value={course.description}
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
        />
      </div>

      {/* Dodavanje lekcije */}
      <div>
        <h2 className="mb-2 text-xl font-bold">Dodaj lekciju</h2>
        <textarea
          className="w-full p-2 border rounded-md"
          rows={3}
          placeholder="Tekst lekcije"
          value={lesson.text}
          onChange={(e) => setLesson({ ...lesson, text: e.target.value })}
        />
        <input
          className="w-full p-2 mt-2 border rounded-md"
          placeholder="URL slike (opciono)"
          value={lesson.image}
          onChange={(e) => setLesson({ ...lesson, image: e.target.value })}
        />
        <input
          className="w-full p-2 mt-2 border rounded-md"
          placeholder="URL videa (opciono)"
          value={lesson.video}
          onChange={(e) => setLesson({ ...lesson, video: e.target.value })}
        />
        <button
          className="px-4 py-2 mt-3 text-white bg-purple-600 rounded-md hover:bg-purple-700"
          onClick={handleAddLesson}
        >
          Dodaj lekciju
        </button>
      </div>

      {/* Dodavanje kviza */}
      <div>
        <h2 className="mb-2 text-xl font-bold">Dodaj pitanje za kviz</h2>
        <input
          className="w-full p-2 border rounded-md"
          placeholder="Unesi pitanje"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        {answers.map((ans, index) => (
          <div key={index} className="flex items-center mt-2 space-x-2">
            <input
              className="w-full p-2 border rounded-md"
              placeholder={`Odgovor ${index + 1}`}
              value={ans.text}
              onChange={(e) => {
                const updated = [...answers];
                updated[index].text = e.target.value;
                setAnswers(updated);
              }}
            />
            <input
              type="checkbox"
              checked={ans.isCorrect}
              onChange={() => {
                const updated = [...answers];
                updated[index].isCorrect = !updated[index].isCorrect;
                setAnswers(updated);
              }}
            />
            <span className="text-sm">Tačno</span>
          </div>
        ))}

        <button
          className="mt-2 text-sm text-blue-600"
          onClick={() =>
            setAnswers([...answers, { text: "", isCorrect: false }])
          }
        >
          + Dodaj još jedan odgovor
        </button>

        <div className="mt-3">
          <button
            className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
            onClick={handleAddQuestion}
          >
            Dodaj pitanje
          </button>
        </div>
      </div>

      {/* Pregled (opciono) */}
      <div className="pt-4 mt-6 border-t">
        <h3 className="mb-2 text-xl font-bold">Pregled unosa (za test)</h3>
        <pre className="p-4 overflow-auto text-sm bg-black rounded-md">
          {JSON.stringify(course, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default CreateCourseForm;
