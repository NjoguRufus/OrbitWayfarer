import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

interface PayPalButtonProps {
  amount: number;
  currency: string;
  onSuccess: () => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, currency, onSuccess }) => {
  return (
    <PayPalButtons
      style={{ layout: "horizontal" }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amount.toString(),
                currency_code: currency,
                breakdown: {
                  item_total: {
                    currency_code: currency,
                    value: amount.toString()
                  }
                }
              },
              description: "Travel Booking with OrbitWayfarer"
            },
          ],
          application_context: {
            shipping_preference: "NO_SHIPPING"
          }
        });
      }}
      onApprove={async (data, actions) => {
        if (actions.order) {
          const order = await actions.order.capture();
          console.log('Payment successful:', order);
          onSuccess();
        }
      }}
      onError={(err) => {
        console.error('PayPal error:', err);
        alert('Payment failed. Please try again.');
      }}
      onCancel={() => {
        alert("Payment cancelled. Please try again when you're ready.");
      }}
    />
  );
};

export default PayPalButton;