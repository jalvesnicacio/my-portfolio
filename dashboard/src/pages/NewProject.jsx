import ProjectForm from "../components/ProjectForm";
import { useNavigate } from "react-router-dom";

export default function NewProject() {
  const navigate = useNavigate();

  return (
    <div className="px-6">
      <h1 className="montserrat-bold text-[18px] mb-6">Add New Project</h1>
      <ProjectForm onProjectAdded={() => navigate("/projects")} />
    </div>
  );
}
