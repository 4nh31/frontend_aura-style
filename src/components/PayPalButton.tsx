import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadScript, PayPalNamespace, PayPalScriptOptions } from '@paypal/paypal-js';

interface PayPalButtonProps {
  items: any[];
  total: number;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ items, total }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const scriptOptions: PayPalScriptOptions = {
      clientId: 'AdA-wwNI0f0uro_TDUEY9HG-LbX0pI32Q4zcp-QmeTkYUBIQvKKR6xg2E02zC99QuBY-eKLJD9cjjhiq',
      currency: 'MXN'
    };

    loadScript(scriptOptions).then((paypal: PayPalNamespace | null) => {
      if (paypal && paypal.Buttons) {
        paypal.Buttons({
          createOrder(data: any, actions: any) {
            if (total <= 0) {
              throw new Error("El total de la orden debe ser mayor que cero.");
            }
            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [{
                amount: {
                  value: total.toFixed(2),
                  currency_code: 'MXN'
                }
              }]
            });
          },
          onApprove(data: any, actions: any) {
            if (actions.order) {
              return actions.order.capture().then((details: any) => {
                navigate('/thank-you', { state: { items, total } });
              });
            }
          },
          onError(err: any) {
            console.error('Error en PayPal:', err);
          }
        }).render('#paypal-button-container');
      }
    }).catch((err) => {
      console.error('Error al cargar el script de PayPal:', err);
    });

    return () => {
      const paypalButtonContainer = document.getElementById('paypal-button-container');
      if (paypalButtonContainer) {
        paypalButtonContainer.innerHTML = '';
      }
    };
  }, [items, total, navigate]);

  return <div id="paypal-button-container" />;
};

export default PayPalButton;