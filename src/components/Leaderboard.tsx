import type { User } from "../types/api";
import { useQuery } from "@tanstack/react-query";

const API_BASE = "http://localhost:8000";

interface LeaderboardProps {
  user: User;
}

async function fetchLeaderboard(userId: number) {
  const res = await fetch(`${API_BASE}/league/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch leaderboard");
  return res.json();
}

function getRankName(pr: number) {
  if (pr < 20) return "泥土"; // Soil
  if (pr < 55) return "黴菌"; // Mold
  if (pr < 80) return "蘑菇"; // Mushroom
  if (pr < 95) return "蘑菇牛"; // Mooshroom
  return "松露"; // Truffle
}

export function Leaderboard({ user }: LeaderboardProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["leaderboard", user.id],
    queryFn: () => fetchLeaderboard(user.id),
  });

  if (isLoading) return <div className="p-6">Loading leaderboard...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {(error as Error).message}</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2">User ID</th>
            <th className="border px-2">Rank</th>
            <th className="border px-2">PR (%)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any) => (
            <tr key={row.all_user_id} className={row.all_user_id === user.id ? "bg-blue-100" : ""}>
              <td className="border px-2">{row.all_user_id}</td>
              <td className="border px-2">{getRankName(row.pr)}</td>
              <td className="border px-2">{row.pr.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
