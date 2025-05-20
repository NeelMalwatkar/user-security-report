import React, { useEffect, useState } from "react";
import UserTable from "./components/UserTable";

function App() {
  const [users, setUsers] = useState([]);
  const [mfaFilter, setMfaFilter] = useState("all");

  useEffect(() => {
    const isDev = process.env.NODE_ENV === "development";
    const url = isDev
      ? "/api/users"
      : `${process.env.PUBLIC_URL}/userdata.json`;

    fetch(url)
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  const filteredUsers = users.filter((u) => {
    if (mfaFilter === "true") return u.mfa_enabled === true;
    if (mfaFilter === "false") return u.mfa_enabled === false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        User Security Dashboard
      </h1>

      <div className="w-full max-w-6xl">
        
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
  {/* Filter Dropdown */}
  <div>
    <label className="mr-2 font-medium">Filter by MFA:</label>
    <select
      className="border rounded px-2 py-1"
      value={mfaFilter}
      onChange={(e) => setMfaFilter(e.target.value)}
    >
      <option value="all">All</option>
      <option value="true">MFA Enabled</option>
      <option value="false">MFA Disabled</option>
    </select>
  </div>

  {/* Legend */}
  <div className="flex gap-4 text-sm text-gray-700">
    <span className="flex items-center gap-2">
      <span className="inline-block w-4 h-4 bg-yellow-200 rounded-sm"></span>
      Stale (90+ days)
    </span>
    <span className="flex items-center gap-2">
      <span className="inline-block w-4 h-4 bg-red-300 rounded-sm"></span>
      Outdated (1+ year)
    </span>
  </div>
</div>


        <UserTable data={filteredUsers} />
      </div>
    </div>
  );
}

export default App;
