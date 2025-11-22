import React, { useEffect, useState } from "react";
import UserList from "../components/UserList";
import { getUsers } from "../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

//User Page
export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchAll = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err: any) {
      toast.error(err?.error || "Failed to load users");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Team Members</h2>

        <div className="flex gap-2">
          {/* Create Team Member */}
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate("/dashboard/users/create")}
          >
            + Add Team Member
          </button>

          {/* Create Login User */}
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            onClick={() => navigate("/dashboard/users/create-auth")}
          >
            + Add Login User
          </button>
        </div>
      </div>

      <UserList users={users} onRefetch={fetchAll} />
    </div>
  );
}