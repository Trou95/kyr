'use server';

import { revalidatePath } from 'next/cache';
import { createCategoryAPI, deleteCategoryAPI, updateCategoryAPI } from '@/api/categories.api';

export interface ICreateCategoryRequest {
  name: string;
  description?: string;
}

export interface IUpdateCategoryRequest {
  name?: string;
  description?: string;
}

export async function deleteCategory(categoryId: string) {
  try {
    await deleteCategoryAPI(categoryId);
    revalidatePath('/categories');

    return { success: true, message: 'Category deleted successfully' };
  } catch (error) {
    console.error('Delete category error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function updateCategory(categoryId: string, data: IUpdateCategoryRequest) {
  try {
    const response = await updateCategoryAPI(categoryId, data);

    return { success: true, data: response, message: 'Category updated successfully' };
  } catch (error) {
    console.error('Update category error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function createCategory(data: ICreateCategoryRequest) {
  try {
    const response = await createCategoryAPI(data);
    revalidatePath('/categories');

    return { success: true, data: response, message: 'Category created successfully' };
  } catch (error) {
    console.error('Create category error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
