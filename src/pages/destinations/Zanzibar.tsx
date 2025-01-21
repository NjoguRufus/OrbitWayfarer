import React, { useState, Suspense } from 'react';
import { MapPin, Star, Anchor, Sunrise, Camera, Compass, Fish, Palmtree as Palm, Ship, Waves } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BackButton from '../../components/BackButton';
import PricingTable from '../../components/PricingTable';
import ZanzibarMap3D from '../../components/ZanzibarMap3D';
import CurrencyConverter from '../../components/CurrencyConverter';
import PayPalButton from '../../components/PayPalButton';

const zanzibarDestinations = [
  {
    id: 1,
    name: 'Stone Town',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80&w=800',
    description: 'UNESCO World Heritage Site with rich history and culture',
    rating: 4.8,
    highlights: ['Historic Architecture', 'Spice Markets', 'Cultural Tours'],
    details: 'Wander through narrow streets, visit the House of Wonders, and explore bustling markets.',
    basePricePerDay: 200,
    activities: [
      { name: 'Historical Walking Tour', price: 50 },
      { name: 'Spice Tour', price: 40 },
      { name: 'Sunset Dhow Cruise', price: 60 },
      { name: 'Cooking Class', price: 75 }
    ]
  },
  {
    id: 2,
    name: 'Nungwi Beach',
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=800',
    description: "One of Zanzibar's most famous beaches with clear turquoise waters",
    rating: 4.9,
    highlights: ['Sunset Cruises', 'Water Sports', 'Beach Parties'],
    details: 'Enjoy vibrant nightlife, beach parties, and various water activities.',
    basePricePerDay: 250,
    activities: [
      { name: 'Sunset Cruise', price: 70 },
      { name: 'Scuba Diving', price: 120 },
      { name: 'Snorkeling Trip', price: 50 },
      { name: 'Beach BBQ', price: 45 }
    ]
  },
  {
    id: 3,
    name: 'Kendwa Beach',
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=800',
    description: 'Pristine beach known for its full moon parties and calm waters',
    rating: 4.8,
    highlights: ['Full Moon Parties', 'Swimming', 'Beach Activities'],
    details: 'Experience legendary full moon parties and enjoy year-round swimming.',
    basePricePerDay: 230,
    activities: [
      { name: 'Full Moon Party', price: 40 },
      { name: 'Kayaking', price: 35 },
      { name: 'Beach Yoga', price: 25 },
      { name: 'Sunset Massage', price: 50 }
    ]
  },
  {
    id: 4,
    name: 'Jozani Forest',
    image: 'https://images.unsplash.com/photo-1584647864705-cfdd72e9e1d7?auto=format&fit=crop&q=80&w=800',
    description: 'Home to the rare Zanzibar red colobus monkeys',
    rating: 4.7,
    highlights: ['Red Colobus Monkeys', 'Mangrove Forest', 'Nature Walks'],
    details: 'Walk through lush mangrove forests and spot unique wildlife and birds.',
    basePricePerDay: 150,
    activities: [
      { name: 'Guided Forest Tour', price: 40 },
      { name: 'Mangrove Walk', price: 30 },
      { name: 'Photography Tour', price: 45 },
      { name: 'Bird Watching', price: 35 }
    ]
  },
  {
    id: 5,
    name: 'Mnemba Atoll',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800',
    description: 'Private island paradise with world-class diving and snorkeling',
    rating: 4.9,
    highlights: ['Diving', 'Snorkeling', 'Marine Life'],
    details: 'Discover pristine coral reefs and abundant marine life in crystal clear waters.',
    basePricePerDay: 400,
    activities: [
      { name: 'Scuba Diving', price: 150 },
      { name: 'Snorkeling Trip', price: 80 },
      { name: 'Private Beach Visit', price: 200 },
      { name: 'Sunset Sailing', price: 120 }
    ]
  },
  {
    id: 6,
    name: 'Paje Beach',
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=800',
    description: 'A paradise for kite surfers and beach lovers',
    rating: 4.8,
    highlights: ['Kitesurfing', 'Beach Cafes', 'Local Culture'],
    details: 'Take kitesurfing lessons and explore local villages to learn Swahili culture.',
    basePricePerDay: 180,
    activities: [
      { name: 'Kitesurfing Lesson', price: 90 },
      { name: 'Village Tour', price: 35 },
      { name: 'Beach Yoga', price: 25 },
      { name: 'Local Cooking Class', price: 45 }
    ]
  },
  {
    id: 7,
    name: 'Prison Island',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80&w=800',
    description: 'A small island with historical significance and giant tortoises',
    rating: 4.6,
    highlights: ['Giant Tortoises', 'Prison Ruins', 'Snorkeling'],
    details: 'Visit the old prison ruins and interact with Aldabra giant tortoises.',
    basePricePerDay: 160,
    activities: [
      { name: 'Island Tour', price: 45 },
      { name: 'Snorkeling Trip', price: 40 },
      { name: 'Tortoise Experience', price: 30 },
      { name: 'Historical Tour', price: 35 }
    ]
  },
  {
    id: 8,
    name: 'Kizimkazi',
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=800',
    description: 'Famous for dolphin watching and historical mosque',
    rating: 4.7,
    highlights: ['Dolphin Watching', 'Historic Mosque', 'Fishing'],
    details: 'Experience early morning dolphin tours and visit the historic Kizimkazi Mosque.',
    basePricePerDay: 170,
    activities: [
      { name: 'Dolphin Tour', price: 60 },
      { name: 'Fishing Trip', price: 80 },
      { name: 'Mosque Visit', price: 20 },
      { name: 'Sunset Boat Trip', price: 45 }
    ]
  }
];

const activityIcons = {
  'Diving': Fish,
  'Snorkeling': Waves,
  'Beach': Palm,
  'Cruise': Ship,
  'Tour': Compass,
  'Photography': Camera,
  'Sunrise': Sunrise,
  'Historical': Anchor
};

export default function Zanzibar() {
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
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80&w=2000)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Discover Zanzibar</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Experience the magic of pristine beaches, historic Stone Town, and spice plantations
            </p>
          </div>
        </div>
      </div>

      {/* 3D Map Section */}
      <div className="relative py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-25"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=2000)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="w-64 h-64 mx-auto rounded-full overflow-hidden bg-gray-800 shadow-xl">
            <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Suspense fallback={null}>
                <ZanzibarMap3D />
                <OrbitControls enableZoom={false} />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Popular Destinations in Zanzibar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {zanzibarDestinations.map((destination) => (
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