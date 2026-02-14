import React from "react";
import { Routes, Route } from "react-router-dom";
import { TodoProvider } from "./context/TodoContext";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";
import Completed from "./pages/Completed";

export default function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <div className="min-h-screen bg-paper-100 dark:bg-paper-900 text-ink-900 dark:text-ink-100 text-[15px]">
          <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddTodo />} />
            <Route path="/edit/:id" element={<EditTodo />} />
            <Route path="/completed" element={<Completed />} />
          </Routes>
        </main>
        </div>
      </TodoProvider>
    </ThemeProvider>
  );
}
