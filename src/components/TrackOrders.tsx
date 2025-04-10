import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  nombre: string;
  cantidad: number;
  precio: number; // Asegúrate de tener el precio en cada producto
}

interface pedidos {
  id: number;
  fecha: string;
  estado: string;
  productos: Product[];
  detalles: string;
  total: number; // Para el total del pedido
}

const TrackOrders: React.FC = () => {
  const [orders, setOrders] = useState<pedidos[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const idUsuario = localStorage.getItem('idUsuario');
        const token = localStorage.getItem('token'); // Obtén el token de localStorage o contexto
   
        const response = await axios.get(`http://localhost:3000/pedidos/${idUsuario}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token como Bearer
          },
        });
   
        // Filtrar solo los pedidos realizados por el usuario
        const pedidosDelUsuario = response.data.filter((order: any) => order.usuario_id === parseInt(idUsuario!));
  
        // Filtrar solo los pedidos con estado 'pagado'
        const pedidosPagados = pedidosDelUsuario.filter((order: any) => order.estado.toLowerCase() === 'pagado');
  
        // Mapear los datos para estructurarlos en el formato correcto
        const mappedOrders = pedidosPagados.map((order: any) => ({
          id: order.idPedido,
          fecha: order.fecha,
          estado: order.estado,
          productos: order.productos,
          detalles: order.detalles || '',
          total: order.total,
        }));
  
        // Establecer solo los pedidos obtenidos de la API, sin agregar duplicados
        setOrders(mappedOrders);
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
      }
    };
  
    // Esto es para obtener los datos guardados en el localStorage (por ejemplo, del pedido actual)
    const storedData = localStorage.getItem('datosPago');
    if (storedData) {
      const { items, total, orderID } = JSON.parse(storedData);
      setOrders(prevOrders => [
        ...prevOrders.filter(order => order.id !== orderID), // Evitar duplicados
        {
          id: orderID,
          fecha: new Date().toLocaleDateString(), // Asumiendo que la fecha actual es la del pedido
          estado: 'Pagado', // Estado simulado
          productos: items,
          detalles: 'Detalles del pedido realizados correctamente',
          total: total,
        }
      ]);
    }
  
    fetchOrders();
  }, []);
  

  const toggleDetails = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Seguimiento de Pedidos</h2>
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

      {/* Detalles del pedido */}
      {orders.map(order => (
        <div key={order.id} className={`mt-4 p-4 rounded-md shadow-md bg-gray-100 ${expandedOrderId === order.id ? 'block' : 'hidden'}`}>
          <h3 className="text-xl font-bold mb-2">Detalles del Pedido #{order.id}</h3>
          <ul className="list-disc pl-5">
            {order.productos.map((producto, index) => (
              <li key={producto.nombre + index}>
                {producto.nombre} (x{producto.cantidad}) - ${producto.precio * producto.cantidad}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-gray-600">Detalles: {order.detalles}</p>
          <p className="mt-2 text-lg font-bold text-gray-900">Total: ${order.total.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default TrackOrders;
