import React from "react";

const Item = ({ title, content }) => {
  return (
    <div className="flex-grow h-full p-2 border border-purple-600 rounded-md lg:p-4 ">
      <div className="flex flex-col h-full p-3 py-6 text-center rounded-lg shadow bg-primary-400 md:items-center dark:bg-primary-500 ">
        <p className="text-md md:text-xl">{title}</p>
        <div className="m-auto mt-2 text-md">
          <span>{content}</span>
        </div>
      </div>
    </div>
  );
};

export default Item;
