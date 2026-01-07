import ProjectList from "../components/ProjectList";
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const handleRefresh = () => setRefresh(!refresh);

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

  const handleEdit = (project) => {
    navigate(`/projects/${project._id}/edit`, { state: { project } });
  };

  return (
    <div className="px-6">
      <h1 className="montserrat-bold text-[18px] mb-6">Projects</h1>

      <button
        onClick={() => navigate("/projects/new")}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add New Project
      </button>

      <ProjectList
        refresh={refresh}
        onEdit={handleEdit}
        onDelete={handleDeleteProject}
      />
    </div>
  );
}
