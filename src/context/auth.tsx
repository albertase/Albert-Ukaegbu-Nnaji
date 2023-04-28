import React, { createContext, useState, useCallback, useMemo } from "react";

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

  const getUser = useCallback((): IAuth | void => {
    setLoading(true);
    // ... Do something to get the user data
    setLoading(false);
  }, []);

  const isLoggedIn = useMemo(() => !!user, [user]);

  const authContextValue = useMemo(() => ({
    user,
    isLoggedIn,
    loading,
    getUser,
  }), [user, isLoggedIn, loading, getUser]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserProvider;