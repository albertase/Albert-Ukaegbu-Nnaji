import React, { FC, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext, UserContextType } from "../../context/context";
import arrowDown from "../../assets/icons/next.svg";
import {
  AuditIcon,
  DashboardIcon,
  DecisionIcon,
  FeesIcon,
  FeesPricingIcon,
  GuarantorsIcon,
  KarmaIcon,
  LoansIcon,
  LoansRequestIcon,
  LogOutIcon,
  PreferencesIcon,
  ReportsIcon,
  SavingsIcons,
  ServiceAccountIcon,
  ServicesIcon,
  SettlementsIcon,
  SwitchOrganizationIcon,
  SystemsIcons,
  TransactionsIcon,
  UsersIcon,
  WhitelistIcon,
} from "../svgIcons";
import "./SideNav.scss";

interface SideNavProps {
  closeSideNav: () => void;
}

const SideNav: FC<SideNavProps> = ({ closeSideNav }) => {
  const { LogOut } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();

  const handleLogout = () => {
    const result = LogOut();
    if (result === "done") {
      navigate("/");
    }
  };
  return (
    <div className="sideNav">
      <ul>
        <p className="cancelSideNav" onClick={closeSideNav}>
          x
        </p>
        <h5 className="switch">
          <SwitchOrganizationIcon /> Switch Organization
          <object data={arrowDown}  className="switchObj" width="17" height="17">˅</object>
        </h5>
        <NavLink to="/dashboard">
          <DashboardIcon /> Dashboard
        </NavLink>
        <h6>CUSTOMERS</h6>
        <NavLink to="/users">
          <UsersIcon /> Users
        </NavLink>
        <NavLink to="/guarantors">
          <GuarantorsIcon /> Guarantors
        </NavLink>
        <NavLink to="/loans">
          <LoansIcon /> Loans
        </NavLink>
        <NavLink to="/decision-models">
          <DecisionIcon /> Decision Models
        </NavLink>
        <NavLink to="/loan-requests">
          <LoansRequestIcon />
          Loan Requests
        </NavLink>
        <NavLink to="/whitelist">
          <WhitelistIcon /> Whitelist
        </NavLink>
        <NavLink to="/karma">
          <KarmaIcon /> Karma
        </NavLink>
        <h6>BUSINESSES</h6>
        <NavLink to="/organization">
          <SwitchOrganizationIcon />
          Organization
        </NavLink>
        <NavLink to="/loan-products">
          <LoansRequestIcon />
          Loan Products
        </NavLink>
        <NavLink to="/savings-products">
          <SavingsIcons /> Savings Products
        </NavLink>
        <NavLink to="/fees-charges">
          <FeesIcon /> Fees and Charges
        </NavLink>
        <NavLink to="/transactions">
          <TransactionsIcon /> Transactions
        </NavLink>
        <NavLink to="/services">
          <ServicesIcon />
          Services
        </NavLink>
        <NavLink to="/service-account">
          <ServiceAccountIcon /> Service Account
        </NavLink>
        <NavLink to="/settlements">
          <SettlementsIcon /> Settlements
        </NavLink>
        <NavLink to="/reports">
          <ReportsIcon /> Reports
        </NavLink>
        <h6>SETTINGS</h6>
        <NavLink to="/preferences">
          <PreferencesIcon /> Preferences
        </NavLink>
        <NavLink to="/fees-pricing">
          <FeesPricingIcon /> Fees and Pricing
        </NavLink>
        <NavLink to="/audit-logs">
          <AuditIcon /> Audit Logs
        </NavLink>
        <NavLink to="/systems-messages">
          <SystemsIcons /> Systems Messages
        </NavLink>
        <h5 className="switch logout" onClick={() => handleLogout()}>
          <LogOutIcon /> Logout
        </h5>
      </ul>
    </div>
  );
};

export default SideNav;
