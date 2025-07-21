import React, { useState } from "react";
import ErrorModal from "./ErrorModal.jsx";
import ErrorModal from "./ErrorModal";

const ProjectForm = ({ addProject }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        owner: "",
        status: "Planned",
        startDate: "",
        endDate: "",
    });
    const [showError, setShowError] = useState("");

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
        const response = await fetch('/api/NIBS', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            addProject(formData);
            setFormData({ name: "", description: "", owner: "", status: "Planned", startDate: "", endDate: "" });
        } else {
            const errorText = await response.text();
            setError(`Failed to add project. Status: ${response.status}. Details: ${errorText}`);
            setShowError(true);
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
                        <button type="submit" className="btn btn-primary w-100">Add Project</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ProjectForm;
