import React, { useRef, useState, useEffect } from "react";
import Section from "./Section";

const Comments = ({ comments }) => {
  const scrollRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  // Uzimamo širinu jedne kartice kad se komponenta učita
  useEffect(() => {
    const card = scrollRef.current?.querySelector(".comment-card");
    if (card) {
      setCardWidth(card.offsetWidth + 16); // širina + margin-right
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current && cardWidth > 0) {
      const { scrollLeft } = scrollRef.current;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - cardWidth
            : scrollLeft + cardWidth,
        behavior: "smooth",
      });
    }
  };
  return (
    <Section crosses id="comments">
      <div className="relative w-full max-w-full px-8 py-8 mx-auto lg:px-52">
        <h2 className="mb-6 text-2xl font-semibold text-center">Komentari</h2>

        {/* Strelice */}
        <button
          onClick={() => scroll("left")}
          className="absolute z-10 p-2 -translate-y-1/2 rounded-full shadow bg-n-5 left-2 top-1/2 hover:bg-n-10"
        >
          <button className="px-4 text-2xl">«</button>
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute z-10 p-2 -translate-y-1/2 rounded-full shadow bg-n-5 right-2 top-1/2 hover:bg-n-10"
        >
          <button className="px-4 text-2xl">»</button>
        </button>

        {/* Komentari */}
        <div
          ref={scrollRef}
          className="flex px-8 space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {comments.map((comment, index) => (
            <div
              key={index}
              className="comment-card min-w-[250px] max-w-[250px] bg-n-11 h-32 p-4 rounded-xl shadow border border-purple-600 shrink-0 mb-5"
            >
              <p className="text-gray-500">{comment.text}</p>
              <div className="mt-2 text-sm text-right text-gray-500">
                — {comment.author}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Comments;
