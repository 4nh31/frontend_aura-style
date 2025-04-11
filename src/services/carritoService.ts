import { genericRequest } from "../utils/genericRequestUtils";
import { ICarrito, IProductoCarrito } from "../interfaces/ICarrito";

export const getCart = async (): Promise<ICarrito> => {
  try {
    // Realizar la solicitud al backend para obtener el carrito
    const response = await genericRequest("/carrito", "GET", undefined, true);

    // Verificar si la respuesta tiene éxito y contiene datos
    if (response?.success && response.data) {
      console.log("Carrito obtenido antes de procesar:", response.data);
      return {
        idCarrito: response.data.idCarrito || 0,
        productos: response.data.productos.map((product: IProductoCarrito) => ({
          ...product,
          precio: parseFloat(product.precio), // Convertir precio a número
          imagenPrincipal: product.imagenPrincipal,   // Mapear 'imagen' a 'imagenPrincipal'
        })) || [],
        total: parseFloat(response.data.total) || 0, // Asegurar que 'total' sea un número
      };
    }

    // Si no se encontraron datos, retornar un carrito vacío
    console.warn("Carrito vacío o no encontrado. Creando un carrito vacío.");
    return { idCarrito: 0, productos: [], total: 0 }; // Carrito vacío
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    throw error;
  }
};

export const addProductToCart = async (productId: number, quantity: number): Promise<void> => {
  return await genericRequest("/carrito", "POST", { productId, quantity }, true);
};

export const updateProductQuantity = async (productId: number, quantity: number): Promise<void> => {
  return await genericRequest(`/carrito/${productId}`, "PUT", { quantity }, true);
};

export const removeProductFromCart = async (productId: number): Promise<void> => {
  return await genericRequest(`/carrito/${productId}`, "DELETE", undefined, true);
};

export const clearCart = async (): Promise<void> => {
  return await genericRequest("/carrito", "DELETE", undefined, true);
};