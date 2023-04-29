import React from "react";
import { render, screen } from "@testing-library/react";
import ProfileCard from "./ProfileCard";

const testUserDetails = {
  profile: {
    avatar: "https://example.com/avatar.png",
    firstName: "John",
    lastName: "Doe",
  },
  accountBalance: 1000,
  accountNumber: "1234567890",
};

describe("ProfileCard component", () => {
  test("renders profile data when not loading", () => {
    render(
      <ProfileCard
        userDetails={null}
        loading={false}
        switchTab={() => {}}
        tab={0}
      />
    );

    const profileData = screen.getByTestId("profileData");
    expect(profileData).toBeInTheDocument();
  });

  test("renders loader when loading", () => {
    render(
      <ProfileCard
        userDetails={null}
        loading={true}
        switchTab={() => {}}
        tab={0}
      />
    );

    const loader = screen.getByAltText("Loading...");
    expect(loader).toBeInTheDocument();
  });

  test("renders correct user details navigation item as active", () => {
    render(
      <ProfileCard
        userDetails={null}
        loading={false}
        switchTab={() => {}}
        tab={2}
      />
    );

    const activeNavItem = screen.getByText("Bank Details");
    expect(activeNavItem).toHaveClass("active");
  });

  test("switchTab function is called with correct argument on nav item click", () => {
    const switchTab = jest.fn();
    render(
      <ProfileCard
        userDetails={null}
        loading={false}
        switchTab={switchTab}
        tab={0}
      />
    );

    const navItem = screen.getByText("Savings");
    navItem.click();
    expect(switchTab).toHaveBeenCalledWith(4);
  });
});