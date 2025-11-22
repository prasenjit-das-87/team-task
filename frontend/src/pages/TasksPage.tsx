import React, { useEffect, useState, useContext } from "react";
import TaskTable from "../components/TaskTable";
import TaskForm from "../components/TaskForm";
import {
  getTasks,
  getUsers,
  deleteTaskApi,
  assignTask,
  updateTaskStatus,
} from "../api/api";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

//All user task page
export default function TasksPage() {
  const auth = useContext(AuthContext);

  const [tasks, setTasks] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [editingTask, setEditingTask] = useState<any>(null);

  const fetchAll = async () => {
    try {
      const [u, t] = await Promise.all([getUsers(), getTasks()]);
      setUsers(u);
      setTasks(t);
    } catch (err: any) {
      toast.error(err?.error || "Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {auth?.user?.role === "member" ? "My Tasks" : "All Tasks"}
        </h2>

        {/* ADMIN ONLY BUTTON */}
        {auth?.user?.role === "admin" && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setEditingTask({})} // empty = create mode
          >
            + Add Task
          </button>
        )}
      </div>

      {/* INLINE TASK FORM (Create OR Edit Mode) */}
      {editingTask !== null && auth?.user?.role === "admin" && (
        <div className="mb-6 p-4 bg-white shadow rounded">
          <TaskForm
            existing={editingTask}
            users={users}
            onCreated={() => {
              setEditingTask(null);
              fetchAll();
            }}
            onCancel={() => setEditingTask(null)}
          />
        </div>
      )}

      {/* TASK TABLE */}
      <TaskTable
        tasks={tasks}
        users={users}
        onRefetch={fetchAll}
        onEdit={(task: any) => setEditingTask(task)} // edit mode
        onDelete={async (id: string) => {
          await deleteTaskApi(id);
          toast.success("Task deleted");
          fetchAll();
        }}
        onAssign={async (taskId: string, assigneeId: string | null) => {
          await assignTask(taskId, assigneeId);
          toast.success("Task assigned");
          fetchAll();
        }}
        onStatusChange={async (taskId: string, status: string) => {
          await updateTaskStatus(taskId, status);
          toast.success("Status updated");
          fetchAll();
        }}
      />
    </div>
  );
}
