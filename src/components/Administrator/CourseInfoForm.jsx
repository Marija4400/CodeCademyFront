import React, { useState } from "react";

const CourseInfoForm = ({ data, onNext, onUpdate }) => {
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);

  const handleNext = () => {
    onUpdate({ title, description });
    onNext();
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold bg-green-300">
        Informacije o kursu
      </h2>
      <input
        type="text"
        placeholder="Naziv kursa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <textarea
        placeholder="Opis kursa"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        rows={4}
      />
      <button
        onClick={handleNext}
        className="px-4 py-2 text-white bg-purple-600 rounded"
      >
        Dalje
      </button>
    </div>
  );
};

export default CourseInfoForm;
