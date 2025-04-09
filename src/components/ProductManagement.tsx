import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ICategoria } from '../interfaces/ICategoria';
import { getcategory } from '../services/categoriaService';
import { createProductoConImagen, getProductos, deleteProduct, updateProducto} from '../services/productService';

interface Product {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  idCategoria: number;
  imagenPrincipal: string;
  imagenSecundariaUno: string;
  imagenSecundariaDos: string;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [stock, setStock] = useState<number | string>('');
  const [category, setCategory] = useState<number | ''>('');
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [imageMain, setImageMain] = useState<File | null>(null);
  const [imageSecOne, setImageSecOne] = useState<File | null>(null);
  const [imageSecTwo, setImageSecTwo] = useState<File | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductos();
        if (Array.isArray(response)) {
          setProducts(response);
        } else {
          console.error('Formato inesperado de productos:', response);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error al obtener productos:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await getcategory();
        setCategorias(response);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleAddProduct = async (event: React.FormEvent) => {
    event.preventDefault();

    

    const formData = new FormData();
    formData.append('nombre', name);
    formData.append('descripcion', description);
    formData.append('precio', price as string);
    formData.append('stock', stock as string);
    formData.append('idCategoria', category.toString());
    
    const imagenes: File[]=[];
    if (imageMain) imagenes.push, formData.append('imagenes', imageMain);
    if (imageSecOne) imagenes.push, formData.append('imagenes', imageSecOne);
    if (imageSecTwo) imagenes.push,formData.append('imagenes', imageSecTwo);

    if (editingProduct) {
      const producto = {
        idProducto: editingProduct.idProducto,
        nombre: name,
        descripcion: description,
        precio: price,
        stock: stock,
        idCategoria: category.toString(),
      };

      /*const response = await updateProducto(producto, imagenes.length === 3 ? imagenes : undefined);
      const updatedProducts = products.map(product =>
        product.idProducto === editingProduct.idProducto ? response.data : product
      );*/

      await updateProducto(producto, imagenes.length === 3 ? imagenes : undefined);
        const refreshed = await getProductos();
        setProducts(refreshed);

      setEditingProduct(null);


    } else {
      try {
        const response = await createProductoConImagen(formData);
        setProducts([...products, response]);
      } catch (error) {
        console.error("Error al crear producto:", error);
      }
    }

    // Clear the form
    setName('');
    setDescription('');
    setPrice('');
    setStock('');
    setImageMain(null);
    setImageSecOne(null);
    setImageSecTwo(null);
  };



  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setName(product.nombre);
    setDescription(product.descripcion);
    setPrice(product.precio);
    setStock(product.stock);
    setCategory(product.idCategoria);
  };

  const handleDeleteProduct = async (idProducto: number) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este producto?');
    if (!confirmDelete) return;
  
    try {
      await deleteProduct(idProducto);
      const updatedProducts = products.filter(product => product.idProducto !== idProducto);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">
        {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
      </h2>
      <form onSubmit={handleAddProduct} className="space-y-4 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Nombre del Producto</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Imagen Principal</label>
            <input
              type="file"
              accept=".png"
              onChange={(e) => setImageMain(e.target.files ? e.target.files[0] : null)}
              className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={!editingProduct}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Imagen Secundaria Uno</label>
            <input
              type="file"
              accept=".png"
              onChange={(e) => setImageSecOne(e.target.files ? e.target.files[0] : null)}
              className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={!editingProduct}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Imagen Secundaria Dos</label>
            <input
              type="file"
              accept=".png"
              onChange={(e) => setImageSecTwo(e.target.files ? e.target.files[0] : null)}
              className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={!editingProduct}
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Precio</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Cantidad Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Categoría</label>
          <select
            value={category}
            onChange={(e) => setCategory(Number(e.target.value))}
            className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            {categorias.map((cat) => (
              <option key={cat.idCategoria} value={cat.idCategoria}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors">
          {editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4">Productos Existentes</h2>
      <div className="overflow-x-auto">
        {Array.isArray(products) ? (
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Imagen Principal</th>
                <th className="py-2 px-4 text-left">ImgSec_UNO</th>
                <th className="py-2 px-4 text-left">ImgSec_DOS</th>
                <th className="py-2 px-4 text-left">Nombre</th>
                <th className="py-2 px-4 text-left">Descripción</th>
                <th className="py-2 px-4 text-left">Precio</th>
                <th className="py-2 px-4 text-left">Categoría</th>
                <th className="py-2 px-4 text-left">STOCK</th>
                <th className="py-2 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.idProducto} className="border-b">
                  <td className="py-2 px-4">
                    {product.imagenPrincipal ? (
                      product.imagenPrincipal
                    ) : (
                      <span className="text-gray-500 italic">Sin imagen</span>
                    )}
                  </td>
                  <td className="py-2 px-4">  {product.imagenSecundariaUno ? (
                    product.imagenSecundariaUno
                  ) : (
                    <span className="text-gray-500 italic">Sin imagen</span>
                  )}</td>
                  <td className="py-2 px-4">  {product.imagenSecundariaDos ? (
                    product.imagenSecundariaDos
                  ) : (
                    <span className="text-gray-500 italic">Sin imagen</span>
                  )}</td>
                  <td className="py-2 px-4">{product.nombre}</td>
                  <td className="py-2 px-4">{product.descripcion}</td>
                  <td className="py-2 px-4">${product.precio}</td>
                  <td className="py-2 px-4">  {
                    categorias.find(cat => cat.idCategoria === product.idCategoria)?.nombre ||
                    <span className="text-gray-500 italic">Sin categoría</span>
                  }</td>
                  <td className="py-2 px-4">{product.stock}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-700 transition-colors mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.idProducto)}
                      className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-700 transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;