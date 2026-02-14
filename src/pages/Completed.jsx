import React, { useMemo, useState } from "react";
import { useTodos } from "../context/TodoContext";
import TodoList from "../components/TodoList";

export default function Completed() {
  const { tasks } = useTodos();
  const [search, setSearch] = useState("");

  const completedTasks = useMemo(() => {
    const list = tasks.filter((t) => t.completed);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      return list.filter(
        (t) =>
          (t.title || "").toLowerCase().includes(q) ||
          (t.description || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [tasks, search]);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
      <div className="mb-4">
        <h1 className="text-lg font-medium text-ink-900 dark:text-ink-100">
          completed
        </h1>
        <p className="text-xs text-ink-500 dark:text-ink-400 mt-0.5">
          {tasks.filter((t) => t.completed).length} done
        </p>
      </div>

      <div className="mb-4">
        <label htmlFor="completed-search" className="sr-only">Search</label>
        <input
          id="completed-search"
          type="search"
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full border border-paper-300 dark:border-paper-800 bg-white dark:bg-paper-800 px-3 py-2 text-sm"
        />
      </div>

      <TodoList
        tasks={completedTasks}
        emptyMessage="No completed tasks yet."
      />
    </div>
  );
}
