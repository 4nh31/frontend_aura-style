import React, { createContext, useContext, useState, useEffect } from "react";
import { getCart, addProductToCart, updateProductQuantity, removeProductFromCart } from "../services/carritoService";
import { ICarrito } from "../interfaces/ICarrito";

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

  const fetchCart = async () => {
    try {
      const cart = await getCart();
      setCarrito(cart);
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  };

  const addProduct = async (productId: number, quantity: number) => {
    try {
      await addProductToCart(productId, quantity); // Llamada al backend
      fetchCart(); // Actualizar el carrito
    } catch (error) {
      console.error("Error al añadir producto al carrito:", error);
    }
  };
  
  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      await updateProductQuantity(productId, quantity); // Llamada al backend
      fetchCart(); // Actualizar el carrito
    } catch (error) {
      console.error("Error al actualizar la cantidad:", error);
    }
  };
  
  const removeProduct = async (productId: number) => {
    try {
      await removeProductFromCart(productId); // Llamada al backend
      fetchCart(); // Actualizar el carrito
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
    }
  };
  
  useEffect(() => {
    fetchCart();
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