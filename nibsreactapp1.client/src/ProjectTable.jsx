import React, { useState } from "react";

const ProjectTable = ({ projects, onSelectProject, selectedProjectId }) => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const filteredProjects = projects.filter(project =>
        (filter === "All" || project.status === filter) &&
        (project.name.toLowerCase().includes(search.toLowerCase()) ||
            project.owner.toLowerCase().includes(search.toLowerCase()))
    );

    const handleRowClick = (project) => {
        selectedProjectId = project.id; // Update the selected project ID
        if (onSelectProject) {
            onSelectProject(project);
        }
    };

    return (
        <div>
            <div className="row g-3 mb-3">
                <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Search by name or owner" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="col-md-6">
                    <select className="form-select" value={filter} onChange={e => setFilter(e.target.value)}>
                        <option value="All">All Statuses</option>
                        <option value="Planned">Planned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </div>
            <table className="table table-striped table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>Project Name</th>
                        <th>Description</th>
                        <th>Owner</th>
                        <th>Status</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProjects.map((proj, idx) => (
                        <tr
                            key={idx}
                            onClick={() => handleRowClick(proj)}
                            style={{
                                backgroundColor: proj.id === selectedProjectId ? '#f0f8ff' : '',
                                cursor: 'pointer',
                            }}
                        >
                            <td>{proj.name}</td>
                            <td>{proj.description}</td>
                            <td>{proj.owner}</td>
                            <td>{proj.status}</td>
                            <td>{proj.startDate}</td>
                            <td>{proj.endDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectTable;
