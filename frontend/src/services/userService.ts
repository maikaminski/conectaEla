import { api } from './api';

export interface UserDto {
  id: string;
  name: string;
  email: string;
  techArea: string | null;
  bio: string | null;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: UserDto;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  techArea?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UpdateProfilePayload {
  name: string;
  bio?: string;
  techArea?: string;
}

export const authService = {
  login: (payload: LoginPayload) =>
    api.post<AuthResponse>('/api/auth/login', payload),

  register: (payload: RegisterPayload) =>
    api.post<UserDto>('/api/users/register', payload),
};

export const userService = {
  getAll: (token: string) =>
    api.get<UserDto[]>('/api/users', token),

  getById: (id: string, token: string) =>
    api.get<UserDto>(`/api/users/${id}`, token),

  updateProfile: (id: string, payload: UpdateProfilePayload, token: string) =>
    api.put<UserDto>(`/api/users/${id}/profile`, payload, token),
};
