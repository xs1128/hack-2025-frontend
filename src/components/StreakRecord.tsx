import { useQuery } from "@tanstack/react-query";

// Mock strike record data
const mockStrike = {
  currentStrike: 5,
  maxStrike: 12,
  lastBreak: "2025-07-01",
};

export function StrikeRecord({
  currentStrike,
  dailyMissionDone,
}: {
  currentStrike: number;
  dailyMissionDone: boolean;
}) {
  // Simulate fetching strike record
  const { data = mockStrike, isLoading } = useQuery({
    queryKey: ["strikeRecord"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 500));
      return mockStrike;
    },
  });

  if (isLoading) return <div className="p-6">Loading strike record...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        <span role="img" aria-label="strike" className="mr-1">
          🍄
        </span>
        <span role="img" aria-label="strike" className="mr-1">
          {dailyMissionDone ? "🔥" : "🧊"}
        </span>
        <span className="bg-orange-200 text-orange-800 rounded-full px-3 py-1 text-base font-bold mr-2">
          {currentStrike}
        </span>
        Strike Record
      </h2>
      <div className="mb-2">
        Current Strike:{" "}
        <span className="font-semibold text-orange-700">
          {data.currentStrike}
        </span>
      </div>
      <div className="mb-2">
        Max Strike:{" "}
        <span className="font-semibold text-green-700">{data.maxStrike}</span>
      </div>
      <div className="mb-2">
        Last Break:{" "}
        <span className="font-semibold">{data.lastBreak}</span>
      </div>
    </div>
  );
}
