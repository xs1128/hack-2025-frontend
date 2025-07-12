import type { User } from "../types/api";

export const mockUser: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  created_at: new Date("2024-01-15"),
  quiz: {
    current_id: 5,
    last_played: new Date("2024-01-20"),
    current_streak: 3,
    solved_quiz: 25,
  },
  store: {
    coin: 150,
    freeze: 2,
  },
};

export const mockUserWithNullName: User = {
  id: 2,
  name: null,
  email: "newuser@example.com",
  created_at: new Date("2024-01-21"),
  quiz: {
    current_id: 1,
    last_played: new Date("2024-01-21"),
    current_streak: 0,
    solved_quiz: 0,
  },
  store: {
    coin: 0,
    freeze: 0,
  },
};
