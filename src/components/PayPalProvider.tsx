import React from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

interface PayPalProviderProps {
  children: React.ReactNode;
}

const PayPalProvider: React.FC<PayPalProviderProps> = ({ children }) => {
  const initialOptions = {
    clientId: "AQ4fPSHQQv37Nal4JXYf0jIR_hFrZ7prQsOA2M1sDlv5cIELkSdvZcZUv5BsKRPyJsl4MqMvLnZ3XELq",
    currency: "USD",
    intent: "capture",
    components: "buttons",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      {children}
    </PayPalScriptProvider>
  );
};

export default PayPalProvider;
