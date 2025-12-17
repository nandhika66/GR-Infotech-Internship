import { useEffect, useRef, useState } from "react";
import { formatTime } from "../utils/time";

export default function Timer({ onTick, seconds, maxSeconds }) {
  const [running, setRunning] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!running) return;

    ref.current = setInterval(() => {
      onTick();
    }, 1000);

    return () => clearInterval(ref.current);
  }, [running]);

  const remaining = Math.max(maxSeconds - seconds, 0);
  const progress = maxSeconds
    ? Math.min((seconds / maxSeconds) * 100, 100)
    : 0;

  return (
    <div className="mb-6">
      <div className="text-5xl font-mono font-bold mb-2">
        {formatTime(seconds)}
      </div>

      <div className="h-3 bg-gray-200 rounded mb-2">
        <div
          className="h-3 bg-indigo-600 rounded"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setRunning(!running)}
          className={`px-4 py-2 rounded text-white ${
            running ? "bg-red-500" : "bg-indigo-600"
          }`}
        >
          {running ? "Stop" : "Start"}
        </button>

        <span className="text-sm text-gray-700">
          Remaining: {formatTime(remaining)}
        </span>
      </div>
    </div>
  );
}
