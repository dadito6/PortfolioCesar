import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("userEmail");
    if (stored) setUser(stored);
  }, []);

  const login = (email: string) => {
    setUser(email);
    localStorage.setItem("userEmail", email);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userEmail");
  };

  return { user, login, logout };
}