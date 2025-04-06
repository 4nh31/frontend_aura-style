import { genericRequest } from "../utils/genericRequestUtils";
import { ICreateProduct } from "../interfaces/ICreateProduct";

// Crear un producto
export const createProducto = async (producto: ICreateProduct) => {
  return await genericRequest("/productos", "POST", producto, true); // true = requiere token
};

// Obtener productos (opcional, si lo necesitas para listar)
export const getProductos = async () => {
  return await genericRequest("/productos", "GET", undefined, true);
};