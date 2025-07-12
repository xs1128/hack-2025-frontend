import { useState } from "react";
import { Home, NameInput } from "./components";
import { Quiz } from "./components/Quiz";
import { Celebration } from "./components/Celebration";
import type { LoginResponse } from "./types/api";

type Page = "home" | "name" | "quiz" | "celebration";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const handleEmailSuccess = (data: LoginResponse) => {
    // Check if server response has null name
    if (data.name === null) {
      setCurrentPage("name");
    } else {
      // If user has a name, go to quiz
      setCurrentPage("quiz");
    }
  };

  const handleNameSubmit = () => {
    // After name is submitted, go to quiz
    setCurrentPage("quiz");
  };

  const handleQuizComplete = () => {
    console.log("Quiz completed");
    // After quiz completion, go to celebration page
    setCurrentPage("celebration");
  };

  const handleCelebrationComplete = () => {
    console.log("Celebration complete");
    // After celebration, go back to home
    setCurrentPage("home");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onEmailSuccess={handleEmailSuccess} />;
      case "name":
        return <NameInput onSubmit={handleNameSubmit} />;
      case "quiz":
        return <Quiz onComplete={handleQuizComplete} />;
      case "celebration":
        return <Celebration onContinue={handleCelebrationComplete} />;
      default:
        return <Home onEmailSuccess={handleEmailSuccess} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main>{renderPage()}</main>
    </div>
  );
}

export default App;
