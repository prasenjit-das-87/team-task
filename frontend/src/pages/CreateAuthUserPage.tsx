import React, { useState } from "react";
import { createAuthUser } from "../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

//Auth user create page
export default function CreateAuthUserPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [password, setPassword] = useState("");

  //Auth user submit
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Email and Password required");
      return;
    }

    try {
      await createAuthUser({ email, password, role });

      toast.success("Login user created. Added to team list.");

      navigate("/dashboard/users");
    } catch (err: any) {
      toast.error(err?.error || "Failed to create login user");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create Login User</h2>

      <form
        onSubmit={submit}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <div>
          <label className="block mb-1 text-sm font-medium">Email *</label>
          <input
            className="w-full p-2 border rounded"
            placeholder="example@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Password *</label>
          <input
            className="w-full p-2 border rounded"
            placeholder="******"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Role *</label>
          <select
            className="w-full p-2 border rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="member">Member</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Create Login User
        </button>
      </form>
    </div>
  );
}
