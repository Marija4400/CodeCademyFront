import { ArrowRightIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function CodeQuizCard({ id, title, description }) {
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
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-mono text-xl text-white">{title}</h3>
            </div>
            <p className="text-sm font-light text-gray-400 h-[80px] overflow-y-auto">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex justify-between gap-1 tems-center">
              <TrophyIcon className="w-5 h-5 text-purple-400" />
            </div>
            <button
              onClick={() => navigate(`/codeQuiz/${id}`)}
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
