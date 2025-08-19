import { Suspense } from 'react';
import { ProductsContent } from '@/components/(pages)/products/products-content';
import { getAllProducts } from '@/api/products.api';
import { getAllCategories } from '@/api/categories.api';

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories()
  ]);

  console.log(products);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your products and inventory with ease.
          </p>
        </div>
      </div>

      <Suspense fallback={<div>Loading products...</div>}>
        <ProductsContent
          initialProducts={products!.items}
          categories={categories!.items}
        />
      </Suspense>
    </div>
  );
}
