import Heatmap, { type HeatmapData } from "@components/ui/heatmap";
import { Progress } from "@components/ui/progress";
import { useState, useEffect } from "react";

// GitHub dark theme contribution colors
const GITHUB_COLORS = [
  "#161b22", // level 0 — empty
  "#0e4429", // level 1
  "#006d32", // level 2
  "#26a641", // level 3
  "#39d353", // level 4
];

interface GithubHeatmapProps {
  data: HeatmapData;
}

export default function GithubHeatmap({ data }: GithubHeatmapProps) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate the progress bar
    const t1 = setTimeout(() => setProgress(30), 100);
    const t2 = setTimeout(() => setProgress(60), 300);
    const t3 = setTimeout(() => setProgress(90), 500);
    const t4 = setTimeout(() => {
      setProgress(100);
      // Brief pause at 100% before revealing the heatmap
      setTimeout(() => setReady(true), 200);
    }, 700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (data.length === 0) {
    return (
      <div className="text-muted-foreground text-sm">
        No contribution data available.
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="flex flex-col gap-2 py-4">
        <span className="text-sm font-mono text-lime-400 animate-pulse">
          Loading Contributions...
        </span>
        <Progress value={progress} className="h-1.5 bg-[#161b22] [&>[data-slot=progress-indicator]]:bg-lime-400" />
      </div>
    );
  }

  const startDate = new Date(data[0].date);
  const endDate = new Date(data[data.length - 1].date);

  return (
    <Heatmap
      data={data}
      startDate={startDate}
      endDate={endDate}
      colorMode="discrete"
      colorScale={GITHUB_COLORS}
      displayStyle="squares"
      cellSize={12}
      gap={3}
      daysOfTheWeek="MWF"
      valueDisplayFunction={(value) =>
        `${value} contribution${value !== 1 ? "s" : ""}`
      }
    />
  );
}
