import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, where, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Users, Calendar, DollarSign, Menu } from 'lucide-react';

interface Booking {
  id: string;
  propertyName: string;
  checkIn: Timestamp;
  checkOut: Timestamp;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  userEmail: string;
}

interface AppUser {
  id: string;
  email: string;
  lastSignInTime?: string | Timestamp;
}

const formatLastSignIn = (time?: string | Timestamp): string => {
  if (!time) return 'N/A';
  if (typeof time === 'object' && 'toDate' in time && typeof time.toDate === 'function') {
    return time.toDate().toLocaleDateString();
  }
  return String(time);
};

export function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [usersList, setUsersList] = useState<AppUser[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('week');
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Allowed admin emails
  const allowedAdmins = ['adminorbit@mail.com', 'admin2@mail.com'];

  // Check authentication and authorization for admins
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthorized(!!(user && allowedAdmins.includes(user.email || '')));
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  // Fetch confirmed bookings from Firestore if authorized
  useEffect(() => {
    if (!authorized) return;

    const fetchBookings = async () => {
      try {
        const bookingsRef = collection(db, 'bookings');
        const q = query(bookingsRef, where('status', '==', 'confirmed'));
        const snapshot = await getDocs(q);
        const fetchedBookings = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Booking[];
        setBookings(fetchedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookings();
  }, [authorized]);

  // Fetch signed-in users from Firestore if authorized
  useEffect(() => {
    if (!authorized) return;

    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        const fetchedUsers = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<AppUser, 'id'>)
        })) as AppUser[];
        setUsersList(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [authorized]);

  if (!authChecked) {
    return <div className="flex justify-center items-center h-screen text-gray-300">Checking authentication...</div>;
  }
  if (!authorized) {
    return <div className="flex justify-center items-center h-screen text-red-400">You are not authorized to view this page.</div>;
  }

  const calculateMetrics = () => {
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
    const totalBookings = bookings.length;
    const activeGuests = bookings.filter((booking) => {
      const now = Timestamp.now();
      return booking.checkIn <= now && booking.checkOut >= now;
    }).length;
    return { totalRevenue, totalBookings, activeGuests };
  };

  const { totalRevenue, totalBookings, activeGuests } = calculateMetrics();

  return (
    <div className="min-h-screen flex bg-gray-900 text-gray-100">
      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className="w-64 bg-gray-800 p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
          <nav>
            <ul>
              <li className="mb-4 hover:text-blue-400 cursor-pointer">Overview</li>
              <li className="mb-4 hover:text-blue-400 cursor-pointer">Bookings</li>
              <li className="mb-4 hover:text-blue-400 cursor-pointer">Users</li>
              <li className="mb-4 hover:text-blue-400 cursor-pointer">Settings</li>
            </ul>
          </nav>
        </aside>
      )}

      {/* Main Content */}
      {/* Add padding-top to ensure the content begins below your navbar */}
      <main className="flex-1 p-8 pt-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            {['day', 'week', 'month'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period as typeof selectedPeriod)}
                className={`px-4 py-2 rounded-lg ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-900 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-900 rounded-lg">
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400">Total Bookings</p>
                <p className="text-2xl font-bold">{totalBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-900 rounded-lg">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400">Active Guests</p>
                <p className="text-2xl font-bold">{activeGuests}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-gray-800 rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Recent Bookings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Property</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Guest</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Check In</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Check Out</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {loadingBookings ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center">Loading...</td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center">No bookings found</td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.propertyName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.userEmail}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {booking.checkIn.toDate().toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {booking.checkOut.toDate().toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">${booking.totalPrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed'
                              ? 'bg-green-900 text-green-400'
                              : booking.status === 'cancelled'
                              ? 'bg-red-900 text-red-400'
                              : 'bg-blue-900 text-blue-400'
                          }`}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Signed-in Users */}
        <div className="bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Signed-in Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Last Sign-In</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {loadingUsers ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-4 text-center">Loading...</td>
                  </tr>
                ) : usersList.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-4 text-center">No users found</td>
                  </tr>
                ) : (
                  usersList.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatLastSignIn(user.lastSignInTime)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
