import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import SideNav from "./SideNavBar";
import { UserContext} from "../../context/context";


describe("SideNav", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <SideNav closeSideNav={() => {}} />
      </MemoryRouter>
    );
  });

  it("renders all the navigation links", () => {
    render(
      <MemoryRouter>
        <SideNav closeSideNav={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Guarantors")).toBeInTheDocument();
    expect(screen.getByText("Loans")).toBeInTheDocument();
    expect(screen.getByText("Decision Models")).toBeInTheDocument();
    expect(screen.getByText("Loan Requests")).toBeInTheDocument();
    expect(screen.getByText("Whitelist")).toBeInTheDocument();
    expect(screen.getByText("Karma")).toBeInTheDocument();
    expect(screen.getByText("Organization")).toBeInTheDocument();
    expect(screen.getByText("Loan Products")).toBeInTheDocument();
    expect(screen.getByText("Savings Products")).toBeInTheDocument();
    expect(screen.getByText("Fees and Charges")).toBeInTheDocument();
    expect(screen.getByText("Transactions")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Service Account")).toBeInTheDocument();
    expect(screen.getByText("Settlements")).toBeInTheDocument();
    expect(screen.getByText("Reports")).toBeInTheDocument();
    expect(screen.getByText("Preferences")).toBeInTheDocument();
    expect(screen.getByText("Fees and Pricing")).toBeInTheDocument();
    expect(screen.getByText("Audit Logs")).toBeInTheDocument();
    expect(screen.getByText("Systems Messages")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("closes the SideNav when cancelSideNav is called", () => {
    const closeSideNav = jest.fn();
    render(
      <MemoryRouter>
        <SideNav closeSideNav={closeSideNav} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("x"));
    expect(closeSideNav).toHaveBeenCalled();
  });

  it("calls the LogOut function and navigates to '/' when Logout link is clicked", () => {
    const LogOut = jest.fn(() => "done");
    const navigate = jest.fn();
    render(
      <MemoryRouter>
        <SideNav closeSideNav={() => {}} />
      </MemoryRouter>,
    //   {
    //     wrapper: ({ children }) => (
    //       <MemoryRouter>
    //         <UserContext.Provider value={{LogOut}}>
    //           {children}
    //         </UserContext.Provider>
    //         {/* <Router history={{ push: navigate }} /> */}
    //       </MemoryRouter>
    //     ),
    //   }
    );
    fireEvent.click(screen.getByText("Logout"));
    expect(LogOut).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith("/");
  });
});