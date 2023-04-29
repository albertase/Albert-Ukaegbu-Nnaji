import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header component", () => {
  
  const mockUser = {
    email: "test@example.com",
    avatar: "https://example.com/avatar.png",
  };
  const mockUsers = [
    {
      id: "1",
      userName: "JohnDoe",
      orgName: "TestOrg",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
      status: "active",
    },
    {
      id: "2",
      userName: "JaneDoe",
      orgName: "TestOrg",
      email: "jane.doe@example.com",
      phoneNumber: "123-456-7891",
      status: "inactive",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem("user", JSON.stringify(mockUser));
  });

  afterEach(() => {
    localStorage.removeItem("user");
  });

  it("renders the logo", () => {
    render(<Header />, { wrapper: MemoryRouter });
    const logoElement = screen.getByAltText("Logo");
    expect(logoElement).toBeInTheDocument();
  });

  it("renders the search bar", () => {
    render(<Header />, { wrapper: MemoryRouter });
    const searchInputElement = screen.getByPlaceholderText("Search for anything");
    expect(searchInputElement).toBeInTheDocument();
  });

  it("shows search results when user types in search bar", async () => {
    const mockFilterSearch = jest.fn();
    jest.spyOn(React, "useState").mockReturnValueOnce(["", mockFilterSearch]).mockReturnValueOnce([mockUsers, jest.fn()]);

    render(<Header />, { wrapper: MemoryRouter });
    const searchInputElement = screen.getByPlaceholderText("Search for anything");
    fireEvent.change(searchInputElement, { target: { value: "john" } });

    expect(mockFilterSearch).toHaveBeenCalledWith("john");
    const searchResultElement = await screen.findByText("Organization: TestOrg Username: JohnDoe Email: john.doe@example.com Status: active");
    expect(searchResultElement).toBeInTheDocument();
  });

  it("does not show search results when user clears the search bar", async () => {
    const mockFilterSearch = jest.fn();
    jest.spyOn(React, "useState").mockReturnValueOnce(["", mockFilterSearch]).mockReturnValueOnce([mockUsers, jest.fn()]);

    render(<Header />, { wrapper: MemoryRouter });
    const searchInputElement = screen.getByPlaceholderText("Search for anything");
    fireEvent.change(searchInputElement, { target: { value: "john" } });
    fireEvent.change(searchInputElement, { target: { value: "" } });

    expect(mockFilterSearch).toHaveBeenCalledWith("");
    const searchResultElement = screen.queryByText("Organization: TestOrg Username: JohnDoe Email: john.doe@example.com Status: active");
    expect(searchResultElement).not.toBeInTheDocument();
  });

  })