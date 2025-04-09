import { genericRequest } from "../utils/genericRequestUtils";
import { genericRequestConForm } from "../utils/genericRequestConForm";

// Crear un producto
export const createProductoConImagen = async (formData: FormData) => {
    return await genericRequestConForm("/productos/", "POST", formData, true);
  };
  
// Obtener productos (opcional, si lo necesitas para listar)
export const getProductos = async () => {
  return await genericRequest("/productos/", "GET", undefined,);
};

export const deleteProduct = async (idProducto: number) => {
    return await genericRequest(`/productos/${idProducto}`, 'DELETE', undefined, true);
  };

// Obtener producto por ID
export const getProductoById = async (idProducto: number) => {
  return await genericRequest(`/productos/${idProducto}`, "GET", undefined);
};
  