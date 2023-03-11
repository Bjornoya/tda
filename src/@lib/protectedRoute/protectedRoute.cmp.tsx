import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/auth.context';

interface IProps {
  children: React.ReactElement;
}

function ProtectedRoute({ children }: IProps) {
  const { user } = useAuth();

  if (!user.token) {
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
}

export default ProtectedRoute;
