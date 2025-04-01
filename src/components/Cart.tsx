import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { useNavbarContext } from '../contexts/NavbarContext';

const Cart: React.FC = () => {
  const { isLoggedIn } = useNavbarContext();
  const [items, setItems] = useState<{ id: number; name: string; size: string; color: string; price: number; quantity: number; image: string; }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cart') || '[]');
    setItems(storedItems);
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

  const handleApplyCoupon = () => {
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
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setModalMessage('Debes iniciar sesión para realizar la compra.');
      setIsModalOpen(true);
      return;
    }
    if (items.length === 0) {
      setModalMessage('No hay artículos en el carrito.');
      setIsModalOpen(true);
      return;
    }
    navigate('/gracias', { state: { items, total: discountedTotal } });
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountedTotal = total * (1 - discount / 100);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Carrito de Compras</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {items.map(item => (
            <div key={item.id} className="flex flex-col md:flex-row items-center justify-between border-b pb-6 mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <img src={item.image} alt={item.name} className="w-48 h-48 object-cover rounded-md shadow-md mr-4" />
                <div>
                  <h3 className="font-bold text-xl">{item.name}</h3>
                  <p className="text-gray-600">Talla: {item.size} | Color: {item.color}</p>
                  <p className="text-gray-800 font-semibold">Precio: ${item.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button onClick={() => handleQuantityChange(item.id, -1)} className="px-3 py-1 border rounded-l-md bg-gray-100 hover:bg-gray-200">-</button>
                <span className="px-3 py-1 border-t border-b">{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, 1)} className="px-3 py-1 border rounded-r-md bg-gray-100 hover:bg-gray-200">+</button>
                <button onClick={() => handleRemove(item.id)} className="ml-4 text-red-500 hover:text-red-700">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
        <div className="border p-6 rounded-md shadow-md">
          <h3 className="font-bold text-xl mb-4">Total de la Orden</h3>
          <ul className="mb-4">
            {items.map(item => (
              <li key={item.id} className="flex justify-between mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <p className="font-bold text-lg mb-4">Total: ${total}</p>
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
          <button onClick={handleCheckout} className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors">Comprar Ahora</button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Mensaje"
        className="fixed top-4 right-4 w-64 bg-white p-4 rounded-md shadow-lg z-50"
        overlayClassName="fixed inset-0 bg-transparent"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Mensaje</h2>
          <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
};

export default Cart;