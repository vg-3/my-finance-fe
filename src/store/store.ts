import { create } from "zustand";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: "USER" | "ADMIN";
};

type Auth = {
  accessToken: string | null;
  user: User | null;
};

type AuthStore = Auth & {
  accessToken: string | null;
  user: User | null;
  setAuth: (data: { accessToken: string; user: User }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  user: null,
  setAuth: (data: Auth) =>
    set({ accessToken: data.accessToken, user: data.user }),
  logout: () => set({ accessToken: null, user: null }),
}));
