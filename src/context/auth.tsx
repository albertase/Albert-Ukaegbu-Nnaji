import React, { createContext, useState } from "react";

export interface IAuth {
  email: string;
  password: string;
}

export type AuthContextType = {
  user: IAuth | null;
  isLoggedIn: boolean;
  loading: boolean;
  getUser: () => IAuth | void;
};

type Props = {
  children?: React.ReactNode;
  state?: IAuth | null;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  loading: false,
  getUser: () => {},
});

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IAuth | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const getUser = (): IAuth | void => {
    setLoading(true);
    
    setLoading(false);
  };

  const authContextValue: AuthContextType = {
    user,
    isLoggedIn,
    loading,
    getUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserProvider;