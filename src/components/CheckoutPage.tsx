import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Calendar, Users } from 'lucide-react';  // ✅ Removed 'CreditCard'

interface BookingDetails {
  propertyName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  price: number;
}

const PAYPAL_CLIENT_ID = 'ATQBw_tCSXqbpOyj3OyNL9NTO3dxzG5Lbg4VLvFQryeVVavx0JPMpqyIc9BZExFyjqz1rlACWIrO28d3';

export function CheckoutPage({ booking }: { booking: BookingDetails }) {
  const [promoCode, setPromoCode] = useState(''); // ✅ Used correctly

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>

          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{booking.propertyName}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>{booking.checkIn} - {booking.checkOut}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <Users className="w-4 h-4" />
                  <span>{booking.guests} guests</span>
                </div>
              </div>
              <span className="font-medium">${booking.price}</span>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

          <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: "USD" }}>
            <PayPalButtons 
              style={{ layout: "vertical" }}
              createOrder={(_, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [{
                    amount: {
                      currency_code: "USD",
                      value: booking.price.toString()
                    }
                  }]
                });
              }}
              onApprove={async (_, actions) => {
                if (!actions.order) {
                  console.error('PayPal order is undefined.');
                  return;
                }

                try {
                  const order = await actions.order.capture();
                  console.log('Payment successful', order);
                } catch (error) {
                  console.error('Payment failed:', error);
                }
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>

      {/* Promo Code Section */}
      <div className="border-t border-gray-200 pt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Promo Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter promo code"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button 
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            onClick={() => {
              if (promoCode !== 'TRAVEL2024') {
                alert('Invalid promo code');
                setPromoCode('');
              }
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
