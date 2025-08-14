import { create } from "zustand";
import { User } from "@/types/user";

type State = {
  user: User | null;
  isAuthenticated: boolean;
};

type Actions = {
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

const useAuthStore = create<State & Actions>((set) => ({
  // state
  user: null,
  isAuthenticated: false,

  // actions
  setUser: (user) => set({ user }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));

export default useAuthStore;
