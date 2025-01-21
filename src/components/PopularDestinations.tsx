import React from 'react';

const destinations = [
  {
    id: 1,
    name: 'Santorini, Greece',
    price: 'From $899',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: 2,
    name: 'Bali, Indonesia',
    price: 'From $799',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: 3,
    name: 'Maldives',
    price: 'From $1,299',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800&h=600'
  }
];

export function PopularDestinations() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8">Popular Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((destination) => (
          <div key={destination.id} className="group relative overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-105">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-xl font-semibold text-white mb-2">{destination.name}</h3>
              <p className="text-blue-300 font-medium">{destination.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}