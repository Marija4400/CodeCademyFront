import React, { useState, useEffect } from "react";

const LessonForm = ({ data, onNext, onBack, onUpdate }) => {
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonText, setLessonText] = useState("");
  const [lessonImage, setLessonImage] = useState(null);
  const [lessonVideo, setLessonVideo] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [lessons, setLessons] = useState(data.lessons || []);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [videoInputKey, setVideoInputKey] = useState(Date.now() + 1);

  useEffect(() => {
    if (lessonImage) {
      const url = URL.createObjectURL(lessonImage);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url); // Cleanup
    } else {
      setImagePreview(null);
    }
  }, [lessonImage]);

  useEffect(() => {
    if (lessonVideo) {
      const url = URL.createObjectURL(lessonVideo);
      setVideoPreview(url);
      return () => URL.revokeObjectURL(url); // Cleanup
    } else {
      setVideoPreview(null);
    }
  }, [lessonVideo]);

  const addLesson = () => {
    if (lessonTitle.trim() && lessonText.trim()) {
      const newLesson = {
        title: lessonTitle.trim(),
        text: lessonText.trim(),
        image: lessonImage,
        video: lessonVideo,
      };

      const updatedLessons = [...lessons, newLesson];
      setLessons(updatedLessons);
      onUpdate({ lessons: updatedLessons });

      setLessonTitle("");
      setLessonText("");
      setLessonImage(null);
      setLessonVideo(null);
      setFileInputKey(Date.now());
      setVideoInputKey(Date.now() + 1);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Dodaj lekciju</h2>

      <input
        type="text"
        placeholder="Naslov lekcije"
        value={lessonTitle}
        onChange={(e) => setLessonTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <textarea
        placeholder="Tekst lekcije"
        value={lessonText}
        onChange={(e) => setLessonText(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        rows={3}
      />

      <div className="mb-4">
        <label className="block mb-1 font-medium">Slika (opciono)</label>
        <input
          key={fileInputKey}
          type="file"
          accept="image/*"
          onChange={(e) => setLessonImage(e.target.files[0])}
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

      <div className="mb-4">
        <label className="block mb-1 font-medium">Video (opciono)</label>
        <input
          key={videoInputKey}
          type="file"
          accept="video/*"
          onChange={(e) => setLessonVideo(e.target.files[0])}
          className="block w-full"
        />
        {videoPreview && (
          <video
            controls
            src={videoPreview}
            className="w-full max-w-md mt-2 rounded shadow"
          />
        )}
      </div>

      <button
        onClick={addLesson}
        className="px-4 py-2 mb-4 text-white bg-green-600 rounded"
      >
        Dodaj lekciju
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

export default LessonForm;
