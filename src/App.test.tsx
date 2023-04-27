import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import App from './App';
import Header from "./components/Header/Header";
import LogInPage from "./components/LogInPage/LoginPage";
import { getUsersApi } from "./api";
import UserDetails from "./components/User/User";




const mockUserContextValue = {
  users: [
    {
      id: "1",
      userName: "johndoe",
      orgName: "Acme Inc.",
      email: "johndoe@acme.com",
      phoneNumber: "555-1234",
      status: "active",
    },
    {
      id: "2",
      userName: "janedoe",
      orgName: "Acme Inc.",
      email: "janedoe@acme.com",
      phoneNumber: "555-5678",
      status: "inactive",
    },
  ],
  LogOut: jest.fn(),
  getUsers: jest.fn(),
};


describe("Header", () => {
  it("renders the logo", () => {
    render( <Header />)
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("searches for users", () => {
    render(<Header />);
    const searchInput = screen.getByPlaceholderText("Search for anything");
    fireEvent.change(searchInput, { target: { value: "john" } });
    expect(screen.getByText("johndoe@acme.com")).toBeInTheDocument();
    expect(screen.queryByText("janedoe@acme.com")).not.toBeInTheDocument();
  });

  it("opens the profile dropdown", () => {
    render(<Header />);
    const profileButton = screen.getByText("johndoe");
    fireEvent.click(profileButton);
    expect(screen.getByText("Log Out")).toBeInTheDocument();
  });

  it("logs out the user", () => {
    render(<Header />);
    const profileButton = screen.getByText("johndoe");
    fireEvent.click(profileButton);
    const logoutButton = screen.getByText("Log Out");
    fireEvent.click(logoutButton);
    expect(mockUserContextValue.LogOut).toHaveBeenCalled();
  });

  it("opens the mobile navigation menu", () => {
    render(<Header />);
    const menuButton = screen.getByRole("button", { name: "Menu" });
    fireEvent.click(menuButton);
    expect(screen.getByText("johndoe")).toBeInTheDocument();
  });

  it("closes the mobile navigation menu", () => {
    render(<Header />);
    const menuButton = screen.getByRole("button", { name: "Menu" });
    fireEvent.click(menuButton);
    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);
    expect(screen.queryByText("johndoe")).not.toBeInTheDocument();
  });
});


// TESTING THE HANDLE LOGIN FUNCTION

test("renders LogInPage without crashing", () => {
  render(<LogInPage />);
});

test("renders logo in header", () => {
  render(<LogInPage />);
  const logo = screen.getByTestId("logo");
  expect(logo).toBeInTheDocument();
});


test("toggles password visibility when clicking SHOW button", () => {
  render(<LogInPage />);
  const passwordInput = screen.getByPlaceholderText("Password");
  const showButton = screen.getByText("SHOW");

  expect(passwordInput).toBe("password");

  fireEvent.click(showButton);

  expect(passwordInput).toBe("text");
});



test("calls handleLogin when submitting the form", () => {
  render(<LogInPage />);
  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const submitButton = screen.getByText("LOG IN");

  const handleLoginMock = jest.fn();
  LogInPage.prototype.handleLogin = handleLoginMock;

  fireEvent.change(emailInput, { target: { value: "test@test.com" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  fireEvent.click(submitButton);

  expect(handleLoginMock).toHaveBeenCalled();
});


jest.mock("./api");

test("displays error message when API request fails", async () => {
  getUsersApi();
  render(<LogInPage />);
  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const submitButton = screen.getByText("LOG IN");

  fireEvent.change(emailInput, { target: { value: "test@test.com" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  fireEvent.click(submitButton);

  const errorMessage = await screen.findByText("Something went wrong try again");
  expect(errorMessage).toBeInTheDocument();
});


// TESTING USERS DETAILS
describe("UserDetails component", () => {
  it("should render user details correctly", async () => {
    const mockUserContext = {
      loading: false,
      users: [],
      userDetails: {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "1234567890",
        address: {
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zip: "10001"
        }
      },
      updateUser: jest.fn(),
      getUser: jest.fn()
    };

    const mockUseParams = jest.fn().mockReturnValue({ id: "1" });
    const mockUseNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      useNavigate: () => mockUseNavigate,
      useParams: () => mockUseParams
    }));
    jest.mock("../../globalState", () => ({
      UserContext: React.createContext(mockUserContext)
    }));

    render(<UserDetails />);

    expect(screen.getByText("User Details")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
    expect(screen.getByText("123 Main St")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("NY")).toBeInTheDocument();
    expect(screen.getByText("10001")).toBeInTheDocument();
  });
});




// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
