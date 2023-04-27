import React from "react";
import { UsersOverviewType } from "../../context/context";
import { ActiveUsers, AllUsers, LoansUsers, SavingUsers } from "../svgIcons";

interface OverviewProps {
  usersOverview: UsersOverviewType;
  loading: boolean;
}

const UserCards: React.FC<OverviewProps> = ({ usersOverview, loading }) => (
  <div className="cards">
    <div>
      <AllUsers />
      <p>Users</p>
      <h3>{loading ? "loading.." : usersOverview.allUsers}</h3>
    </div>
    <div>
      <ActiveUsers />
      <p>Active Users</p>
      <h3>{loading ? "loading.." : usersOverview.activeUsers}</h3>
    </div>
    <div>
      <LoansUsers />
      <p>Users with Loans</p>
      <h3>{loading ? "loading.." : usersOverview.userWithLoans}</h3>
    </div>
    <div>
      <SavingUsers />
      <p>Users with Savings</p>
      <h3>{loading ? "loading.." : usersOverview.usersWithSavings}</h3>
    </div>
  </div>
);

export default UserCards;