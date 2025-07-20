import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NeonGlow } from "../assets";
import Section from "./Section";
import { register } from "../api/services/authService";
import InfoPopup from "./InfoPopup";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register(formData));
      setRegistrationSuccess(true);
      // Clear the form
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Section>
      <div className="flex flex-col items-center justify-center min-h-screen px-2 overflow-hidden bg-n-8/60">
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
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Korisničko ime"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 text-white bg-gray-800 border rounded placeholder-fuchsia-300 border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 text-white bg-gray-800 border rounded placeholder-fuchsia-300 border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Lozinka"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 text-white bg-gray-800 border rounded placeholder-fuchsia-300 border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              required
            />

            {error && <div className="text-sm text-red-500">{error}</div>}

            <button
              type="submit"
              className="w-full py-3 font-semibold text-white transition-colors rounded-lg bg-fuchsia-700 hover:bg-fuchsia-800 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Registracija u toku..." : "Registruj se"}
            </button>
          </form>
          <p className="mt-6 text-sm text-fuchsia-200">
            Već imate nalog?{" "}
            <a href="/login" className="underline hover:text-fuchsia-400">
              Prijavite se
            </a>
          </p>
        </div>
        {registrationSuccess && (
          <InfoPopup text="Uspešno ste se registrovali!" type="success" />
        )}
      </div>
    </Section>
  );
};

export default Register;
