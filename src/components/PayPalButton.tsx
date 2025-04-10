import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importamos useNavigate
import axios from 'axios';

interface PayPalButtonProps {
  items: ItemType[];
  total: number;
  pedidoId: number;
  descuento: number;
}

type ItemType = {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
};

const PayPalButton: React.FC<PayPalButtonProps> = ({ total, pedidoId, items }) => {
  const navigate = useNavigate();  // Aquí se declara el hook de navegación

  const handlePago = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Necesitas iniciar sesión para pagar.');
        return;
      }

      // Crear la orden en tu backend
      const response = await axios.post(
        'http://localhost:3000/pagos/crear-orden',
        {
          total,
          idPedido: pedidoId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const orderID = response.data.id; // <- Este es el orderID real de PayPal

      // Busca el link de aprobación en la respuesta de PayPal
      localStorage.setItem('datosPago', JSON.stringify({ items, total, orderID }));
      const linkAprobacion = response.data.links.find((link: any) => link.rel === 'approve');

      if (linkAprobacion) {
        // Redirige al usuario a la página de PayPal
        window.location.href = linkAprobacion.href;
      } else {
        throw new Error('No se encontró el link de aprobación de PayPal.');
      }
    } catch (error) {
      console.error('Error al crear la orden de pago:', error);
      alert('Ocurrió un error al procesar el pago. Inténtalo más tarde.');
    }
  };

  return (
    <button
      onClick={handlePago}
      className="w-full bg-yellow-500 text-black py-2 rounded-md hover:bg-yellow-600 transition-colors"
    >
      Pagar con PayPal
    </button>
  );
};

export default PayPalButton;
