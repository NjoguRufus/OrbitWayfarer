import React, { useState } from 'react';
import { Calendar, Plus, Minus, DollarSign } from 'lucide-react';

interface PricingTableProps {
  basePricePerDay: number;
  activities: Array<{
    name: string;
    price: number;
  }>;
}

const PricingTable: React.FC<PricingTableProps> = ({ basePricePerDay, activities }) => {
  const [days, setDays] = useState(1);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const calculateTotal = () => {
    const baseTotal = basePricePerDay * days;
    const activitiesTotal = activities
      .filter(activity => selectedActivities.includes(activity.name))
      .reduce((sum, activity) => sum + activity.price, 0);
    return baseTotal + activitiesTotal;
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Customize Your Trip</h3>
        
        {/* Duration Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration
          </label>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDays(Math.max(1, days - 1))}
              className="p-2 rounded-full hover:bg-gray-100"
              disabled={days === 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-400 mr-2" />
              <span className="font-medium">{days}</span>
              <span className="ml-1 text-gray-600">{days === 1 ? 'Day' : 'Days'}</span>
            </div>
            <button
              onClick={() => setDays(Math.min(7, days + 1))}
              className="p-2 rounded-full hover:bg-gray-100"
              disabled={days === 7}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Activities Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Optional Activities
          </label>
          <div className="space-y-2">
            {activities.map((activity) => (
              <label key={activity.name} className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={selectedActivities.includes(activity.name)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedActivities([...selectedActivities, activity.name]);
                    } else {
                      setSelectedActivities(selectedActivities.filter(name => name !== activity.name));
                    }
                  }}
                  className="rounded text-blue-600 mr-3"
                />
                <span className="flex-1">{activity.name}</span>
                <span className="text-gray-600">
                  <DollarSign className="w-4 h-4 inline-block" />
                  {activity.price}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Base Price (per day)</span>
          <span>${basePricePerDay}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Duration ({days} {days === 1 ? 'day' : 'days'})</span>
          <span>${basePricePerDay * days}</span>
        </div>
        {selectedActivities.length > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Activities</span>
            <span>
              ${activities
                .filter(activity => selectedActivities.includes(activity.name))
                .reduce((sum, activity) => sum + activity.price, 0)}
            </span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg pt-2 border-t">
          <span>Total</span>
          <span>${calculateTotal()}</span>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;