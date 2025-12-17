import { useEffect, useState } from "react";
import { getAcceptedProjects } from "../../services/projectService";
import { getTracking, saveTracking } from "../../services/trackingService";
import Timer from "../../components/Timer";
import TaskCard from "../../components/TaskCard";

export default function Tracking() {
  const projects = getAcceptedProjects();
  const [projectId, setProjectId] = useState("");
  const [tracking, setTracking] = useState(null);
  const [activeSubtask, setActiveSubtask] = useState(null);

  useEffect(() => {
    if (!projectId) return;
    setTracking(getTracking(projectId));
  }, [projectId]);

  const tick = () => {
    setTracking(prev => {
      if (!prev) return prev;

      const updatedTasks = prev.tasks.map(t => ({
        ...t,
        subtasks: t.subtasks.map(s =>
          s.id === activeSubtask && !s.done
            ? { ...s, usedSeconds: (s.usedSeconds || 0) + 1 }
            : s
        )
      }));

      const updated = {
        ...prev,
        usedSeconds: (prev.usedSeconds || 0) + 1,
        tasks: updatedTasks
      };

      saveTracking(projectId, updated);
      return updated;
    });
  };

  const toggleSubtask = (taskId, subtaskId) => {
    setTracking(prev => {
      const updated = {
        ...prev,
        tasks: prev.tasks.map(t =>
          t.id === taskId
            ? {
                ...t,
                subtasks: t.subtasks.map(s =>
                  s.id === subtaskId
                    ? { ...s, done: !s.done }
                    : s
                )
              }
            : t
        )
      };
      saveTracking(projectId, updated);
      return updated;
    });
  };

  if (projects.length === 0) {
    return <p>No accepted projects.</p>;
  }

  return (
    <div>
      {/* PROJECT DROPDOWN */}
      <div className="mb-6">
        <label className="block font-medium mb-1">
          Projects
        </label>
        <select
          value={projectId}
          onChange={e => {
            setProjectId(e.target.value);
            setActiveSubtask(null);
          }}
          className="border p-2 rounded w-64"
        >
          <option value="">Select project</option>
          {projects.map(p => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      {tracking && (
        <div className="bg-white p-6 rounded shadow">
          <Timer
            seconds={tracking.usedSeconds}
            maxSeconds={
              projects.find(p => p.id === projectId)?.expectedHours * 3600
            }
            onTick={tick}
          />

          {tracking.tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              activeSubtaskId={activeSubtask}
              setActiveSubtask={setActiveSubtask}
              onToggleSubtask={toggleSubtask}
            />
          ))}
        </div>
      )}
    </div>
  );
}
