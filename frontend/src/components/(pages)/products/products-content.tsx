'use client';

import React, { useState, useTransition } from 'react';
import { toast } from 'sonner';
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from '@/app/(home)/products/actions/product.actions';
import IProductResponse from '@/interfaces/IProductResponse';
import ICategoryResponse from '@/interfaces/ICategoryResponse';

interface ProductsContentProps {
  initialProducts: IProductResponse[];
  categories: ICategoryResponse[];
}

export function ProductsContent({ initialProducts, categories }: ProductsContentProps) {
  const [products, setProducts] = useState<IProductResponse[]>(initialProducts);
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ 
    name: '', 
    description: '', 
    price: 0, 
    categoryId: '' 
  });

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    startTransition(async () => {
      const result = await deleteProduct(productId);

      if (result.success) {
        setProducts((prev) => prev.filter((prod) => prod.id !== productId));
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    });
  };

  const startEdit = (product: IProductResponse) => {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      description: product.description || '',
      price: product.price,
      categoryId: product.categoryId,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: '', description: '', price: 0, categoryId: '' });
  };

  const handleUpdate = async (productId: string) => {
    startTransition(async () => {
      const result = await updateProduct(productId, editForm);

      if (result.success) {
        setProducts((prev) =>
          prev.map((prod) => (prod.id === productId ? { ...prod, ...editForm } : prod)),
        );
        setEditingId(null);
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-white p-4">
        <h3 className="mb-2 text-lg font-semibold">Add New Product</h3>
        <NewProductForm
          onSuccess={(newProduct) => {
            setProducts((prev) => [...prev, newProduct]);
          }}
          isPending={isPending}
          categories={categories}
        />
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <div key={product.id} className="rounded-lg border bg-white p-4">
            {editingId === product.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded border p-2"
                  placeholder="Product name"
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="w-full rounded border p-2"
                  placeholder="Description"
                  rows={2}
                />
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, price: Number(e.target.value) }))}
                  className="w-full rounded border p-2"
                  placeholder="Price"
                  min="0"
                  step="0.01"
                />
                <select
                  value={editForm.categoryId}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, categoryId: e.target.value }))}
                  className="w-full rounded border p-2"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(product.id)}
                    disabled={isPending || !editForm.name.trim()}
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
                  >
                    {isPending ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={cancelEdit}
                    disabled={isPending}
                    className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  {product.description && <p className="text-gray-600">{product.description}</p>}
                  <div className="mt-2 flex gap-4 text-sm text-gray-500">
                    <span className="font-semibold text-green-600">{formatPrice(product.price)}</span>
                    <span>Category: {product.categoryName}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(product)}
                    disabled={isPending}
                    className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600 disabled:opacity-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={isPending}
                    className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600 disabled:opacity-50"
                  >
                    {isPending ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          No products found. Create your first product above.
        </div>
      )}
    </div>
  );
}

function NewProductForm({
  onSuccess,
  isPending,
  categories,
}: {
  onSuccess: (product: IProductResponse) => void;
  isPending: boolean;
  categories: ICategoryResponse[];
}) {
  const [formData, setFormData] = useState({ 
    name: '', 
    description: '', 
    price: 0, 
    categoryId: '' 
  });
  const [isSubmitting, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.categoryId) return;

    startTransition(async () => {
      const result = await createProduct(formData);

      if (result.success) {
        onSuccess(result.data!);
        setFormData({ name: '', description: '', price: 0, categoryId: '' });
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
        placeholder="Product name"
        className="w-full rounded border p-2"
        required
      />
      <textarea
        value={formData.description}
        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
        placeholder="Description (optional)"
        className="w-full rounded border p-2"
        rows={2}
      />
      <input
        type="number"
        value={formData.price}
        onChange={(e) => setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))}
        placeholder="Price"
        className="w-full rounded border p-2"
        min="0"
        step="0.01"
        required
      />
      <select
        value={formData.categoryId}
        onChange={(e) => setFormData((prev) => ({ ...prev, categoryId: e.target.value }))}
        className="w-full rounded border p-2"
        required
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={isSubmitting || isPending || !formData.name.trim() || !formData.categoryId}
        className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:opacity-50"
      >
        {isSubmitting ? 'Creating...' : 'Add Product'}
      </button>
    </form>
  );
}