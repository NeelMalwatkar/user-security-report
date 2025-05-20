import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders filter dropdown", () => {
  render(<App />);
  expect(screen.getByText("Filter by MFA:")).toBeInTheDocument();
});
