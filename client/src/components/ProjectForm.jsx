import { useEffect, useState } from "react";
import api from "../services/api";
import InputGroup from "./InputGroup";
import TextAreaGroup from "./TextAreaGroup";
import CheckboxGroup from "./CheckboxGroup";

const ProjectForm = ({ onProjectAdded, selectedProject, onCancelEdit }) => {
  const isEditing = !!selectedProject;
  const [selectedFile, setSelectedFile] = useState(null);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    description: "",
    imageUrl: "",
    projectUrl: "",
    technologies: "",
    publish: false,
  });

  // const [form, setForm] = useState({ ... });

  useEffect(() => {
    if (selectedProject) {
      setForm({
        ...selectedProject,
        technologies: selectedProject.technologies.join(", "),
      });
    }
  }, [selectedProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = form.imageUrl; // Use the existing imageUrl if provided
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      console.log("Form data:", form);
      try {
        const uploadRes = await api.post("/api/projects/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        imageUrl = uploadRes.data.imageUrl;
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file: " + error.message);
        return;
      }
    }

    // Monta o payload com a imageUrl para envio:
    const payload = {
      ...form,
      imageUrl,
      technologies: form.technologies.split(",").map((t) => t.trim()),
    };

    // Se o projeto já existe, atualiza-o
    try {
      let res;
      if (isEditing) {
        res = await api.put(`/api/projects/${selectedProject._id}`, payload);
      } else {
        res = await api.post("/api/projects", payload);
      }
      onProjectAdded(res.data);
      // Reset the form after submission
      setForm({
        title: "",
        summary: "",
        description: "",
        technologies: "",
        imageUrl: "",
        projectUrl: "",
        publish: false,
      });
      setSelectedFile(null);
      if (onCancelEdit) onCancelEdit();
      alert("Project saved successfully");
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Error updating project: " + error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto px-auto mb-15 flex flex-col project-form px-6"
    >
      <InputGroup
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
      />

      <TextAreaGroup
        label="Summary"
        name="summary"
        value={form.summary}
        onChange={handleChange}
      />

      <TextAreaGroup
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
      />

      <InputGroup
        label="Technologies (Comma separated)"
        name="technologies"
        value={form.technologies}
        onChange={handleChange}
      />

      <InputGroup
        label="Image"
        name="imageFile"
        type="file"
        onChange={handleFileChange}
        required={false}
      />

      <InputGroup
        label="Project URL"
        name="projectUrl"
        value={form.projectUrl}
        onChange={handleChange}
        required={false}
      />

      <CheckboxGroup
        label="Published?"
        name="publish"
        checked={form.publish}
        onChange={(e) => setForm({ ...form, publish: e.target.checked })}
      />

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-2/3"
      >
        {isEditing ? "Update Project" : "Add Project"}
      </button>

      {isEditing && (
        <button
          type="button"
          onClick={onCancelEdit}
          className="text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm px-5 py-2.5 mb-2 w-2/3"
        >
          Cancel
        </button>
      )}
    </form>
  );
};
export default ProjectForm;
