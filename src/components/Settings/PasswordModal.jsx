import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../api/services/authService";
import InfoPopup from "../InfoPopup";

export default function PasswordModal({ onClose }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Nove lozinke se ne poklapaju.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Nova lozinka mora imati najmanje 6 karaktera.");
      return;
    }

    try {
      await dispatch(
        updatePassword({
          password: newPassword,
        })
      );

      setShowSuccess(true);
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setError(error.message || "Došlo je do greške prilikom promene lozinke.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative w-full max-w-md p-6 border border-purple-600 rounded-lg shadow-lg bg-n-8">
        <h3 className="mb-4 text-xl font-semibold">Promena lozinke</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Nova lozinka
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
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
              minLength={6}
              className="w-full px-3 py-2 mt-1 border rounded-md"
            />
          </div>

          {error && <div className="mb-4 text-sm text-red-500">{error}</div>}

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
              disabled={loading}
              className="px-4 py-2 text-white rounded bg-fuchsia-600 hover:bg-fuchsia-400 disabled:opacity-50"
            >
              {loading ? "Čuvanje..." : "Sačuvaj"}
            </button>
          </div>
        </form>
      </div>
      {showSuccess && (
        <InfoPopup text="Lozinka je uspešno promenjena!" type="success" />
      )}
    </div>
  );
}
