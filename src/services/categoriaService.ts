import { Category } from "../interfaces/Category";
import { genericRequest } from "../utils/genericRequestUtils";

export const getcategory = async () => {
  return await genericRequest("/categorias/", "GET", undefined);
};

export const createCategory = async (data: Omit<Category, 'idCategoria'>) => {
  const response = await genericRequest('/categorias/', 'POST', data, true);
  return response;
}

export const deleteCategoria = async (idCategoria: number) => {
  return await genericRequest(`/categorias/${idCategoria}`, 'DELETE', undefined, true);
};

export const updateCategoria = async (idCategoria: number, data: Category) => {
  return await genericRequest(`/categorias/${idCategoria}`, 'PUT', data, true);
};