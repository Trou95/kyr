import { fetchClientAPI } from '@/api/fetch.client.api';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(email: string, password: string) {
  return await fetchClientAPI(`${BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function register(username: string, email: string, password: string) {
  return await fetchClientAPI(`${BASE_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  });
}

export async function logout(): Promise<void> {
  return await fetchClientAPI(`${BASE_URL}/auth/logout`, {
    method: 'POST',
  });
}
