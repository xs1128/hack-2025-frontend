interface NavigationProps {
  currentPage: "home" | "about";
  onPageChange: (page: "home" | "about") => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-4xl mx-auto flex justify-center space-x-8">
        <button
          onClick={() => onPageChange("home")}
          className={`px-4 py-2 rounded-md transition-colors ${
            currentPage === "home" ? "bg-blue-500 text-white" : "text-gray-600 hover:text-blue-500 hover:bg-blue-50"
          }`}
        >
          Home
        </button>
        <button
          onClick={() => onPageChange("about")}
          className={`px-4 py-2 rounded-md transition-colors ${
            currentPage === "about" ? "bg-blue-500 text-white" : "text-gray-600 hover:text-blue-500 hover:bg-blue-50"
          }`}
        >
          About
        </button>
      </div>
    </nav>
  );
}
