import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import type { NameSubmitResponse, User } from "../types/api";
import { mockUserWithNullName } from "../mock/data";

interface NameInputProps {
  onSubmit: (user: User) => void;
}

export function NameInput({ onSubmit }: NameInputProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submitNameMutation = useMutation({
    mutationFn: async ({ name, email }: { name: string; email: string }) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const updatedUser = {
        ...mockUserWithNullName,
        name,
        email,
        created_at: new Date(),
      };
      return {
        user: updatedUser,
        message: "Name submitted successfully",
      } as NameSubmitResponse;
    },
    onSuccess: (data) => {
      onSubmit(data.user);
    },
    onError: (error) => {
      alert("Failed to submit name. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      submitNameMutation.mutate({ name, email });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Mushroom Cap */}
      <svg width="220" height="110" viewBox="0 0 220 110" className="mb-[-40px] z-10">
        <ellipse cx="110" cy="70" rx="100" ry="40" fill="#B84C2B" />
        <ellipse cx="110" cy="80" rx="80" ry="30" fill="#F9D390" />
        <ellipse cx="70" cy="75" rx="15" ry="8" fill="#fff" />
        <ellipse cx="150" cy="85" rx="18" ry="10" fill="#fff" />
      </svg>
      {/* Mushroom Body/Card */}
      <div
        className="bg-white rounded-[60%_60%_70%_70%/60%_60%_80%_80%] shadow-2xl px-12 py-10 flex flex-col items-center border-4 border-green-300 z-20"
        style={{ minWidth: 340, minHeight: 260, marginTop: '-60px', background: 'linear-gradient(180deg, #fff 80%, #F9D390 100%)' }}
      >
        <h1
          className="text-3xl font-extrabold mb-6 text-green-800 tracking-wide"
          style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}
        >
          Enter Your Name & Email
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label htmlFor="name" className="block text-lg font-semibold text-green-900 mb-1" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border-2 border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900 text-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-semibold text-green-900 mb-1" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border-2 border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900 text-lg"
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitNameMutation.isPending || !name.trim() || !email.trim()}
            className="mt-2 px-8 py-3 rounded-full bg-gradient-to-t from-yellow-300 to-yellow-100 border-4 border-yellow-400 shadow-lg text-green-900 font-extrabold text-xl tracking-wide flex flex-col items-center transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ position: 'relative', top: '20px', fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}
          >
            <span role="img" aria-label="mushroom" className="text-2xl mb-1">🍄</span>
            {submitNameMutation.isPending ? "Submitting..." : "Submit"}
          </button>
          {submitNameMutation.isError && (
            <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded-md w-full text-center">
              Error: {submitNameMutation.error?.message}
            </div>
          )}
        </form>
      </div>
      {/* Mushroom Stalk */}
      <svg width="80" height="70" viewBox="0 0 80 70" className="-mt-4 z-10">
        <ellipse cx="40" cy="30" rx="28" ry="18" fill="#F9D390" />
        <ellipse cx="40" cy="50" rx="18" ry="10" fill="#F9D390" />
      </svg>
    </div>
  );
}
