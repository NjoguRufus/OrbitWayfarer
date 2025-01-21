import React, { useState, Suspense } from 'react';
import { MapPin, Star, Sunrise, Fish, Camera, Anchor, Waves, Ship, Palmtree, Utensils } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BackButton from '../../components/BackButton';
import PricingTable from '../../components/PricingTable';
import CurrencyConverter from '../../components/CurrencyConverter';
import PayPalButton from '../../components/PayPalButton';

const maldivesLocations = [
  {
    id: 1,
    name: 'Male Atoll',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
    description: 'Capital island with vibrant culture and markets',
    rating: 4.7,
    highlights: ['Local Markets', 'Cultural Sites', 'Water Sports'],
    details: 'Experience the urban side of Maldives with local markets and culture.',
    basePricePerDay: 200,
    activities: [
      { name: 'City Tour', price: 50 },
      { name: 'Market Visit', price: 30 },
      { name: 'Cultural Show', price: 45 },
      { name: 'Local Food Tour', price: 60 }
    ]
  },
  {
    id: 2,
    name: 'Maafushi',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=800',
    description: 'Popular local island with guesthouses and water activities',
    rating: 4.8,
    highlights: ['Beach Activities', 'Water Sports', 'Local Life'],
    details: 'Perfect for budget travelers seeking authentic Maldivian experiences.',
    basePricePerDay: 150,
    activities: [
      { name: 'Snorkeling Trip', price: 40 },
      { name: 'Fishing Trip', price: 55 },
      { name: 'Island Hopping', price: 70 },
      { name: 'Beach BBQ', price: 45 }
    ]
  },
  {
    id: 3,
    name: 'Baa Atoll',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
    description: 'UNESCO Biosphere Reserve with marine life',
    rating: 4.9,
    highlights: ['Manta Rays', 'Coral Reefs', 'Luxury Resorts'],
    details: 'Swim with manta rays and experience world-class marine life.',
    basePricePerDay: 500,
    activities: [
      { name: 'Manta Ray Tour', price: 150 },
      { name: 'Scuba Diving', price: 120 },
      { name: 'Sunset Cruise', price: 80 },
      { name: 'Marine Biology Tour', price: 90 }
    ]
  },
  {
    id: 4,
    name: 'Ari Atoll',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=800',
    description: 'Famous for diving and luxury water villas',
    rating: 4.9,
    highlights: ['Whale Sharks', 'Water Villas', 'Diving'],
    details: 'Spot whale sharks and stay in stunning overwater villas.',
    basePricePerDay: 600,
    activities: [
      { name: 'Whale Shark Safari', price: 180 },
      { name: 'Luxury Spa Day', price: 150 },
      { name: 'Private Diving', price: 200 },
      { name: 'Romantic Dinner', price: 120 }
    ]
  }
];

const activityIcons = {
  'Diving': Fish,
  'Beach': Waves,
  'Boat': Ship,
  'Food': Utensils,
  'Nature': Palmtree,
  'Sunrise': Sunrise,
  'Photo': Camera,
  'Water': Anchor
};

export default function Maldives() {
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(0);

  const handleBooking = (price: number) => {
    setSelectedPrice(price);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    alert('Booking confirmed! Thank you for choosing OrbitWayfarer.');
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <BackButton />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=2000)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Discover Maldives</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Experience paradise on Earth with crystal clear waters and luxury resorts
            </p>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Explore Maldives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {maldivesLocations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-semibold">{destination.rating}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <p className="text-sm text-gray-500 mb-4">{destination.details}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">From</span>
                  <CurrencyConverter amount={destination.basePricePerDay} />
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
                
                <button
                  onClick={() => setSelectedDestination(selectedDestination === destination.id ? null : destination.id)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {selectedDestination === destination.id ? 'Hide Details' : 'View Details'}
                </button>

                {selectedDestination === destination.id && (
                  <div className="mt-6">
                    <PricingTable
                      basePricePerDay={destination.basePricePerDay}
                      activities={destination.activities}
                    />
                    <div className="mt-4">
                      <button
                        onClick={() => handleBooking(destination.basePricePerDay)}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                )}

                {showPayment && selectedDestination === destination.id && (
                  <div className="mt-4">
                    <PayPalButton
                      amount={selectedPrice}
                      currency="USD"
                      onSuccess={handlePaymentSuccess}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}