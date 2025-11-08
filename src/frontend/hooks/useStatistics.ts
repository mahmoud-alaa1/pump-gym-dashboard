import { useEffect, useState } from "react";

export default function useStatistics(dataPointCount: number) {
  const [statistics, setStatistics] = useState<Statistics[]>([]);
  useEffect(() => {
    const unsubscribe = window.electron.subscribeStatistics((stats) =>
      setStatistics((prev) => {
        const newStats = [...prev, stats];
        if (newStats.length > dataPointCount) {
          newStats.shift();
        }
        return newStats;
      })
    );
    return unsubscribe;
  }, [dataPointCount]);
  return statistics;
}
