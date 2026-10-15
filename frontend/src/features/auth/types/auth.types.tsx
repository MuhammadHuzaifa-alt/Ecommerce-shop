export interface AuthUser {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  role: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
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