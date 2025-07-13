import { useState } from "react";
import {
  Home,
  NameInput,
  Shop,
  Leaderboard,
  Scores,
  DailyMission,
  StrikeRecord,
} from "./components";
import type { LoginResponse } from "./types/api";
import { useQuery } from "@tanstack/react-query";

// Define all possible app pages
type Page = "login" | "name" | "main";
type MainTab = "shop" | "leaderboard" | "scores" | "dailyMission" | "strikeRecord";

function App() {
  // Track login and navigation state
  const [currentPage, setCurrentPage] = useState<Page>("login");
  const [mainTab, setMainTab] = useState<MainTab>("shop");
  const [user, setUser] = useState<LoginResponse["user"] | null>(null);
  // State for daily mission completion
  const [dailyMissionDone, setDailyMissionDone] = useState(() => {
    const today = new Date();
    const key = `dailymission-answered-${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    return localStorage.getItem(key) === "true";
  });
  // State for current strike
  const [currentStrike, setCurrentStrike] = useState(5);

  // Handle login success
  const handleEmailSuccess = (data: LoginResponse) => {
    setUser(data.user);
    if (data.name === null) {
      setCurrentPage("name");
    } else {
      setCurrentPage("main");
      setMainTab("dailyMission"); // Open Daily Mission instantly after login
    }
  };

  // Handle name submission
  const handleNameSubmit = (userWithName: LoginResponse["user"]) => {
    setUser(userWithName);
    setCurrentPage("main");
    setMainTab("dailyMission"); // Also open Daily Mission after name setup
  };

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    setCurrentPage("login");
    setMainTab("shop");
  };

  // Handle daily mission completion
  const handleDailyMissionComplete = (isCorrect: boolean) => {
    setDailyMissionDone(true);
    if (isCorrect) setCurrentStrike((s) => s + 1);
  };

  // Mushroom mascot SVG (replace with your own asset if desired)
  const MushroomMascot = () => (
    <div className="flex flex-col items-center mt-8 mb-4">
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="40" cy="50" rx="28" ry="18" fill="#F9D390" />
        <ellipse cx="40" cy="32" rx="36" ry="18" fill="#B84C2B" />
        <ellipse cx="40" cy="32" rx="30" ry="14" fill="#F9D390" />
        <ellipse cx="28" cy="30" rx="4" ry="2.5" fill="#fff" />
        <ellipse cx="52" cy="34" rx="5" ry="3" fill="#fff" />
        <ellipse cx="40" cy="60" rx="10" ry="6" fill="#fff" opacity="0.3" />
        <ellipse cx="32" cy="54" rx="3" ry="4" fill="#222" />
        <ellipse cx="48" cy="54" rx="3" ry="4" fill="#222" />
        <ellipse cx="32" cy="56" rx="1.2" ry="1.5" fill="#fff" />
        <ellipse cx="48" cy="56" rx="1.2" ry="1.5" fill="#fff" />
      </svg>
      <span className="font-extrabold text-2xl text-green-700 mt-2 drop-shadow">
        Mushroom Camp
      </span>
    </div>
  );

  // Navigation bar for main tabs (Duolingo-mushroom style)
  const MainNav = () => (
    <nav className="bg-green-200 rounded-full shadow-lg p-3 flex justify-center items-center space-x-4 mb-8 border-4 border-green-400">
      <button
        className={`flex items-center px-5 py-2 rounded-full font-bold text-lg transition-colors shadow-md border-2 border-green-400 ${
          mainTab === "shop"
            ? "bg-green-500 text-white scale-105"
            : "bg-white text-green-700 hover:bg-green-100"
        }`}
        onClick={() => setMainTab("shop")}
      >
        <span role="img" aria-label="shop" className="mr-2">
          🍄
        </span>
        Shop
      </button>
      <button
        className={`flex items-center px-5 py-2 rounded-full font-bold text-lg transition-colors shadow-md border-2 border-green-400 ${
          mainTab === "leaderboard"
            ? "bg-green-500 text-white scale-105"
            : "bg-white text-green-700 hover:bg-green-100"
        }`}
        onClick={() => setMainTab("leaderboard")}
      >
        <span role="img" aria-label="leaderboard" className="mr-2">
          🏆
        </span>
        Leaderboard
      </button>
      <button
        className={`flex items-center px-5 py-2 rounded-full font-bold text-lg transition-colors shadow-md border-2 border-green-400 ${
          mainTab === "scores"
            ? "bg-green-500 text-white scale-105"
            : "bg-white text-green-700 hover:bg-green-100"
        }`}
        onClick={() => setMainTab("scores")}
      >
        <span role="img" aria-label="scores" className="mr-2">
          📊
        </span>
        Scores
      </button>
      <button
        className={`flex items-center px-5 py-2 rounded-full font-bold text-lg transition-colors shadow-md border-2 border-green-400 ${
          mainTab === "dailyMission"
            ? "bg-green-500 text-white scale-105"
            : "bg-white text-green-700 hover:bg-green-100"
        }`}
        onClick={() => setMainTab("dailyMission")}
      >
        <span role="img" aria-label="mission" className="mr-2">
          🌟
        </span>
        Daily Mission
      </button>
      <button
        className={`flex items-center px-5 py-2 rounded-full font-bold text-lg transition-colors shadow-md border-2 border-green-400 ${
          mainTab === "strikeRecord"
            ? "bg-green-500 text-white scale-105"
            : "bg-white text-green-700 hover:bg-green-100"
        }`}
        onClick={() => setMainTab("strikeRecord")}
      >
        <span role="img" aria-label="strike" className="mr-1">{dailyMissionDone ? "🔥" : "🧊"}</span>
        <span className="bg-orange-200 text-orange-800 rounded-full px-3 py-1 text-base font-bold mr-2">{currentStrike}</span>
        Strike Record
      </button>
      <button
        className="ml-6 px-4 py-2 rounded-full bg-red-400 text-white font-bold border-2 border-red-500 shadow-md hover:bg-red-500 transition-colors"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );

  // Render logic
  const renderPage = () => {
    if (currentPage === "login") {
      return <Home onEmailSuccess={handleEmailSuccess} />;
    }
    if (currentPage === "name") {
      return <NameInput onSubmit={handleNameSubmit} />;
    }
    if (currentPage === "main" && user) {
      return (
        <div className="max-w-2xl ml-10 mt-10 flex flex-col items-start">
          <MushroomMascot />
          <MainNav />
          {mainTab === "shop" && <Shop user={user} />}
          {mainTab === "leaderboard" && <Leaderboard user={user} />}
          {mainTab === "scores" && <Scores user={user} />}
          {mainTab === "dailyMission" && <DailyMission onComplete={handleDailyMissionComplete} />}
          {mainTab === "strikeRecord" && <StrikeRecord currentStrike={currentStrike} dailyMissionDone={dailyMissionDone} />}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main>{renderPage()}</main>
    </div>
  );
}

export default App;
