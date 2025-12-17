import template from "../data/trackingTemplate.json";
import { getCurrentUser } from "./authService";

function key(projectId) {
  const user = getCurrentUser();
  return user ? `tracking_${user.email}_${projectId}` : null;
}

export function getTracking(projectId) {
  const k = key(projectId);
  if (!k) return null;

  const saved = localStorage.getItem(k);
  if (!saved) {
    localStorage.setItem(k, JSON.stringify(template));
    return template;
  }
  return JSON.parse(saved);
}

export function saveTracking(projectId, data) {
  const k = key(projectId);
  if (!k) return;
  localStorage.setItem(k, JSON.stringify(data));
}
