import { useParams } from "react-router-dom";
import Section from "../Section";
import { NeonGlow } from "../../assets";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClockIcon } from "@heroicons/react/24/outline";
import { getChildren, addCourseToChild } from "@/api/services/parentService";
import InfoPopup from "../InfoPopup";

const CourseDetails = () => {
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const { loading, error, success, children } = useSelector(
    (state) => state.parent
  );
  const { courses } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChildren());
  }, [dispatch]);

  // Find the specific course based on the ID from URL
  const course = courses.find((c) => c.id === parseInt(id));

  // Create a unique key for each child option
  const getChildKey = (child, index) => {
    return child.id ? `child-${child.id}` : `${child.username}-${index}`;
  };

  const handleAssignCourse = async () => {
    const selectedChild = children.find(
      (child) => child.username === selectedUser
    );
    if (selectedChild && course) {
      try {
        await dispatch(addCourseToChild(selectedChild.id, course.id));
        setShowPopup(false);
        setShowSuccess(true);
        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } catch (error) {
        console.error("Failed to assign course:", error);
      }
    }
  };

  return (
    <>
      <Section>
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <img
              src={NeonGlow}
              className="object-cover w-full h-full"
              alt="hero"
            />
          </div>

          <div className="flex flex-col items-center justify-center w-full gap-6 px-4 mt-20 lg:flex-row">
            {/* Leva strana */}
            <div className="w-full max-w-xl">
              <div
                className="p-6 border rounded-lg shadow-2xl bg-black/10"
                style={{
                  boxShadow:
                    "0 0 15px 0 rgba(88, 188, 202, 0.5), 0 0 15px 0 rgba(210, 28, 180, 0.5)",
                }}
              >
                {course ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-white">
                        {course.title}
                      </h2>
                      <span className="px-3 py-1 text-sm font-semibold text-purple-200 bg-purple-900 rounded-full">
                        Nivo {course.level}
                      </span>
                    </div>

                    <div className="mb-6">
                      <h3 className="mb-2 text-lg font-semibold text-purple-300">
                        Opis kursa
                      </h3>
                      <p className="text-gray-300">{course.description}</p>
                    </div>

                    <div className="flex items-center gap-2 mb-6">
                      <ClockIcon className="w-5 h-5 text-purple-400" />
                      <span className="text-purple-200">
                        Trajanje: {course.duration} minuta
                      </span>
                    </div>

                    {course.sections && course.sections.length > 0 && (
                      <div className="mb-6">
                        <h3 className="mb-2 text-lg font-semibold text-purple-300">
                          Sekcije
                        </h3>
                        <ul className="space-y-2">
                          {course.sections.map((section, index) => (
                            <li key={index} className="text-gray-300">
                              {section}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center text-white">
                    Kurs nije pronađen
                  </div>
                )}
              </div>
            </div>

            {/* Desna strana */}
            {course && (
              <div className="flex items-center justify-center w-full max-w-md">
                <button
                  onClick={() => setShowPopup(true)}
                  className="w-full px-6 py-3 text-lg text-white transition border border-purple-600 rounded-lg shadow-xl hover:opacity-90"
                >
                  Dodaj kurs
                </button>
              </div>
            )}
          </div>

          {/* Popup */}
          {showPopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-n-8/90 p-6 rounded-lg shadow-xl w-[90%] max-w-md border border-purple-600">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  Odaberi korisnika za dodavanje kursa
                </h2>

                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full p-2 mb-4 border border-purple-600 rounded-md"
                >
                  <option value="">-- Izaberi korisnika --</option>
                  {Array.isArray(children) &&
                    children.map((child, index) => (
                      <option
                        key={getChildKey(child, index)}
                        value={child.username}
                      >
                        {child.username}
                      </option>
                    ))}
                </select>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 dark:bg-slate-600 dark:text-white"
                  >
                    Otkaži
                  </button>
                  <button
                    onClick={handleAssignCourse}
                    disabled={!selectedUser || loading}
                    className="px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700 disabled:opacity-50"
                  >
                    {loading ? "Dodavanje..." : "Potvrdi"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {showSuccess && (
            <InfoPopup text="Kurs je uspešno dodeljen!" type="success" />
          )}
        </div>
      </Section>
    </>
  );
};

export default CourseDetails;
