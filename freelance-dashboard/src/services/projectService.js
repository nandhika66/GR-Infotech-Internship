import demoProjects from "../data/assignedProjects.json";
import { getCurrentUser } from "./authService";

function getProjectKey() {
  const user = getCurrentUser();
  return user ? `assigned_projects_${user.email}` : null;
}

export function getProjects() {
  const key = getProjectKey();
  if (!key) return [];

  const saved = localStorage.getItem(key);
  if (!saved) {
    localStorage.setItem(key, JSON.stringify(demoProjects));
    return demoProjects;
  }
  return JSON.parse(saved);
}

export function updateProjectStatus(id, status) {
  const key = getProjectKey();
  if (!key) return [];

  const projects = getProjects();
  const updated = projects.map(p =>
    p.id === id ? { ...p, status } : p
  );

  localStorage.setItem(key, JSON.stringify(updated));
  return updated;
}

export function getAcceptedProjects() {
  return getProjects().filter(p => p.status === "accepted");
}
