import React, { createContext} from "react";
import { getUsersApi, getUserApi } from "../api";
import dayjs from "dayjs";
import { compareDates, formatNumber } from "../utils";

type ProfileType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar: string;
  gender: string;
  bvn: string;
  address: string;
  currency: string;
};
type GuarantorType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  address: string;
};

export interface IUser {
  id: string;
  createdAt: string;
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  lastActiveDate: string;
  profile: ProfileType;
  guarantor: GuarantorType;
  accountBalance: string;
  accountNumber: string;
  status: string;
  socials: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  education: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: string[];
    loanRepayment: string;
  };
}
export type UsersOverviewType = {
  allUsers: number;
  activeUsers: number;
  userWithLoans: number;
  usersWithSavings: number;
};
export type UserContextType = {
  users: IUser[];
  userDetails: IUser | null;
  updateUser: (id: string, currentUsers: IUser[], status: string) => void;
  getUsers: () => Promise<IUser[] | void>;
  getUser: (id: number) => Promise<IUser | void>;
  usersOverview: UsersOverviewType;
  loading: boolean;
  LogOut: () => string;
};

type Props = {
  children?: React.ReactNode;
  state?: IUser[] | null;
};

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: Props) => {
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [userDetails, setUserDetails] = React.useState<IUser | null>(null);

  const [usersOverview, setUsersOverview] = React.useState<UsersOverviewType>({
    allUsers: 0,
    activeUsers: 0,
    userWithLoans: 0,
    usersWithSavings: 0,
  });
  const [loading, setLoading] = React.useState<boolean>(false);


  const getUsers = async () => {
    setLoading(true);

    try {
      const res = await getUsersApi();
      let withLoans = 0;
      let withSavings = 0;
      let activeUsers = 0;
      let generated = res.data.map((user: IUser) => {
        if (
          Number(user?.accountBalance) -
            Number(user?.education?.loanRepayment) >
          1
        ) {
          withLoans += 1;
        } else {
          withSavings += 1;
        }

        if (compareDates(user.createdAt, user.lastActiveDate)) {
          activeUsers += 1;
          return {
            ...user,
            status: "inactive",
            createdAt: dayjs(user.createdAt).format("MMM D, YYYY h:mm A"),
            phoneNumber: formatNumber(user.phoneNumber),
          };
        } else {
          return {
            ...user,
            status: "pending",
            createdAt: dayjs(user.createdAt).format("MMM D, YYYY h:mm A"),
            phoneNumber: formatNumber(user.phoneNumber),
          };
        }
      });
      setUsers(generated);
      setUsersOverview({
        ...usersOverview,
        allUsers: res.data.length,
        userWithLoans: withLoans,
        usersWithSavings: withSavings,
        activeUsers: activeUsers,
      });
    } catch (error) {
      console.log("something went wrong...");
    }
    setLoading(false);
  };
  const getUser = async (id: number) => {
    setLoading(true);
    try {
      const res = await getUserApi(id);
      setUserDetails(res.data);
    } catch (error) {
      console.log("something went wrong...");
    }
    setLoading(false);
  };

  const updateUser = (id: string, currentUsers: IUser[], status: string) => {
    const userDetails = currentUsers.map((user) => {
      if (user.id === id) {
        return { ...user, status };
      }
      return user;
    });
    setUsers(userDetails);
  };

  const LogOut = () => {
    localStorage.removeItem("user");
    return "done";
  };
  return (
    <UserContext.Provider
      value={{
        loading,
        users,
        getUsers,
        updateUser,
        getUser,
        userDetails,
        usersOverview,
        LogOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;