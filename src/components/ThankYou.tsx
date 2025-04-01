import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ThankYou: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items, total } = location.state || { items: [], total: 0 };

  const handleSendTicket = () => {
    alert('Ticket electrónico enviado por correo.');
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