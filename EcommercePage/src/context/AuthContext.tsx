//wrapper component

import { createContext, useState, type ReactNode } from "react";

interface User {
  email: string;
  isAuth: boolean;
}

interface Credential {
  email: string;
  password: string;
}

interface AuthContextValue {
  user: User | null;
  signUp: (
    email: string,
    password: string,
  ) => { success: true } | { success: false; error: string };
  logout: () => void;
  login: (
    email: string,
    password: string,
  ) => { success: true } | { success: false; error: string };
}
export const AuthContext = createContext<AuthContextValue | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const email = localStorage.getItem("currentUserEmail");
    return email ? { email, isAuth: true } : null;
  });

  function signUp(
    email: string,
    password: string,
  ): { success: true } | { success: false; error: string } {
    const storedUsers = localStorage.getItem("users");
    const users: Credential[] = storedUsers ? JSON.parse(storedUsers) : [];

    if (users.find((u) => u.email === email)) {
      return { success: false, error: "Email Already in use" };
    }

    users.push({ email, password });

    localStorage.setItem("users", JSON.stringify(users));

    //set user as active
    localStorage.setItem("currentUserEmail", email);
    setUser({ email, isAuth: true });

    return { success: true };
  }

  function login(
    email: string,
    password: string,
  ): { success: true } | { success: false; error: string } {
    const users: Credential[] = JSON.parse(
      localStorage.getItem("users") || "[]",
    );
    const user =
      users.find((u) => u.email === email && u.password === password) || null;

    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }

    localStorage.setItem("currentUserEmail", email);
    setUser({ email, isAuth: true });

    return { success: true };
  }

  function logout() {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signUp, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}
