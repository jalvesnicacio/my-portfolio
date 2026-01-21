export interface Media {
  url: string;
  type: "image" | "video";
  alt: string;
}

export interface Project {
  _id: string;
  title: string;
  summary: string;
  description: string;
  technologies: string[];
  media: Media[];
  projectUrl: string;
  publish: boolean;
}

/**
 * Resolve a URL base da API dependendo do ambiente:
 * - Server (Node / Docker): usa hostname do docker-compose
 * - Browser: usa localhost ou variável pública
 */
function getApiBaseUrl() {
  const isServer = typeof window === "undefined";

  if (isServer) {
    return process.env.API_INTERNAL_URL ?? "http://server:5001";
  }

  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001";
}

const API_BASE = getApiBaseUrl();

/**
 * Busca os projetos publicados na API.
 * Lança um erro caso a requisição falhe.
 */
export async function fetchPublishedProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE}/api/projects`, {
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
  try {
    const res = await fetch(`${API_BASE}/api/projects/${id}`, {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("Failed to fetch project");
    }

    return res.json();
  } catch (error) {
    console.error("Erro ao buscar o projeto:", error);
    throw error;
  }
}
