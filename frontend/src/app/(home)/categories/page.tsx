import { Suspense } from 'react';
import { CategoriesContent } from '@/components/(pages)/categories/categories-content';
import { getAllCategories } from '@/api/categories.api';

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Manage your product categories and organize your inventory.
          </p>
        </div>
      </div>

      <Suspense fallback={<div>Loading categories...</div>}>
        <CategoriesContent initialCategories={categories!.items} />
      </Suspense>
    </div>
  );
}
