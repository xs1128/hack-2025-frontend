import { EmailInput } from "./EmailInput";
import type { LoginResponse } from "../types/api";

interface HomeProps {
  onEmailSuccess: (data: LoginResponse) => void;
}

export function Home({ onEmailSuccess }: HomeProps) {
  const handleEmailError = (error: Error) => {
    console.error("Email submission failed from Home page:", error);
  };

  // Mushroom logo as a full mushroom (cap + stalk)
  const MushroomLogo = () => (
    <div className="flex flex-col items-center">
      <svg
        width="60"
        height="60"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="40" cy="36" rx="28" ry="18" fill="#B84C2B" />
        <ellipse cx="40" cy="46" rx="22" ry="10" fill="#F9D390" />
        <ellipse cx="28" cy="36" rx="4" ry="2.5" fill="#fff" />
        <ellipse cx="52" cy="40" rx="5" ry="3" fill="#fff" />
        <ellipse cx="40" cy="65" rx="10" ry="8" fill="#F9D390" />
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-yellow-100 relative overflow-hidden">
      {/* Left Logo */}
      <div className="absolute left-8 bottom-16">
        <MushroomLogo />
      </div>
      {/* Right Logo */}
      <div className="absolute right-8 bottom-16">
        <MushroomLogo />
      </div>
      {/* Mushroom login card as a full mushroom */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Mushroom Cap */}
        <svg
          width="220"
          height="110"
          viewBox="0 0 220 110"
          className="mb-[-40px] z-10"
        >
          <ellipse cx="110" cy="70" rx="100" ry="40" fill="#B84C2B" />
          <ellipse cx="110" cy="80" rx="80" ry="30" fill="#F9D390" />
          <ellipse cx="70" cy="75" rx="15" ry="8" fill="#fff" />
          <ellipse cx="150" cy="85" rx="18" ry="10" fill="#fff" />
        </svg>
        {/* Mushroom Body/Card */}
        <div
          className="bg-white rounded-[60%_60%_70%_70%/60%_60%_80%_80%] shadow-2xl px-12 py-10 flex flex-col items-center border-4 border-green-300 z-20"
          style={{
            minWidth: 340,
            minHeight: 260,
            marginTop: "-60px",
            background: "linear-gradient(180deg, #fff 80%, #F9D390 100%)",
          }}
        >
          <h1
            className="text-3xl font-extrabold mb-6 text-green-800 tracking-wide"
            style={{
              fontFamily: "Comic Sans MS, Comic Sans, cursive",
            }}
          >
            Login
          </h1>
          <EmailInput onSuccess={onEmailSuccess} onError={handleEmailError} />
        </div>
        {/* Mushroom Stalk */}
        <svg width="80" height="70" viewBox="0 0 80 70" className="-mt-4 z-10">
          <ellipse cx="40" cy="30" rx="28" ry="18" fill="#F9D390" />
          <ellipse cx="40" cy="50" rx="18" ry="10" fill="#F9D390" />
        </svg>
      </div>
    </div>
  );
}
