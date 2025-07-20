import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { updateChild, deleteChild } from "../../api/services/parentService";
import InfoPopup from "../InfoPopup";

const CreatedAccountTable = ({ accounts = [] }) => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [popupType, setPopupType] = useState(""); // "edit" ili "delete"
  const [editedUsername, setEditedUsername] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.parent);

  // Ensure accounts is always an array
  const safeAccounts = Array.isArray(accounts) ? accounts : [];

  const openPopup = (account, type) => {
    setSelectedAccount(account);
    setPopupType(type);
    if (type === "edit") {
      setEditedUsername(account.username);
      setEditedPassword(""); // Don't show the password
    }
  };

  const closePopup = () => {
    setSelectedAccount(null);
    setPopupType("");
    setEditedUsername("");
    setEditedPassword("");
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSuccessMessage("");
    }, 3000);
  };

  const handleEditSubmit = async () => {
    try {
      const updateData = {
        username: editedUsername,
        ...(editedPassword && { password: editedPassword }) // Only include password if it was changed
      };

      await dispatch(updateChild(selectedAccount.id, updateData));
      closePopup();
      showSuccessMessage("Nalog je uspešno izmenjen!");
    } catch (error) {
      console.error("Failed to update account:", error);
    }
  };

  const handleDeleteSubmit = async () => {
    if (!selectedAccount || !selectedAccount.id) {
      console.error("No account selected for deletion");
      return;
    }

    try {
      console.log("Deleting account with ID:", selectedAccount.id);
      await dispatch(deleteChild(selectedAccount.id));
      closePopup();
      showSuccessMessage("Nalog je uspešno obrisan!");
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  // Create a unique key for each row
  const getRowKey = (account, index) => {
    return account.id ? `child-${account.id}` : `${account.username}-${index}`;
  };

  return (
    <>
      <div className="overflow-x-auto border border-purple-600 rounded-lg">
        <table className="min-w-full bg-opacity-90">
          <thead className="bg-opacity-90">
            <tr>
              <th className="px-4 py-2 text-sm font-semibold text-left text-gray-100">
                Username
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-left text-gray-100">
                Password
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-left text-gray-100">
                Akcije
              </th>
            </tr>
          </thead>
          <tbody>
            {safeAccounts.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="px-4 py-2 text-sm text-center text-gray-100"
                >
                  Nema kreiranih naloga
                </td>
              </tr>
            ) : (
              safeAccounts.map((account, index) => (
                <tr key={getRowKey(account, index)} className="hover:bg-gray-900">
                  <td className="px-4 py-2 text-sm text-gray-100">
                    {account.username}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-100">••••••</td>
                  <td className="flex items-center gap-3 px-4 py-2 text-sm text-gray-100">
                    <PencilSquareIcon
                      className="w-5 h-5 cursor-pointer hover:text-yellow-400"
                      onClick={() => openPopup(account, "edit")}
                    />
                    <TrashIcon
                      className="w-5 h-5 cursor-pointer hover:text-red-500"
                      onClick={() => openPopup(account, "delete")}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Popup */}
      {selectedAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-n-8/90 p-6 rounded-lg shadow-xl w-[90%] max-w-md border border-purple-600">
            <h2 className="mb-4 text-xl font-semibold text-white">
              {popupType === "edit" ? "Izmena naloga" : "Brisanje naloga"}
            </h2>

            {popupType === "edit" ? (
              <>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Username
                  </label>
                  <input
                    type="text"
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />

                  <label className="block mt-4 mb-1 text-sm font-medium text-gray-500">
                    Nova Lozinka
                  </label>
                  <input
                    type="password"
                    value={editedPassword}
                    onChange={(e) => setEditedPassword(e.target.value)}
                    placeholder="Unesite novu lozinku"
                    className="w-full p-2 border rounded dark:bg-slate-700 dark:text-white"
                  />
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={closePopup}
                    className="px-4 py-2 text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Otkaži
                  </button>
                  <button
                    onClick={handleEditSubmit}
                    disabled={!editedUsername || loading}
                    className="px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700 disabled:opacity-50"
                  >
                    {loading ? "Čuvanje..." : "Sačuvaj izmene"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="mb-4 text-sm text-gray-300">
                  Da li ste sigurni da želite da obrišete nalog{" "}
                  <strong>{selectedAccount.username}</strong>?
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={closePopup}
                    className="px-4 py-2 text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Otkaži
                  </button>
                  <button
                    onClick={handleDeleteSubmit}
                    disabled={loading}
                    className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    {loading ? "Brisanje..." : "Obriši"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <InfoPopup text={successMessage} type="success" />
      )}
    </>
  );
};

export default CreatedAccountTable;
