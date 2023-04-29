import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route } from "react-router-dom";
import { UserContext, UserContextType } from "../../context/context";
import UserDetails from "./User";

describe("UserDetails", () => {
  const getUser = jest.fn();
  const updateUser = jest.fn();
  const userDetails = {
    id: "1",
    profile: {
      firstName: "John",
      lastName: "Doe",
      avatar: "",
    },
    accountBalance: 1000,
    accountNumber: "1234567890",
  };
  const users = [userDetails];
  const loading = false;

  const userContext = {
    loading,
    users,
    userDetails,
    getUser,
    updateUser,
  };

  beforeEach(() => {
    getUser.mockClear();
    updateUser.mockClear();
  });

  test("renders back button and page title", () => {
    render(
      <MemoryRouter initialEntries={["/user/1"]}>
        <Route path="/user/:id">
          <UserContext.Provider value={null}>
            <UserDetails />
          </UserContext.Provider>
        </Route>
      </MemoryRouter>
    );

    expect(screen.getByText(/back to users/i)).toBeInTheDocument();
    expect(screen.getByText(/user details/i)).toBeInTheDocument();
  });

  test("handles clicking on back button", () => {
    const navigate = jest.fn();
    render(
      <MemoryRouter initialEntries={["/user/1"]}>
        <Route path="/user/:id">
          <UserContext.Provider value={null}>
            {/* <UserDetails navigate={navigate} /> */}
          </UserContext.Provider>
        </Route>
      </MemoryRouter>
    );

    userEvent.click(screen.getByText(/back to users/i));
    expect(navigate).toHaveBeenCalledWith(-1);
  });

  test("handles clicking on blacklist/activate user button", () => {
    render(
      <MemoryRouter initialEntries={["/user/1"]}>
        <Route path="/user/:id">
          <UserContext.Provider value={null}>
            <UserDetails />
          </UserContext.Provider>
        </Route>
      </MemoryRouter>
    );

    userEvent.click(screen.getByText(/blacklist user/i));
    expect(updateUser).toHaveBeenCalledWith("1", users, "blacklisted");

    userEvent.click(screen.getByText(/activate user/i));
    expect(updateUser).toHaveBeenCalledWith("1", users, "active");
  });

  test("renders ProfileCard and OtherUserInfo components", () => {
    render(
      <MemoryRouter initialEntries={["/user/1"]}>
        <Route path="/user/:id">
          <UserContext.Provider value={null}>
            <UserDetails />
          </UserContext.Provider>
        </Route>
      </MemoryRouter>
    );

    expect(screen.getByText(/john/i)).toBeInTheDocument();
    expect(screen.getByText(/doe/i)).toBeInTheDocument();
    expect(screen.getByText(/₦1000/i)).toBeInTheDocument();
    expect(screen.getByText(/1234567890/i)).toBeInTheDocument();
    expect(screen.getByText(/general details/i)).toBeInTheDocument();
    expect(screen.getByText(/documents/i)).toBeInTheDocument();
    expect(screen.getByText(/bank details/i)).toBeInTheDocument();
    expect(screen.getByText(/loans/i)).toBeInTheDocument();
    expect(screen.getByText(/savings/i)).toBeInTheDocument();
    expect(screen.getByText(/app and system/i)).toBeInTheDocument();
  });
});