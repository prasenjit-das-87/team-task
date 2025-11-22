import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";

//Team task dashboard
export default function Dashboard() {
  const auth = useContext(AuthContext);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Team Task Dashboard</h1>
          <div>{auth?.user?.email} ({auth?.user?.role})</div>
        </div>

        {/* Nested routes load here */}
        <Outlet />
      </div>
    </div>
  );
}
