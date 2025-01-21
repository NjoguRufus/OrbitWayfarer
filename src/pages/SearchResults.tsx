import React, { useState } from 'react';
import { Sliders, MapPin, Star } from 'lucide-react';

const mockResults = [
  {
    id: 1,
    name: 'Luxury Beach Resort',
    location: 'Maldives',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
    price: 299,
    rating: 4.8,
    amenities: ['Pool', 'Spa', 'Beach Access', 'Free WiFi'],
  },
  {
    id: 2,
    name: 'Mountain View Lodge',
    location: 'Swiss Alps',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800',
    price: 199,
    rating: 4.6,
    amenities: ['Skiing', 'Restaurant', 'Parking', 'WiFi'],
  },
  {
    id: 3,
    name: 'City Center Hotel',
    location: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=800',
    price: 159,
    rating: 4.5,
    amenities: ['Restaurant', 'Bar', 'Gym', 'WiFi'],
  },
];

function SearchResults() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="w-full md:w-64 bg-white p-6 rounded-lg shadow-sm h-fit">
            <div className="flex items-center gap-2 mb-6">
              <Sliders className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="flex flex-col gap-2">
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

            <div>
              <h3 className="font-medium mb-3">Amenities</h3>
              <div className="space-y-2">
                {['Pool', 'Spa', 'WiFi', 'Restaurant', 'Gym'].map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAmenities([...selectedAmenities, amenity]);
                        } else {
                          setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                        }
                      }}
                      className="rounded text-blue-600"
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="grid gap-6">
              {mockResults.map((result) => (
                <div key={result.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-64 h-48 md:h-auto">
                      <img
                        src={result.image}
                        alt={result.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{result.name}</h3>
                          <div className="flex items-center text-gray-600 mb-4">
                            <MapPin className="w-4 h-4 mr-1" />
                            {result.location}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            ${result.price}
                            <span className="text-sm font-normal text-gray-600">/night</span>
                          </div>
                          <div className="flex items-center mt-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-gray-600">{result.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {result.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                      <button className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
    </div>
  );
}

export default SearchResults;