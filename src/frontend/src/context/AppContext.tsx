import { type ReactNode, createContext, useContext, useState } from "react";

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isSubscribed: boolean;
}

interface AppContextValue {
  user: User | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  subscribe: () => void;
  unsubscribe: () => void;
  isLive: boolean;
  setIsLive: (v: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLive, setIsLive] = useState(false);

  const login = () => {
    setUser({
      id: "user_1",
      username: "ProGamer99",
      displayName: "ProGamer99",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProGamer99",
      isSubscribed: false,
    });
  };

  const logout = () => setUser(null);

  const subscribe = () => {
    if (user) setUser({ ...user, isSubscribed: true });
  };

  const unsubscribe = () => {
    if (user) setUser({ ...user, isSubscribed: false });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        subscribe,
        unsubscribe,
        isLive,
        setIsLive,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
