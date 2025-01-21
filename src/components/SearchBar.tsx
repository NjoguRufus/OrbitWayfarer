import React, { useState } from 'react';
import { Search, Calendar, Users, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const destinations = [
  { id: 'kenya', name: 'Kenya', description: 'Safari adventures and coastal beaches' },
  { id: 'tanzania', name: 'Tanzania', description: 'Serengeti and Mount Kilimanjaro' },
  { id: 'zanzibar', name: 'Zanzibar', description: 'Pristine beaches and historic Stone Town' },
  { id: 'rwanda', name: 'Rwanda', description: 'Gorilla trekking and rainforests' },
  { id: 'santorini', name: 'Santorini', description: 'Stunning sunsets and white architecture' },
  { id: 'bali', name: 'Bali', description: 'Tropical paradise and cultural heritage' },
  { id: 'maldives', name: 'Maldives', description: 'Luxury resorts and crystal waters' },
];

const SearchBar = () => {
  const navigate = useNavigate();
  const [showDestinations, setShowDestinations] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    if (selectedDestination) {
      navigate(`/destinations/${selectedDestination.toLowerCase()}`);
    }
  };

  const handleGuestChange = (newValue: number) => {
    setGuests(Math.max(1, Math.min(10, newValue)));
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-2">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Destination Selector */}
        <div className="flex-1 relative">
          <div
            className="flex items-center border rounded-lg p-3 hover:border-blue-500 cursor-pointer"
            onClick={() => {
              setShowDestinations(!showDestinations);
              setShowGuestPicker(false);
            }}
          >
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Where to?"
              className="w-full outline-none text-gray-700 cursor-pointer"
              value={selectedDestination}
              readOnly
            />
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
          
          {/* Destinations Dropdown */}
          {showDestinations && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {destinations.map((destination) => (
                <div
                  key={destination.id}
                  className="p-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setSelectedDestination(destination.name);
                    setShowDestinations(false);
                  }}
                >
                  <div className="font-medium">{destination.name}</div>
                  <div className="text-sm text-gray-500">{destination.description}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Date Selector */}
        <div className="flex-1">
          <div className="flex items-center border rounded-lg p-3 hover:border-blue-500">
            <Calendar className="w-5 h-5 text-gray-400 mr-2" />
            <div className="flex gap-2 w-full">
              <input
                type="date"
                placeholder="Check in"
                className="w-1/2 outline-none text-gray-700"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
              <span className="text-gray-400">-</span>
              <input
                type="date"
                placeholder="Check out"
                className="w-1/2 outline-none text-gray-700"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </div>
        
        {/* Guest Selector */}
        <div className="flex-1 relative">
          <div
            className="flex items-center border rounded-lg p-3 hover:border-blue-500 cursor-pointer"
            onClick={() => {
              setShowGuestPicker(!showGuestPicker);
              setShowDestinations(false);
            }}
          >
            <Users className="w-5 h-5 text-gray-400 mr-2" />
            <span className="flex-1 text-gray-700">
              {guests} {guests === 1 ? 'Guest' : 'Guests'}
            </span>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>

          {/* Guest Picker Dropdown */}
          {showGuestPicker && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Guests</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleGuestChange(guests - 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-500"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{guests}</span>
                  <button
                    onClick={() => handleGuestChange(guests + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-500"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;