import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  nombre: string;
  cantidad: number;
}

interface Order {
  id: number;
  fecha: string;
  estado: string;
  productos: Product[];
  detalles: string;
}

const TrackOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem('userId'); // o del context
        const response = await axios.get(`http://localhost:3000/api/pedidos/${userId}`);
        const pedidosPagados = response.data.filter((order: any) => order.estado.toLowerCase() === 'pagado');

        setOrders(pedidosPagados.map((order: any) => ({
          id: order.idPedido,
          fecha: order.fecha,
          estado: order.estado,
          productos: order.productos, // suponer array de productos
          detalles: order.detalles || '', // opcional
        })));
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
      }
    };

    fetchOrders();
  }, []);

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
              <th className="py-2 px-4 border-b bg-gray-200">Fecha</th>
              <th className="py-2 px-4 border-b bg-gray-200">Estado</th>
              <th className="py-2 px-4 border-b bg-gray-200">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="text-center hover:bg-gray-100 transition-colors">
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">{order.fecha}</td>
                <td className="py-2 px-4 border-b">{order.estado}</td>
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

      {/* Detalles */}
      {orders.map(order => (
        <div key={order.id} className={`mt-4 p-4 rounded-md shadow-md bg-gray-100 ${expandedOrderId === order.id ? 'block' : 'hidden'}`}>
          <h3 className="text-xl font-bold mb-2">Detalles del Pedido #{order.id}</h3>
          <ul className="list-disc pl-5">
            {order.productos.map((producto, index) => (
              <li key={index}>
                {producto.nombre} (x{producto.cantidad})
              </li>
            ))}
          </ul>
          {order.detalles && <p className="mt-2 text-sm text-gray-600">{order.detalles}</p>}
        </div>
      ))}
    </div>
  );
};

export default TrackOrders;
