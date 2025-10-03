"use client";
import { useEffect, useState } from "react";

export interface Project {
  _id: string; // O MongoDB gera um _id que geralmente é uma string na API
  title: string;
  summary: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  projectUrl: string;
  publish: boolean;
}

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true); // Opcional: para feedback de UI
  const [error, setError] = useState<string | null>(null); // Opcional: para tratar erros

  useEffect(() => {
    // Definimos a função assíncrona para buscar os dados
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/projects");

        // Verifica se a resposta da rede foi bem-sucedida
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        // **AQUI ESTÁ A CORREÇÃO PRINCIPAL**
        // 1. Esperamos a conversão da resposta para JSON
        const allProjects: Project[] = await res.json();

        // 2. Filtramos os projetos que devem ser publicados
        const publishedProjects = allProjects.filter((p) => p.publish);

        // 3. Atualizamos o estado com os projetos filtrados
        setProjects(publishedProjects);
      } catch (e) {
        console.error("Erro ao buscar os projetos:", e);
        setError("Não foi possível carregar os projetos."); // Atualiza o estado de erro
      } finally {
        setLoading(false); // Garante que o loading termine, com ou sem erro
      }
    };

    fetchProjects();
  }, []);
  // Renderização condicional baseada nos estados
  if (loading) {
    return (
      <section className="py-10 px-50 flex flex-col items-center justify-center">
        <p>Carregando projetos...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 px-50 flex flex-col items-center justify-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="py-10 px-50 flex flex-col items-center justify-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Portfolio</h2>
      <h3 className="text-gray-500">
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration.
      </h3>

      {/* Aqui você pode mapear o array de `projects` para renderizar os cards */}
      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project._id}
            className="border p-4 rounded-lg shadow-lg bg-white"
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h4 className="font-bold text-xl">{project.title}</h4>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
