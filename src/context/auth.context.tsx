import React, {
  useState, createContext, useMemo, useContext,
} from 'react';

type TUser = {
  token: string,
  username: string,
  id: number
}

type TAuthContext = {
  user: TUser,
  handleLogin: (param: TUser) => void,
  handleLogout: (param: TUser) => void,
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
  };

  const value = useMemo(() => ({ user, handleLogin, handleLogout }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  useContext(AuthContext);
}
