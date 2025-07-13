import React from "react";
import type { User } from "../types/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_BASE = "http://localhost:8000";

interface ShopProps {
  user: User;
}

async function fetchStore(userId: number) {
  const res = await fetch(`${API_BASE}/store/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch store data");
  return res.json();
}

async function buyFreeze(userId: number) {
  const res = await fetch(`${API_BASE}/store/${userId}`, { method: "POST" });
  if (!res.ok) throw new Error("Purchase failed");
  return res.json();
}

export function Shop({ user }: ShopProps) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["store", user.id],
    queryFn: () => fetchStore(user.id),
  });

  const mutation = useMutation({
    mutationFn: () => buyFreeze(user.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["store", user.id] }),
  });

  if (isLoading) return <div className="p-6">Loading store...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {(error as Error).message}</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Shop</h2>
      <div className="mb-2">Coins: {data.coin}</div>
      <div className="mb-2">Freeze: {data.freeze}</div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Purchasing..." : "Buy Freeze (15 coins)"}
      </button>
      {mutation.isError && <div className="text-red-500 mt-2">{(mutation.error as Error).message}</div>}
      {mutation.isSuccess && <div className="text-green-600 mt-2">Purchase successful!</div>}
    </div>
  );
}
