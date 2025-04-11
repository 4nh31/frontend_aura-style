import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { ICategoria } from '../interfaces/ICategoria';
import { getcategory } from '../services/categoriaService';
import { createProductoConImagen, getProductos, deleteProduct, updateProducto } from '../services/productService';

Modal.setAppElement('#root'); // Configurar el elemento raíz para los modales

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
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Modal de éxito para edición o creación
  const [isDeleteSuccessModalOpen, setIsDeleteSuccessModalOpen] = useState(false); // Modal de éxito para eliminación

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductos();
        setProducts(response);
      } catch (error) {
        console.error('Error al obtener productos:', error);
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


    const imagenes: File []=[];
    if (imageMain){ imagenes.push(imageMain); formData.append('imagenes', imageMain);}
    if (imageSecOne){ imagenes.push(imageSecOne); formData.append('imagenes', imageSecOne);}
    if (imageSecTwo){ imagenes.push(imageSecTwo); formData.append('imagenes', imageSecTwo);}



    try {
      if (editingProduct) {
        const producto = {
          idProducto: editingProduct.idProducto,
          nombre: name,
          descripcion: description,
          precio: price,
          stock: stock,
          idCategoria: category.toString(),
        };

        const imagenes: File []=[];
        if (imageMain){ imagenes.push(imageMain); formData.append('imagenes', imageMain);}
        if (imageSecOne){ imagenes.push(imageSecOne); formData.append('imagenes', imageSecOne);}
        if (imageSecTwo){ imagenes.push(imageSecTwo); formData.append('imagenes', imageSecTwo);}

        await updateProducto(producto, imagenes);
        const refreshed = await getProductos();
        setProducts(refreshed);
        setEditingProduct(null);
      } else {
        await createProductoConImagen(formData);
        const refreshed = await getProductos();
        setProducts(refreshed);
      }

      // Mostrar mensaje de éxito
      setIsSuccessModalOpen(true);

      // Limpiar formulario
      handleCancelEdit();
    } catch (error) {
      console.error('Error al agregar o actualizar producto:', error);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setName(product.nombre);
    setDescription(product.descripcion);
    setPrice(product.precio);
    setStock(product.stock);
    setCategory(product.idCategoria);
  };

  const handleCancelEdit = () => {
    // Limpiar los campos y salir del modo de edición
    setEditingProduct(null);
    setName('');
    setDescription('');
    setPrice('');
    setStock('');
    setCategory('');
    setImageMain(null);
    setImageSecOne(null);
    setImageSecTwo(null);
  };

  const handleDeleteProduct = async (idProducto: number) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este producto?');
    if (!confirmDelete) return;

    try {
      await deleteProduct(idProducto);
      const updatedProducts = products.filter(product => product.idProducto !== idProducto);
      setProducts(updatedProducts);

      // Mostrar mensaje de éxito
      setIsDeleteSuccessModalOpen(true);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const closeDeleteSuccessModal = () => {
    setIsDeleteSuccessModalOpen(false);
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
        <div className="flex space-x-4">
          <button type="submit" className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
            {editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
          </button>
          {editingProduct && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancelar Edición
            </button>
          )}
        </div>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4">Productos Existentes</h2>
      <div className="overflow-x-auto">
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
                    <img
                      src={`http://localhost:3000${product.imagenPrincipal}`}
                      alt="Imagen principal"
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-500 italic">Sin imagen</span>
                  )}
                </td>
                <td className="py-2 px-4">
                  {product.imagenSecundariaUno ? (
                    <img
                      src={`http://localhost:3000${product.imagenSecundariaUno}`}
                      alt="Imagen secundaria uno"
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-500 italic">Sin imagen</span>
                  )}
                </td>
                <td className="py-2 px-4">
                  {product.imagenSecundariaDos ? (
                    <img
                      src={`http://localhost:3000${product.imagenSecundariaDos}`}
                      alt="Imagen secundaria dos"
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-500 italic">Sin imagen</span>
                  )}
                </td>
                <td className="py-2 px-4">{product.nombre}</td>
                <td className="py-2 px-4">{product.descripcion}</td>
                <td className="py-2 px-4">${product.precio}</td>
                <td className="py-2 px-4">
                  {categorias.find(cat => cat.idCategoria === product.idCategoria)?.nombre || (
                    <span className="text-gray-500 italic">Sin categoría</span>
                  )}
                </td>
                <td className="py-2 px-4">{product.stock}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.idProducto)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition-colors"
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de éxito para edición o creación */}
      <Modal
        isOpen={isSuccessModalOpen}
        onRequestClose={closeSuccessModal}
        className="modal-style"
        overlayClassName="overlay-style"
      >
        <h2 className="text-2xl font-bold mb-4 text-green-600">✅ Operación Exitosa</h2>
        <p className="mb-4">El producto se ha agregado o actualizado exitosamente.</p>
        <div className="flex justify-end">
          <button
            onClick={closeSuccessModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Cerrar
          </button>
        </div>
      </Modal>

      {/* Modal de éxito para eliminación */}
      <Modal
        isOpen={isDeleteSuccessModalOpen}
        onRequestClose={closeDeleteSuccessModal}
        className="modal-style"
        overlayClassName="overlay-style"
      >
        <h2 className="text-2xl font-bold mb-4 text-green-600">✅ Eliminación Exitosa</h2>
        <p className="mb-4">El producto se ha eliminado exitosamente.</p>
        <div className="flex justify-end">
          <button
            onClick={closeDeleteSuccessModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Cerrar
          </button>
        </div>
      </Modal>

      <style>{`
        .modal-style {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          position: absolute;
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          z-index: 1000;
          max-width: 400px;
          width: 100%;
        }

        .overlay-style {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }
      `}</style>
    </div>
  );
};

export default ProductManagement;