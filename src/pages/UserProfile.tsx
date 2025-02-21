import React, { useEffect, useState } from 'react';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { User as LucideUser, Calendar, CreditCard, Settings, LogOut } from 'lucide-react';

interface Booking {
  id: number;
  hotel: string;
  location: string;
  dates: string;
  image: string;
}

interface UserProfileData {
  uid: string;
  email: string;
  name: string;
  avatar: string;
  lastSignInTime: Timestamp;
  role: string;
  upcomingBookings?: Booking[];
  pastBookings?: Booking[];
}

function UserProfile() {
  const { currentUser, logout } = useAuth();
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchUserData() {
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data() as UserProfileData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchUserData();
  }, [currentUser]);

  if (loading) {
    return <div className="pt-16 min-h-screen bg-gray-50">Loading profile...</div>;
  }

  if (!userData) {
    return <div className="pt-16 min-h-screen bg-gray-50">No profile data found.</div>;
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h2 className="text-xl font-semibold">{userData.name}</h2>
                <p className="text-gray-600">{userData.email}</p>
                {/* Display formatted last sign-in time */}
                <p className="text-sm text-gray-500">
                  Last Sign-In: {userData.lastSignInTime.toDate().toLocaleString()}
                </p>
              </div>

              <nav className="space-y-2">
                <a
                  href="#"
                  className="flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-blue-50 text-blue-600"
                >
                  <LucideUser className="w-5 h-5" />
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
                <button
                  onClick={logout}
                  className="flex w-full items-center space-x-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Upcoming Bookings */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h3 className="text-xl font-semibold mb-6">Upcoming Bookings</h3>
              <div className="space-y-6">
                {userData.upcomingBookings && userData.upcomingBookings.length > 0 ? (
                  userData.upcomingBookings.map((booking) => (
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
                  ))
                ) : (
                  <p className="text-gray-600">You have no upcoming bookings.</p>
                )}
              </div>
            </div>

            {/* Past Bookings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-6">Past Bookings</h3>
              <div className="space-y-6">
                {userData.pastBookings && userData.pastBookings.length > 0 ? (
                  userData.pastBookings.map((booking) => (
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
                  ))
                ) : (
                  <p className="text-gray-600">You have no past bookings.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
