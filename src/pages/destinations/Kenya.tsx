import React, { useState, Suspense } from 'react';
import { MapPin, Star, Compass, Mountain, Camera, Tent, Users, Coffee, Sunrise, Waves, Trees as Tree } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BackButton from '../../components/BackButton';
import PricingTable from '../../components/PricingTable';
import KenyaMap3D from '../../components/KenyaMap3D';
import CurrencyConverter from '../../components/CurrencyConverter';
import PayPalButton from '../../components/PayPalButton';

const kenyaDestinations = [
  {
    id: 1,
    name: 'Maasai Mara National Reserve',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800',
    description: 'Famous for the Great Migration, big cats, and vibrant Maasai culture',
    rating: 4.9,
    highlights: ['Great Migration', 'Hot Air Balloon Safaris', 'Big Five Safari'],
    details: 'Witness millions of wildebeests crossing the Mara River and enjoy hot air balloon safaris.',
    basePricePerDay: 350,
    activities: [
      { name: 'Game Drive Safari', price: 150 },
      { name: 'Hot Air Balloon Safari', price: 450 },
      { name: 'Maasai Village Visit', price: 50 },
      { name: 'Night Game Drive', price: 120 }
    ]
  },
  {
    id: 2,
    name: 'Amboseli National Park',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800',
    description: 'Stunning views of Mount Kilimanjaro and large herds of elephants',
    rating: 4.8,
    highlights: ['Elephant Herds', 'Mt. Kilimanjaro Views', 'Observation Hill'],
    details: 'Get up close with elephant herds and enjoy panoramic views from Observation Hill.',
    basePricePerDay: 250,
    activities: [
      { name: 'Elephant Tracking', price: 100 },
      { name: 'Photography Tour', price: 80 },
      { name: 'Cultural Visit', price: 45 },
      { name: 'Bird Watching', price: 60 }
    ]
  },
  {
    id: 3,
    name: 'Mount Kenya',
    image: 'https://images.unsplash.com/photo-1492720488624-2c8cd3564b89?auto=format&fit=crop&q=80&w=800',
    description: "Africa's second-highest mountain, perfect for hiking and climbing",
    rating: 4.8,
    highlights: ['Point Lenana Trek', 'Alpine Vegetation', 'Stunning Views'],
    details: 'Trek to Point Lenana for breathtaking views and experience unique alpine vegetation.',
    basePricePerDay: 200,
    activities: [
      { name: 'Guided Trek', price: 150 },
      { name: 'Equipment Rental', price: 75 },
      { name: 'Mountain Camping', price: 100 },
      { name: 'Wildlife Tour', price: 80 }
    ]
  },
  {
    id: 4,
    name: 'Diani Beach',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800',
    description: 'White sandy beaches and turquoise waters ideal for relaxation and water sports',
    rating: 4.7,
    highlights: ['Snorkeling', 'Kite Surfing', 'Camel Rides'],
    details: 'Enjoy snorkeling at Kisite Mpunguti Marine Park and kite surfing along the shore.',
    basePricePerDay: 180,
    activities: [
      { name: 'Snorkeling Trip', price: 70 },
      { name: 'Kite Surfing Lesson', price: 120 },
      { name: 'Dolphin Watching', price: 90 },
      { name: 'Sunset Dhow Cruise', price: 60 }
    ]
  },
  {
    id: 5,
    name: 'Tsavo National Park',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800',
    description: 'The largest national park in Kenya, home to diverse wildlife',
    rating: 4.7,
    highlights: ['Red Elephants', 'Mzima Springs', 'Volcanic Landscapes'],
    details: 'Explore both Tsavo East and West, known for unique red elephants and diverse landscapes.',
    basePricePerDay: 280,
    activities: [
      { name: 'Full-Day Safari', price: 140 },
      { name: 'Mzima Springs Tour', price: 60 },
      { name: 'Camping Adventure', price: 100 },
      { name: 'Guided Nature Walk', price: 50 }
    ]
  },
  {
    id: 6,
    name: 'Lake Naivasha',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
    description: 'Freshwater lake with rich birdlife and nearby Crescent Island',
    rating: 4.6,
    highlights: ['Boat Safaris', 'Crescent Island', 'Bird Watching'],
    details: 'Take boat rides to spot hippos and enjoy walking safaris on Crescent Island.',
    basePricePerDay: 150,
    activities: [
      { name: 'Boat Safari', price: 60 },
      { name: 'Crescent Island Tour', price: 45 },
      { name: 'Cycling Tour', price: 40 },
      { name: 'Bird Watching Guide', price: 50 }
    ]
  },
  {
    id: 7,
    name: 'Lamu Island',
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=800',
    description: 'UNESCO World Heritage site with rich Swahili culture',
    rating: 4.7,
    highlights: ['Old Town', 'Dhow Cruises', 'Swahili Architecture'],
    details: 'Experience the charm of car-free streets and traditional Swahili architecture.',
    basePricePerDay: 200,
    activities: [
      { name: 'Old Town Tour', price: 50 },
      { name: 'Dhow Sunset Cruise', price: 80 },
      { name: 'Cooking Class', price: 60 },
      { name: 'Island Hopping', price: 100 }
    ]
  },
  {
    id: 8,
    name: 'Samburu National Reserve',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800',
    description: 'Unique wildlife and less crowded safari experience',
    rating: 4.8,
    highlights: ['Special Five', 'Cultural Visits', 'Bird Watching'],
    details: "See unique species like Grevy's zebra and reticulated giraffe.",
    basePricePerDay: 280,
    activities: [
      { name: 'Game Drive', price: 120 },
      { name: 'Samburu Village Visit', price: 50 },
      { name: 'Bush Breakfast', price: 80 },
      { name: 'Night Safari', price: 150 }
    ]
  },
  {
    id: 9,
    name: "Hell's Gate National Park",
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
    description: 'Dramatic landscapes and cycling adventures',
    rating: 4.6,
    highlights: ['Cycling', 'Rock Climbing', 'Geothermal Spa'],
    details: 'Cycle among wildlife and climb dramatic cliffs in this unique park.',
    basePricePerDay: 160,
    activities: [
      { name: 'Bike Rental & Guide', price: 40 },
      { name: 'Rock Climbing', price: 70 },
      { name: 'Geothermal Spa Visit', price: 50 },
      { name: 'Hiking Guide', price: 45 }
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

export default function Kenya() {
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
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&q=80&w=2000)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Discover Kenya</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Experience the magic of safaris, pristine beaches, and vibrant culture
            </p>
          </div>
        </div>
      </div>

      {/* 3D Map Section */}
      <div className="relative py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-25"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=2000)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="w-64 h-64 mx-auto rounded-full overflow-hidden bg-gray-800 shadow-xl">
            <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Suspense fallback={null}>
                <KenyaMap3D />
                <OrbitControls enableZoom={false} />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Popular Destinations in Kenya</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {kenyaDestinations.map((destination) => (
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