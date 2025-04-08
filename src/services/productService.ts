import { genericRequest } from "../utils/genericRequestUtils";
import { genericRequestConForm } from "../utils/genericRequestConForm";
import { ICreateProduct } from "../interfaces/ICreateProduct";

// Crear un producto
export const createProductoConImagen = async (formData: FormData) => {
  return await genericRequestConForm("/productos/", "POST", formData, true);
};

export const updateProducto = async (producto: any, formData: FormData) => {
  formData.append('nombre', producto.nombre);
  formData.append('descripcion', producto.descripcion);
  formData.append('precio', producto.precio);
  formData.append('stock', producto.stock);
  formData.append('idCategoria', producto.idCategoria);

  return await genericRequestConForm(`/productos/${producto.idProducto}`, 'PUT', formData, true);
};

export const getProductos = async () => {
  return await genericRequest("/productos/", "GET", undefined);
};

export const deleteProduct = async (idProducto: number) => {
  return await genericRequest(`/productos/${idProducto}`, 'DELETE', undefined, true);
};