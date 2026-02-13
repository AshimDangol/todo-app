import React from "react";
import { Outlet, Link } from "react-router-dom";

const navStyle = {
  display: "flex",
  gap: "16px",
  marginBottom: "24px",
  paddingBottom: "16px",
  borderBottom: "1px solid #e5e7eb",
};

const linkStyle = {
  color: "#007bff",
  textDecoration: "none",
};

function Layout() {
  return (
    <div
      style={{
        padding: "16px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/login" style={linkStyle}>
          Login
        </Link>
        <Link to="/todos" style={linkStyle}>
          Todos
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Layout;
