import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTodos } from "../context/TodoContext";
import { PRIORITIES } from "../context/TodoContext";

const PRIORITY_DOTS = {
  high: "bg-red-500",
  medium: "bg-amber-500",
  low: "bg-gray-400 dark:bg-gray-500",
};

export default function EditTodo() {
  const { id } = useParams();
  const { getTask, updateTask } = useTodos();
  const navigate = useNavigate();
  const task = getTask(id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setPriority(PRIORITIES.includes(task.priority) ? task.priority : "medium");
    }
  }, [task]);

  if (task == null) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">
        <p className="text-ink-500 dark:text-ink-400">Task not found.</p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-4 text-sm text-ink-500 hover:underline"
        >
          Back to list
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError("Title is required.");
      return;
    }
    setError("");
    updateTask(task.id, {
      title: trimmedTitle,
      description: description.trim(),
      priority,
    });
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-6">
      <h1 className="text-lg font-medium text-ink-900 dark:text-ink-100 mb-4">
        edit task
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-sm text-red-600" role="alert">{error}</p>
        )}
        <div>
          <label htmlFor="edit-title" className="block text-xs text-ink-500 mb-1">
            title
          </label>
          <input
            id="edit-title"
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
                  name="edit-priority"
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
          <label htmlFor="edit-description" className="block text-xs text-ink-500 mb-1">
            description (optional)
          </label>
          <textarea
            id="edit-description"
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
            save
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
