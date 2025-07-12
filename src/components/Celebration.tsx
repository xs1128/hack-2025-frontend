import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mockStreakData, type StreakData } from "../mock/quizData";

interface CelebrationProps {
  onContinue: () => void;
}

export function Celebration({ onContinue }: CelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  // Fetch updated streak data
  const { data: streakData } = useQuery({
    queryKey: ["streak"],
    queryFn: async (): Promise<StreakData> => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        ...mockStreakData,
        currentStreak: mockStreakData.currentStreak + 1,
        isCompleted: true,
        lastCompletedDate: new Date().toISOString().split("T")[0],
      };
    },
  });

  const handleContinue = () => {
    setShowConfetti(false);
    onContinue();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  ["bg-yellow-400", "bg-red-400", "bg-blue-400", "bg-green-400", "bg-purple-400"][
                    Math.floor(Math.random() * 5)
                  ]
                }`}
              />
            </div>
          ))}
        </div>
      )}

      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md text-center relative z-10">
        {/* Celebration icon */}
        <div className="mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <div className="text-4xl mb-2">🏆</div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">Daily Question Complete!</h1>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">Great job! You've completed today's question and maintained your streak!</p>

          {/* Streak display */}
          <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg mb-4">
            <div className="text-sm text-gray-600 mb-1">Current Streak</div>
            <div className="text-3xl font-bold text-green-600">{streakData?.currentStreak || 0} days</div>
            <div className="text-xs text-gray-500 mt-1">Last completed: {streakData?.lastCompletedDate}</div>
          </div>

          {/* Motivational message */}
          <div className="text-sm text-gray-600">
            {streakData?.currentStreak === 1 && "You're just getting started! Keep it up! 💪"}
            {streakData?.currentStreak === 2 && "Two days in a row! You're building momentum! 🔥"}
            {streakData?.currentStreak === 3 && "Three days! You're on fire! 🔥🔥🔥"}
            {streakData?.currentStreak === 4 && "Four days! Consistency is key! ⭐"}
            {streakData?.currentStreak === 5 && "Five days! You're unstoppable! 🚀"}
            {streakData?.currentStreak === 6 && "Six days! Almost a week! 🌟"}
            {streakData?.currentStreak === 7 && "A full week! You're amazing! 🎊"}
            {streakData?.currentStreak &&
              streakData.currentStreak > 7 &&
              `Incredible! ${streakData.currentStreak} days and counting! 🏆`}
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
          >
            Continue
          </button>
        </div>

        {/* Additional info */}
        <div className="mt-6 text-xs text-gray-500">Come back tomorrow for your next daily question!</div>
      </div>
    </div>
  );
}
