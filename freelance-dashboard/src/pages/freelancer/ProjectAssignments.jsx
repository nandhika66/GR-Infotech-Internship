import { useEffect, useState } from "react";
import { getProjects, updateProjectStatus } from "../../services/projectService";

export default function ProjectAssignments() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleStatus = (id, status) => {
    setProjects(updateProjectStatus(id, status));
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Project Assignments</h1>

      {projects.map(p => (
        <div key={p.id} className="bg-white p-4 mb-4 shadow rounded">
          <h2 className="font-medium">{p.title}</h2>
          <p className="text-sm text-gray-600">{p.description}</p>

          <p className="text-sm mt-1"><b>Client:</b> {p.client}</p>
          <p className="text-sm"><b>Duration:</b> {p.duration}</p>
          <p className="text-sm"><b>Hours:</b> {p.expectedHours}</p>
          <p className="text-sm"><b>Payment:</b> {p.payment}</p>

          {p.status === "pending" ? (
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleStatus(p.id, "accepted")}
                className="bg-indigo-600 text-white px-3 py-1 rounded"
              >
                Accept
              </button>
              <button
                onClick={() => handleStatus(p.id, "declined")}
                className="border px-3 py-1 rounded"
              >
                Decline
              </button>
            </div>
          ) : (
            <p className="mt-2 italic text-sm">
              Status: {p.status}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
