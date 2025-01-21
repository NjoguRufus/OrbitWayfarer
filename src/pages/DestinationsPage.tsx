import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';

const destinations = [
  {
    id: 'kenya',
    name: 'Kenya',
    image: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&q=80&w=800',
    description: 'Experience the magic of safaris, pristine beaches, and vibrant culture',
    rating: 4.9,
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
    description: 'Discover Serengeti, Kilimanjaro, and incredible wildlife',
    rating: 4.8,
  },
  {
    id: 'zanzibar',
    name: 'Zanzibar',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80&w=800',
    description: 'Explore pristine beaches, historic Stone Town, and spice plantations',
    rating: 4.7,
  },
  {
    id: 'rwanda',
    name: 'Rwanda',
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&q=80&w=800',
    description: 'Experience gorilla trekking, rainforests, and vibrant culture',
    rating: 4.8,
  },
  {
    id: 'santorini',
    name: 'Santorini',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800',
    description: 'Discover white-washed buildings and stunning sunsets',
    rating: 4.9,
  },
  {
    id: 'bali',
    name: 'Bali',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    description: 'Experience tropical paradise and rich cultural heritage',
    rating: 4.8,
  },
  {
    id: 'maldives',
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
    description: 'Enjoy crystal clear waters and luxury overwater villas',
    rating: 4.9,
  },
];

const DestinationsPage = () => {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Destinations</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Discover the world's most breathtaking locations
            </p>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <Link
                key={destination.id}
                to={`/destinations/${destination.id}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="relative h-64">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover"
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
                    <div className="flex items-center text-blue-600">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>Explore {destination.name}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationsPage;