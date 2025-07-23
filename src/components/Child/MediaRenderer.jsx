import { fetchFileAsBlob } from "@/api/services/childService";
import React, { useEffect, useState } from "react";

const MediaRenderer = ({ fileName }) => {
  const [mediaUrl, setMediaUrl] = useState(null);

  useEffect(() => {
    if (!fileName) return;

    const loadMedia = async () => {
      try {
        const blob = await fetchFileAsBlob(fileName);
        const url = URL.createObjectURL(blob);
        setMediaUrl(url);
      } catch (err) {
        console.error("Greška pri učitavanju fajla:", err);
      }
    };

    loadMedia();

    return () => {
      if (mediaUrl) URL.revokeObjectURL(mediaUrl);
    };
  }, [fileName]);

  if (!fileName) return null;
  if (!mediaUrl) return <p>Učitavam sadržaj...</p>;

  return (
    <div className="mt-4">
      <img
        src={mediaUrl}
        alt="Section Media"
        className="w-full max-h-[400px] object-contain shadow-lg"
      />
    </div>
  );
};

export default MediaRenderer;
