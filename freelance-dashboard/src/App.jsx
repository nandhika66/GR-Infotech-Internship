import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import FreelancerLayout from "./layouts/FreelancerLayout";
import ProjectAssignments from "./pages/freelancer/ProjectAssignments";
import Tracking from "./pages/freelancer/Tracking";
import Profile from "./pages/freelancer/Profile";
import { isLoggedIn } from "./services/authService";

function PrivateRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/freelancer"
        element={
          <PrivateRoute>
            <FreelancerLayout />
          </PrivateRoute>
        }
      >
        <Route path="projects" element={<ProjectAssignments />} />
        <Route path="tracking" element={<Tracking />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
