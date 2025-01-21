import React, { useState } from 'react';
import { Calendar, Users, Star, MapPin, Wifi, School as Pool, Coffee, Dumbbell } from 'lucide-react';

const mockHotel = {
  id: 1,
  name: 'Luxury Beach Resort',
  location: 'Maldives',
  description: 'Experience luxury at its finest in this beachfront resort. Featuring private villas, infinity pools, and world-class dining options.',
  images: [
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800',
  ],
  price: 299,
  rating: 4.8,
  amenities: [
    { icon: Wifi, name: 'Free WiFi' },
    { icon: Pool, name: 'Infinity Pool' },
    { icon: Coffee, name: 'Restaurant' },
    { icon: Dumbbell, name: 'Fitness Center' },
  ],
  reviews: [
    {
      id: 1,
      user: 'John D.',
      rating: 5,
      comment: 'Amazing experience! The staff was incredibly helpful and the facilities were top-notch.',
      date: '2024-02-15',
    },
    {
      id: 2,
      user: 'Sarah M.',
      rating: 4,
      comment: 'Beautiful location and great service. The rooms were spacious and clean.',
      date: '2024-02-10',
    },
  ],
};

function BookingDetails() {
  const [selectedDates, setSelectedDates] = useState({ checkIn: '', checkOut: '' });
  const [guests, setGuests] = useState(2);
  const [selectedImage, setSelectedImage] = useState(mockHotel.images[0]);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <img
              src={selectedImage}
              alt={mockHotel.name}
              className="w-full h-[500px] object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {mockHotel.images.map((image) => (
              <img
                key={image}
                src={image}
                alt={mockHotel.name}
                className={`h-24 w-full object-cover rounded-lg cursor-pointer ${
                  selectedImage === image ? 'ring-2 ring-blue-600' : ''
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hotel Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{mockHotel.name}</h1>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    {mockHotel.location}
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-semibold">{mockHotel.rating}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{mockHotel.description}</p>

              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {mockHotel.amenities.map(({ icon: Icon, name }) => (
                  <div key={name} className="flex items-center">
                    <Icon className="w-5 h-5 text-blue-600 mr-2" />
                    <span>{name}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              <div className="space-y-6">
                {mockHotel.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-semibold">{review.user}</span>
                        <div className="flex items-center mt-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <span className="text-gray-500 text-sm">{review.date}</span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="text-2xl font-bold text-blue-600 mb-6">
                ${mockHotel.price}
                <span className="text-sm font-normal text-gray-600">/night</span>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in / Check-out
                  </label>
                  <div className="flex items-center border rounded-lg p-3">
                    <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                    <input
                      type="date"
                      value={selectedDates.checkIn}
                      onChange={(e) =>
                        setSelectedDates({ ...selectedDates, checkIn: e.target.value })
                      }
                      className="w-full outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guests
                  </label>
                  <div className="flex items-center border rounded-lg p-3">
                    <Users className="w-5 h-5 text-gray-400 mr-2" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full outline-none"
                    >
                      {[1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span>$299 x 5 nights</span>
                  <span>$1,495</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Cleaning fee</span>
                  <span>$50</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Service fee</span>
                  <span>$75</span>
                </div>
                <div className="flex justify-between font-bold mt-4 pt-4 border-t">
                  <span>Total</span>
                  <span>$1,620</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Reserve Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;