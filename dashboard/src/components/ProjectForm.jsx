import { useEffect, useState } from "react";
import api from "../services/api";
import InputGroup from "./InputGroup";
import MediaInput from "./MediaInput";
import TextAreaGroup from "./TextAreaGroup";
import CheckboxGroup from "./CheckboxGroup";

const ProjectForm = ({ onProjectAdded, selectedProject, onCancelEdit }) => {
  const isEditing = !!selectedProject;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [existingMedia, setExistingMedia] = useState([]);
  const [newMediaAlt, setNewMediaAlt] = useState({});
  const [form, setForm] = useState({
    title: "",
    summary: "",
    description: "",
    projectUrl: "",
    technologies: "",
    publish: false
  });

  useEffect(() => {
    if (!selectedProject) return;

    setForm({
      title: selectedProject.title || "",
      summary: selectedProject.summary || "",
      description: selectedProject.description || "",
      projectUrl: selectedProject.projectUrl || "",
      technologies: selectedProject.technologies?.join(", ") || "",
      publish: selectedProject.publish || false
    });

    setExistingMedia(selectedProject.media || []);
  }, [selectedProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);

    // limpa o input para permitir selecionar o mesmo arquivo novamente, se quiser
    e.target.value = null;
  };

  const removeSelectedFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let media = [...existingMedia];

    // Upload de novos arquivos (se houver)
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      try {
        const uploadRes = await api.post("/api/projects/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        // Espera-se que o backend retorne { media: [...] }
        const uploadedWithAlt = uploadRes.data.media.map((m, index) => ({
          ...m,
          alt: newMediaAlt[index] || ""
        }));
        media = [...media, ...uploadedWithAlt];
      } catch (error) {
        console.error("Error uploading files:", error);
        alert("Error uploading files");
        return;
      }
    }

    const payload = {
      title: form.title,
      summary: form.summary,
      description: form.description,
      projectUrl: form.projectUrl,
      publish: form.publish,
      technologies: form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      media
    };

    try {
      if (isEditing) {
        await api.put(`/api/projects/${selectedProject._id}`, payload);
      } else {
        await api.post("/api/projects", payload);
      }

      alert("Project saved successfully");
      onProjectAdded?.();

      // Reset
      setForm({
        title: "",
        summary: "",
        description: "",
        projectUrl: "",
        technologies: "",
        publish: false
      });
      setSelectedFiles([]);
      setExistingMedia([]);
      setNewMediaAlt({});
      onCancelEdit?.();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Error saving project");
    }
  };

  const renderMediaPreview = (mediaList, removable = false) => (
    <div className="flex flex-wrap gap-4 mt-4">
      {mediaList.map((m, index) => (
        <div key={index} className="relative w-32">
          {m.tipo === "video" ? (
            <video
              src={m.url}
              controls
              className="w-32 h-24 object-cover rounded"
            />
          ) : (
            <img
              src={m.url}
              alt={m.alt || ""}
              className="w-32 h-24 object-cover rounded"
            />
          )}
          <input
            type="text"
            placeholder="Alt text (accessibility)"
            value={m.alt || ""}
            onChange={(e) => {
              const updated = [...existingMedia];
              updated[index] = {
                ...updated[index],
                alt: e.target.value
              };
              setExistingMedia(updated);
            }}
            className="mt-1 w-full text-xs border rounded px-1 py-0.5"
          />
          {removable && (
            <button
              type="button"
              onClick={() =>
                setExistingMedia(existingMedia.filter((_, i) => i !== index))
              }
              className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );

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
        label="Project URL"
        name="projectUrl"
        value={form.projectUrl}
        onChange={handleChange}
        required={false}
      />

      <MediaInput
        label="Media (images or videos)"
        onChange={handleFileChange}
        filesCount={selectedFiles.length}
      />

      {existingMedia.length > 0 && (
        <div className="mb-3">
          <p className="text-sm font-medium mt-4">Existing media</p>
          {renderMediaPreview(existingMedia, true)}
        </div>
      )}

      {selectedFiles.length > 0 && (
        <div className="mb-3">
          <p className="text-sm font-medium mt-4">New media (preview)</p>
          <div className="flex flex-wrap gap-4 mt-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative w-32">
                {file.type.startsWith("video") ? (
                  <video
                    src={URL.createObjectURL(file)}
                    className="w-32 h-24 object-cover rounded"
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-32 h-24 object-cover rounded"
                  />
                )}
                <input
                  type="text"
                  placeholder="Alt text (accessibility)"
                  value={newMediaAlt[index] || ""}
                  onChange={(e) =>
                    setNewMediaAlt((prev) => ({
                      ...prev,
                      [index]: e.target.value
                    }))
                  }
                  className="mt-1 w-full text-xs border rounded px-1 py-0.5"
                />
                <button
                  type="button"
                  onClick={() => removeSelectedFile(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded hover:bg-red-700"
                  title="Remove file"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

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
