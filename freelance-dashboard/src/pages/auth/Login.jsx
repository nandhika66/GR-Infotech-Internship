import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../services/authService";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [profile, setProfile] = useState({
    fullName: "",
    role: "",
    experience: "",
    techStack: "",
    bio: ""
  });

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    const success = isSignup
      ? signUp(email, password, {
          ...profile,
          techStack: profile.techStack
            .split(",")
            .map(t => t.trim()),
          projects: []
        })
      : signIn(email, password);

    if (success) {
      navigate("/freelancer/projects", { replace: true });
    } else {
      alert(
        isSignup
          ? "Account already exists."
          : "Invalid credentials."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 w-96 rounded shadow"
      >
        <h2 className="text-xl font-semibold mb-4">
          {isSignup ? "Create Account" : "Sign In"}
        </h2>

        {isSignup && (
          <>
            <input
              className="w-full border p-2 mb-2"
              placeholder="Full Name"
              value={profile.fullName}
              onChange={e =>
                setProfile({ ...profile, fullName: e.target.value })
              }
            />

            <select
              className="w-full border p-2 mb-2"
              value={profile.role}
              onChange={e =>
                setProfile({ ...profile, role: e.target.value })
              }
            >
              <option value="">Select Role</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Full Stack Developer</option>
              <option>UI/UX Designer</option>
              <option>AI / ML Engineer</option>
            </select>

            <input
              className="w-full border p-2 mb-2"
              placeholder="Experience (eg: Student / 1-2 years)"
              value={profile.experience}
              onChange={e =>
                setProfile({
                  ...profile,
                  experience: e.target.value
                })
              }
            />

            <input
              className="w-full border p-2 mb-2"
              placeholder="Tech Stack (React, Node, Python...)"
              value={profile.techStack}
              onChange={e =>
                setProfile({
                  ...profile,
                  techStack: e.target.value
                })
              }
            />

            <textarea
              className="w-full border p-2 mb-3"
              placeholder="Short professional bio"
              value={profile.bio}
              onChange={e =>
                setProfile({ ...profile, bio: e.target.value })
              }
            />
          </>
        )}

        <input
          type="email"
          required
          className="w-full border p-2 mb-3"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          required
          className="w-full border p-2 mb-4"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p
          className="mt-3 text-sm text-indigo-600 cursor-pointer text-center"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an account? Sign In"
            : "New here? Create an account"}
        </p>
      </form>
    </div>
  );
}
