import React, { useState } from "react";
import { post } from "../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

//Member user create page
export default function CreateUserPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

//Member user submit
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      await post("/users", { name, email });
      toast.success("User created successfully");
      navigate("/dashboard/users"); // redirect back to the list
    } catch (err: any) {
      toast.error(err?.error || "Failed to create user");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create New User</h2>

      <form
        onSubmit={submit}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <div>
          <label className="block mb-1 text-sm font-medium">Name *</label>
          <input
            className="w-full p-2 border rounded"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Email (optional)</label>
          <input
            className="w-full p-2 border rounded"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create User
        </button>
      </form>
    </div>
  );
}
