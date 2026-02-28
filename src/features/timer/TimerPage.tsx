import { Timer } from "@/components/ui/Timer";

export const TimerPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Timer</h1>
      <Timer initialSeconds={300} onComplete={() => alert("Time is up!")} />
    </div>
  );
};
