// User types
export interface UserQuiz {
  current_id: number;
  last_played: Date;
  current_streak: number;
  solved_quiz: number;
}

export interface UserStore {
  coin: number;
  freeze: number;
}

export interface User {
  id: number;
  name: string | null;
  email: string;
  created_at: Date;
  quiz: UserQuiz;
  store: UserStore;
}

// API response types
export interface LoginResponse {
  user: User | null;
  name: string | null;
  message?: string;
}

export interface NameSubmitResponse {
  user: User;
  message?: string;
}

// API error type
export interface ApiError {
  message: string;
  status?: number;
}

// Generic API response wrapper
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}
