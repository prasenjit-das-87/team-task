import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Correct per-route active logic
  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard"; // exact match ONLY
    }
    return pathname.startsWith(path); // nested match
  };

  const navItem = (to: string, label: string) => (
    <div
      onClick={() => navigate(to)}
      className={`cursor-pointer block px-4 py-2 rounded transition ${
        isActive(to)
          ? "bg-blue-600 text-white"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {label}
    </div>
  );

  return (
    <div className="w-64 bg-white h-screen p-4 border-r flex flex-col">
      <div className="mb-6 text-xl font-bold">Team Tasks</div>

      <nav className="space-y-1">
        {/* Dashboard active ONLY on /dashboard */}
        {navItem("/dashboard", "Dashboard")}

        {/* USERS MENU (Admin Only) */}
        {auth?.user?.role === "admin" && (
          <>
            {navItem("/dashboard/users", "Users")}

            <div className="ml-2 text-gray-400 text-sm mt-2">
              User Management
            </div>

            {navItem("/dashboard/users/create", "➕ Add Team Member")}
            {navItem("/dashboard/users/create-auth", "➕ Add Login User")}
          </>
        )}

        {/* Tasks active on /dashboard/tasks + child routes */}
        {navItem("/dashboard/tasks", "Tasks")}
      </nav>

      <div className="mt-auto pt-6">
        <div className="text-sm text-gray-500 mb-2">{auth?.user?.email}</div>
        <button
          className="w-full px-3 py-2 rounded bg-gray-200"
          onClick={() => {
            auth?.logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
