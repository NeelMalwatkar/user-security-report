import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

function UserTable({ data }) {
  const [sorting, setSorting] = useState([]);

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("create_date", {
      header: "Created",
      cell: info =>
        new Date(info.getValue()).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
    }),
    columnHelper.accessor("password_changed_date", {
      header: "Password Changed",
      cell: info =>
        new Date(info.getValue()).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
    }),
    columnHelper.accessor("days_since_password_change", {
      header: "Days Since Password Change",
      cell: info => {
        const days = info.getValue();
        const color =
          days > 365 ? "bg-red-300" : days > 90 ? "" : "";
        return <span className={`${color} px-2 py-1 rounded`}>{days}</span>;
      },
    }),
    columnHelper.accessor("last_access_date", {
      header: "Last Access",
      cell: info =>
        new Date(info.getValue()).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
    }),
    columnHelper.accessor("days_since_last_access", {
      header: "Days Since Last Access",
      cell: info => {
        const days = info.getValue();
        const color =
          days > 365 ? "bg-red-300" : days > 90 ? "bg-yellow-200" : "";
        return <span className={`${color} px-2 py-1 rounded`}>{days}</span>;
      },
    }),
    columnHelper.accessor("mfa_enabled", {
      header: "MFA Enabled",
      cell: info => (info.getValue() ? "Yes" : "No"),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

return (
  <div className="max-h-[80vh] overflow-y-auto border border-gray-300 rounded-lg">
    <table className="min-w-full text-left text-sm">
      <thead className="sticky top-0 bg-gray-100 z-10">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                className="px-4 py-2 font-medium text-gray-700 cursor-pointer select-none"
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
                {header.column.getIsSorted() === "asc" && " 🔼"}
                {header.column.getIsSorted() === "desc" && " 🔽"}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id} className="border-t hover:bg-gray-50">
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="px-4 py-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default UserTable;
