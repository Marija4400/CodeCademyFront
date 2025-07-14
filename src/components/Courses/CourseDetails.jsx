import { useParams } from "react-router-dom";
import Card from "../Card";
import Section from "../Section";
import { NeonGlow } from "../../assets";
import Button from "../Button";
import { useState } from "react";

const CourseDetails = () => {
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const users = [
    { id: 1, name: "admin1" },
    { id: 2, name: "admin2" },
    { id: 3, name: "profesor1" },
  ];
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
                className="p-6 border rounded-lg shadow-2xl h-[500px] bg-black/10"
                style={{
                  boxShadow:
                    "0 0 15px 0 rgba(88, 188, 202, 0.5), 0 0 15px 0 rgba(210, 28, 180, 0.5)",
                }}
              >
                <h2 className="mb-2 text-lg text-white">
                  Ovo su detalji o kursu: {id}
                </h2>
                <p className="text-white">Opis</p>
                <p className="text-white">Test</p>
                <p className="text-white">Završni test</p>
                <p className="text-white">Trajanje</p>
              </div>
            </div>

            {/* Desna strana */}
            <div className="flex items-center justify-center w-full max-w-md">
              <button
                onClick={() => setShowPopup(true)}
                className="w-full px-6 py-3 text-lg text-white transition border border-purple-600 rounded-lg shadow-xl hover:opacity-90"
              >
                Dodaj kurs
              </button>
            </div>
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
                  {users.map((user) => (
                    <option key={user.id} value={user.name}>
                      {user.name}
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
                    onClick={() => {
                      console.log("Odabran:", selectedUser);
                      setShowPopup(false);
                    }}
                    disabled={!selectedUser}
                    className="px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700 disabled:opacity-50"
                  >
                    Potvrdi
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Section>
    </>
  );
};
export default CourseDetails;
