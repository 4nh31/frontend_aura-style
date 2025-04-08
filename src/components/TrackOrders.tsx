import React, { useState } from 'react';

interface Order {
  id: number;
  product: string;
  date: string;
  status: string;
  details: string;
}

const orders: Order[] = [
  { id: 1, product: 'Vestido Elegante', date: '2025-04-01', status: 'Enviado', details: 'Pedido realizado el 01-04-2025 a las 14:00. Enviado.' },
  { id: 2, product: 'Camisa Casual', date: '2025-03-29', status: 'Entregado', details: 'Pedido realizado el 29-03-2025 a las 13:45. Entregado el 01-04-2025.' },
  { id: 3, product: 'Pantalón de Moda', date: '2025-03-27', status: 'En proceso', details: 'Pedido realizado el 27-03-2025 a las 12:30. En proceso de preparación.' },
];

const TrackOrders: React.FC = () => {
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  const toggleDetails = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Seguimiento de Productos Comprados</h2>
      <div className="flex justify-center">
        <table className="min-w-full max-w-4xl bg-white border rounded-md shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-gray-200">ID</th>
              <th className="py-2 px-4 border-b bg-gray-200">Producto</th>
              <th className="py-2 px-4 border-b bg-gray-200">Fecha de Compra</th>
              <th className="py-2 px-4 border-b bg-gray-200">Estado</th>
              <th className="py-2 px-4 border-b bg-gray-200">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="text-center hover:bg-gray-100 transition-colors">
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">{order.product}</td>
                <td className="py-2 px-4 border-b">{order.date}</td>
                <td className="py-2 px-4 border-b">{order.status}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => toggleDetails(order.id)}
                    className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {orders.map(order => (
        <div key={order.id} className={`mt-4 p-4 rounded-md shadow-md bg-gray-100 ${expandedOrderId === order.id ? 'block' : 'hidden'}`}>
          <h3 className="text-xl font-bold mb-2">Detalles del Pedido #{order.id}</h3>
          <p>{order.details}</p>
        </div>
      ))}
    </div>
  );
};

export default TrackOrders;