import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagenPrincipal: string;
  imagenSecundariaUno: string;
  imagenSecundariaDos: string;
}

interface Coupon {
  id: number;
  code: string;
  discount: number;
}

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [stock, setStock] = useState<number | string>('');
  const [category, setCategory] = useState('');
  const [imageMain, setImageMain] = useState('');
  const [imageSecOne, setImageSecOne] = useState('');
  const [imageSecTwo, setImageSecTwo] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState<number | string>('');

  useEffect(() => {
    // Fetch products and coupons from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('Unexpected response format for products:', response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };

    const fetchCoupons = async () => {
      try {
        const response = await axios.get('/api/couons');
        if (Array.isArray(response.data)) {
          setCoupons(response.data);
        } else {
          console.error('Unexpected response format for coupons:', response.data);
          setCoupons([]);
        }
      } catch (error) {
        console.error('Error fetching coupons:', error);
        setCoupons([]);
      }
    };

    fetchProducts();
    fetchCoupons();
  }, []);

  const handleAddProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editingProduct) {
      const updatedProduct = {
        ...editingProduct,
        nombre: name,
        descripcion: description,
        precio: parseFloat(price as string),
        stock: parseInt(stock as string),
        categoria: category,
        imagenPrincipal: imageMain,
        imagenSecundariaUno: imageSecOne,
        imagenSecundariaDos: imageSecTwo,
      };
      const response = await axios.put(`/api/products/${editingProduct.id}`, updatedProduct);
      const updatedProducts = products.map(product =>
        product.id === editingProduct.id ? response.data : product
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
    } else {
      const newProduct = {
        id: Date.now(),
        nombre: name,
        descripcion: description,
        precio: parseFloat(price as string),
        stock: parseInt(stock as string),
        categoria: category,
        imagenPrincipal: imageMain,
        imagenSecundariaUno: imageSecOne,
        imagenSecundariaDos: imageSecTwo,
      };
      const response = await axios.post('/api/products', newProduct);
      setProducts([...products, response.data]);
    }

    // Clear the form
    setName('');
    setDescription('');
    setPrice('');
    setStock('');
    setCategory('');
    setImageMain('');
    setImageSecOne('');
    setImageSecTwo('');
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setName(product.nombre);
    setDescription(product.descripcion);
    setPrice(product.precio);
    setStock(product.stock);
    setCategory(product.categoria);
    setImageMain(product.imagenPrincipal);
    setImageSecOne(product.imagenSecundariaUno);
    setImageSecTwo(product.imagenSecundariaDos);
  };

  const handleDeleteProduct = async (id: number) => {
    await axios.delete(`/api/products/${id}`);
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
  };

  const handleAddCoupon = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editingCoupon) {
      const updatedCoupon = {
        ...editingCoupon,
        code: couponCode,
        discount: parseFloat(discount as string),
      };
      const response = await axios.put(`/api/coupons/${editingCoupon.id}`, updatedCoupon);
      const updatedCoupons = coupons.map(coupon =>
        coupon.id === editingCoupon.id ? response.data : coupon
      );
      setCoupons(updatedCoupons);
      setEditingCoupon(null);
    } else {
      const newCoupon = {
        id: Date.now(),
        code: couponCode,
        discount: parseFloat(discount as string),
      };
      const response = await axios.post('/api/coupons', newCoupon);
      setCoupons([...coupons, response.data]);
    }

    // Clear the form
    setCouponCode('');
    setDiscount('');
  };

  const handleEditCoupon = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setCouponCode(coupon.code);
    setDiscount(coupon.discount);
  };

  const handleDeleteCoupon = async (id: number) => {
    await axios.delete(`/api/coupons/${id}`);
    const updatedCoupons = coupons.filter(coupon => coupon.id !== id);
    setCoupons(updatedCoupons);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">
        {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
      </h2>
      <form onSubmit={handleAddProduct} className="space-y-4 max-w-lg mx-auto">
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
            <label className="block text-gray-700 mb-2">URL de la Imagen Principal</label>
            <input
              type="text"
              value={imageMain}
              onChange={(e) => setImageMain(e.target.value)}
              className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">URL de la Imagen Secundaria Uno</label>
            <input
              type="text"
              value={imageSecOne}
              onChange={(e) => setImageSecOne(e.target.value)}
              className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">URL de la Imagen Secundaria Dos</label>
            <input
              type="text"
              value={imageSecTwo}
              onChange={(e) => setImageSecTwo(e.target.value)}
              className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
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
            onChange={(e) => setCategory(e.target.value)}
            className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Seleccionar</option>
            <option value="Caballero">Caballero</option>
            <option value="Dama">Dama</option>
            <option value="Kids">Kids</option>
            <option value="Bolsas">Bolsas</option>
            <option value="Mochilas">Mochilas</option>
            <option value="Calzado">Calzado</option>
            <option value="Gorras">Gorras</option>
          </select>
        </div>
        <button type="submit" className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors">
          {editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4">Productos Existentes</h2>
      <div className="overflow-x-auto">
        {Array.isArray(products) ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 border-b text-left">Imagen Principal</th>
                <th className="py-2 border-b text-left">ImgSec_UNO</th>
                <th className="py-2 border-b text-left">ImgSec_DOS</th>
                <th className="py-2 border-b text-left">Nombre</th>
                <th className="py-2 border-b text-left">Descripción</th>
                <th className="py-2 border-b text-left">Precio</th>
                <th className="py-2 border-b text-left">Categoría</th>
                <th className="py-2 border-b text-left">STOCK</th>
                <th className="py-2 border-b text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td className="py-2 border-b">
                    <img src={product.imagenPrincipal} alt={product.nombre} className="w-24 h-24 object-cover rounded-md" />
                  </td>
                  <td className="py-2 border-b">{product.imagenSecundariaUno}</td>
                  <td className="py-2 border-b">{product.imagenSecundariaDos}</td>
                  <td className="py-2 border-b">{product.nombre}</td>
                  <td className="py-2 border-b">{product.descripcion}</td>
                  <td className="py-2 border-b">${product.precio}</td>
                  <td className="py-2 border-b">{product.categoria}</td>
                  <td className="py-2 border-b">{product.stock}</td>
                  <td className="py-2 border-b">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-700 transition-colors mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
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

      <h2 className="text-2xl font-bold mt-8 mb-4">
        {editingCoupon ? 'Editar Cupón' : 'Agregar Nuevo Cupón'}
      </h2>
      <form onSubmit={handleAddCoupon} className="space-y-4 max-w-lg mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Código del Cupón</label>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Descuento (%)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <button type="submit" className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors">
          {editingCoupon ? 'Actualizar Cupón' : 'Agregar Cupón'}
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4">Cupones Existentes</h2>
      <div className="overflow-x-auto">
        {Array.isArray(coupons) ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 border-b text-left">Código</th>
                <th className="py-2 border-b text-left">Descuento</th>
                <th className="py-2 border-b text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map(coupon => (
                <tr key={coupon.id}>
                  <td className="py-2 border-b">{coupon.code}</td>
                  <td className="py-2 border-b">{coupon.discount}%</td>
                  <td className="py-2 border-b">
                    <button
                      onClick={() => handleEditCoupon(coupon)}
                      className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-700 transition-colors mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteCoupon(coupon.id)}
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
          <p>No se encontraron cupones.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;