import React, { useState, useEffect } from "react";
import "../Content/bootstrap.min.css";
import ProjectForm from "./ProjectForm.jsx";
import ProjectTable from "./ProjectTable.jsx";
import ErrorModal from "./ErrorModal.jsx";

const App = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);

    const handleError = (msg) => {
        setError(msg);
        setShowError(true);
    };

    const fetchProjects = async () => {
        const result = await fetch('/api/NIBS');
        if (result.ok) {
            const data = await result.json();
            setProjects(data);
        } else {
            handleError("Failed to fetch projects");
        }
    };

    const addProject = async (project) => {
        const result = await fetch('/api/NIBS', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        });
        if (!result.ok) {
            handleError("Failed to add project");
            return;
        }
        fetchProjects(); // Refresh the project list after adding
        // setProjects([...projects, project]);
    };

    const deleteProject = async (projectId) => {
        const result = await fetch(`/api/NIBS/${projectId}`, {
            method: 'DELETE'
        });
        if (!result.ok) {
            handleError("Failed to delete project");
            return;
        }
        fetchProjects(); // Refresh the project list after deletion
        setSelectedProject(null); // Clear selected project after deletion
    };

    const updateProject = async (project) => {
        const result = await fetch(`/api/NIBS/${project.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        });
        if (!result.ok) {
            handleError("Failed to update project");
            return;
        }
        fetchProjects(); // Refresh the project list after updating
    };

    useEffect(() => {
        fetchProjects(); // Refresh the project list after updating
    }, []);

    return (
        <div className="container mt-5">
            <ErrorModal
                isOpen={showError}
                message={error}
                onClose={() => setShowError(false)}
            />
            <h1 className="mb-4">Project Tracker</h1>
            <ProjectForm
                addProject={addProject}
                deleteProject={deleteProject}
                selectedProject={selectedProject}
                updateProject={updateProject}
            />
            <hr />
            <ProjectTable
                projects={projects}
                onSelectProject={setSelectedProject}
                selectedProjectId={selectedProject ? selectedProject.id : 0}
            />
        </div>
    );
};

export default App;
