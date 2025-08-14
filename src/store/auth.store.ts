import { create } from "zustand";
import { User } from "@/types/user";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};

type AuthActions = {
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  // state
  user: null,
  isAuthenticated: false,

  // actions
  setUser: (user) => set({ user }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));

export default useAuthStore;
