import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import type { NameSubmitResponse } from "../types/api";
import { mockUserWithNullName } from "../mock/data";

interface NameInputProps {
  onSubmit: () => void;
}

export function NameInput({ onSubmit }: NameInputProps) {
  const [name, setName] = useState("");

  const submitNameMutation = useMutation({
    mutationFn: async (name: string) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedUser = {
        ...mockUserWithNullName,
        name: name,
        created_at: new Date(),
      };

      return {
        user: updatedUser,
        message: "Name submitted successfully",
      } as NameSubmitResponse;
    },
    onSuccess: (data) => {
      console.log("Name submitted successfully:", data);
      onSubmit();
    },
    onError: (error) => {
      console.error("Error submitting name:", error);
      alert("Failed to submit name. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      submitNameMutation.mutate(name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Enter Your Name</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitNameMutation.isPending || !name.trim()}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitNameMutation.isPending ? "Submitting..." : "Submit Name"}
          </button>
        </form>

        {submitNameMutation.isError && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            Error: {submitNameMutation.error?.message}
          </div>
        )}
      </div>
    </div>
  );
}
