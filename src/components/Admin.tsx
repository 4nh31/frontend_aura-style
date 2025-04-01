import React, { useState, useEffect } from 'react';
import { useProducts } from "../contexts/AllProductsContext";
import axios from "axios";

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagen: string;
}

const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">
        Agregar Nuevo Producto
      </h2>
      <form className="space-y-2 max-w-lg mx-auto">
        <div className="">
          <div>
            <label className="block text-gray-700 mb-2">Nombre del Producto</label>
            <input type="text" className="border px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
        </div>
        <div className="">
          <div>
            <label className="block text-gray-700 mb-2">[URL] ImagenPrincipal</label>
            <input type="text" className="border px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div className="w-100">
            <label className="block text-gray-700 mb-2">[URL] ImagenSecundaria_UNO_</label>
            <input type="text" className="border px-4  w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div className="w-100">
            <label className="block text-gray-700 mb-2">[URL] ImagenSecundaria_DOS_</label>
            <input type="text" className="border px-4  w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
        </div>
        <div className="-mb-1">
          <label className="block text-gray-700 mb-2">Descripción</label>
          <textarea className="border px-4  w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
        <div className="flex">
          <div className="">
            <label className="block text-gray-700 mb-2">Color</label>
            <select name="Categoria" id="" aria-placeholder='Seleccionar' className="border px-4 py-1 w-30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Negro">Negro</option>
              <option value="Rojo">Rojo</option>
              <option value="Azul">Azul</option>
              <option value="Verde">Verde</option>
              <option value="Morado">Morado</option>
              <option value="Amarillo">Amarillo</option>
            </select>
          </div>
          <div className="ml-7">
            <label className="block text-gray-700 mb-2">Tamaño</label>
            <select name="Categoria" id="" aria-placeholder='Seleccionar' className="border px-4 py-1 w-30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="CH">CH</option>
              <option value="MD">MD</option>
              <option value="G">G</option>
              <option value="XG">XG</option>
            </select>
          </div>
          <div className="ml-6">
            <label className="block text-gray-700 mb-2">Categoria</label>
            <select name="Categoria" id="" aria-placeholder='Seleccionar' className="border px-4 py-1 w-55 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Caballero">Caballero</option>
              <option value="Dama">Dama</option>
              <option value="Kids">Kids</option>
              <option value="Bolsas">Bolsas</option>
              <option value="Mochilas">Mochilas</option>
              <option value="Calzado">Calzado</option>
              <option value="Gorras">Gorras</option>
            </select>
          </div>
        </div>
        <div className="flex mb-6">
          <div>
            <label className="block text-gray-700 mb-2">Precio</label>
            <input type="number" className="border px-4 py-1 w-67 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div className="ml-6">
            <label className="block text-gray-700 mb-2">Cantidad Stock</label>
            <input type="number" className="border px-4 py-1  w-55 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
        </div>
        <button type="submit" className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors">
          Agregar Producto
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4">Productos Existentes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 border-b text-left">ID</th>
              <th className="py-2 border-b text-left">ImagenPrincipal</th>
              <th className="py-2 border-b text-left">ImgSec_UNO</th>
              <th className="py-2 border-b text-left">ImgSec_DOS</th>
              <th className="py-2 border-b text-left">Nombre</th>
              <th className="py-2 border-b text-left">Descripción</th>
              <th className="py-2 border-b text-left">Color</th>
              <th className="py-2 border-b text-left">Tamaño</th>
              <th className="py-2 border-b text-left">Precio</th>
              <th className="py-2 border-b text-left">Categoria</th>
              <th className="py-2 border-b text-left">STOCK</th>
              <th className="py-2 border-b text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td className="py-2 border-b">
                  <img src={product.imagen} alt={product.nombre} className="w-24 h-24 object-cover rounded-md" />
                </td>
                <td className="py-2 border-b">{product.nombre}</td>
                <td className="py-2 border-b">{product.descripcion}</td>
                <td className="py-2 border-b">${product.precio}</td>
                <td className="py-2 border-b">
                  <button className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-700 transition-colors mr-2">
                    Editar
                  </button>
                  <button className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-700 transition-colors">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;