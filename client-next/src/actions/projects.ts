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

const baseApiUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

/**
 * Busca os projetos publicados na API.
 * Lança um erro caso a requisição falhe.
 */
export async function fetchPublishedProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${baseApiUrl}/projects`, {
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

export async function getProject(id: string) {
  const res = await fetch(`${baseApiUrl}/projects/${id}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch project");
  }

  return res.json();
}
