import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Todo App</h1>
      <p style={{ color: "#6b7280", marginBottom: "16px" }}>
        Keep track of your tasks. Go to the Todos page to add and manage items.
      </p>
      <Link
        to="/todos"
        style={{
          display: "inline-block",
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        Open Todos
      </Link>
    </div>
  );
}

export default Home;
