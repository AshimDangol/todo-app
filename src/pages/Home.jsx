import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTodos } from "../context/TodoContext";
import TodoList from "../components/TodoList";
import SortableTodoList from "../components/SortableTodoList";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

export default function Home() {
  const { tasks } = useTodos();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredTasks = useMemo(() => {
    let list = tasks;
    if (filter === "completed") list = list.filter((t) => t.completed);
    if (filter === "pending") list = list.filter((t) => !t.completed);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (t) =>
          (t.title || "").toLowerCase().includes(q) ||
          (t.description || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [tasks, filter, search]);

  const ListComponent = filter === "all" ? SortableTodoList : TodoList;
  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-lg font-medium text-ink-900 dark:text-ink-100">
            tasks
          </h1>
          <p className="text-xs text-ink-500 dark:text-ink-400 mt-0.5">
            {pendingCount} pending, {completedCount} done
          </p>
        </div>
        <Link
          to="/add"
          className="text-sm text-ink-900 dark:text-ink-100 hover:underline"
        >
          + add
        </Link>
      </div>

      <div className="space-y-3 mb-4">
        <label htmlFor="search" className="sr-only">Search</label>
        <input
          id="search"
          type="search"
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full border border-paper-300 dark:border-paper-800 bg-white dark:bg-paper-800 px-3 py-2 text-sm text-ink-900 dark:text-ink-100 placeholder-ink-400"
        />
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`text-sm ${
                filter === f.value
                  ? "text-ink-900 dark:text-ink-100 font-medium"
                  : "text-ink-500 dark:text-ink-400 hover:text-ink-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <ListComponent
        tasks={filteredTasks}
        emptyMessage={
          search.trim()
            ? "No tasks match your search."
            : "No tasks yet. Add your first task!"
        }
      />
    </div>
  );
}
