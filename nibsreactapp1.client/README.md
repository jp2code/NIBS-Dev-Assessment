# NibsReactApp1 Client

This is the React client for the Project Tracker application. It provides a user-friendly interface for managing projects, including creating, viewing, updating, and deleting project records.

## Technologies Used

- **React** (with functional components and hooks)
- **Vite** (for fast development and build tooling)
- **Bootstrap** (for responsive UI styling)
- **Fetch API** (for communication with the backend)
- **Custom Error Modal** (for user-friendly error handling)

## Features

- **Project Table:** View all projects in a searchable, filterable, and selectable table.
- **Project Form:** Add new projects or edit/delete existing ones. The form is pre-filled when a project is selected from the table.
- **Error Handling:** All errors are displayed in a modal dialog for better user experience.
- **Full CRUD:** Supports Create, Read, Update, and Delete operations via REST API calls to the backend.

## Database Schema

The backend uses a SQL Server database with the following schema for the `NIBS` table:
```sql
CREATE TABLE NIBS (
	Id INT PRIMARY KEY IDENTITY(1,1),
	Name NVARCHAR(100) NOT NULL,
	Description NVARCHAR(255),
	StartDate DATETIME,
	EndDate DATETIME,
	Status NVARCHAR(50)
);
```

## How It Works

1. On load, the app fetches the list of projects from the backend API (`/api/NIBS`).
2. The table displays all projects and allows searching/filtering.
3. Clicking a row in the table loads the project data into the form for editing or deletion.
4. The form can be used to add a new project or update/delete the selected project.
5. All changes are sent to the backend via HTTP requests, and the table refreshes automatically.

## Getting Started

1. **Install dependencies:**
```bash
npm install
```
2. **Start the development server:**
```bash
npm run dev
```
3. Ensure the backend (.NET 8 API) is running and accessible at the configured API endpoint.

## Project Structure

- `src/App.jsx` – Main application logic and state management
- `src/ProjectForm.jsx` – Form for adding/editing/deleting projects
- `src/ProjectTable.jsx` – Table for displaying and selecting projects
- `src/ErrorModal.jsx` – Modal dialog for error messages

## Requirements

- Node.js and npm
- The backend API (see server project) must be running for full functionality

---

This client is designed to work seamlessly with the NibsReactApp1 .NET 8 backend, providing a complete project tracking solution.