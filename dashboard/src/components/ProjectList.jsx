import api from "../services/api";
import { useEffect, useState } from "react";

const ProjectList = ({ refresh, onEdit, onDelete }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api
      .get("/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, [refresh]);

  return (
    <div className="flex flex-col mb-10">
      <h2 className="montserrat-bold text-[18px] my-6">List of Projects</h2>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Summary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Technologies
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Published
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {projects.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {p.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {p.summary}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {p.technologies.join(", ")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <img src={p.imageUrl} alt={p.title} className="w-16 h-16" />
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    p.publish ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {p.publish ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(p)}
                    className="text-blue-600 hover:underline mr-3"
                  >
                    Update
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => {
                      onDelete(p._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;
