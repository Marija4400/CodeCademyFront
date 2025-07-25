import {
  ArrowRightIcon,
  ClockIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function AssignedCourseCard({
  id,
  title,
  description,
  duration,
  level,
}) {
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
              <span className="px-2 py-1 text-xs font-semibold text-purple-200 bg-purple-900 rounded-full">
                Nivo {level}
              </span>
            </div>
            <p className="text-sm font-light text-gray-400 h-[80px] overflow-y-auto">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex justify-between gap-1 tems-center">
              <ClockIcon className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-purple-200">{duration}</span>
            </div>
            <button
              onClick={() => navigate(`/assignedCourseDetails/${id}`)}
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
