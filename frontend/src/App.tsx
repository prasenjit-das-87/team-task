import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Protected from './components/Protected';
import TasksPage from './pages/TasksPage';
import UsersPage from './pages/UsersPage';
import Overview from './pages/Overview';
import CreateUserPage from './pages/CreateUserPage';
import CreateAuthUserPage from "./pages/CreateAuthUserPage";


export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Dashboard Layout with Nested Routes */}
      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      >
        <Route index element={<Overview />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="users/create" element={<CreateUserPage />} />
        <Route path="users/create-auth" element={<CreateAuthUserPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}
