import { fetchServerAPI } from '@/api/fetch.server.api';
import IPagedResult from '@/interfaces/IPagedResult';
import IProductResponse from '@/interfaces/IProductResponse';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function getAllProducts(): Promise<IPagedResult<IProductResponse>> {
  return await fetchServerAPI(`${BASE_URL}/products`, {
    method: 'GET',
    next: {
      revalidate: 60
    }
  });
}

