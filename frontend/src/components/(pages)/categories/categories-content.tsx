'use client';

import React, { useState, useTransition } from 'react';
import { toast } from 'sonner';
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from '@/app/(home)/categories/actions/category.actions';
import ICategoryResponse from '@/interfaces/ICategoryResponse'; // veya kullandığınız toast kütüphanesi

interface CategoriesContentProps {
  initialCategories: ICategoryResponse[];
}

export function CategoriesContent({ initialCategories }: CategoriesContentProps) {
  const [categories, setCategories] = useState<ICategoryResponse[]>(initialCategories);
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', description: '' });

  const handleDelete = async (categoryId: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    startTransition(async () => {
      const result = await deleteCategory(categoryId);

      if (result.success) {
        setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    });
  };

  const startEdit = (category: ICategoryResponse) => {
    setEditingId(category.id);
    setEditForm({
      name: category.name,
      description: category.description || '',
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: '', description: '' });
  };

  const handleUpdate = async (categoryId: string) => {
    startTransition(async () => {
      const result = await updateCategory(categoryId, editForm);

      if (result.success) {
        // Optimistic update
        setCategories((prev) =>
          prev.map((cat) => (cat.id === categoryId ? { ...cat, ...editForm } : cat)),
        );
        setEditingId(null);
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-white p-4">
        <h3 className="mb-2 text-lg font-semibold">Add New Category</h3>
        <NewCategoryForm
          onSuccess={(newCategory) => {
            setCategories((prev) => [...prev, newCategory]);
          }}
          isPending={isPending}
        />
      </div>

      <div className="grid gap-4">
        {categories.map((category) => (
          <div key={category.id} className="rounded-lg border bg-white p-4">
            {editingId === category.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded border p-2"
                  placeholder="Category name"
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
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(category?.id)}
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
              // View Mode
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{category?.name}</h3>
                  {category?.description && <p className="text-gray-600">{category?.description}</p>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(category)}
                    disabled={isPending}
                    className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600 disabled:opacity-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category?.id)}
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

      {categories.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          No categories found. Create your first category above.
        </div>
      )}
    </div>
  );
}

function NewCategoryForm({
  onSuccess,
  isPending,
}: {
  onSuccess: (category: ICategoryResponse) => void;
  isPending: boolean;
}) {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [isSubmitting, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    startTransition(async () => {
      const result = await createCategory(formData);

      if (result.success) {
        onSuccess(result.data!);
        setFormData({ name: '', description: '' });
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
        placeholder="Category name"
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
      <button
        type="submit"
        disabled={isSubmitting || isPending || !formData.name.trim()}
        className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:opacity-50"
      >
        {isSubmitting ? 'Creating...' : 'Add Category'}
      </button>
    </form>
  );
}
