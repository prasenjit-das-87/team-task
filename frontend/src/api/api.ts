const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

async function fetchJSON(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  // Parse error safely
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({
      error: "Request failed",
    }));
    throw errorData;
  }

  return res.json().catch(() => ({}));
}

/* -----------------------------------
   HTTP Utility Wrappers
------------------------------------ */
export const post = (path: string, body: any) =>
  fetchJSON(path, { method: "POST", body: JSON.stringify(body) });

export const get = (path: string) => fetchJSON(path);

export const patch = (path: string, body: any) =>
  fetchJSON(path, { method: "PATCH", body: JSON.stringify(body) });

export const del = (path: string) =>
  fetchJSON(path, { method: "DELETE" });

/* -----------------------------------
   Auth APIs
------------------------------------ */
export const loginApi = (payload: any) => post("/auth/login", payload);

export const registerApi = (payload: any) =>
  post("/auth/register", payload);

/**
 * Admin creates a login user
 * BACKEND auto-adds to User (team member) table.
 */
export const createAuthUser = (payload: any) =>
  post("/auth/register", payload);

export const getAuthUsers = () => get("/auth/users"); // for admin list

/* -----------------------------------
   User / Team APIs
------------------------------------ */
export const getUsers = () => get("/users");

export const createTeamUser = (payload: any) =>
  post("/users", payload);

export const deleteUserApi = (userId: string) =>
  del(`/users/${userId}`);

/* -----------------------------------
   Task APIs
------------------------------------ */
export const createTask = (payload: any) => post("/tasks", payload);

export const getTasks = () => get("/tasks");

export const assignTask = (taskId: string, assigneeId: string | null) =>
  patch(`/tasks/${taskId}/assign`, { assigneeId });

export const updateTaskStatus = (taskId: string, status: string) =>
  patch(`/tasks/${taskId}/status`, { status });

export const updateTaskApi = (taskId: string, payload: any) =>
  patch(`/tasks/${taskId}`, payload);

export const deleteTaskApi = (taskId: string) =>
  del(`/tasks/${taskId}`);
