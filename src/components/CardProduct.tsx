import React from "react";

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  stock: number;
  categoria: string;
  precio: number;
  color: string;
  tamaño: string;
  imagenPrincipal: string;
}

const CardProduct: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="CardProducto w-60 border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg">
      <img src={product.imagenPrincipal} alt={product.nombre} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{product.nombre}</h3>
      <p className="text-sm text-gray-500">{product.color} - {product.tamaño}</p>
      <p className="text-md font-bold text-gray-700">${product.precio}</p>
      <button className="mt-2 bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition">Agregar</button>
    </div>
  );
};

export default CardProduct;
