import React, { createContext, useContext, useState, useEffect } from "react";
import { getCart, addProductToCart, updateProductQuantity, removeProductFromCart } from "../services/carritoService";
import { ICarrito } from "../interfaces/ICarrito";
import { IProductoCarrito } from "../interfaces/ICarrito";

interface CartContextProps {
  carrito: ICarrito | null;
  fetchCart: () => Promise<void>;
  addProduct: (productId: number, quantity: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeProduct: (productId: number) => Promise<void>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [carrito, setCarrito] = useState<ICarrito | null>(null);

  const calculateTotal = (productos: IProductoCarrito[]) => {
    return productos.reduce((sum, product) => sum + product.precio * product.cantidad, 0);
  };

  const fetchCart = async () => {
    try {
      const cart = await getCart();
      cart.total = calculateTotal(cart.productos); // Recalcular el total
      setCarrito(cart); // Actualizar el estado del carrito
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  };

  const addProduct = async (productId: number, quantity: number) => {
    try {
      await addProductToCart(productId, quantity);
      await fetchCart(); // Actualizar el carrito después de añadir el producto
    } catch (error) {
      console.error("Error al añadir producto al carrito:", error);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      await updateProductQuantity(productId, quantity);
      await fetchCart(); // Actualizar el carrito después de modificar la cantidad
    } catch (error) {
      console.error("Error al actualizar la cantidad:", error);
    }
  };

  const removeProduct = async (productId: number) => {
    try {
      await removeProductFromCart(productId);
      await fetchCart(); // Actualizar el carrito después de eliminar un producto
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
    }
  };

  useEffect(() => {
    fetchCart(); // Obtener el carrito al montar el componente
  }, []);

  return (
    <CartContext.Provider value={{ carrito, fetchCart, addProduct, updateQuantity, removeProduct }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};