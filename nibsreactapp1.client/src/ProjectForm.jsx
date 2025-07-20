import React, { useState } from "react";

const ProjectForm = ({ addProject }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        owner: "",
        status: "Planned",
        startDate: "",
        endDate: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addProject(formData);
        setFormData({ name: "", description: "", owner: "", status: "Planned", startDate: "", endDate: "" });
    };

    return (
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
    );
};

export default ProjectForm;
