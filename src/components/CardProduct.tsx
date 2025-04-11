import React from "react";
import { useNavigate } from 'react-router-dom';

interface Product {
  idProducto: number;
  nombre: string;
  descripcion: string;
  idCategoria: number | string;
  precio: number;
  imagenPrincipal: string;
}

const CardProduct: React.FC<{ product: Product }> = ({ product }) => {
    const navigate = useNavigate(); // Usamos useNavigate para redirigir al usuario

    // Función para manejar el clic en el botón "Ver Producto"
    const handleClick = () => {
      navigate("/detalles-producto", { state: product }); // Pasar el producto completo como estado
    };

  return (
    <div className="CardProducto w-60 border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg">
      <img src={product.imagenPrincipal} alt={product.nombre} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{product.nombre}</h3>
      <p className="text-md font-bold text-gray-700">${product.precio}</p>
      <button 
        onClick={handleClick}
        className="mt-2 bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition"
      >
        Ver Producto
      </button>
    </div>
  );
};

export default CardProduct;