import React, { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
const InfoCircle = ({ type, searchBy, text }) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <>
      {/*dont show below lg max-lg:hidden */}
      <div className="w-6 ml-2 mr-2 ">
        <InformationCircleIcon
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTouchStart={() => setHovered(true)}
          onTouchEnd={() => setHovered(false)}
        />
        {isHovered && type === "search" && (
          <div className="absolute z-50 p-3 mt-4 border border-purple-600 rounded-lg shadow bg-n-8/90 lg:w-52">
            Pretragu možete vršiti prema:
            {searchBy.isArray ? (
              searchBy.map((item, i) => {
                return <li key={i}>&#x2022; {item}</li>;
              })
            ) : (
              <li>{searchBy}</li>
            )}
          </div>
        )}
        {isHovered && type === "info" && (
          <div className="absolute z-50 p-3 transform -translate-x-full border border-purple-600 rounded-lg shadow bg-n-8/90 lg:w-52 ">
            {text}
          </div>
        )}
      </div>
    </>
  );
};

export default InfoCircle;
