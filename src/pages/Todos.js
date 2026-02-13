import React, { useEffect, useState } from "react";

function Todos() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("todos-advanced");
      if (stored) {
        setTodos(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos-advanced", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (e) => {
    e?.preventDefault();
    const trimmed = task.trim();
    if (!trimmed) return;

    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, completed: false },
    ]);
    setTask("");
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };


  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText("");
  };

  const saveEditing = (e, id) => {
    e?.preventDefault();
    const trimmed = editingText.trim();
    if (!trimmed) {
      handleDelete(id);
      cancelEditing();
      return;
    }
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: trimmed } : todo))
    );
    cancelEditing();
  };

  const handleEditingKeyDown = (e, id) => {
    if (e.key === "Escape") {
      cancelEditing();
    }
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const remainingCount = todos.filter((t) => !t.completed).length;

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div>
      <h1>Todos</h1>
      <form
        onSubmit={handleAdd}
        style={{ display: "flex", marginBottom: "12px", gap: "8px" }}
      >
        <label htmlFor="new-todo" className="sr-only">
          New task
        </label>
        <input
          id="new-todo"
          type="text"
          name="task"
          value={task}
          placeholder="What do you need to do?"
          onChange={(e) => setTask(e.target.value)}
          autoComplete="off"
          style={{
            flex: 1,
            padding: "8px 10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 12px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "#fff",
          }}
        >
          Add
        </button>
      </form>

      {todos.length > 0 && (
        <div
          style={{
            marginBottom: "8px",
            fontSize: "14px",
          }}
        >
          <span>{remainingCount} task(s) left</span>{" "}
          <button type="button" onClick={() => setFilter("all")}>All</button>{" "}
          <button type="button" onClick={() => setFilter("active")}>Active</button>{" "}
          <button type="button" onClick={() => setFilter("completed")}>Completed</button>
        </div>
      )}

      {todos.length === 0 ? (
        <p style={{ color: "#a1a1aa", fontStyle: "italic", margin: 0 }}>
          No tasks yet. Add your first one!
        </p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "8px",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
              <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 600 }}>Status</th>
              <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 600 }}>Task</th>
              <th style={{ textAlign: "right", padding: "10px 8px", fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map((todo) => (
              <tr
                key={todo.id}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <td style={{ padding: "8px", verticalAlign: "middle" }}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                    aria-label={`Mark "${todo.text}" as ${todo.completed ? "incomplete" : "complete"}`}
                  />
                </td>
                <td style={{ padding: "8px", verticalAlign: "middle" }}>
                  {editingId === todo.id ? (
                    <form
                      onSubmit={(e) => saveEditing(e, todo.id)}
                      style={{ display: "inline-flex", width: "100%" }}
                    >
                      <label htmlFor={`edit-todo-${todo.id}`} className="sr-only">
                        Edit task
                      </label>
                      <input
                        id={`edit-todo-${todo.id}`}
                        type="text"
                        value={editingText}
                        autoFocus
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyDown={(e) => handleEditingKeyDown(e, todo.id)}
                        onBlur={() => saveEditing(null, todo.id)}
                        style={{
                          flex: 1,
                          padding: "6px 8px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                          outline: "none",
                        }}
                      />
                    </form>
                  ) : (
                    <span
                      onDoubleClick={() => startEditing(todo)}
                      style={{
                        textDecoration: todo.completed ? "line-through" : "none",
                        color: todo.completed ? "#9ca3af" : "#111827",
                        cursor: "text",
                      }}
                    >
                      {todo.text}
                    </span>
                  )}
                </td>
                <td style={{ padding: "8px", textAlign: "right", verticalAlign: "middle" }}>
                  <button
                    type="button"
                    onClick={() =>
                      editingId === todo.id
                        ? saveEditing(null, todo.id)
                        : startEditing(todo)
                    }
                    style={{ marginRight: "6px" }}
                  >
                    {editingId === todo.id ? "Save" : "Edit"}
                  </button>
                  <button type="button" onClick={() => handleDelete(todo.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {todos.some((t) => t.completed) && (
        <button
          type="button"
          onClick={clearCompleted}
          style={{
            marginTop: "8px",
          }}
        >
          Clear completed
        </button>
      )}
    </div>
  );
}

export default Todos;
