import { useLocation } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";

export default function EditProject() {
  const location = useLocation();
  const project = location.state?.project;

  return (
    <div className="px-6">
      <h1 className="montserrat-bold text-[18px] mb-6">Edit Project</h1>
      <ProjectForm selectedProject={project} />
    </div>
  );
}
