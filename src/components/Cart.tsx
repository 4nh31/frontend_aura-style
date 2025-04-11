import React from "react";
import { useCart } from "../contexts/CartContext";
import CardCarritoProducto from "./cardCarritoProducto";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getProducts } from '../utils/productUtils';
import { useNavbarContext } from '../contexts/NavbarContext';
import { getCupones } from '../services/cuponesServices';
import PayPalButton from './PayPalButton';

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
  const { isLoggedIn } = useNavbarContext();
  const [items, setItems] = useState<{ id: number; name: string; size: string; color: string; price: number; quantity: number; image: string; }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [pedidoId, setPedidoId] = useState<number | null>(null);
  const navigate = useNavigate();
  const [cuponesDisponibles, setCuponesDisponibles] = useState<any[]>([]);


  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cart') || '[]') || getProducts().map(product => ({ ...product, quantity: 1 }));
    setItems(storedItems);


    getCupones().then((data) => {
      setCuponesDisponibles(data);
    }).catch((err) => {
      console.error('Error al cargar cupones:', err);
    });

  }, []);

  const handleQuantityChange = (id: number, delta: number) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    setItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const handleRemove = (id: number) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

 /* const handleApplyCoupon = () => {
    const storedCoupons = JSON.parse(localStorage.getItem('coupons') || '[]');
    const coupon = storedCoupons.find((c: { code: string }) => c.code === couponCode);
    if (coupon) {
      setDiscount(coupon.discount);
      setModalMessage('Cupón aplicado exitosamente.');
    } else {
      setDiscount(0);
      setModalMessage('Cupón no válido.');
    }
    setIsModalOpen(true);
  };*/

  const handleApplyCoupon = () => {
    const coupon = cuponesDisponibles.find((c) => c.codigo === couponCode);
  
    if (!coupon) {
      setDiscount(0);
      setModalMessage('Cupón no válido.');
      setIsModalOpen(true);
      return;
    }
  
    const hoy = new Date();
    const fechaExpiracion = new Date(coupon.fecha_expiracion);
  
    if (fechaExpiracion < hoy) {
      setDiscount(0);
      setModalMessage('Cupón expirado.');
    } else {
      setDiscount(parseFloat(coupon.valor_descuento));
      setModalMessage('¡Cupón aplicado correctamente!');
    }
  
    setIsModalOpen(true);
  };
  

  const handleConfirmarPedido = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('idUsuario');


  console.log('TOKEN:', token);
  console.log('USER ID:', userId);

  if (!token || !userId) {
    setModalMessage('Debes iniciar sesión para hacer un pedido.');
    setIsModalOpen(true);
    return;
  }
  
  const coupon = cuponesDisponibles.find(c => c.codigo === couponCode);
  
    let appliedDiscount = 0;
    let appliedCouponId = null;
  
    if (coupon) {
      appliedDiscount = coupon.discount;
      appliedCouponId = coupon.idCupon;
      setDiscount(coupon.discount);
      setModalMessage('Cupón aplicado exitosamente. Pedido creado.');
    } else if (couponCode.trim() !== '') {
      setDiscount(0);
      setModalMessage('Cupón no válido. Se creará el pedido sin descuento.');
    } else {
      setModalMessage('Pedido creado sin cupón.');
    }
  
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountedTotal = total * (1 - appliedDiscount / 100);
  
    const pedidoData = {
      fecha: new Date().toISOString().split('T')[0],
      hora: new Date().toTimeString().split(' ')[0],
      estado: 'Pendiente',
      total: discountedTotal.toFixed(2),
      tipo_envio: 'domicilio',
      idUsuario: userId,
      idCupon: appliedCouponId
    };
  
    try {
      const response = await axios.post('http://localhost:3000/pedidos', pedidoData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      const pedidoIdFromBackend = response.data.id;
      setPedidoId(pedidoIdFromBackend);
      setIsModalOpen(true);
    } catch (error: any) {
      setModalMessage(`Error al realizar el pedido: ${error.response?.data?.error || error.message}`);
      setIsModalOpen(true);
    }
  };
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountedTotal = total * (1 - discount / 100);

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
          {discount > 0 && <p className="font-bold text-lg mb-4">Descuento: -{discount}%</p>}
          <p className="font-bold text-lg mb-4">Total con Descuento: ${discountedTotal.toFixed(2)}</p>
          <input
            type="text"
            placeholder="Código de Cupón"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="border px-4 py-2 mb-4 w-full rounded-md"
          />
          <button onClick={handleApplyCoupon} className="w-full bg-black text-white py-2 mb-4 rounded-md hover:bg-gray-800 transition-colors">Aplicar Cupón</button>
            {pedidoId ? (
              <PayPalButton 
                items={items} 
                total={discountedTotal} 
                pedidoId={pedidoId}
                descuento={discount}
              />
          ) : (
         <button
            onClick={handleConfirmarPedido}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
        >
         Confirmar Pedido
        </button>
      )}

        </div>
      </div>
    </div>
  );
};

export default Cart;