import React, { useState, Suspense } from 'react';
import { MapPin, Star, Compass, Mountain, Camera, Tent, Users, Coffee, Sunrise, Waves, Trees as Tree } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BackButton from '../../components/BackButton';
import PricingTable from '../../components/PricingTable';
import TanzaniaMap3D from '../../components/TanzaniaMap3D';
import CurrencyConverter from '../../components/CurrencyConverter';
import PayPalButton from '../../components/PayPalButton';

const tanzaniaDestinations = [
  {
    id: 1,
    name: 'Serengeti National Park',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
    description: 'Home to the Great Migration and incredible wildlife',
    rating: 4.9,
    highlights: ['Great Migration', 'Big Five Safari', 'Hot Air Balloon Safaris'],
    details: 'Witness millions of wildebeests, zebras, and gazelles migrating across the plains.',
    basePricePerDay: 500,
    activities: [
      { name: 'Game Drive Safari', price: 250 },
      { name: 'Hot Air Balloon Safari', price: 600 },
      { name: 'Walking Safari', price: 150 },
      { name: 'Night Game Drive', price: 200 }
    ]
  },
  {
    id: 2,
    name: 'Mount Kilimanjaro',
    image: 'https://images.unsplash.com/photo-1589553416260-110fb8524f82?auto=format&fit=crop&q=80&w=800',
    description: "Africa's highest peak, perfect for adventurous climbers",
    rating: 4.8,
    highlights: ['Uhuru Peak', 'Multiple Routes', 'Diverse Ecosystems'],
    details: 'Trek to Uhuru Peak and experience diverse ecosystems from rainforest to alpine desert.',
    basePricePerDay: 400,
    activities: [
      { name: 'Machame Route Trek', price: 2500 },
      { name: 'Equipment Rental', price: 200 },
      { name: 'Porter Service', price: 150 },
      { name: 'Mountain Guide', price: 300 }
    ]
  },
  {
    id: 3,
    name: 'Ngorongoro Crater',
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&q=80&w=800',
    description: 'A unique blend of wildlife, culture, and stunning landscapes',
    rating: 4.8,
    highlights: ['Crater Safari', 'Olduvai Gorge', 'Maasai Culture'],
    details: 'Explore the Ngorongoro Crater and visit Olduvai Gorge, known as the Cradle of Mankind.',
    basePricePerDay: 450,
    activities: [
      { name: 'Crater Game Drive', price: 300 },
      { name: 'Maasai Village Visit', price: 100 },
      { name: 'Olduvai Gorge Tour', price: 150 },
      { name: 'Photography Tour', price: 200 }
    ]
  },
  {
    id: 4,
    name: 'Tarangire National Park',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800',
    description: 'Famous for its elephant herds and ancient baobab trees',
    rating: 4.7,
    highlights: ['Elephant Herds', 'Ancient Baobabs', 'Bird Watching'],
    details: 'Spot elephants, lions, and various bird species among ancient baobab trees.',
    basePricePerDay: 350,
    activities: [
      { name: 'Game Drive', price: 200 },
      { name: 'Night Safari', price: 250 },
      { name: 'Bird Watching Tour', price: 150 },
      { name: 'Walking Safari', price: 180 }
    ]
  },
  {
    id: 5,
    name: 'Lake Manyara National Park',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
    description: 'Known for its tree-climbing lions and flamingos',
    rating: 4.7,
    highlights: ['Tree-Climbing Lions', 'Flamingos', 'Groundwater Forest'],
    details: 'Explore the lush groundwater forest and spot unique tree-climbing lions.',
    basePricePerDay: 300,
    activities: [
      { name: 'Game Drive', price: 180 },
      { name: 'Canopy Walk', price: 120 },
      { name: 'Bird Watching', price: 100 },
      { name: 'Mountain Bike Tour', price: 150 }
    ]
  },
  {
    id: 6,
    name: 'Mafia Island',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800',
    description: 'A hidden gem for diving and marine life',
    rating: 4.8,
    highlights: ['Scuba Diving', 'Whale Sharks', 'Marine Reserve'],
    details: 'Experience world-class diving and swim with whale sharks in season.',
    basePricePerDay: 250,
    activities: [
      { name: 'Scuba Diving', price: 150 },
      { name: 'Whale Shark Tour', price: 200 },
      { name: 'Snorkeling Trip', price: 80 },
      { name: 'Island Tour', price: 100 }
    ]
  },
  {
    id: 7,
    name: 'Arusha City',
    image: 'https://images.unsplash.com/photo-1589553416260-110fb8524f82?auto=format&fit=crop&q=80&w=800',
    description: 'Gateway to northern safari circuit and cultural hub',
    rating: 4.6,
    highlights: ['Cultural Tours', 'Local Markets', 'Coffee Plantations'],
    details: 'Explore vibrant markets, coffee plantations, and cultural heritage sites.',
    basePricePerDay: 200,
    activities: [
      { name: 'City Tour', price: 80 },
      { name: 'Coffee Farm Visit', price: 100 },
      { name: 'Cultural Workshop', price: 120 },
      { name: 'Market Tour', price: 50 }
    ]
  },
  {
    id: 8,
    name: 'Mikumi National Park',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800',
    description: 'Accessible wildlife viewing in southern Tanzania',
    rating: 4.6,
    highlights: ['Big Game', 'Bird Watching', 'Photography'],
    details: 'Easy access to wildlife viewing and photography opportunities.',
    basePricePerDay: 280,
    activities: [
      { name: 'Game Drive', price: 150 },
      { name: 'Photography Tour', price: 120 },
      { name: 'Bird Watching', price: 100 },
      { name: 'Camping Safari', price: 200 }
    ]
  },
  {
    id: 9,
    name: 'Ruaha National Park',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800',
    description: "Tanzania's largest park, offering remote and pristine safaris",
    rating: 4.8,
    highlights: ['Large Predators', 'Baobab Landscapes', 'Great Ruaha River'],
    details: 'Spot large predator populations and explore baobab-dotted landscapes.',
    basePricePerDay: 400,
    activities: [
      { name: 'Game Drive', price: 200 },
      { name: 'River Safari', price: 180 },
      { name: 'Walking Safari', price: 150 },
      { name: 'Fly Camping', price: 250 }
    ]
  }
];

const activityIcons = {
  'Safari': Compass,
  'Trekking': Mountain,
  'Photography': Camera,
  'Camping': Tent,
  'Cultural': Users,
  'Beach': Waves,
  'Nature': Tree,
  'Sunrise': Sunrise
};

export default function Tanzania() {
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
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2000)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Discover Tanzania</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Experience the wonders of Serengeti, Kilimanjaro, and incredible wildlife
            </p>
          </div>
        </div>
      </div>

      {/* 3D Map Section */}
      <div className="relative py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-25"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2000)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Explore Tanzania's Destinations
          </h2>
          <div className="w-64 h-64 mx-auto rounded-full overflow-hidden bg-gray-800 shadow-xl">
            <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Suspense fallback={null}>
                <TanzaniaMap3D />
                <OrbitControls enableZoom={false} />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Popular Destinations in Tanzania</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tanzaniaDestinations.map((destination) => (
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