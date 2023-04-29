import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TableHead, { TableProps } from "./TableHead";

describe("TableHead", () => {
  const props: TableProps = {
    openFilter: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders all column headers", () => {
    render(<TableHead {...props} />);
    expect(screen.getByText("Organization")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone Number")).toBeInTheDocument();
    expect(screen.getByText("Date joined")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("calls openFilter when a filter button is clicked", () => {
    render(<TableHead {...props} />);
    const filterButtons = screen.getAllByRole("button");
    userEvent.click(filterButtons[0]);
    expect(props.openFilter).toHaveBeenCalledTimes(1);
  });
});