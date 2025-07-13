import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { currentQuestion } from "../mock/quizData";

// Mock daily mission data
const mockDailyMission = {
  mission: "Solve today's quiz!",
  reward: 10,
  completed: false,
};

function getTodayKey() {
  const today = new Date();
  return `dailymission-answered-${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

interface DailyMissionProps {
  onComplete?: (isCorrect: boolean) => void;
}

export function DailyMission({ onComplete }: DailyMissionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Simulate fetching daily mission
  const { data = mockDailyMission, isLoading } = useQuery({
    queryKey: ["dailyMission"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 500));
      return mockDailyMission;
    },
  });

  useEffect(() => {
    const key = getTodayKey();
    if (localStorage.getItem(key) === "true") {
      setSubmitted(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setSubmitted(true);
    const correct = selected === currentQuestion.answer;
    setIsCorrect(correct);
    localStorage.setItem(getTodayKey(), "true");
    if (onComplete) onComplete(correct);
  };

  if (isLoading) return <div className="p-6">Loading daily mission...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🍄 Daily Mission</h2>
      <div className="mb-4 font-semibold">{currentQuestion.statement}</div>
      <form onSubmit={handleSubmit} className="space-y-3">
        {currentQuestion.options.map((opt) => (
          <label
            key={opt}
            className={`block px-4 py-2 rounded-full border-2 cursor-pointer transition-colors ${
              selected === opt
                ? "bg-green-200 border-green-500"
                : "bg-white border-green-200 hover:bg-green-50"
            } ${submitted ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            <input
              type="radio"
              name="option"
              value={opt}
              checked={selected === opt}
              onChange={() => setSelected(opt)}
              className="mr-2"
              disabled={submitted}
            />
            {opt}
          </label>
        ))}
        <button
          type="submit"
          disabled={!selected || submitted}
          className="mt-2 px-8 py-2 rounded-full bg-green-500 text-white font-bold text-lg shadow hover:bg-green-600 disabled:opacity-50"
        >
          Submit
        </button>
      </form>
      {submitted && (
        <div
          className={`mt-4 p-3 rounded-md font-bold ${
            isCorrect
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-700"
          }`}
        >
          {isCorrect
            ? "Correct! 🎉 You earned 10 coins!"
            : `Incorrect. The answer is: ${currentQuestion.answer}`}
        </div>
      )}
      {submitted && (
        <div className="mt-2 text-gray-500 font-semibold">
          You have already answered today's mission.
        </div>
      )}
    </div>
  );
}
