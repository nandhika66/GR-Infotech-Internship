import { Outlet, useNavigate } from "react-router-dom";
import { getAcceptedProjects } from "../services/projectService";
import { logout } from "../services/authService";

export default function FreelancerLayout() {
  const navigate = useNavigate();
  const accepted = getAcceptedProjects();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-indigo-700 text-white p-4">
        <h2 className="text-lg font-semibold mb-6">Freelancer</h2>

        <button
          onClick={() => navigate("/freelancer/projects")}
          className="block w-full text-left mb-2"
        >
          Project Assignments
        </button>

        {accepted.length > 0 && (
          <button
            onClick={() => navigate("/freelancer/tracking")}
            className="block w-full text-left mb-2"
          >
            Tracking
          </button>
        )}

        <button
          onClick={() => navigate("/freelancer/profile")}
          className="block w-full text-left mb-2"
        >
          Profile
        </button>

        <button
          className="mt-10 underline text-sm"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
