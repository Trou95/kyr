import { fetchServerAPI } from '@/api/fetch.server.api';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMeApi() {
  return await fetchServerAPI(`${BASE_URL}/auth/me`, {
    method: 'GET',
  });
}
