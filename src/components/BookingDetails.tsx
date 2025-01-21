import React, { useState } from 'react';
import { Calendar, Users, Star, MapPin, Wifi, Coffee, Car, Tv, School as Pool } from 'lucide-react';

const mockProperty = {
  id: '1',
  name: 'Santorini Paradise Resort',
  location: 'Santorini, Greece',
  price: 299,
  rating: 4.8,
  reviewCount: 128,
  description: 'Perched on the cliffs of Santorini, this luxury resort offers breathtaking views of the Aegean Sea. Featuring an infinity pool, spa, and world-class dining, it\'s the perfect retreat for those seeking both relaxation and adventure.',
  images: [
    'https://images.unsplash.com/photo-1496318447583-f524534e9ce1?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200',
  ],
  amenities: ['Free WiFi', 'Breakfast', 'Parking', 'TV', 'Pool'],
  reviews: [
    {
      id: 1,
      user: 'Sarah M.',
      rating: 5,
      date: '2024-02-15',
      comment: 'Absolutely stunning views and impeccable service. The infinity pool is breathtaking!',
    },
    {
      id: 2,
      user: 'James R.',
      rating: 4,
      date: '2024-02-10',
      comment: 'Great location and beautiful property. The breakfast was amazing.',
    }
  ]
};

const amenityIcons = {
  'Free WiFi': Wifi,
  'Breakfast': Coffee,
  'Parking': Car,
  'TV': Tv,
  'Pool': Pool,
} as const;

export function BookingDetails() {
  const [selectedDates, setSelectedDates] = useState({ checkIn: '', checkOut: '' });
  const [guests, setGuests] = useState(2);
  const [selectedImage, setSelectedImage] = useState(0);

  const calculateTotal = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return 0;
    const start = new Date(selectedDates.checkIn);
    const end = new Date(selectedDates.checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return mockProperty.price * nights;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Property Details */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="mb-8">
            <div className="relative h-[400px] rounded-lg overflow-hidden mb-4">
              <img
                src={mockProperty.images[selectedImage]}
                alt={mockProperty.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {mockProperty.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative rounded-lg overflow-hidden h-24 ${
                    selectedImage === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Property Info */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{mockProperty.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{mockProperty.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-medium">{mockProperty.rating}</span>
                <span className="text-gray-600">({mockProperty.reviewCount} reviews)</span>
              </div>
            </div>
            <p className="text-gray-600 mb-6">{mockProperty.description}</p>

            {/* Amenities */}
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {mockProperty.amenities.map((amenity) => {
                const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                return (
                  <div key={amenity} className="flex items-center gap-2">
                    {Icon && <Icon className="w-5 h-5 text-blue-500" />}
                    <span>{amenity}</span>
                  </div>
                );
              })}
            </div>

            {/* Reviews */}
            <h2 className="text-xl font-semibold mb-4">Guest Reviews</h2>
            <div className="space-y-4">
              {mockProperty.reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{review.user}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Booking Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
            <div className="text-2xl font-bold mb-6">
              ${mockProperty.price}
              <span className="text-base font-normal text-gray-600">/night</span>
            </div>

            {/* Date Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-in / Check-out
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={selectedDates.checkIn}
                  onChange={(e) => setSelectedDates({ ...selectedDates, checkIn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="date"
                  value={selectedDates.checkOut}
                  onChange={(e) => setSelectedDates({ ...selectedDates, checkOut: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Guests Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Guests
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="px-3 py-1 border border-gray-300 rounded-lg"
                >
                  -
                </button>
                <span className="font-medium">{guests}</span>
                <button
                  onClick={() => setGuests(Math.min(10, guests + 1))}
                  className="px-3 py-1 border border-gray-300 rounded-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between mb-2">
                <span>Total</span>
                <span className="font-bold">${calculateTotal()}</span>
              </div>
              <p className="text-sm text-gray-500">Includes taxes and fees</p>
            </div>

            {/* Book Now Button */}
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}