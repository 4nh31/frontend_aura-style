import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { getProductoById } from "../services/productService";
import { IProducto } from "../interfaces/IProducto";

const DetallesProducto: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const idProductoRecibido = location.state?.idProducto || null; // Obtenemos el ID del producto desde el estado

  const [producto, setProducto] = useState<IProducto | null>(null);
  const [loading, setLoading] = useState(true);

  // Efecto para obtener los datos del producto cuando se carga el componente
  useEffect(() => {
    if (idProductoRecibido) {
      const fetchProducto = async () => {
        try {
          const response: IProducto = await getProductoById(idProductoRecibido);
          setProducto(response);
        } catch (error) {
          console.error("Error al obtener los detalles del producto:", error);
          alert("No se pudo cargar la información del producto.");
        } finally {
          setLoading(false);
        }
      };

      fetchProducto();
    } else {
      alert("No se proporcionó un ID de producto.");
      navigate(-1); // Redirige a la página anterior si no hay ID
    }
  }, [idProductoRecibido, navigate]);

  if (loading) {
    return <p className="text-center">Cargando detalles del producto...</p>;
  }

  if (!producto) {
    return <p className="text-center">Producto no encontrado.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">{producto.nombre}</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={producto.imagenPrincipal}
            alt={producto.nombre}
            className="w-full h-96 object-cover rounded-md shadow-md"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            ${producto.precio}
          </h2>
          <p className="text-gray-600 mb-4">{producto.descripcion}</p>
          <p className="text-gray-500 mb-2">
            <strong>Categoría:</strong> {producto.idCategoria}
          </p>
          <p className="text-gray-500 mb-4">
            <strong>Tamaño:</strong> {producto.tamaño}
          </p>
          <button
            onClick={() => alert("Producto agregado al carrito.")}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
      >
        Volver
      </button>
    </div>
  );
};

export default DetallesProducto;