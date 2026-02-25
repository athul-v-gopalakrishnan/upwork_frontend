// Auth service — connects to real API endpoints
import type { User } from '../types';
import { api } from './api';

interface LoginResponse {
  status: string;
}

interface RegisterResponse {
  status: string;
  message: string;
}

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const response = await api.post<LoginResponse>('/auth/login', {
      username: email,
      password,
    });

    if (response.status !== 'logged_in') {
      throw new Error('Login failed');
    }

    // Token is stored in httponly cookie by backend
    const user: User = {
      id: email,
      name: email.split('@')[0],
      email,
      token: '', // Not needed - cookie handles auth
    };

    return user;
  },

  async signup(_name: string, email: string, password: string): Promise<User> {
    const response = await api.post<RegisterResponse>('/auth/register', {
      username: email,
      password,
    });

    if (response.status !== 'success') {
      throw new Error(response.message || 'Signup failed');
    }

    // After successful registration, automatically log in
    return this.login(email, password);
  },

  logout(): void {
    api.post('/auth/logout', {}).catch(() => {
      // Ignore errors on logout
    });
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken(): string | null {
    // Token is in httponly cookie, not accessible from JavaScript
    return null;
  },
};
