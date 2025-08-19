import { fetchServerAPI } from '@/api/fetch.server.api';
import IPagedResult from '@/interfaces/IPagedResult';
import ICategoryResponse from '@/interfaces/ICategoryResponse';
import {
  ICreateCategoryRequest,
  IUpdateCategoryRequest,
} from '@/app/(home)/categories/actions/category.actions';
import { request } from 'node:http';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllCategories(): Promise<IPagedResult<ICategoryResponse> | null> {
  return await fetchServerAPI(`${BASE_URL}/categories`, {
    method: 'GET',
    next: {
      revalidate: 60,
    },
  });
}

export async function createCategoryAPI(request: ICreateCategoryRequest) {
  return await fetchServerAPI<ICategoryResponse>(`${BASE_URL}/categories`, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function updateCategoryAPI(categoryId: string, request: IUpdateCategoryRequest) {
  return await fetchServerAPI<ICategoryResponse>(`${BASE_URL}/categories/${categoryId}`, {
    method: 'PUT',
    body: JSON.stringify({ ...request, id: categoryId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteCategoryAPI(categoryId: string) {
  return await fetchServerAPI<{ success: boolean; message: string }>(
    `${BASE_URL}/categories/${categoryId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}
