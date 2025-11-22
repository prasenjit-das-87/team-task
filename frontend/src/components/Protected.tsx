import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

//Auth Protected for Dashboard
export default function Protected({ children }: { children: JSX.Element }) {
  const auth = useContext(AuthContext);
  if (!auth?.token) return <Navigate to='/login' replace />;
  return children;
}
