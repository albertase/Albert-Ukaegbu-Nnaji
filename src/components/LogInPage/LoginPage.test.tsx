import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import LogInPage from "./LoginPage";

describe("LogInPage", () => {
  test("renders login page with header", () => {
    render(<LogInPage />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();
  });

  test("renders login form", () => {
    render(<LogInPage />);
    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

  test("displays error message on failed login", async () => {
    const mockGetUsersApi = jest.fn(() => {
      throw new Error("API error");
    });
    jest.mock("../../api", () => ({
      getUsersApi: mockGetUsersApi,
    }));
    render(<LogInPage />);
    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
    const errorMessage = await screen.findByText(
      "Something went wrong check your network and try again"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("navigates to users page on successful login", async () => {
    const mockUsers = [
      {
        email: "test@example.com",
        password: "testpassword",
        profile: {
          avatar: "",
        },
      },
    ];
    const mockGetUsersApi = jest.fn(() => {
      return { data: mockUsers };
    });
    jest.mock("../../api", () => ({
      getUsersApi: mockGetUsersApi,
    }));
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      useNavigate: () => mockNavigate,
    }));
    render(<LogInPage />);
    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
    expect(mockUsers[0].email).toEqual(emailInput);
    expect(mockUsers[0].profile.avatar).toEqual("");
    expect(localStorage.getItem("user")).toEqual(
      JSON.stringify({
        email: "test@example.com",
        password: "testpassword",
        avatar: "",
      })
    );
    expect(mockNavigate).toHaveBeenCalledWith("/users");
  });

  test("displays forgot password information on click", () => {
    render(<LogInPage />);
    const forgotPasswordButton = screen.getByRole("button", {
      name: /forgot password/i,
    });
    fireEvent.click(forgotPasswordButton);
    const forgotPasswordText = screen.getByText(
      "Take Note: You can log in with a random Email and Password that matches this form validation."
    );
    expect(forgotPasswordText).toBeInTheDocument();
  });
});