import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const CreatedAccountTable = ({ accounts }) => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [popupType, setPopupType] = useState(""); // "edit" ili "delete"
  const [editedUsername, setEditedUsername] = useState("");
  const [editedPassword, setEditedPassword] = useState("");

  const openPopup = (account, type) => {
    setSelectedAccount(account);
    setPopupType(type);
    if (type === "edit") {
      setEditedUsername(account.username);
      setEditedPassword(account.password);
    }
  };

  const closePopup = () => {
    setSelectedAccount(null);
    setPopupType("");
    setEditedUsername("");
    setEditedPassword("");
  };

  const handleEditSubmit = () => {
    const updatedData = {
      ...selectedAccount,
      username: editedUsername,
      password: editedPassword,
    };
    console.log("Izmenjeni nalog:", updatedData);
    closePopup();
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
            {accounts.map((account) => (
              <tr key={account.id} className="hover:bg-gray-900">
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup */}
      {selectedAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="w-full max-w-md p-6 border border-purple-600 rounded-lg shadow-lg bg-black/75 dark:bg-slate-800">
            <h2 className="mb-4 text-xl font-semibold text-purple-600">
              {popupType === "edit" ? "Izmena naloga" : "Brisanje naloga"}
            </h2>

            {popupType === "edit" ? (
              <>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-500 ">
                    Username
                  </label>
                  <input
                    type="text"
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                    className="w-full p-2 border rounded "
                  />

                  <label className="block mt-4 mb-1 text-sm font-medium text-gray-500 ">
                    Lozinka
                  </label>
                  <input
                    type="text"
                    value={editedPassword}
                    onChange={(e) => setEditedPassword(e.target.value)}
                    className="w-full p-2 border rounded dark:bg-slate-700 dark:text-white"
                  />
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={closePopup}
                    className="px-4 py-2 text-gray-800 bg-gray-200 rounded hover:bg-gray-300 "
                  >
                    Otkaži
                  </button>
                  <button
                    onClick={handleEditSubmit}
                    className="px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700"
                  >
                    Sačuvaj izmene
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="mb-4 text-sm text-gray-300 ">
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
                    onClick={() => {
                      console.log("Obrisan nalog:", selectedAccount);
                      closePopup();
                    }}
                    className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                  >
                    Obriši
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CreatedAccountTable;
