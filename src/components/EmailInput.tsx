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

      // Simulate different responses based on email
      if (email.includes("new")) {
        return {
          user: mockUserWithNullName,
          name: null,
          message: "New user detected, please enter your name",
        } as LoginResponse;
      }

      return {
        user: mockUser,
        name: mockUser.name,
        message: "Login successful",
      } as LoginResponse;
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);
      onSuccess?.(data);
    },
    onError: (error) => {
      console.error("Login failed:", error);
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
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={sendEmailMutation.isPending || !email.trim()}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {sendEmailMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      {sendEmailMutation.isError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          Error: {sendEmailMutation.error?.message}
        </div>
      )}
    </div>
  );
}
