import { useState } from "react";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";
import api from "../services/api";

function AdminPanel() {
  const [refresh, setRefresh] = useState(false);
  const handleProjectAdded = () => setRefresh(!refresh);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleEditProject = (project) => {
    console.log("Editing project:", project);
    setSelectedProject(project);
  };

  const handleClearSelection = () => {
    setSelectedProject(null);
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      api
        .delete(`/api/projects/${projectId}`)
        .then(() => {
          alert("Project deleted successfully");
          handleRefresh();
        })
        .catch((error) => {
          console.error("Error deleting project:", error);
          alert("Error deleting project: " + error.message);
        });
    }
  };

  return (
    <>
      <h1 className="montserrat-bold text-[18px] px-6 mb-6">
        Administration Panel
      </h1>
      <ProjectForm
        selectedProject={selectedProject}
        onProjectAdded={handleRefresh}
        onCancelEdit={handleClearSelection}
      />
      <hr />
      <ProjectList
        refresh={refresh}
        onEdit={handleEditProject}
        onDelete={handleDeleteProject}
      />
    </>
  );
}

export default AdminPanel;
