import React from "react";

const CreatedAccoutTable = ({ accounts }) => {
  return (
    <div className="overflow-x-auto border border-purple-600 rounded-lg">
      <table className="min-w-full bg-opacity-90">
        <thead className=" bg-opacity-90">
          <tr>
            <th className="px-4 py-2 text-sm font-semibold text-left text-gray-100 ">
              ID
            </th>
            <th className="px-4 py-2 text-sm font-semibold text-left text-gray-100">
              Username
            </th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id} className="hover:bg-gray-900">
              <td className="px-4 py-2 text-sm text-gray-100 ">{account.id}</td>
              <td className="px-4 py-2 text-sm text-gray-100">
                {account.username}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreatedAccoutTable;
