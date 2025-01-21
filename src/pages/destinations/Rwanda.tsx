import React, { useState } from 'react';
import { MapPin, Star, Compass, Mountain, Camera, Tent, Users, Coffee } from 'lucide-react';
import BackButton from '../../components/BackButton';
import PricingTable from '../../components/PricingTable';

const rwandaDestinations = [
  {
    id: 1,
    name: 'Volcanoes National Park',
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&q=80&w=800',
    description: 'A haven for mountain gorillas and golden monkeys',
    rating: 4.9,
    highlights: ['Gorilla Trekking', 'Dian Fossey Tomb', 'Mount Bisoke'],
    details: "Experience gorilla trekking, visit Dian Fossey's tomb, and hike Mount Bisoke with its stunning crater lake.",
    basePricePerDay: 250,
    activities: [
      { name: 'Gorilla Trekking Permit', price: 1500 },
      { name: 'Golden Monkey Tracking', price: 100 },
      { name: 'Guided Volcano Hike', price: 75 },
      { name: 'Cultural Village Visit', price: 50 }
    ]
  },
  {
    id: 2,
    name: 'Nyungwe Forest National Park',
    image: 'https://images.unsplash.com/photo-1584647864705-cfdd72e9e1d7?auto=format&fit=crop&q=80&w=800',
    description: "One of Africa's oldest rainforests, filled with biodiversity",
    rating: 4.8,
    highlights: ['Canopy Walkway', 'Chimpanzee Trekking', 'Waterfall Trails'],
    details: 'Experience canopy walks, go chimpanzee trekking, and discover waterfalls and rare flora.',
    basePricePerDay: 200,
    activities: [
      { name: 'Chimpanzee Trekking', price: 90 },
      { name: 'Canopy Walkway Tour', price: 60 },
      { name: 'Guided Nature Walk', price: 40 },
      { name: 'Bird Watching Tour', price: 50 }
    ]
  },
  // ... (previous destinations with added pricing)
];

const activityIcons = {
  'Gorilla Trekking': Mountain,
  'Photography Tour': Camera,
  'Camping': Tent,
  'Cultural Tour': Users,
  'Coffee Experience': Coffee,
  'Guided Tour': Compass
};

export default function Rwanda() {
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <BackButton />
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&q=80&w=2000)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Discover Rwanda</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Experience the Land of a Thousand Hills, from mountain gorillas to vibrant culture
            </p>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Popular Destinations in Rwanda</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rwandaDestinations.map((destination) => (
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
                  {selectedDestination === destination.id ? 'Hide Pricing' : 'View Pricing'}
                </button>

                {selectedDestination === destination.id && (
                  <div className="mt-6">
                    <PricingTable
                      basePricePerDay={destination.basePricePerDay}
                      activities={destination.activities}
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