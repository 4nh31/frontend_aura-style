import React from 'react';

const AdminOrders: React.FC = () => {
  const orders = [
    {
      idPedido: 1,
      fecha: '2025-04-01',
      hora: '14:30',
      estado: 'En proceso',
      total: 150.00,
      tipo_envio: 'Envío estándar',
      fecha_actualizacion: '2025-04-05',
      idUsuario: 1,
      metodo_pago: 'tarjeta'
    },
    {
      idPedido: 2,
      fecha: '2025-04-02',
      hora: '10:00',
      estado: 'Enviado',
      total: 200.00,
      tipo_envio: 'Envío rápido',
      fecha_actualizacion: '2025-04-06',
      idUsuario: 2,
      metodo_pago: 'paypal'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Seguimiento de Pedidos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map(order => (
          <div key={order.idPedido} className="bg-white border p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
            <h3 className="text-xl font-bold mb-4 text-center">Pedido #{order.idPedido}</h3>
            <div className="text-center">
              <p className="text-gray-700"><strong>Fecha:</strong> {order.fecha}</p>
              <p className="text-gray-700"><strong>Hora:</strong> {order.hora}</p>
              <p className="text-gray-700"><strong>Estado:</strong> {order.estado}</p>
              <p className="text-gray-700"><strong>Total:</strong> ${order.total.toFixed(2)}</p>
              <p className="text-gray-700"><strong>Tipo de Envío:</strong> {order.tipo_envio}</p>
              <p className="text-gray-700"><strong>Fecha de Actualización:</strong> {order.fecha_actualizacion}</p>
              <p className="text-gray-700"><strong>Método de Pago:</strong> {order.metodo_pago}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;