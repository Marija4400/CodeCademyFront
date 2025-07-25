import React, { useState, useEffect } from "react";

const SectionForm = ({ data, onNext, onBack, onUpdate }) => {
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionText, setSectionText] = useState("");
  const [sectionImage, setSectionImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [sections, setSections] = useState(data.sections || []);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  useEffect(() => {
    if (sectionImage) {
      const url = URL.createObjectURL(sectionImage);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImagePreview(null);
    }
  }, [sectionImage]);

  const addSection = () => {
    if (sectionTitle.trim() && sectionText.trim()) {
      const newSection = {
        title: sectionTitle.trim(),
        description: sectionText.trim(),
        photo: sectionImage,
      };

      const updatedSections = [...sections, newSection];
      setSections(updatedSections);
      onUpdate({ sections: updatedSections });

      setSectionTitle("");
      setSectionText("");
      setSectionImage(null);
      setFileInputKey(Date.now());
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold ">Dodaj sekciju</h2>

      <input
        type="text"
        placeholder="Naslov sekcije"
        value={sectionTitle}
        onChange={(e) => setSectionTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <textarea
        placeholder="Tekst sekcije"
        value={sectionText}
        onChange={(e) => setSectionText(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        rows={3}
      />

      <div className="mb-4">
        <label className="block mb-1 font-medium">Slika (opciono)</label>
        <input
          key={fileInputKey}
          type="file"
          accept="image/*"
          onChange={(e) => setSectionImage(e.target.files[0])}
          className="block w-full"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview slike"
            className="max-w-xs mt-2 rounded shadow"
          />
        )}
      </div>

      <button
        onClick={addSection}
        className="px-4 py-2 mb-4 text-white bg-green-600 rounded"
      >
        Dodaj sekciju
      </button>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 text-white bg-gray-400 rounded"
        >
          Nazad
        </button>
        <button
          onClick={onNext}
          className="px-4 py-2 text-white bg-purple-600 rounded"
        >
          Dalje
        </button>
      </div>
    </div>
  );
};

export default SectionForm;
