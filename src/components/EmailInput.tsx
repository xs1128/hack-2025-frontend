import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import type { LoginResponse } from "../types/api";
import { mockUser, mockUserWithNullName } from "../mock/data";

interface EmailInputProps {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: Error) => void;
}

export function EmailInput({ onSuccess, onError }: EmailInputProps) {
  const [email, setEmail] = useState("");

  const sendEmailMutation = useMutation({
    mutationFn: async (email: string) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // If email matches mockUser.email, return user with name
      if (email === mockUser.email) {
        return {
          user: mockUser,
          name: mockUser.name,
          message: "Login successful",
        } as LoginResponse;
      }
      // Otherwise, treat as new user (name is null)
      return {
        user: { ...mockUserWithNullName, email },
        name: null,
        message: "New user detected, please enter your name",
      } as LoginResponse;
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      sendEmailMutation.mutate(email);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full space-y-4">
      <div className="w-full flex flex-col items-center">
        <label htmlFor="email" className="block text-lg font-semibold text-green-900 mb-1 text-center" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>
          email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="w-full px-4 py-2 border-2 border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900 text-lg text-center"
          required
          autoComplete="email"
        />
      </div>
      <button
        type="submit"
        disabled={sendEmailMutation.isPending || !email.trim()}
        className="mt-2 px-8 py-3 rounded-full bg-gradient-to-t from-yellow-300 to-yellow-100 border-4 border-yellow-400 shadow-lg text-green-900 font-extrabold text-xl tracking-wide flex flex-col items-center transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ position: 'relative', top: '20px', fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}
      >
        <span role="img" aria-label="mushroom" className="text-2xl mb-1">🍄</span>
        {sendEmailMutation.isPending ? "Logging in..." : "Login"}
      </button>
      {sendEmailMutation.isError && (
        <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded-md w-full text-center">
          Error: {sendEmailMutation.error?.message}
        </div>
      )}
    </form>
  );
}
