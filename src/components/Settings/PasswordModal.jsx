import { useState } from "react";

export default function PasswordModal({ onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Nove lozinke se ne poklapaju.");
      return;
    }

    // Simulacija promene lozinke
    console.log("Menjam lozinku:", currentPassword, newPassword);
    alert("Lozinka uspešno promenjena!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative w-full max-w-md p-6 border border-purple-600 rounded-lg shadow-lg bg-n-8">
        <h3 className="mb-4 text-xl font-semibold">Promena lozinke</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Trenutna lozinka
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Nova lozinka
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-white">
              Potvrdi novu lozinku
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
            >
              Otkaži
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded bg-fuchsia-600 hover:bg-fuchsia-400"
            >
              Sačuvaj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
