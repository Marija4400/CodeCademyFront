import { CheckBadgeIcon, TrophyIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { heroBackgroundNew, NeonGlow } from "../assets";
import Section from "./Section";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "ad" && password === "ad") {
      navigate("/dashboard");
    } else {
      setError("Pogrešan username ili lozinka");
    }
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

        {/* Glavni sadržaj */}
        <div className="flex flex-col w-full max-w-6xl overflow-hidden border rounded-lg shadow-2xl md:flex-row border-fuchsia-500 bg-primary-300/90 dark:bg-primary-750/90 backdrop-blur-md">
          {/* Leva strana */}
          <div className="w-full p-6 text-white md:w-1/2 md:p-10 bg-opacity-90">
            <h2
              className="flex items-center gap-2 mb-6 text-2xl font-bold cursor-pointer md:text-3xl"
              onClick={() => navigate("/")}
            >
              🏆 CodeCademy
            </h2>
            <ul className="space-y-3 text-fuchsia-200">
              <li>
                <strong className="text-base md:text-lg">
                  📚 Kursevi za sve uzraste
                </strong>
                <p className="text-sm text-white/80">
                  Naučite programiranje kroz zanimljive lekcije i izazove.
                </p>
              </li>
              <li>
                <strong className="text-base md:text-lg">
                  💯 Besplatna registracija
                </strong>
                <p className="text-sm text-white/80">
                  Potpuno besplatan pristup bez čuvanja ličnih podataka.
                </p>
              </li>
              <li>
                <strong className="text-base md:text-lg">
                  🔐 Sigurnost na prvom mestu
                </strong>
                <p className="text-sm text-white/80">
                  Vaši podaci se ne dele i ostaju zaštićeni.
                </p>
              </li>
            </ul>
          </div>

          {/* Desna strana */}
          <div className="w-full p-6 md:w-1/2 md:p-10 bg-opacity-90">
            <h2 className="mb-4 text-xl font-bold text-white md:text-2xl">
              Dobrodošli!
            </h2>

            <form
              onSubmit={handleLogin}
              className="w-full p-4 border-2 shadow-2xl md:p-6 rounded-xl bg-black/40 border-fuchsia-500 backdrop-blur-md"
            >
              <h2 className="mb-4 text-xl font-semibold text-center text-white md:text-2xl">
                Login
              </h2>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-fuchsia-200">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Unesite vas email"
                  className="w-full px-4 py-2 text-white bg-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-fuchsia-200">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Unesite vasu lozinku"
                  className="w-full px-4 py-2 text-white bg-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <p className="mb-2 text-sm text-red-400">{error}</p>}

              <button
                type="submit"
                className="w-full py-2 mt-2 font-semibold text-white transition duration-200 border-2 rounded-md border-fuchsia-600 bg-fuchsia-700 hover:bg-fuchsia-800"
              >
                Prijavi se
              </button>
            </form>

            <p className="mt-4 text-sm text-center text-fuchsia-300">
              Nemate nalog?{" "}
              <Link
                to="/register"
                className="font-semibold text-white hover:underline"
              >
                Registrujte se!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Login;
