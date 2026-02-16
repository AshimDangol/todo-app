import React from "react";
import { Link } from "react-router-dom";
import { useTodos } from "../context/TodoContext";

const PRIORITY_STYLES = {
  high: {
    dot: "bg-red-500",
    label: "High priority",
  },
  medium: {
    dot: "bg-amber-500",
    label: "Medium priority",
  },
  low: {
    dot: "bg-gray-400 dark:bg-gray-500",
    label: "Low priority",
  },
};

export default function TodoItem({ task, embedded }) {
  const { toggleTask, deleteTask } = useTodos();
  const { id, title, description, completed, priority } = task;
  const priorityKey = (priority && PRIORITY_STYLES[priority]) ? priority : "medium";
  const { dot, label } = PRIORITY_STYLES[priorityKey];

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
      <span
        className={`inline-block w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${dot}`}
        title={label}
        aria-label={label}
        role="img"
      />
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
