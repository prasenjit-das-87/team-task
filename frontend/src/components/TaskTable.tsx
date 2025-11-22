import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//Task table list view
export default function TaskTable({ tasks, users, onRefetch, onEdit, onDelete, onAssign, onStatusChange }: any) {
  const auth = useContext(AuthContext);

  const findUserName = (id: string) => {
    const u = users.find((x: any) => x._id === id);
    return u ? u.name : "Unassigned";
  };

  return (
    <div className="overflow-x-auto bg-white shadow rounded">
      <table className="min-w-full text-left border border-gray-300">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-3 border-r">Title</th>
            <th className="p-3 border-r">Description</th>
            <th className="p-3 border-r">Assignee</th>
            <th className="p-3 border-r">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        {/* Task List */}
        <tbody>
          {tasks.map((t: any) => (
            <tr key={t._id} className="border-b hover:bg-gray-50">
              <td className="p-3 border-r">{t.title}</td>
              <td className="p-3 border-r">{t.description || "-"}</td>
              <td className="p-3 border-r">{t.assignee ? findUserName(t.assignee._id) : "Unassigned"}</td>

              <td className="p-3 border-r">
                {auth?.user?.role === "member" &&
                t.assignee &&
                t.assignee._id === auth?.user?.linkedUserId ? (
                  <select
                    className="border px-2 py-1 rounded"
                    value={t.status}
                    onChange={(e) => onStatusChange(t._id, e.target.value)}
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                ) : (
                  <span className="capitalize">{t.status}</span>
                )}
              </td>

              <td className="p-3 space-x-2">
                {/* ADMIN ACTIONS */}
                {auth?.user?.role === "admin" && (
                  <>
                    <button
                      className="px-2 py-1 bg-yellow-500 text-white rounded"
                      onClick={() => onEdit(t)}
                    >
                      Edit
                    </button>

                    <button
                      className="px-2 py-1 bg-red-600 text-white rounded"
                      onClick={() => onDelete(t._id)}
                    >
                      Delete
                    </button>

                    <select
                      className="border px-2 py-1 rounded"
                      onChange={(e) => onAssign(t._id, e.target.value)}
                      value={t.assignee?._id || ""}
                    >
                      <option value="">Unassigned</option>
                      {users.map((u: any) => (
                        <option key={u._id} value={u._id}>
                          {u.name}
                        </option>
                      ))}
                    </select>
                  </>
                )}

                {/* MEMBER VIEW */}
                {auth?.user?.role === "member" &&
                  (!t.assignee || t.assignee._id !== auth?.user?.linkedUserId) && (
                    <span className="text-gray-400 text-sm">No Actions</span>
                  )}
              </td>
            </tr>
          ))}

          {tasks.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
