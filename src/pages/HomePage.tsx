import React from 'react';
import { Globe, Search, MapPin, Star, ChevronRight, Users, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import DestinationCard from '../components/DestinationCard';
import EarthScene from '../components/EarthScene';

const destinations = [
  {
    id: 1,
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800',
    price: 1299,
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    price: 899,
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
    price: 1599,
    rating: 4.9,
  },
];

const africaDestinations = [
  {
    id: 'kenya',
    name: 'Kenya',
    image: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&q=80&w=800',
    description: 'Experience the magic of safaris, pristine beaches, and vibrant culture',
    highlights: ['Maasai Mara', 'Amboseli', 'Diani Beach'],
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
    description: 'Discover Serengeti, Kilimanjaro, and incredible wildlife',
    highlights: ['Serengeti', 'Mount Kilimanjaro', 'Ngorongoro'],
  },
  {
    id: 'zanzibar',
    name: 'Zanzibar',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80&w=800',
    description: 'Explore pristine beaches, historic Stone Town, and spice plantations',
    highlights: ['Stone Town', 'Nungwi Beach', 'Spice Tours'],
  },
  {
    id: 'rwanda',
    name: 'Rwanda',
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&q=80&w=800',
    description: 'Experience gorilla trekking, rainforests, and vibrant culture',
    highlights: ['Volcanoes National Park', 'Nyungwe Forest', 'Lake Kivu'],
  },
];

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen bg-cover bg-center" 
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-white pt-20">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-center">
            Discover Your Next Adventure
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-12 text-center max-w-3xl">
            Explore the world's most breathtaking destinations with OrbitWayfarer
          </p>
          <SearchBar />
        </div>
      </div>

      {/* Interactive Globe and About Us Section */}
      <section className="py-12 sm:py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Earth Container */}
            <div className="lg:w-1/2">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-800">
                <EarthScene />
              </div>
            </div>

            {/* About Us Section */}
            <div className="lg:w-1/2 flex flex-col justify-center text-white">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
                About OrbitWayfarer
              </h2>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <Globe className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Global Experience</h3>
                    <p className="text-gray-300">
                      With over a decade of experience, we've helped thousands of travelers explore the world's most remarkable destinations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
                    <p className="text-gray-300">
                      Our network of local experts ensures authentic experiences and insider knowledge of every destination.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <Award className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Award-Winning Service</h3>
                    <p className="text-gray-300">
                      Recognized for excellence in travel services and customer satisfaction across the industry.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                    <p className="text-gray-300">
                      Round-the-clock assistance ensures peace of mind throughout your journey, wherever you are.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Africa Destinations */}
      <section className="py-12 sm:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Explore Africa
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {africaDestinations.map((destination) => (
              <Link to={`/destinations/${destination.id}`} key={destination.id} className="group">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="relative h-48 sm:h-64">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-30" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2">{destination.name}</h3>
                      <p className="text-sm mb-3 line-clamp-2">{destination.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {destination.highlights.map((highlight) => (
                          <span key={highlight} className="px-2 sm:px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs sm:text-sm">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-12 sm:py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Popular Destinations
            </h2>
            <button className="flex items-center text-blue-600 hover:text-blue-700">
              <span className="hidden sm:inline">View all</span> <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} {...destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-16 text-gray-900">
            Why Choose OrbitWayfarer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Global Coverage</h3>
              <p className="text-gray-600">Access to thousands of destinations worldwide</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Star className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Best Prices</h3>
              <p className="text-gray-600">Guaranteed best rates and exclusive deals</p>
            </div>
            <div className="text-center sm:col-span-2 md:col-span-1">
              <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Local Expertise</h3>
              <p className="text-gray-600">Curated experiences by local experts</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;