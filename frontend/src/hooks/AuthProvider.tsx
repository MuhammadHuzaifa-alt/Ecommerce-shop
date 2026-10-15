import {
  useState,
  type ReactNode,
} from "react";

import type { AuthUser } from "../features/auth/types/auth.types";

import { AuthContext } from "./AuthContext";


// ==========================================================
// STORAGE KEYS
// ==========================================================

const USER_KEY = "user";
const ACCESS_TOKEN_KEY = "access";
const REFRESH_TOKEN_KEY = "refresh";


// ==========================================================
// CLEAR AUTH STORAGE
// ==========================================================

const clearAuthStorage = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);

  sessionStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
};


// ==========================================================
// GET STORED USER
// ==========================================================

const getStoredUser = (): AuthUser | null => {
  const localUser =
    localStorage.getItem(USER_KEY);

  if (localUser) {
    try {
      return JSON.parse(localUser) as AuthUser;
    } catch {
      localStorage.removeItem(USER_KEY);
    }
  }

  const sessionUser =
    sessionStorage.getItem(USER_KEY);

  if (sessionUser) {
    try {
      return JSON.parse(sessionUser) as AuthUser;
    } catch {
      sessionStorage.removeItem(USER_KEY);
    }
  }

  return null;
};


// ==========================================================
// AUTH PROVIDER
// ==========================================================

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const [user, setUser] =
    useState<AuthUser | null>(
      getStoredUser
    );


  // ========================================================
  // LOGIN
  // ========================================================

  const login = (
    userData: AuthUser,
    accessToken: string,
    refreshToken: string,
    rememberMe: boolean
  ) => {

    clearAuthStorage();

    const storage =
      rememberMe
        ? localStorage
        : sessionStorage;

    storage.setItem(
      USER_KEY,
      JSON.stringify(userData)
    );

    storage.setItem(
      ACCESS_TOKEN_KEY,
      accessToken
    );

    storage.setItem(
      REFRESH_TOKEN_KEY,
      refreshToken
    );

    setUser(userData);
  };


  // ========================================================
  // LOGOUT
  // ========================================================

  const logout = () => {

    clearAuthStorage();

    setUser(null);
  };


  // ========================================================
  // PROVIDER
  // ========================================================

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};