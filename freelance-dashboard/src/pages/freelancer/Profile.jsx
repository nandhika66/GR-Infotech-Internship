import { getProfile } from "../../services/authService";

export default function Profile() {
  const profile = getProfile();

  if (!profile) return <p>No profile data found.</p>;

  return (
    <div className="max-w-3xl bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-semibold mb-1">
        {profile.fullName}
      </h1>

      <p className="text-indigo-600 mb-1">{profile.role}</p>
      <p className="text-sm text-gray-600 mb-4">
        Experience: {profile.experience}
      </p>

      <h3 className="font-semibold mb-2">Tech Stack</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {profile.techStack.map((tech, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded text-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      <h3 className="font-semibold mb-2">About</h3>
      <p className="text-sm text-gray-700 mb-4">
        {profile.bio}
      </p>

      <h3 className="font-semibold mb-2">Projects</h3>
      {profile.projects.length === 0 ? (
        <p className="text-sm text-gray-500">
          No projects added yet.
        </p>
      ) : (
        profile.projects.map((p, i) => (
          <div key={i} className="mb-2">
            <b>{p.title}</b>
            <p className="text-sm">{p.description}</p>
          </div>
        ))
      )}
    </div>
  );
}
