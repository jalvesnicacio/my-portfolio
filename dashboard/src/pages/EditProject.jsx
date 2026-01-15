import { useLocation } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import { useNavigate } from "react-router-dom";

export default function EditProject() {
  const location = useLocation();
  const project = location.state?.project;
  const navigate = useNavigate();
  return (
    <div className="px-6">
      <h1 className="montserrat-bold text-[18px] mb-6">Edit Project</h1>
      <ProjectForm
        selectedProject={project}
        onProjectAdded={() => navigate("/projects")}
        onCancelEdit={() => navigate("/projects")}
      />
    </div>
  );
}
