import React, { useState, useEffect } from "react";
import { createTask, updateTaskApi } from "../api/api";
import toast from "react-hot-toast";

//Task Form Add/Edit
export default function TaskForm({ existing, users, onCreated, onCancel }: any) {
  const [title, setTitle] = useState(existing?.title || "");
  const [description, setDescription] = useState(existing?.description || "");
  const [assignee, setAssignee] = useState(existing?.assignee?._id || "");
  const [status, setStatus] = useState(existing?.status || "todo");

  const isEdit = !!existing?._id;

  const submit = async (e: any) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateTaskApi(existing._id, { title, description, assignee, status });
        toast.success("Task updated");
      } else {
        await createTask({ title, description, assignee });
        toast.success("Task created");
      }
      onCreated();
    } catch (err: any) {
      toast.error(err?.error || "Failed to save task");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <h3 className="text-lg font-bold mb-2">
        {isEdit ? "Edit Task" : "Create Task"}
      </h3>

      <div>
        <label className="block mb-1">Title *</label>
        <input
          className="w-full border px-2 py-1 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          className="w-full border px-2 py-1 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1">Assignee</label>
        <select
          className="w-full border px-2 py-1 rounded"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        >
          <option value="">Unassigned</option>
          {users.map((u: any) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      {isEdit && (
        <div>
          <label className="block mb-1">Status</label>
          <select
            className="w-full border px-2 py-1 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isEdit ? "Update" : "Create"}
        </button>

        <button
          type="button"
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
