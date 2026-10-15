import axios from "axios";

const ADMIN_LOGIN_API_URL =
  "/api/admin/login/";

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;

  admin: {
    email: string;
    role: string;
  };

  access: string;
  refresh: string;
}

export const adminLogin = async (
  credentials: AdminLoginRequest
): Promise<AdminLoginResponse> => {
  const response = await axios.post<AdminLoginResponse>(
    ADMIN_LOGIN_API_URL,
    credentials
  );

  return response.data;
};
