/**
 * Local storage utilities for persisting todo tasks.
 * Centralizes read/write so we can swap to a real API later.
 */

const STORAGE_KEY = "todo-app-tasks";

export function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw == null) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.warn("Failed to save tasks to localStorage", e);
  }
}
