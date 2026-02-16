import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodos } from "../context/TodoContext";
import { PRIORITIES } from "../context/TodoContext";

const PRIORITY_DOTS = {
  high: "bg-red-500",
  medium: "bg-amber-500",
  low: "bg-gray-400 dark:bg-gray-500",
};

export default function AddTodo() {
  const { addTask } = useTodos();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError("Title is required.");
      return;
    }
    setError("");
    addTask({
      title: trimmedTitle,
      description: description.trim(),
      priority,
    });
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-6">
      <h1 className="text-lg font-medium text-ink-900 dark:text-ink-100 mb-4">
        add task
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-sm text-red-600" role="alert">{error}</p>
        )}
        <div>
          <label htmlFor="title" className="block text-xs text-ink-500 mb-1">
            title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder=""
            autoFocus
            className="block w-full border border-paper-300 dark:border-paper-800 bg-white dark:bg-paper-800 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <span className="block text-xs text-ink-500 mb-1">priority</span>
          <div className="flex gap-4">
            {PRIORITIES.map((p) => (
              <label key={p} className="flex items-center gap-2 cursor-pointer text-sm capitalize">
                <input
                  type="radio"
                  name="priority"
                  value={p}
                  checked={priority === p}
                  onChange={() => setPriority(p)}
                />
                <span
                  className={`inline-block w-2.5 h-2.5 rounded-full flex-shrink-0 ${PRIORITY_DOTS[p]}`}
                  aria-hidden
                />
                {p}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-xs text-ink-500 mb-1">
            description (optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder=""
            rows={3}
            className="block w-full border border-paper-300 dark:border-paper-800 bg-white dark:bg-paper-800 px-3 py-2 text-sm resize-none"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="text-sm text-ink-900 dark:text-ink-100 hover:underline"
          >
            add
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-sm text-ink-500 hover:underline"
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
}
