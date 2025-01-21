import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { CreditCard, Calendar, Users } from 'lucide-react';

interface BookingDetails {
  propertyName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  price: number;
}

const PAYPAL_CLIENT_ID = 'ATQBw_tCSXqbpOyj3OyNL9NTO3dxzG5Lbg4VLvFQryeVVavx0JPMpqyIc9BZExFyjqz1rlACWIrO28d3';

export function CheckoutPage({ booking }: { booking: BookingDetails }) {
  const [promoCode, setPromoCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateTotal = () => {
    let total = booking.price;
    // Apply promo code discount if valid
    if (promoCode === 'TRAVEL2024') {
      total = total * 0.9; // 10% discount
    }
    return total;
  };

  const handlePayPalApprove = async (data: any, actions: any) => {
    setIsProcessing(true);
    try {
      const order = await actions.order.capture();
      // Here you would typically:
      // 1. Send the order details to your backend
      // 2. Create a booking record in your database
      // 3. Send confirmation email to the user
      console.log('Payment successful', order);
      // Redirect to success page or show success message
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Booking Summary */}
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

            {/* Promo Code */}
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
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${booking.price}</span>
              </div>
              {promoCode === 'TRAVEL2024' && (
                <div className="flex justify-between mb-2 text-green-600">
                  <span>Promo Discount</span>
                  <span>-${(booking.price * 0.1).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Pay with PayPal or Card</span>
            </div>
            
            <PayPalScriptProvider options={{ 
              "client-id": PAYPAL_CLIENT_ID,
              currency: "USD"
            }}>
              <PayPalButtons 
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: calculateTotal().toString()
                      }
                    }]
                  });
                }}
                onApprove={handlePayPalApprove}
              />
            </PayPalScriptProvider>
          </div>

          <div className="text-sm text-gray-600">
            <p className="mb-2">By completing this booking, you agree to our:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Cancellation Policy</li>
            </ul>
          </div>
        </div>
      </div>

      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg font-medium">Processing your payment...</p>
          </div>
        </div>
      )}
    </div>
  );
}