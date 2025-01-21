import React from 'react';
import { User, Calendar, CreditCard, Settings, LogOut } from 'lucide-react';

const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
  upcomingBookings: [
    {
      id: 1,
      hotel: 'Luxury Beach Resort',
      location: 'Maldives',
      dates: 'Mar 15 - Mar 20, 2024',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
    },
  ],
  pastBookings: [
    {
      id: 2,
      hotel: 'Mountain View Lodge',
      location: 'Swiss Alps',
      dates: 'Jan 10 - Jan 15, 2024',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800',
    },
  ],
};

function UserProfile() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h2 className="text-xl font-semibold">{mockUser.name}</h2>
                <p className="text-gray-600">{mockUser.email}</p>
              </div>

              <nav className="space-y-2">
                <a
                  href="#"
                  className="flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-blue-50 text-blue-600"
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  <Calendar className="w-5 h-5" />
                  <span>My Bookings</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Payment Methods</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Upcoming Bookings */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h3 className="text-xl font-semibold mb-6">Upcoming Bookings</h3>
              <div className="space-y-6">
                {mockUser.upcomingBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center space-x-4">
                    <img
                      src={booking.image}
                      alt={booking.hotel}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{booking.hotel}</h4>
                      <p className="text-gray-600">{booking.location}</p>
                      <p className="text-sm text-gray-500">{booking.dates}</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Bookings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-6">Past Bookings</h3>
              <div className="space-y-6">
                {mockUser.pastBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center space-x-4">
                    <img
                      src={booking.image}
                      alt={booking.hotel}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{booking.hotel}</h4>
                      <p className="text-gray-600">{booking.location}</p>
                      <p className="text-sm text-gray-500">{booking.dates}</p>
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Book Again
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;