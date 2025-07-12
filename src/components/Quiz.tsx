import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { currentQuestion, mockStreakData, type StreakData } from "../mock/quizData";

interface QuizProps {
  onComplete: () => void;
}

export function Quiz({ onComplete }: QuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Fetch streak data
  const { data: streakData, refetch: refetchStreak } = useQuery({
    queryKey: ["streak"],
    queryFn: async (): Promise<StreakData> => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockStreakData;
    },
  });

  // Submit answer mutation
  const submitAnswerMutation = useMutation({
    mutationFn: async (answer: string) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const isCorrect = answer === currentQuestion.answer;

      return {
        isCorrect,
        correctAnswer: currentQuestion.answer,
        streakUpdated: isCorrect ? (streakData?.currentStreak || 0) + 1 : streakData?.currentStreak || 0,
      };
    },
    onSuccess: (data) => {
      console.log("Answer submitted:", data);
      setShowResult(true);
      if (data.isCorrect) {
        refetchStreak(); // Refresh streak data after correct answer
      }
    },
    onError: (error) => {
      console.error("Error submitting answer:", error);
      alert("Failed to submit answer. Please try again.");
    },
  });

  const handleAnswerSelect = (answer: string) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
      setIsAnswered(true);
      submitAnswerMutation.mutate(answer);
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowResult(false);
  };

  const handleContinue = () => {
    onComplete();
  };

  const isCorrect = selectedAnswer === currentQuestion.answer;

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Question Result</h1>

          <div className="text-center mb-6">
            <div className={`text-4xl font-bold mb-2 ${isCorrect ? "text-green-600" : "text-red-600"}`}>
              {isCorrect ? "✓ Correct!" : "✗ Wrong"}
            </div>
            <div className="text-gray-600 mb-4">
              {isCorrect ? "Great job! Keep up the streak!" : "Better luck next time!"}
            </div>

            {!isCorrect && (
              <div className="bg-gray-100 p-3 rounded-lg mb-4">
                <div className="text-sm text-gray-700">
                  Correct answer: <span className="font-semibold">{currentQuestion.answer}</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {isCorrect ? (
              <button
                onClick={handleContinue}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Continue
              </button>
            ) : (
              <>
                <button
                  onClick={handleRetry}
                  className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={handleContinue}
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Skip Question
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        {/* Streak Display */}
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm text-gray-600">Current Streak:</span>
            <span className="text-2xl font-bold text-green-600">{streakData?.currentStreak || 0}</span>
            <span className="text-sm text-gray-600">days</span>
          </div>

          {streakData?.isCompleted && (
            <div className="text-center mt-2">
              <span className="text-sm text-green-600 font-medium">✓ Today's question completed!</span>
            </div>
          )}
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">{currentQuestion.statement}</h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={isAnswered}
                className={`w-full p-4 text-left border rounded-lg transition-colors ${
                  selectedAnswer === option
                    ? isCorrect
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Loading state */}
        {isAnswered && submitAnswerMutation.isPending && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <p className="text-gray-600 mt-2">Checking answer...</p>
          </div>
        )}
      </div>
    </div>
  );
}
