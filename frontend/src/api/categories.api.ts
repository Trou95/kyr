import { fetchServerAPI } from '@/api/fetch.server.api';
import IPagedResult from '@/interfaces/IPagedResult';
import ICategoryResponse from '@/interfaces/ICategoryResponse';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function getAllCategories(): Promise<IPagedResult<ICategoryResponse>> {
  return await fetchServerAPI(`${BASE_URL}/categories`, {
    method: 'GET',
    next: {
      revalidate: 60
    }
  });
}
