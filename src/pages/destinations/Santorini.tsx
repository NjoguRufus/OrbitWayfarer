import React, { useState, Suspense } from 'react';
import { MapPin, Star, Sun, Wine, Camera, Sunset, Utensils, Waves, Ship, Mountain } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BackButton from '../../components/BackButton';
import PricingTable from '../../components/PricingTable';
import CurrencyConverter from '../../components/CurrencyConverter';
import PayPalButton from '../../components/PayPalButton';

const santoriniLocations = [
  {
    id: 1,
    name: 'Oia',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800',
    description: 'Famous for its stunning sunsets and blue-domed churches',
    rating: 4.9,
    highlights: ['Sunset Views', 'Blue Domes', 'Luxury Hotels'],
    details: 'Experience the most photographed location in Greece with its iconic white architecture and breathtaking caldera views.',
    basePricePerDay: 300,
    activities: [
      { name: 'Sunset Photography Tour', price: 120 },
      { name: 'Wine Tasting', price: 80 },
      { name: 'Private Village Tour', price: 150 },
      { name: 'Cooking Class', price: 100 }
    ]
  },
  {
    id: 2,
    name: 'Fira',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800',
    description: 'The vibrant capital of Santorini with amazing nightlife',
    rating: 4.8,
    highlights: ['Shopping', 'Nightlife', 'Restaurants'],
    details: 'Explore the bustling capital with its numerous shops, restaurants, and entertainment venues.',
    basePricePerDay: 250,
    activities: [
      { name: 'Food & Wine Tour', price: 90 },
      { name: 'Cable Car Ride', price: 30 },
      { name: 'Night Tour', price: 70 },
      { name: 'Art Gallery Visit', price: 40 }
    ]
  },
  {
    id: 3,
    name: 'Red Beach',
    image: 'https://images.unsplash.com/photo-1504512485720-7d83a16ee930?auto=format&fit=crop&q=80&w=800',
    description: 'Unique red cliffs and crystal clear waters',
    rating: 4.7,
    highlights: ['Red Cliffs', 'Swimming', 'Snorkeling'],
    details: 'Visit this stunning beach known for its red volcanic cliffs and pristine waters.',
    basePricePerDay: 200,
    activities: [
      { name: 'Beach Day Pass', price: 50 },
      { name: 'Snorkeling Tour', price: 70 },
      { name: 'Sunset Kayaking', price: 90 },
      { name: 'Photography Tour', price: 80 }
    ]
  },
  {
    id: 4,
    name: 'Akrotiri Archaeological Site',
    image: 'https://images.unsplash.com/photo-1602611500096-76c6377d7a84?auto=format&fit=crop&q=80&w=800',
    description: 'Ancient Minoan settlement preserved by volcanic ash',
    rating: 4.8,
    highlights: ['Ancient Ruins', 'History', 'Guided Tours'],
    details: 'Discover the preserved ruins of an ancient civilization, often called the "Pompeii of the Aegean."',
    basePricePerDay: 180,
    activities: [
      { name: 'Guided Archaeological Tour', price: 60 },
      { name: 'Private Historian Guide', price: 120 },
      { name: 'Photography Workshop', price: 80 },
      { name: 'Historical Lecture', price: 40 }
    ]
  }
];

const activityIcons = {
  'Sunset': Sunset,
  'Wine': Wine,
  'Photography': Camera,
  'Food': Utensils,
  'Beach': Waves,
  'Boat': Ship,
  'Hiking': Mountain,
  'Weather': Sun
};

export default function Santorini() {
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
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=2000)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Discover Santorini</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Experience the magic of white-washed buildings, stunning sunsets, and Mediterranean charm
            </p>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Explore Santorini</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {santoriniLocations.map((destination) => (
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