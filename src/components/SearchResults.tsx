import React, { useState } from 'react';
import { Star, Filter, MapPin } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'hotel' | 'flight' | 'tour';
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  description: string;
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    type: 'hotel',
    name: 'Santorini Paradise Resort',
    location: 'Santorini, Greece',
    price: 299,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1496318447583-f524534e9ce1?auto=format&fit=crop&q=80&w=1200',
    description: 'Luxury resort with stunning caldera views and infinity pool'
  },
  {
    id: '2',
    type: 'hotel',
    name: 'Bali Beachfront Villa',
    location: 'Bali, Indonesia',
    price: 199,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200',
    description: 'Private villa with direct beach access and personal butler'
  },
  {
    id: '3',
    type: 'hotel',
    name: 'Maldives Water Villa',
    location: 'Maldives',
    price: 599,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=1200',
    description: 'Overwater villa with glass floor and private pool'
  }
];

export function SearchResults() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [rating, setRating] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Filters</h3>
          </div>
          
          {/* Price Range Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`p-1 rounded ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  <Star className="w-5 h-5 fill-current" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockResults.map((result) => (
              <div key={result.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={result.image}
                    alt={result.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-blue-500">
                    ${result.price}/night
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{result.name}</h3>
                  <div className="flex items-center gap-1 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{result.location}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{result.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{result.rating}</span>
                    </div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}