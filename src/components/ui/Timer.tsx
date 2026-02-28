import React, { useState, useEffect, useRef } from "react";

interface TimerProps {
  initialSeconds: number;
  onComplete?: () => void;
  autoStart?: boolean;
}

export const Timer: React.FC<TimerProps> = ({
  initialSeconds,
  onComplete,
  autoStart = true,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(autoStart);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef(onComplete);

  // Keep onComplete up-to-date
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Setup/cleanup interval based ONLY on isActive
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            onCompleteRef.current?.();
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive]); // ← ONLY depend on isActive!

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleReset = () => {
    setSeconds(initialSeconds);
    setIsActive(autoStart); // or false if you want reset → paused
  };

  return (
    <div className="timer text-center">
      <span className="text-2xl font-mono dark:text-white">{formatTime()}</span>
      <div className="space-x-2 mt-2">
        <button
          onClick={() => setIsActive((prev) => !prev)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          disabled={seconds === 0 && !isActive}
        >
          {isActive ? "Pause" : "Resume"}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
