import React, { useState } from "react";
import Section from "../Section";
import { NeonGlow } from "../../assets";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";

const AccountTable = () => {
  // Zakucani nalozi za prikaz
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      username: "admin1",
      email: "admin1@mail.com",
      password: "admin123",
    },
    {
      id: 2,
      username: "admin2",
      email: "admin2@mail.com",
      password: "admin456",
    },
    { id: 3, username: "prof1", email: "prof1@mail.com", password: "prof123" },
    { id: 4, username: "user1", email: "user1@mail.com", password: "user321" },
    { id: 5, username: "user2", email: "user2@mail.com", password: "user654" },
    { id: 6, username: "user3", email: "user3@mail.com", password: "user999" },
    { id: 7, username: "prof2", email: "prof2@mail.com", password: "prof456" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(accounts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAccounts = accounts.slice(indexOfFirstItem, indexOfLastItem);

  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  const handleEditSave = () => {
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === editingUser.id ? editingUser : acc))
    );
    setEditingUser(null);
  };

  const handleDeleteConfirm = () => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== deletingUser.id));
    setDeletingUser(null);
  };
  return (
    <Section>
      <div className="relative items-center justify-center min-h-screen overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={NeonGlow}
            className="object-cover w-full h-full "
            alt="hero"
          />
        </div>
        <div className="min-h-screen p-6 px-4 mt-20 lg:px-20">
          <h2 className="mb-4 text-2xl font-bold text-center text-gray-300 ">
            Pregled naloga
          </h2>

          <div className="overflow-x-auto border border-purple-300 rounded-md shadow-lg">
            <table className="w-full text-left border-collapse rounded-lg shadow-md">
              <thead className="text-white bg-purple-600 ">
                <tr>
                  <th className="p-3">Username</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Lozinka</th>
                  <th className="p-3 text-center">Akcije</th>
                </tr>
              </thead>
              <tbody className="bg-opacity-90 dark:bg-slate-700">
                {currentAccounts.map((account) => (
                  <tr
                    key={account.id}
                    className="border-b dark:border-slate-600"
                  >
                    <td className="p-3">{account.username}</td>
                    <td className="p-3">{account.email}</td>
                    <td className="p-3">
                      {"•".repeat(account.password.length)}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <PencilSquareIcon
                          className="cursor-pointer h-7 w-7 hover:scale-110"
                          onClick={() => setEditingUser({ ...account })}
                        />
                        <TrashIcon
                          className="cursor-pointer h-7 w-7 hover:scale-110"
                          onClick={() => setDeletingUser(account)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginacija */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1
                    ? "bg-purple-600 text-white"
                    : "bg-opacity-90"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          {/* Edit user popup */}
          {editingUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50">
              <div className="w-full max-w-md p-6 border border-purple-600 rounded-lg shadow-lg bg-n-8/90">
                <h3 className="mb-4 text-xl font-bold text-center">
                  Izmeni korisnika
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    className="w-full p-2 border border-purple-600 rounded bg-n-8/90"
                    value={editingUser.username}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        username: e.target.value,
                      })
                    }
                    placeholder="Username"
                  />
                  <input
                    type="email"
                    className="w-full p-2 border border-purple-600 rounded bg-n-8/90"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    className="w-full p-2 border border-purple-600 rounded bg-n-8/90"
                    value={editingUser.password}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        password: e.target.value,
                      })
                    }
                    placeholder="Lozinka"
                  />
                  <div className="flex justify-end pt-2 space-x-2">
                    <button
                      onClick={() => setEditingUser(null)}
                      className="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Otkaži
                    </button>
                    <button
                      onClick={handleEditSave}
                      className="px-4 py-2 text-sm text-white bg-purple-600 rounded hover:bg-purple-500"
                    >
                      Sačuvaj
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirm Modal */}
          {deletingUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50">
              <div className="w-full max-w-sm p-6 border border-purple-600 rounded-lg shadow-lg bg-n-8/90">
                <h3 className="mb-4 text-xl font-bold text-center text-white">
                  Brisanje korisnika
                </h3>
                <p className="mb-4 text-center">
                  Da li ste sigurni da želite da obrišete korisnika{" "}
                  <strong>{deletingUser.username}</strong>?
                </p>
                <div className="flex justify-end pt-2 space-x-2">
                  <button
                    onClick={() => setDeletingUser(null)}
                    className="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Otkaži
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                  >
                    Obriši
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default AccountTable;
