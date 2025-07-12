export interface Question {
  id: number;
  statement: string;
  options: string[];
  answer: string;
}

export const currentQuestion: Question = {
  id: 1,
  statement: "What is the capital of France?",
  options: ["London", "Berlin", "Paris", "Madrid"],
  answer: "Paris",
};

export interface StreakData {
  currentStreak: number;
  isCompleted: boolean;
  lastCompletedDate?: string;
}

export const mockStreakData: StreakData = {
  currentStreak: 3,
  isCompleted: false,
  lastCompletedDate: "2024-01-20",
};
