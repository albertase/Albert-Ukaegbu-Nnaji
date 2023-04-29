import React from "react";
import { render, screen } from "@testing-library/react";
import OtherUserInfo from "./OtherUserInfo";

describe("OtherUserInfo component", () => {
  it("should render loading spinner when loading prop is true", () => {
    const userDetails = {
      profile: {
        firstName: "John",
        phoneNumber: "123456789",
        bvn: "123456789",
        gender: "Male",
      },
      email: "john@example.com",
      education: {
        level: "University",
        employmentStatus: "Employed",
        sector: "Tech",
        duration: "5 years",
        officeEmail: "john@example.com",
        monthlyIncome: ["200000", "300000"],
        loanRepayment: "On time",
      },
      socials: {
        twitter: "john_doe",
        facebook: "johndoe",
        instagram: "johndoe",
      },
      guarantor: {
        firstName: "Jane",
        lastName: "Doe",
        phoneNumber: "123456789",
      },
    };
    render(
      <OtherUserInfo userDetails={null} loading={true} tab={0} />
    );
    const loadingSpinner = screen.getByAltText("loading-spinner");
    expect(loadingSpinner).toBeInTheDocument();
  });
});