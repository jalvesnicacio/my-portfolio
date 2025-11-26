import Image from "next/image";

async function getProject(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/projects/${id}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch project");
  }

  return res.json();
}

interface ProjectPageProps {
  params: { id: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = params;
  const project = await getProject(id);

  return (
    <div className="min-h-screen pt-20 pb-32 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>

      {project.summary && (
        <p className="text-lg text-gray-600 mb-8">{project.summary}</p>
      )}

      {project.imageUrl && (
        <div className="w-full h-auto rounded-xl overflow-hidden shadow mb-10">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={1200}
            height={700}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none mb-12">
        <p>{project.description}</p>
      </div>

      {project.technologies?.length > 0 && (
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string, index: number) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {project.projectUrl && (
        <a
          href={project.projectUrl}
          target="_blank"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
        >
          Visit Project →
        </a>
      )}
    </div>
  );
}
