'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { createProductAPI, deleteProductAPI, updateProductAPI } from '@/api/products.api';

export interface ICreateProductRequest {
  name: string;
  description?: string;
  price: number;
  categoryId: string;
}

export interface IUpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
}

export async function deleteProduct(productId: string) {
  try {
    await deleteProductAPI(productId);
    revalidatePath('/products');

    return { success: true, message: 'Product deleted successfully' };
  } catch (error) {
    console.error('Delete product error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function updateProduct(productId: string, data: IUpdateProductRequest) {
  try {
    const response = await updateProductAPI(productId, data);

    return { success: true, data: response, message: 'Product updated successfully' };
  } catch (error) {
    console.error('Update product error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function createProduct(data: ICreateProductRequest) {
  try {
    const response = await createProductAPI(data);
    revalidatePath('/products');

    return { success: true, data: response, message: 'Product created successfully' };
  } catch (error) {
    console.error('Create product error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}