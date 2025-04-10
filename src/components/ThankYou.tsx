import React from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';

const ThankYou: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderID, setOrderID] = useState('');

  useEffect(() => {
    const datos = localStorage.getItem('datosPago');
    if (datos) {
      const { items, total, orderID } = JSON.parse(datos);
      setItems(items);
      setTotal(total);
      setOrderID(orderID); // 👈
    } else {
      navigate('/');
    }
  }, []);
  


  const handleSendTicket = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Token no encontrado, inicia sesión nuevamente.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/pagos/capturar/${orderID}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('✅ Ticket enviado correctamente por correo.');
      } else {
        console.error('❌ Error al reenviar el ticket:', data.error);
        alert(`❌ Error al reenviar el ticket: ${data.error}`);
      }
    } catch (error) {
      console.error('❌ Error en la petición:', error);
      alert('❌ Error al conectar con el servidor.');
    }
  };
  
  

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-4xl font-bold mb-6 text-center text-green-600">¡Gracias por tu compra!</h2>
      <div className="bg-white border p-6 rounded-lg shadow-lg">
        <h3 className="font-bold text-2xl mb-4 text-gray-700">Resumen de la Orden</h3>
        <ul className="mb-4 divide-y divide-gray-200">
          {items.map((item: any) => (
            <li key={item.id} className="flex justify-between py-2">
              <span className="text-gray-800">{item.name} x {item.quantity}</span>
              <span className="text-gray-800">${item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        {/* Muestra el total del pedido */}
        <p className="font-bold text-xl mb-4 text-gray-900">Total Pagado: ${total.toFixed(2)}</p>
        <button 
          onClick={handleSendTicket} 
          className="w-full bg-green-600 text-white py-3 mb-4 rounded-full hover:bg-green-700 transition-colors"
        >
          Mandar Ticket Electrónico por Correo
        </button>
        <button 
          onClick={handleGoHome} 
          className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
