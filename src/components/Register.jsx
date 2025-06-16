import React from "react";
import { heroBackgroundNew, NeonGlow } from "../assets";
import Section from "./Section";

const Register = () => {
  return (
    <Section>
      <div className="flex flex-col items-center justify-center min-h-screen px-2 overflow-hidden bg-n-8/60">
        {/* Pozadinska slika */}
        <div className="absolute inset-0 -z-10">
          <img
            src={NeonGlow}
            className="object-cover w-full h-full"
            alt="hero"
          />
        </div>

        <div className="w-full max-w-md p-8 text-center border shadow-lg border-fuchsia-500 bg-slate-600 rounded-xl bg-opacity-10 backdrop-blur-md">
          <h3 className="mb-6 text-3xl font-bold text-fuchsia-200">
            Registracija
          </h3>
          <form className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 text-white bg-gray-800 border rounded placeholder-fuchsia-300 border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            />
            <input
              type="password"
              placeholder="Lozinka"
              className="w-full px-4 py-3 text-white bg-gray-800 border rounded placeholder-fuchsia-300 border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            />
            <input
              type="tel"
              placeholder="Broj telefona"
              className="w-full px-4 py-3 text-white bg-gray-800 border rounded placeholder-fuchsia-300 border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            />
            <button
              type="submit"
              className="w-full py-3 font-semibold text-white transition-colors rounded-lg bg-fuchsia-700 hover:bg-fuchsia-800"
            >
              Registruj se
            </button>
          </form>
          <p className="mt-6 text-sm text-fuchsia-200">
            Već imate nalog?{" "}
            <a href="/login" className="underline hover:text-fuchsia-400">
              Prijavite se
            </a>
          </p>
        </div>
      </div>
    </Section>
  );
};

export default Register;
