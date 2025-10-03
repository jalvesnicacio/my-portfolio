// src/components/ProjectDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/api/projects/${id}`)
      .then((res) => {
        setProject(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar projeto:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading project...</p>;
  }

  if (!project) {
    return <p className="text-center mt-10">Project not found.</p>;
  }

  return (
    <section className="pt-10">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
        )}
        <p className="text-gray-800 mb-2">
          <strong>Summary:</strong> {project.summary}
        </p>
        <p className="text-gray-800 mb-2">
          <strong>Description:</strong> {project.description}
        </p>
        <p className="text-gray-800 mb-2">
          <strong>Technologies:</strong>{" "}
          {project.technologies && project.technologies.join(", ")}
        </p>

        {project.projectUrl && (
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Visit project website
          </a>
        )}
      </div>
    </section>
  );
};

export default ProjectDetails;
