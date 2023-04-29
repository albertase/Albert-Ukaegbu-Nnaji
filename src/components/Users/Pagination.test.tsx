import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

test("renders pagination component", () => {
  render(
    <Pagination
      currentPage={1}
      numberOfPages={5}
      next={() => {}}
      previous={() => {}}
      setPage={() => {}}
    />
  );

  const total = screen.getByText(/Showing/);
  const control = screen.getByText(/1/);
  const outOf = screen.getByText(/5/);

  expect(total).toBeInTheDocument();
  expect(control).toBeInTheDocument();
  expect(outOf).toBeInTheDocument();

  const numbers = screen.getAllByRole("button", { name: /\d+/ });
  expect(numbers).toHaveLength(5);

  fireEvent.click(numbers[3]);

  expect(screen.getByText(/4/)).toBeInTheDocument();
});