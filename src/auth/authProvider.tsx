import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';

const useAuthProvider = () => {
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return {
    userEmail,
    setUserEmail,
    isLoggedIn,
    setIsLoggedIn,
  };
};

const AuthContext = createContext<ReturnType<typeof useAuthProvider>>(
  {} as ReturnType<typeof useAuthProvider>,
);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const authProvider = useAuthProvider();

  return <AuthContext.Provider value={authProvider}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
