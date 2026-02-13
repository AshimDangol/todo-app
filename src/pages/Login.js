import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const formStyle = {
  maxWidth: "320px",
  margin: "0 auto",
  padding: "24px",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  backgroundColor: "#fafafa",
};

const inputStyle = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 12px",
  marginBottom: "16px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  fontSize: "16px",
  outline: "none",
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: 600,
  color: "#374151",
};

const buttonStyle = {
  width: "100%",
  padding: "10px 16px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
  fontSize: "16px",
  fontWeight: 600,
  cursor: "pointer",
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      setError("Please enter your email.");
      return;
    }
    if (!trimmedPassword) {
      setError("Please enter your password.");
      return;
    }

    // Demo: accept any non-empty credentials and redirect to todos
    navigate("/todos", { replace: true });
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ marginBottom: "24px", textAlign: "center" }}>Login</h1>
      <form style={formStyle} onSubmit={handleSubmit} noValidate>
        {error && (
          <p
            style={{
              color: "#dc2626",
              fontSize: "14px",
              marginBottom: "12px",
              marginTop: 0,
            }}
          >
            {error}
          </p>
        )}
        <div>
          <label htmlFor="login-email" style={labelStyle}>
            Email
          </label>
          <input
            id="login-email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="login-password" style={labelStyle}>
            Password
          </label>
          <input
            id="login-password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Login;
