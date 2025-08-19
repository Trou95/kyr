import { fetchServerAPI } from '@/api/fetch.server.api';
import IPagedResult from '@/interfaces/IPagedResult';
import IProductResponse from '@/interfaces/IProductResponse';
import {
  ICreateProductRequest,
  IUpdateProductRequest,
} from '@/app/(home)/products/actions/product.actions';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllProducts(): Promise<IPagedResult<IProductResponse> | null> {
  return await fetchServerAPI(`${BASE_URL}/products`, {
    method: 'GET',
    next: {
      revalidate: 60,
    },
  });
}

export async function createProductAPI(request: ICreateProductRequest) {
  return await fetchServerAPI<IProductResponse>(`${BASE_URL}/products`, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function updateProductAPI(productId: string, request: IUpdateProductRequest) {
  return await fetchServerAPI<IProductResponse>(`${BASE_URL}/products/${productId}`, {
    method: 'PUT',
    body: JSON.stringify({ ...request, id: productId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteProductAPI(productId: string) {
  return await fetchServerAPI<{ success: boolean; message: string }>(
    `${BASE_URL}/products/${productId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}
