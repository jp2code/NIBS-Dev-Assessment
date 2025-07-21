import React, { useState, useEffect } from "react";
import ErrorModal from "./ErrorModal.jsx";

const ProjectForm = ({ addProject, updateProject, deleteProject, selectedProject }) => {
    const [formData, setFormData] = useState({
        id: 0,
        name: "",
        description: "",
        owner: "",
        status: "Planned",
        startDate: "",
        endDate: "",
    });
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (selectedProject) {
            setFormData({
                id: selectedProject.id,
                name: selectedProject.name,
                description: selectedProject.description,
                owner: selectedProject.owner,
                status: selectedProject.status,
                startDate: selectedProject.startDate,
                endDate: selectedProject.endDate,
            });
        } else {
            setFormData({
                id: null,
                name: "",
                description: "",
                owner: "",
                status: "Planned",
                startDate: "",
                endDate: "",
            });
        }
    }, [selectedProject]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        if (!formData.name.trim()) return "Project Name is required.";
        if (!formData.description.trim()) return "Description is required.";
        if (!formData.owner.trim()) return "Owner is required.";
        if (!formData.startDate) return "Start Date is required.";
        if (!formData.endDate) return "End Date is required.";
        if (new Date(formData.endDate) < new Date(formData.startDate)) return "End Date cannot be before Start Date.";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            setShowError(true);
            return;
        }
        setError("");
        setShowError(false);
        const response = await fetch('/api/NIBS', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            if (0 < formData.id) {
                // If an ID exists, we are updating an existing project
                updateProject(formData);
            } else {
                // If no ID exists, we are adding a new project
                addProject(formData);
            }
            setFormData({ name: "", description: "", owner: "", status: "Planned", startDate: "", endDate: "" });
        } else {
            const errorText = await response.text();
            setError(`Failed to add project. Status: ${response.status}. Details: ${errorText}`);
            setShowError(true);
        }
    };

    const handleDelete = async () => {
        if (formData.id && window.confirm("Are you sure you want to delete this project?")) {
            await deleteProject(formData.id);
            setFormData({ id: null, name: "", description: "", owner: "", status: "Planned", startDate: "", endDate: "" });
        }
    };

    return (
        <>
            <ErrorModal show={!!error && showError} message={error} onClose={() => setShowError(false)} />
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-3">
                    <div className="col-md-4">
                        <input type="text" className="form-control" name="name" placeholder="Project Name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4">
                        <input type="text" className="form-control" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4">
                        <input type="text" className="form-control" name="owner" placeholder="Owner" value={formData.owner} onChange={handleChange} required />
                    </div>
                    <div className="col-md-3">
                        <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                            <option>Planned</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <input type="datetime-local" className="form-control" name="startDate" value={formData.startDate} onChange={handleChange} required />
                    </div>
                    <div className="col-md-3">
                        <input type="datetime-local" className="form-control" name="endDate" value={formData.endDate} onChange={handleChange} required />
                    </div>
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-primary w-100">Save Project</button>
                    </div>
                    {0 < formData.id && (
                        <div className="col-md-3">
                            <button type="button" className="btn btn-danger w-100" onClick={handleDelete}>Delete Project</button>
                        </div>
                    )}
                </div>
            </form>
        </>
    );
};

export default ProjectForm;
