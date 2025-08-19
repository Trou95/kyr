import { fetchServerAPI } from '@/api/fetch.server.api';
import ICurrentUser from '@/interfaces/ICurrentUser';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMeApi(): Promise<ICurrentUser | null> {
  return await fetchServerAPI(`${BASE_URL}/auth/me`, {
    method: 'GET',
  });
}
