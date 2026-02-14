import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useTodos } from "../context/TodoContext";

export default function Header() {
  const location = useLocation();
  const { dark, toggleTheme } = useTheme();
  const { tasks, setTasks } = useTodos();
  const fileInputRef = useRef(null);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const linkClass = (path) =>
    `px-4 py-3 text-sm ${
      isActive(path)
        ? "text-ink-900 dark:text-ink-100 font-medium"
        : "text-ink-500 dark:text-ink-400 hover:text-ink-700 dark:hover:text-ink-300"
    }`;

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(tasks, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `todo-tasks-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => fileInputRef.current?.click();

  const handleImportChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        const list = Array.isArray(data) ? data : data?.tasks;
        if (list?.length >= 0) {
          setTasks(list);
        }
      } catch {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <header className="bg-white dark:bg-paper-900 border-b border-paper-300 dark:border-paper-800">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-ink-900 dark:text-ink-100 font-medium">
              todo
            </Link>
            <nav className="flex gap-1" aria-label="Main navigation">
            <Link to="/" className={linkClass("/")}>
              Tasks
            </Link>
            <Link to="/add" className={linkClass("/add")}>
              Add
            </Link>
            <Link to="/completed" className={linkClass("/completed")}>
              Done
            </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleExport}
              className="text-xs text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100"
            >
              export
            </button>
            <button
              type="button"
              onClick={handleImportClick}
              className="text-xs text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100"
            >
              import
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              className="sr-only"
              onChange={handleImportChange}
            />
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={dark ? "Light mode" : "Dark mode"}
              className="text-xs text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100"
            >
              {dark ? "light" : "dark"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
