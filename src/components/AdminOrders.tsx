import React, { useState, useEffect } from 'react';
import { getPedidos } from '../services/pedidosService';

const AdminOrders: React.FC = () => {
       const [pedidos, setPedidos] = useState<any[]>([]);  // Para almacenar los pedidos
  const [loading, setLoading] = useState<boolean>(true);  // Para manejar el estado de carga
  const [error, setError] = useState<string | null>(null);  // Para manejar posibles errores

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const data = await getPedidos();  
        setPedidos(data); 
      } catch (err) {
        setError('Hubo un problema al cargar los pedidos.');
      } finally {
        setLoading(false); 
      }
    };

    fetchPedidos();  
  }, []);  // 

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Seguimiento de Pedidos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pedidos.map(pedido => (
          <div key={pedido.idPedido} className="bg-white border p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
            <h3 className="text-xl font-bold mb-4 text-center">Pedido #{pedido.idPedido}</h3>
            <div className="text-center">
              <p className="text-gray-700"><strong>Fecha:</strong> {pedido.fecha}</p>
              <p className="text-gray-700"><strong>Hora:</strong> {pedido.hora}</p>
              <p className="text-gray-700"><strong>Estado:</strong> {pedido.estado}</p>
              <p>Total: ${Number(pedido.total).toFixed(2)}</p>   
              <p className="text-gray-700"><strong>Tipo de Envío:</strong> {pedido.tipo_envio}</p>
              <p className="text-gray-700"><strong>Fecha de Actualización:</strong> {pedido.fecha_actualizacion}</p>
              <p className="text-gray-700"><strong>Método de Pago:</strong> {pedido.metodo_pago}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;