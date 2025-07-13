import type { User } from "../types/api";

interface ScoresProps {
  user: User;
}

// Mushroom SVG for decoration
const MushroomSVG = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="40" cy="50" rx="28" ry="18" fill="#F9D390" />
    <ellipse cx="40" cy="32" rx="36" ry="18" fill="#B84C2B" />
    <ellipse cx="40" cy="32" rx="30" ry="14" fill="#F9D390" />
    <ellipse cx="28" cy="30" rx="4" ry="2.5" fill="#fff" />
    <ellipse cx="52" cy="34" rx="5" ry="3" fill="#fff" />
  </svg>
);

function getRankName(pr: number) {
  if (pr < 20) return "泥土"; // Soil
  if (pr < 55) return "黴菌"; // Mold
  if (pr < 80) return "蘑菇"; // Mushroom
  if (pr < 95) return "蘑菇牛"; // Mooshroom
  return "松露"; // Truffle
}

export function Scores({ user }: ScoresProps) {
  const quiz = user.quiz;
  // Use real PR from backend if available
  const pr = typeof user.pr === "number" ? user.pr : 0;
  return (
    <div className="relative p-8 bg-gradient-to-br from-green-100 via-green-200 to-yellow-100 rounded-3xl shadow-2xl max-w-lg mx-auto mt-8 border-4 border-green-300">
      {/* Mushroom decorations */}
      <div className="absolute left-[-30px] top-[-30px] rotate-[-15deg] opacity-80">
        <MushroomSVG />
      </div>
      <div className="absolute right-[-30px] bottom-[-30px] rotate-[15deg] opacity-80">
        <MushroomSVG />
      </div>
      <h2
        className="text-3xl font-extrabold mb-6 text-green-800 tracking-wide text-center"
        style={{
          fontFamily: "Comic Sans MS, Comic Sans, cursive",
        }}
      >
        Scores
      </h2>
      <div
        className="flex flex-col gap-3 text-lg font-semibold text-green-900"
        style={{
          fontFamily: "Comic Sans MS, Comic Sans, cursive",
        }}
      >
        <div className="flex items-center">
          <span className="mr-2">🍄</span>Current Strike:
          <span className="ml-2 font-bold text-orange-700">
            {quiz.current_streak}
          </span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">🍄</span>Solved Quizzes:
          <span className="ml-2 font-bold text-orange-700">
            {quiz.solved_quiz}
          </span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">🍄</span>Current Question ID:
          <span className="ml-2 font-bold text-orange-700">
            {quiz.current_id}
          </span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">🍄</span>Last Played:
          <span className="ml-2 font-bold text-orange-700">
            {new Date(quiz.last_played).toLocaleString()}
          </span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">🍄</span>Ranking:
          <span className="ml-2 font-bold text-orange-700">
            {getRankName(pr)}
          </span>
          <span className="ml-4 text-gray-600 text-base">(PR: {pr.toFixed(2)})</span>
        </div>
      </div>
    </div>
  );
}
