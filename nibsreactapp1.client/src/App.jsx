import React, { useState, useEffect } from "react";
import "../Content/bootstrap.min.css";
import ProjectForm from "./ProjectForm.jsx";
import ProjectTable from "./ProjectTable.jsx";

const App = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        // Fetch initial projects from the server
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const result = await fetch('/api/NIBS');
        if (result.ok) {
            const data = await result.json();
            setProjects(data);
        } else {
            console.error("Failed to fetch projects");
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
            console.error("Failed to add project");
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
            console.error("Failed to delete project");
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
            console.error("Failed to update project");
            return;
        }
        fetchProjects(); // Refresh the project list after updating
    };

    useEffect(() => {
        fetch('/api/NIBS')
            .then(res => res.json())
            .then(data => setProjects(data));
    }, []);

    return (
        <div className="container mt-5">
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
