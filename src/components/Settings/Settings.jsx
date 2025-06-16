import { useState } from "react";
import PasswordModal from "./PasswordModal";
import Section from "../Section";
import { heroBackgroundNew, NeonGlow } from "../../assets";

const Settings = () => {
  const [showModal, setShowModal] = useState(false);

  const user = {
    username: "korisnik123",
    phone: "+381 64 123 4567",
  };

  return (
    <Section>
      <div className="relative flex flex-col items-center justify-center min-h-screen px-2 overflow-hidden">
        {/* Pozadinska slika */}
        <div className="absolute inset-0 -z-10">
          <img
            src={NeonGlow}
            className="object-cover w-full h-full"
            alt="hero"
          />
        </div>

        <div
          on
          className="p-5 border border-purple-600 rounded-md lg:w-1/3 lg:p-10 lg:px-20"
        >
          <div>
            <h2 className="p-4 mb-4 text-xl font-bold">Podešavanja</h2>
            <hr className="p-2 mb-4 border-gray-400 opacity-30" />
          </div>
          <div className="flex items-center justify-between mb-6 ">
            <div className="flex justify-between w-full">
              <label className="py-1 text-lg font-semibold md:text-base">
                Email
              </label>
              <p>emaaalllleee</p>
            </div>
          </div>
          <div className="flex items-center justify-between ">
            <div>
              <p className="py-1 text-lg font-semibold md:text-base">Lozinka</p>
            </div>
            <div>
              <button
                className="text-blue-500 underline focus:outline-none"
                onClick={() => setShowModal(true)}
              >
                Promeni lozinku?
              </button>
              {showModal && (
                <PasswordModal onClose={() => setShowModal(false)} />
              )}
            </div>
          </div>

          <hr className="p-2 mt-4 border-gray-400 opacity-30" />
          <div className="flex items-center justify-between mb-8 ">
            <label className="py-1 text-lg font-semibold md:text-base">
              Broj telefona
            </label>
            <p className="flex justify-end ">065/3252001</p>
          </div>
          <div className="flex items-center justify-between ">
            <div>
              <label className="py-1 text-lg font-semibold md:text-base">
                Broj aktivnih sesija (99)
              </label>
            </div>
            <div>
              <button className="font-bold text-blue-500 focus:outline-none">
                Više
              </button>
            </div>
          </div>
          <div className="w-full overflow-auto max-h-64">
            <div>
              8999
              <hr className="p-3 mt-4 border-gray-400 opacity-30 " />
            </div>
          </div>
        </div>

        {/* <div className="border border-purple-600 w-1/2 flex justify-center h-[600px] gap-6 ">
          <div className="mb-4">
            Korisnicko ime:
            <input
              type="text"
              value={user.username}
              disabled
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Broj telefona
            </label>
            <input
              type="text"
              value={user.phone}
              disabled
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
          Promena lozinke
          <button
            onClick={() => setShowModal(true)}
            className="w-full px-4 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Promeni lozinku
          </button>
          {showModal && <PasswordModal onClose={() => setShowModal(false)} />}
        </div> */}
      </div>
    </Section>
  );
};

export default Settings;
