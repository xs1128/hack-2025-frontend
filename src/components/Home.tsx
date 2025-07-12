import { EmailInput } from "./EmailInput";
import type { LoginResponse } from "../types/api";

interface HomeProps {
  onEmailSuccess: (data: LoginResponse) => void;
}

export function Home({ onEmailSuccess }: HomeProps) {
  const handleEmailError = (error: Error) => {
    console.error("Email submission failed from Home page:", error);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <EmailInput onSuccess={onEmailSuccess} onError={handleEmailError} />
    </div>
  );
}
