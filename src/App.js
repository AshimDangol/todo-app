import React, { useEffect, useState } from "react";

// Advanced todo app using React state
function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Load todos from localStorage on first render
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

  // Save todos whenever they change
  useEffect(() => {
    localStorage.setItem("todos-advanced", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText("");
  };

  const saveEditing = (id) => {
    const trimmed = editingText.trim();
    if (!trimmed) {
      // empty -> delete task instead
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
    if (e.key === "Enter") {
      saveEditing(id);
    }
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
    <div
      style={{
        padding: "16px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h1>Todo App</h1>
      <div style={{ display: "flex", marginBottom: "12px", gap: "8px" }}>
          <input
            type="text"
            value={task}
            placeholder="What do you need to do?"
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
          <button
            onClick={handleAdd}
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
        </div>

        {todos.length > 0 && (
          <div
            style={{
              marginBottom: "8px",
              fontSize: "14px",
            }}
          >
            <span>{remainingCount} task(s) left</span>{" "}
            <button onClick={() => setFilter("all")}>All</button>{" "}
            <button onClick={() => setFilter("active")}>Active</button>{" "}
            <button onClick={() => setFilter("completed")}>Completed</button>
          </div>
        )}

        {todos.length === 0 ? (
          <p style={{ color: "#a1a1aa", fontStyle: "italic", margin: 0 }}>
            No tasks yet. Add your first one!
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                style={{
                  marginBottom: "6px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                  />
                  {editingId === todo.id ? (
                    <input
                      value={editingText}
                      autoFocus
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={(e) => handleEditingKeyDown(e, todo.id)}
                      onBlur={() => saveEditing(todo.id)}
                      style={{
                        flex: 1,
                        padding: "4px 6px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        outline: "none",
                      }}
                    />
                  ) : (
                    <span
                      onDoubleClick={() => startEditing(todo)}
                      style={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                        color: todo.completed ? "#9ca3af" : "#111827",
                        cursor: "text",
                      }}
                    >
                      {todo.text}
                    </span>
                  )}
                </div>
                <button
                  onClick={() =>
                    editingId === todo.id ? saveEditing(todo.id) : startEditing(todo)
                  }
                  style={{ marginRight: "4px" }}
                >
                  {editingId === todo.id ? "Save" : "Edit"}
                </button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}

        {todos.some((t) => t.completed) && (
          <button
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

export default App;
