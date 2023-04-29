import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TableHead from "./TableHead";

describe("TableHead component", () => {
test("renders all table headers with filter icons", () => {
const mockOpenFilter = jest.fn();
const props = {
openFilter: mockOpenFilter,
};
render(<TableHead {...props} />);

screen.getByText("Organization");
screen.getByText("Username");
screen.getByText("Email");
screen.getByText("Phone Number");
screen.getByText("Date joined");
screen.getByText("Status");

const filterButtons = screen.getAllByRole("button");
expect(filterButtons.length).toBe(6);

fireEvent.click(filterButtons[0]);
expect(mockOpenFilter).toHaveBeenCalled();
});
});