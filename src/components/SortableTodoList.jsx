import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTodos } from "../context/TodoContext";
import SortableTodoItem from "./SortableTodoItem";

export default function SortableTodoList({ tasks, emptyMessage }) {
  const { reorderTasks, tasks: allTasks } = useTodos();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((t) => t.id === active.id);
    const newIndex = tasks.findIndex((t) => t.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(tasks, oldIndex, newIndex);
    const ids = reordered.map((t) => t.id);
    const orderMap = new Map(ids.map((id, i) => [id, i]));
    const newAll = [...allTasks].sort(
      (a, b) => (orderMap.get(a.id) ?? 999) - (orderMap.get(b.id) ?? 999)
    );
    reorderTasks(newAll);
  };

  if (tasks.length === 0) {
    return (
      <p className="py-12 text-ink-500 dark:text-ink-400 text-sm">
        {emptyMessage}
      </p>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="list-none p-0 m-0 border border-paper-300 dark:border-paper-800 bg-white dark:bg-paper-800 [&>li:last-child>div]:border-b-0">
          {tasks.map((task) => (
            <SortableTodoItem key={task.id} task={task} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
