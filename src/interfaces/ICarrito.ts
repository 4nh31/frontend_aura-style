import { IProducto } from "./IProducto";

/**
 * Interfaz que define la estructura de un carrito en el frontend.
 */
export interface ICarrito {
  idCarrito: number; // Identificador único del carrito
  productos: Array<IProductoCarrito>; // Productos en el carrito, incluyendo su cantidad
  total: number; // Total calculado del carrito
}

export interface IProductoCarrito extends IProducto {
  cantidad: number; // Cantidad del producto en el carrito
  subtotal: number; // Subtotal del producto (precio * cantidad)
}