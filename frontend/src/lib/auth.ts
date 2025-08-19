import axios from 'axios';
import ICurrentUser from '@/interfaces/ICurrentUser';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: ICurrentUser;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials, {
        withCredentials: true,
      });
      const { token, username } = response.data;

      return {
        token,
        user: { username, email: credentials.email },
      };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      throw new Error(axiosError.response?.data?.message || 'Login failed');
    }
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, credentials, {
        withCredentials: true,
      });
      const { token, username } = response.data;

      return {
        token,
        user: { username, email: credentials.email },
      };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      throw new Error(axiosError.response?.data?.message || 'Registration failed');
    }
  }

  async logout(): Promise<void> {
    try {
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );
    } catch {}
  }
}

export const authService = new AuthService();
