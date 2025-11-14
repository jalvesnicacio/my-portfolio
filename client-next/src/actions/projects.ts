export interface Project {
  _id: string;
  title: string;
  summary: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  projectUrl: string;
  publish: boolean;
}

/**
 * Busca os projetos publicados na API.
 * Lança um erro caso a requisição falhe.
 */
export async function fetchPublishedProjects(): Promise<Project[]> {
  try {
    const res = await fetch("http://localhost:5001/api/projects", {
      next: { revalidate: 60 } // opcional: revalidação automática no Next
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const allProjects: Project[] = await res.json();
    return allProjects.filter((p) => p.publish);
  } catch (error) {
    console.error("Erro ao buscar os projetos:", error);
    throw error;
  }
}
