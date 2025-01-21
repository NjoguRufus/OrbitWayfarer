import React from 'react';
import { Calendar, Clock, Users, DollarSign, Star } from 'lucide-react';

const tours = [
  {
    id: 1,
    name: 'African Safari Adventure',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
    duration: '7 Days',
    groupSize: '4-12',
    price: 2499,
    rating: 4.9,
    description: 'Experience the thrill of African wildlife in their natural habitat',
  },
  {
    id: 2,
    name: 'Greek Islands Cruise',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800',
    duration: '10 Days',
    groupSize: '2-20',
    price: 1999,
    rating: 4.8,
    description: 'Sail through the stunning Greek islands and discover ancient history',
  },
  {
    id: 3,
    name: 'Bali Cultural Experience',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    duration: '5 Days',
    groupSize: '2-8',
    price: 1299,
    rating: 4.7,
    description: 'Immerse yourself in Balinese culture and traditions',
  },
  {
    id: 4,
    name: 'Maldives Island Hopping',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
    duration: '8 Days',
    groupSize: '2-10',
    price: 2999,
    rating: 4.9,
    description: 'Explore multiple islands in the Maldives paradise',
  },
  {
    id: 5,
    name: 'Rwanda Gorilla Trek',
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&q=80&w=800',
    duration: '4 Days',
    groupSize: '2-8',
    price: 3499,
    rating: 4.9,
    description: 'Trek through rainforests to encounter mountain gorillas',
  },
  {
    id: 6,
    name: 'Tanzania Migration Safari',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
    duration: '6 Days',
    groupSize: '4-10',
    price: 2799,
    rating: 4.8,
    description: 'Witness the Great Migration in Serengeti',
  },
];

const ToursPage = () => {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Featured Tours</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Curated experiences for unforgettable adventures
            </p>
          </div>
        </div>
      </div>

      {/* Tours Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-semibold">{tour.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{tour.name}</h3>
                  <p className="text-gray-600 mb-4">{tour.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{tour.groupSize} people</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Available</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>From ${tour.price}</span>
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToursPage;