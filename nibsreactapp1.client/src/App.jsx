import React, { useState } from "react";
import "../Content/bootstrap.min.css";
import ProjectForm from "./ProjectForm.jsx";
import ProjectTable from "./ProjectTable.jsx";

const App = () => {
    const [projects, setProjects] = useState([]);

    const addProject = (project) => {
        setProjects([...projects, project]);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Project Tracker</h1>
            <ProjectForm addProject={addProject} />
            <hr />
            <ProjectTable projects={projects} />
        </div>
    );
};

export default App;
