import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NeonGlow } from "../../assets";
import Item from "../Item";
import Section from "../Section";
import CreatedAccoutTable from "./CreatedAccoutTable";
import TaskChart from "./TaskChart";
import {
  createChildrenProfile,
  getAllChildStatistics,
  getChildren,
} from "../../api/services/parentService";
import InfoPopup from "../InfoPopup";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, children, success } = useSelector(
    (state) => state.parent
  );

  useEffect(() => {
    dispatch(getChildren());
  }, [dispatch]);

  const handleCreateAccount = async () => {
    if (!username.trim() || !password.trim()) {
      alert("Popunite sva polja.");
      return;
    }

    try {
      await dispatch(createChildrenProfile({ username, password }));
      // Reset form and close popup on success
      setUsername("");
      setPassword("");
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to create child account:", error);
    }
  };

  return (
    <Section crosses id="dashboard">
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-8 mt-16 overflow-hidden bg-n-8/60">
        <div className="absolute inset-0 -z-10">
          <img
            src={NeonGlow}
            className="object-cover w-full h-full"
            alt="hero"
          />
        </div>

        <div className="flex flex-col items-start justify-between w-full lg:px-24 lg:flex-row lg:gap-10">
          {/* Leva kolona */}
          <div className="flex flex-col w-full lg:w-2/3">
            <div className="border border-purple-600 rounded-lg shadow-xl">
              <TaskChart />
            </div>

            <div className="mt-4">
              <Item
                title="Statistika"
                content="Kreiranjem naloga omogućićete detetu pristup kursevima, zadacima i testovima. Svaki nalog ima individualni napredak i može se nadgledati sa roditeljskog profila. Dijagram prikazuje broj završeniih sekcija po kursu."
              />
            </div>
            <div className="mt-4">
              <Item
                title="Napomena za roditelje"
                content="Ova platforma omogućava da svako dete ima svoj personalizovani pristup. Možete u svakom trenutku pratiti njihov napredak i pristup zadacima i kvizovima u realnom vremenu."
              />
            </div>
          </div>

          {/* Desna kolona */}
          <div className="w-full h-auto p-4 border border-purple-600 rounded-lg shadow-md lg:w-1/3 bg-opacity-30">
            <h2 className="mb-4 text-xl font-semibold">Kreirani nalozi</h2>
            <p className="text-sm text-gray-500">
              Ovde možete napraviti nalog za vaše dete, i pomoću dodeljenih
              kredencijala da ga logujete na drugi računar preko koga će
              pristupiti kursu.
            </p>

            <div className="mt-8">
              <CreatedAccoutTable
                accounts={Array.isArray(children) ? children : []}
              />
            </div>

            <div className="flex justify-center mt-6">
              <button
                className="p-3 border border-purple-600 rounded-md bg-n-8/90"
                onClick={() => setIsOpen(true)}
              >
                Kreiraj nalog
              </button>
            </div>

            {/* Modal */}
            {isOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-60">
                <div className="w-full max-w-md p-6 border border-purple-600 rounded-lg shadow-xl bg-n-8/90">
                  <h2 className="mb-4 text-xl font-semibold text-gray-100">
                    Kreiraj novi nalog
                  </h2>

                  <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium text-purple-600">
                      Username
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 text-purple-600 border rounded-md focus:outline-none focus:ring"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium text-purple-600">
                      Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-purple-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {error && (
                    <div className="mb-4 text-sm text-red-500">{error}</div>
                  )}

                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 text-gray-600 bg-gray-500 rounded-md hover:text-gray-800"
                    >
                      Otkaži
                    </button>
                    <button
                      onClick={handleCreateAccount}
                      className="px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700"
                      disabled={loading}
                    >
                      {loading ? "Kreiranje..." : "Kreiraj"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {success && (
          <InfoPopup
            text="Uspešno ste kreirali nalog za dete!"
            type="success"
          />
        )}
      </div>
    </Section>
  );
};

export default Dashboard;
