import React from "react";
import { useCart } from "../contexts/CartContext";
import CardCarritoProducto from "./cardCarritoProducto";

const Cart: React.FC = () => {
  const { carrito, updateQuantity, removeProduct } = useCart();

  if (!carrito || carrito.productos.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Carrito de Compras</h2>
        <p className="text-gray-600">Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Carrito de Compras</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lista de productos */}
        <div className="productos-carrito">
          {carrito.productos.map((product) => (
            <CardCarritoProducto
              key={product.idProducto}
              idProducto={product.idProducto}
              nombre={product.nombre}
              imagenPrincipal={product.imagenPrincipal}
              precio={product.precio}
              cantidad={product.cantidad}
              onUpdateQuantity={updateQuantity}
              onRemoveProduct={removeProduct}
            />
          ))}
        </div>

        {/* Resumen del carrito */}
        <div className="resumen-carrito border p-6 rounded-md shadow-md">
          <h3 className="font-bold text-xl mb-4">Resumen del Carrito</h3>
          <ul className="mb-4">
            {carrito.productos.map((product) => (
              <li key={product.idProducto} className="flex justify-between mb-2">
                <span>
                  {product.nombre} x {product.cantidad}
                </span>
                <span>${(product.precio * product.cantidad).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="font-bold text-lg mb-4">
            Total: ${carrito.total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;