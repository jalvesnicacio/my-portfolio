import { use, useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const ProjectShowcase = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/api/projects");
        const publishedProjects = res.data.filter((p) => p.publish);
        setProjects(publishedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="mb-10">
      <header className="mb-6 portfolio-header">
        <h1 className="text-3xl font-bold montserrat-bold portfolio-title">
          PORTFOLIO
        </h1>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="text-gray-600 mb-2">{project.description}</p>
            <Link
              to={`/projects/${project._id}`}
              className="text-blue-600 hover:underline"
            >
              See more
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
export default ProjectShowcase;
