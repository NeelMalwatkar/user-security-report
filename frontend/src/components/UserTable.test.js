import React from "react";
import { render, screen } from "@testing-library/react";
import UserTable from "./UserTable";

const mockData = [
  {
    name: "Test User",
    create_date: "04/01/2024",
    password_changed_date: "05/01/2024",
    last_access_date: "04/30/2024",
    mfa_enabled: true,
    days_since_password_change: 10,
    days_since_last_access: 5,
  },
];

test("renders UserTable with mock data", () => {
  render(<UserTable data={mockData} />);
  
  // Check if user name appears
  expect(screen.getByText("Test User")).toBeInTheDocument();

  // Check MFA value
  expect(screen.getByText("Yes")).toBeInTheDocument();

  // Check days since values
  expect(screen.getByText("10")).toBeInTheDocument();
  expect(screen.getByText("5")).toBeInTheDocument();
});
