import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useLocation, useNavigate } from "react-router-dom";

const DetallesProducto: React.FC = () => {
  const { addProduct } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const producto = location.state;

  if (!producto) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Producto no encontrado</h2>
        <button
          onClick={() => navigate("/catalogo")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Volver al Catálogo
        </button>
      </div>
    );
  }

  const { idProducto, nombre, precio, imagenPrincipal, descripcion } = producto;
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      await addProduct(idProducto, quantity);
      navigate("/cart"); // Redirigir al carrito
    } catch (error) {
      console.error("Error al añadir producto al carrito:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">{nombre}</h1>
      <div className="flex">
        <img
          src={imagenPrincipal}
          alt={nombre}
          className="w-1/2 h-auto object-cover rounded-md shadow-md"
        />
        <div className="ml-6">
          <p className="text-2xl font-semibold text-gray-800">${precio}</p>
          <p className="text-gray-600 mt-4">{descripcion}</p>
          <div className="mt-6 flex items-center">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 border border-gray-300 px-2 py-1 rounded-md"
            />
            <button
              onClick={handleAddToCart}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallesProducto;