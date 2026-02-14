import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ tasks, emptyMessage = "No tasks yet." }) {
  if (tasks.length === 0) {
    return (
      <p className="py-12 text-ink-500 dark:text-ink-400 text-sm">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="list-none p-0 m-0 border border-paper-300 dark:border-paper-800 bg-white dark:bg-paper-800">
      {tasks.map((task) => (
        <li key={task.id}>
          <TodoItem task={task} />
        </li>
      ))}
    </ul>
  );
}
