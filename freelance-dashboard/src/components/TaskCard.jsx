import { formatTime } from "../utils/time";

export default function TaskCard({
  task,
  activeSubtaskId,
  setActiveSubtask,
  onToggleSubtask
}) {
  return (
    <div className="border rounded p-4 mb-4">
      <h3 className="font-semibold mb-2">{task.title}</h3>

      {task.subtasks.map(s => (
        <div
          key={s.id}
          className="flex items-center justify-between mb-1"
        >
          <label className="text-sm flex items-center gap-2">
            <input
              type="radio"
              checked={activeSubtaskId === s.id}
              onChange={() => setActiveSubtask(s.id)}
              disabled={s.done}
            />
            <input
              type="checkbox"
              checked={s.done}
              onChange={() => onToggleSubtask(task.id, s.id)}
            />
            {s.title}
          </label>

          <span className="text-xs text-gray-600">
            {formatTime(s.usedSeconds)}
          </span>
        </div>
      ))}
    </div>
  );
}
