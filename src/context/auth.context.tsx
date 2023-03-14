import React, {
  useState, createContext, useMemo, useContext, useEffect,
} from 'react';

type TUser = {
  token: string,
  username: string,
  id: number
}

type TAuthContext = {
  user: TUser,
  handleLogin: (param: TUser) => void,
  handleLogout: () => void,
}

interface IProps {
  children: React.ReactNode;
}

const initialState = {
  token: '',
  username: '',
  id: 0,
};

export const AuthContext = createContext({} as TAuthContext);

export function AuthProvider({ children }: IProps) {
  const [user, setUser] = useState(initialState);

  const handleLogin = (param: TUser) => {
    localStorage.setItem('user', JSON.stringify(param));
    setUser(param);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(initialState);
    window.location.pathname = '/';
  };

  const value = useMemo(() => ({ user, handleLogin, handleLogout }), [user]);

  // TODO: add data validation
  useEffect(() => {
    const persistedUser = localStorage.getItem('user');
    if (persistedUser) setUser(JSON.parse(persistedUser));
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
