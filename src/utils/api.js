/**
 * Mock API layer using json-server (port 3001).
 * Run: npm run server
 */

const API_URL = "http://localhost:3001";

export async function fetchTasksFromApi() {
  try {
    const res = await fetch(`${API_URL}/tasks`);
    if (res.ok) {
      const data = await res.json();
      return { ok: true, data: Array.isArray(data) ? data : [] };
    }
  } catch {
    //
  }
  return { ok: false, data: [] };
}

export async function createTaskApi(task) {
  try {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (res.ok) return await res.json();
  } catch {
    //
  }
  return null;
}

export async function updateTaskApi(id, updates) {
  try {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (res.ok) return await res.json();
  } catch {
    //
  }
  return null;
}

export async function deleteTaskApi(id) {
  try {
    const res = await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
    return res.ok;
  } catch {
    return false;
  }
}

export async function replaceAllTasksApi(tasks) {
  try {
    const res = await fetch(`${API_URL}/tasks`);
    if (!res.ok) return false;
    const current = await res.json();
    for (const t of current) {
      await fetch(`${API_URL}/tasks/${t.id}`, { method: "DELETE" });
    }
    for (const t of tasks) {
      await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(t),
      });
    }
    return true;
  } catch {
    return false;
  }
}
