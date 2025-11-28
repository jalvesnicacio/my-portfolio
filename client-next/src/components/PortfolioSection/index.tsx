"use client";
import { useEffect, useState } from "react";
import { Project, fetchPublishedProjects } from "@/actions/projects";
import { useRouter } from "next/navigation";

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const publishedProjects = await fetchPublishedProjects();
        setProjects(publishedProjects);
      } catch {
        setError("Não foi possível carregar os projetos.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-10 flex flex-col items-center justify-center">
        <p>Carregando projetos...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 flex flex-col items-center justify-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section
      className="py-10 flex flex-col items-center justify-center"
      id="portfolio"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Portfolio</h2>
      <h3 className="text-gray-500 text-center max-w-2xl">
        A selection of projects that showcase my approach to building
        thoughtful, user-centered, and accessible digital products.
      </h3>

      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden max-w-md"
          >
            {/* Imagem */}
            <div className="w-full h-56 overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Conteúdo */}
            <div className="p-6">
              <p className="text-xs font-semibold tracking-widest text-gray-400 mb-2">
                {/* {project.category || "UI-UX DESIGN"} */}
                Web Development
              </p>

              <h4 className="font-semibold text-xl text-gray-900 mb-2">
                {project.title}
              </h4>

              <p className="text-gray-600 text-sm leading-relaxed">
                {project._id} - {project.description}
              </p>

              {/* Botão */}
              <button
                className="mt-6 inline-flex items-center gap-2 text-purple-600 font-medium border border-purple-400 rounded-xl px-4 py-2 hover:bg-purple-50 transition"
                onClick={() => router.push(`/project/${project._id}`)}
              >
                Case Study
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.5 4.5l6 6m0 0l-6 6m6-6H4.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

