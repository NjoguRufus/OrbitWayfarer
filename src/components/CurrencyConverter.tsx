import React, { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';

interface CurrencyConverterProps {
  amount: number;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ amount }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(amount);

  const currencies = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    KES: 143.50,
    JPY: 150.27,
    AUD: 1.53
  };

  useEffect(() => {
    const rate = currencies[selectedCurrency as keyof typeof currencies] || 1;
    setConvertedAmount(amount * rate);
  }, [amount, selectedCurrency]);

  return (
    <div className="flex items-center space-x-2">
      <DollarSign className="w-4 h-4 text-gray-500" />
      <select
        value={selectedCurrency}
        onChange={(e) => setSelectedCurrency(e.target.value)}
        className="border rounded px-2 py-1 text-sm"
      >
        {Object.keys(currencies).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <span className="font-semibold">
        {convertedAmount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
      </span>
    </div>
  );
};

export default CurrencyConverter;