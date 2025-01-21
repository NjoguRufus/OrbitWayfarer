import React, { useState, Suspense } from 'react';
import { MapPin, Star, Sunrise, Palmtree, Camera, BookTemplate as Temple, Waves, Mountain, Coffee, Utensils } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BackButton from '../../components/BackButton';
import PricingTable from '../../components/PricingTable';
import CurrencyConverter from '../../components/CurrencyConverter';
import PayPalButton from '../../components/PayPalButton';

const baliLocations = [
  {
    id: 1,
    name: 'Ubud',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    description: 'Cultural heart of Bali with rice terraces and temples',
    rating: 4.9,
    highlights: ['Rice Terraces', 'Monkey Forest', 'Art Galleries'],
    details: 'Immerse yourself in Balinese culture, art, and stunning natural landscapes.',
    basePricePerDay: 150,
    activities: [
      { name: 'Rice Terrace Tour', price: 45 },
      { name: 'Temple Visit', price: 35 },
      { name: 'Art Workshop', price: 60 },
      { name: 'Cooking Class', price: 50 }
    ]
  },
  {
    id: 2,
    name: 'Seminyak',
    image: 'https://images.unsplash.com/photo-1559628376-f3fe5f782a2a?auto=format&fit=crop&q=80&w=800',
    description: 'Trendy beach resort area with luxury hotels',
    rating: 4.8,
    highlights: ['Beach Clubs', 'Sunset Views', 'Shopping'],
    details: 'Experience luxury beach life with high-end dining and shopping.',
    basePricePerDay: 200,
    activities: [
      { name: 'Beach Club Day Pass', price: 70 },
      { name: 'Spa Treatment', price: 90 },
      { name: 'Sunset Dinner', price: 60 },
      { name: 'Shopping Tour', price: 40 }
    ]
  },
  {
    id: 3,
    name: 'Uluwatu',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    description: 'Clifftop temples and world-class surfing',
    rating: 4.8,
    highlights: ['Temple', 'Surfing', 'Sunset Views'],
    details: 'Visit the iconic temple and catch world-class waves.',
    basePricePerDay: 180,
    activities: [
      { name: 'Temple Tour', price: 40 },
      { name: 'Surf Lesson', price: 80 },
      { name: 'Fire Dance Show', price: 50 },
      { name: 'Cliff Jump Experience', price: 60 }
    ]
  },
  {
    id: 4,
    name: 'Nusa Penida',
    image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&q=80&w=800',
    description: 'Dramatic coastlines and pristine beaches',
    rating: 4.7,
    highlights: ['Kelingking Beach', 'Snorkeling', 'Island Tours'],
    details: 'Explore stunning beaches and underwater wonders.',
    basePricePerDay: 160,
    activities: [
      { name: 'Island Tour', price: 65 },
      { name: 'Snorkeling Trip', price: 55 },
      { name: 'Photography Tour', price: 75 },
      { name: 'Beach Hopping', price: 50 }
    ]
  }
];

const activityIcons = {
  'Temple': Temple,
  'Beach': Waves,
  'Mountain': Mountain,
  'Food': Utensils,
  'Coffee': Coffee,
  'Nature': Palmtree,
  'Sunrise': Sunrise,
  'Photo': Camera
};

export default function Bali() {
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
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=2000)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Discover Bali</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Experience the Island of Gods with its temples, beaches, and rich culture
            </p>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Explore Bali</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {baliLocations.map((destination) => (
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