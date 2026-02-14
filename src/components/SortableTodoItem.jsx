import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TodoItem from "./TodoItem";

export default function SortableTodoItem({ task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={isDragging ? "opacity-60" : ""}
    >
      <div className="flex items-stretch border-b border-paper-300 dark:border-paper-800 last:border-b-0">
        <button
          type="button"
          aria-label="Drag to reorder"
          className="flex-shrink-0 flex items-center justify-center w-8 text-ink-400 dark:text-ink-500 cursor-grab active:cursor-grabbing border-r border-paper-300 dark:border-paper-800 text-xs"
          {...attributes}
          {...listeners}
        >
          ⋮⋮
        </button>
        <div className="flex-1 min-w-0">
          <TodoItem task={task} embedded />
        </div>
      </div>
    </li>
  );
}
