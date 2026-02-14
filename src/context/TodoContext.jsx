import React, { createContext, useContext, useReducer, useEffect, useRef } from "react";
import { loadTasks, saveTasks } from "../utils/storage";
import {
  fetchTasksFromApi,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
  replaceAllTasksApi,
} from "../utils/api";

const TodoContext = createContext(null);

export const PRIORITIES = ["high", "medium", "low"];

export const TODO_ACTIONS = {
  SET_TASKS: "SET_TASKS",
  ADD: "ADD",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  TOGGLE: "TOGGLE",
  REORDER: "REORDER",
};

function normalizeTask(t) {
  return {
    ...t,
    priority: PRIORITIES.includes(t.priority) ? t.priority : "medium",
  };
}

function todoReducer(state, action) {
  switch (action.type) {
    case TODO_ACTIONS.SET_TASKS:
      return (action.payload || []).map(normalizeTask);
    case TODO_ACTIONS.ADD:
      return [...state, normalizeTask(action.payload)];
    case TODO_ACTIONS.UPDATE:
      return state.map((t) =>
        t.id === action.payload.id
          ? normalizeTask({ ...t, ...action.payload })
          : t
      );
    case TODO_ACTIONS.DELETE:
      return state.filter((t) => t.id !== action.payload);
    case TODO_ACTIONS.TOGGLE:
      return state.map((t) =>
        t.id === action.payload ? { ...t, completed: !t.completed } : t
      );
    case TODO_ACTIONS.REORDER:
      return action.payload;
    default:
      return state;
  }
}

export function TodoProvider({ children }) {
  const [tasks, dispatch] = useReducer(todoReducer, []);
  const apiAvailable = useRef(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const result = await fetchTasksFromApi();
      if (cancelled) return;
      hasLoaded.current = true;
      if (result.ok && Array.isArray(result.data)) {
        apiAvailable.current = true;
        dispatch({ type: TODO_ACTIONS.SET_TASKS, payload: result.data });
        return;
      }
      apiAvailable.current = false;
      const stored = loadTasks();
      dispatch({ type: TODO_ACTIONS.SET_TASKS, payload: stored });
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) return;
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (task) => {
    const id = Date.now();
    const full = {
      id,
      title: "",
      description: "",
      completed: false,
      priority: "medium",
      ...task,
    };
    dispatch({ type: TODO_ACTIONS.ADD, payload: full });
    if (apiAvailable.current) {
      createTaskApi(full).catch(() => {});
    }
    return id;
  };

  const updateTask = (id, updates) => {
    dispatch({ type: TODO_ACTIONS.UPDATE, payload: { id, ...updates } });
    if (apiAvailable.current) {
      const t = tasks.find((x) => x.id === id);
      if (t) updateTaskApi(id, { ...t, ...updates }).catch(() => {});
    }
  };

  const deleteTask = (id) => {
    dispatch({ type: TODO_ACTIONS.DELETE, payload: id });
    if (apiAvailable.current) deleteTaskApi(id).catch(() => {});
  };

  const toggleTask = (id) => {
    dispatch({ type: TODO_ACTIONS.TOGGLE, payload: id });
    if (apiAvailable.current) {
      const t = tasks.find((x) => x.id === id);
      if (t)
        updateTaskApi(id, { completed: !t.completed }).catch(() => {});
    }
  };

  const reorderTasks = (orderedTasks) => {
    dispatch({ type: TODO_ACTIONS.REORDER, payload: orderedTasks });
    if (apiAvailable.current) {
      replaceAllTasksApi(orderedTasks).catch(() => {});
    }
  };

  const setTasks = (newTasks) => {
    const normalized = (newTasks || []).map(normalizeTask);
    dispatch({ type: TODO_ACTIONS.SET_TASKS, payload: normalized });
    if (apiAvailable.current) {
      replaceAllTasksApi(normalized).catch(() => {});
    }
  };

  const getTask = (id) => tasks.find((t) => t.id === Number(id));

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    reorderTasks,
    setTasks,
    getTask,
  };

  return (
    <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
  );
}

export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodos must be used within TodoProvider");
  return ctx;
}
