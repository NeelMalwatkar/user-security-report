import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [filterMFA, setFilterMFA] = useState("all");

useEffect(() => {
  const baseURL =
  process.env.NODE_ENV === "development"
    ? ""
    : process.env.PUBLIC_URL || "";
  const url =
    process.env.NODE_ENV === "development"
      ? `${baseURL}/api/users`
      : `${baseURL}/data.json`;

  fetch(url)
    .then((res) => res.json())
    .then(setUsers)
    .catch(console.error);
}, []);

  const filteredUsers = users.filter((u) => {
    if (filterMFA === "true") return u.mfa_enabled === true;
    if (filterMFA === "false") return u.mfa_enabled === false;
    return true;
  });

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">User Security Report</h1>

      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by MFA:</label>
        <select
          className="border rounded px-2 py-1"
          value={filterMFA}
          onChange={(e) => setFilterMFA(e.target.value)}
        >
          <option value="all">All</option>
          <option value="true">MFA Enabled</option>
          <option value="false">MFA Disabled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">Name</th>
              <th className="border px-3 py-2 text-left">Created</th>
              <th className="border px-3 py-2 text-left">Password Changed</th>
              <th className="border px-3 py-2 text-left">Days Since Password Change</th>
              <th className="border px-3 py-2 text-left">Last Access</th>
              <th className="border px-3 py-2 text-left">Days Since Last Access</th>
              <th className="border px-3 py-2 text-left">MFA</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u, i) => (
              <tr
                key={i}
                className={
                  u.days_since_password_change > 365
                    ? "bg-red-100"
                    : u.days_since_last_access > 90
                    ? "bg-yellow-100"
                    : ""
                }
              >
                <td className="border px-3 py-2">{u.name}</td>
                <td className="border px-3 py-2">{u.create_date}</td>
                <td className="border px-3 py-2">{u.password_changed_date}</td>
                <td className="border px-3 py-2">{u.days_since_password_change}</td>
                <td className="border px-3 py-2">{u.last_access_date}</td>
                <td className="border px-3 py-2">{u.days_since_last_access}</td>
                <td className="border px-3 py-2">
                  {u.mfa_enabled ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
