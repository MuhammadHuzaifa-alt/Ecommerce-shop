import api from "./api";

export interface RegisterData {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  role: string;
}

export interface LoginResponse {
  user: AuthUser;
  access: string;
  refresh: string;
}

export interface RegisterResponse {
  user: AuthUser;
  message?: string;
}

export const registerUser = async (
  data: RegisterData
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>(
    "auth/register/",
    data
  );

  return response.data;
};

export const loginUser = async (
  data: LoginData
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "auth/login/",
    data
  );

  return response.data;
};