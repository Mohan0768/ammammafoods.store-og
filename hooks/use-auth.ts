'use client';

import { useCallback, useState } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'owner';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const login = useCallback(async (email: string, password: string, role: 'user' | 'owner' = 'user') => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const user: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      // Store in localStorage
      localStorage.setItem('ammamma_user', JSON.stringify(user));
      return user;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Login failed';
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error,
      }));
      throw err;
    }
  }, []);

  const loginWithGoogle = useCallback(async (role: 'user' | 'owner' = 'user') => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      // Simulate Google OAuth
      await new Promise((resolve) => setTimeout(resolve, 800));

      const user: User = {
        id: `google_${Date.now()}`,
        email: `user${Date.now()}@gmail.com`,
        name: 'Google User',
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=google${Date.now()}`,
      };

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      localStorage.setItem('ammamma_user', JSON.stringify(user));
      return user;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Google login failed';
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error,
      }));
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    localStorage.removeItem('ammamma_user');
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string, role: 'user' | 'owner' = 'user') => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const user: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      localStorage.setItem('ammamma_user', JSON.stringify(user));
      return user;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Signup failed';
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error,
      }));
      throw err;
    }
  }, []);

  const restoreSession = useCallback(() => {
    const stored = localStorage.getItem('ammamma_user');
    if (stored) {
      const user = JSON.parse(stored) as User;
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    }
  }, []);

  return {
    ...authState,
    login,
    loginWithGoogle,
    logout,
    signup,
    restoreSession,
  };
}
