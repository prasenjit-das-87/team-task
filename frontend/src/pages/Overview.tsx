import React, { useEffect, useState } from "react";
import { getUsers, getTasks } from "../api/api";
import toast from "react-hot-toast";

//Total Users & Total Task Overview
export default function Overview() {
  const [users, setUsers] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);

  const load = async () => {
    try {
      const [u, t] = await Promise.all([getUsers(), getTasks()]);
      setUsers(u);
      setTasks(t);
    } catch (err: any) {
      toast.error(err?.error || "Failed to load dashboard");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Total Users</div>
          <div className="text-3xl font-bold">{users.length}</div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Total Tasks</div>
          <div className="text-3xl font-bold">{tasks.length}</div>
        </div>
      </div>
    </div>
  );
}
