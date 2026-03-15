import { Category } from "@/@types";
import { CategoryResponse } from "@/@types";
import { api } from "./client";

export async function fetchCategories() {
  return api.get("/api/v1/categories");
}

export async function fetchActiveCategories() {
  const categories = await api.get<{ data: Category[] }>("/api/v1/categories");
  const activeCategories = categories?.data.filter(
    (category: Category) => category.isActive
  );
  return activeCategories;
}

export async function addNewCategory(
  categoryObject: Category
): Promise<CategoryResponse> {
  return api.post<CategoryResponse>("/api/v1/categories", categoryObject);
}

export async function updateCategory(
  categoryObject: Category
): Promise<CategoryResponse> {
  return api.put<CategoryResponse>(
    `/api/v1/categories/${categoryObject._id}`,
    categoryObject
  );
}

export async function deleteCategory(categoryId: string) {
  return api.delete(`/api/v1/categories/${categoryId}`);
}
