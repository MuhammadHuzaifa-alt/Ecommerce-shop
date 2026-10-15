import { createContext } from "react";

import type { AuthUser } from "../features/auth/types/auth.types";

export interface AuthContextType {
  user: AuthUser | null;

  login: (
    userData: AuthUser,
    accessToken: string,
    refreshToken: string,
    rememberMe: boolean
  ) => void;

  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextType | null>(null);