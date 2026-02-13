# Todo App

A React todo application with a login form and a table-based task list. Built with [Create React App](https://github.com/facebook/create-react-app) and [React Router](https://reactrouter.com/).

## Features

- **Home** – Landing page with a link to the Todos page.
- **Login** – React form with email and password fields, client-side validation, and redirect to Todos on submit (demo: any non-empty credentials work).
- **Todos** – Task list displayed in an HTML table with:
  - Add new tasks
  - Mark complete/incomplete (checkbox)
  - Filter: All / Active / Completed
  - Inline edit (double-click or Edit button)
  - Delete and Clear completed
  - Persistence via `localStorage`

## Routes

| Path     | Page  | Description        |
|----------|-------|--------------------|
| `/`      | Home  | App intro & link   |
| `/login` | Login | Sign-in form       |
| `/todos` | Todos | Task table & form  |

## Getting Started

### Prerequisites

- Node.js and npm

### Install and run

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000). The page reloads when you edit the code.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production into the `build` folder. Ready to deploy.

### `npm run eject`

**Note: one-way operation.** Ejects from Create React App and copies build config into the project. Not required for normal use.

## Learn More

- [Create React App documentation](https://facebook.github.com/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
