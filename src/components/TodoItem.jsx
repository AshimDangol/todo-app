import React from "react";
import { Link } from "react-router-dom";
import { useTodos } from "../context/TodoContext";

export default function TodoItem({ task, embedded }) {
  const { toggleTask, deleteTask } = useTodos();
  const { id, title, description, completed, priority } = task;
  const p = (priority || "medium")[0].toUpperCase();

  return (
    <article
      className={`flex gap-3 items-start py-2.5 px-4 ${
        !embedded ? "border-b border-paper-300 dark:border-paper-800 last:border-0" : ""
      } ${completed ? "bg-paper-100 dark:bg-paper-900" : "bg-white dark:bg-paper-800"}`}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTask(id)}
        className="mt-0.5 h-4 w-4 flex-shrink-0 border-paper-300 dark:border-paper-600"
        aria-label={completed ? "Mark pending" : "Mark done"}
      />
      <span className="text-[10px] text-ink-400 dark:text-ink-500 w-3 flex-shrink-0 mt-1 font-mono">
        {p}
      </span>
      <div className="min-w-0 flex-1 py-0.5">
        <h3
          className={`${
            completed
              ? "text-ink-400 dark:text-ink-500 line-through"
              : "text-ink-900 dark:text-ink-100"
          }`}
        >
          {title || "(no title)"}
        </h3>
        {description && (
          <p className="mt-0.5 text-sm text-ink-500 dark:text-ink-400 line-clamp-2">
            {description}
          </p>
        )}
      </div>
      <div className="flex flex-shrink-0 gap-3 text-sm">
        <Link to={`/edit/${id}`} className="text-ink-500 dark:text-ink-400 hover:underline">
          edit
        </Link>
        <button
          type="button"
          onClick={() => deleteTask(id)}
          className="text-ink-500 dark:text-ink-400 hover:underline hover:text-red-600"
        >
          delete
        </button>
      </div>
    </article>
  );
}
