# To-Do Application

A scalable and maintainable To-Do application built with React. It uses internal state management (useReducer + Context), React Router for navigation, and localStorage for persistence. The UI is built with Tailwind CSS and is responsive and accessible.

## Features Implemented

### Core Features

- **Add To-Do Items** – Add new tasks with a required title, optional description, and priority (High, Medium, Low).
- **Edit To-Do Items** – Update task title, description, and priority from the Edit Task page (`/edit/:id`).
- **Delete To-Do Items** – Remove tasks individually from the list.
- **Mark as Completed** – Toggle tasks between completed and pending via a checkbox on each task.
- **Filter & Search** – Filter by status (All, Pending, Completed) and search by title or description on the Home page.

### State Management

- **React internal state** – Tasks are managed with `useReducer` for predictable updates and `useState` for local UI state (filters, search, form fields).
- **TodoContext** – State is lifted into a React Context (`TodoContext.jsx`) so it can be shared across the Home, Add, Edit, and Completed pages without prop drilling.
- **Structured state** – A single list of tasks with `completed` and `priority`; filtering is derived (All / Pending / Completed) for scalability.

### Routing (React Router)

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | To-Do list with filter, search, drag-to-reorder, and task list |
| `/add` | Add Task | Form to create a new task (title, priority, optional description) |
| `/edit/:id` | Edit Task | Form to update an existing task |
| `/completed` | Completed | View only completed tasks (with search) |

URLs are shareable and support direct access and browser back/forward.

### Project Structure

```
/src
  /components
    Header.jsx           – Navigation, Export/Import, dark mode toggle
    TodoItem.jsx         – Single task (checkbox, priority dot, title, description, Edit/Delete)
    TodoList.jsx         – Static list of TodoItem
    SortableTodoList.jsx – Drag-and-drop reorderable list (used on Home when filter=All)
    SortableTodoItem.jsx – Draggable TodoItem wrapper
  /pages
    Home.jsx             – To-Do list with filter, search, and sortable list
    AddTodo.jsx          – Add task form
    EditTodo.jsx         – Edit task form
    Completed.jsx        – Completed tasks only
  /context
    TodoContext.jsx      – Provider + useReducer + useTodos hook
    ThemeContext.jsx     – Dark mode state and persistence
  /utils
    storage.js           – loadTasks() / saveTasks() for localStorage
    api.js               – Mock API (json-server) for future scalability
  App.jsx                – Routes + ThemeProvider + TodoProvider + Header
  index.js               – Entry point with BrowserRouter
  index.css              – Tailwind directives + base styles
```

### Data Persistence

- **localStorage** – All tasks are stored via `src/utils/storage.js`. Data survives page reloads and browser restarts.
- **Mock API (optional)** – Run `npm run server` to start json-server on port 3001. When the server is running, the app fetches from and syncs to the API instead of (and in addition to) localStorage. This demonstrates future API integration.

### Styling & UI

- **Tailwind CSS** – Layout, spacing, colors, responsiveness.
- **Completed vs pending** – Completed tasks use muted colors and strikethrough; pending tasks are emphasized.
- **Priority indicators** – Colored dots (red = high, amber = medium, gray = low) next to each task.
- **Dark mode** – Toggle in the header; preference persisted in localStorage.
- **Navigation** – Header links with active state; Export/Import buttons; sun/moon icon for theme.

### Bonus Features

- **Drag-and-drop** – Reorder tasks on the Home page when viewing "All" (via @dnd-kit).
- **Dark mode toggle** – Header button; preference saved to localStorage.
- **Task priority** – High, Medium, Low with visual indicators (colored dots).
- **Export/Import** – Export tasks as JSON file; Import replaces current tasks with JSON file contents.

## Instructions to Run Locally

### Prerequisites

- Node.js and npm

### Install and run

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Optional: Mock API

To use the json-server mock backend (for simulating API calls):

```bash
# In a separate terminal
npm run server
```

This starts json-server on [http://localhost:3001](http://localhost:3001). When running, the app will fetch and sync tasks with the API.

### Other scripts

- **`npm run build`** – Production build (output in `build/`).
- **`npm run test`** – Run the test runner in watch mode.
- **`npm run server`** – Start json-server on port 3001 (mock API).
