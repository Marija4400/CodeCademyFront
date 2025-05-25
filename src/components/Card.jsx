import { ArrowRightIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Card({ id, title, description }) {
  const navigate = useNavigate();
  return (
    <div className=" w-full sm:w-[320px] h-[300px] z-3">
      <div
        className="p-[2px] rounded-[26px] shadow-lg"
        style={{
          background: "linear-gradient(to top right, #58bcca, #d21cb4)",
          boxShadow:
            "0 0 15px 0 rgba(88, 188, 202, 0.5), 0 0 15px 0 rgba(210, 28, 180, 0.5)",
        }}
      >
        <div className="h-full w-full bg-[#0f0f1a] rounded-[24px] p-6 flex flex-col justify-between">
          <div>
            <h3 className="mb-4 font-mono text-xl text-white">{title}</h3>
            <p className="text-sm font-light text-gray-400 h-[80px]">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-md mt-3 flex items-center justify-center text-[#d21cb4]">
              <TrophyIcon className="w-5 h-5 text-white" />
            </div>
            <button
              onClick={() => navigate(`/courseDetails/${id}`)}
              className="flex items-center gap-1 text-sm font-bold tracking-wider text-white uppercase"
            >
              Pogledaj detalje <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
