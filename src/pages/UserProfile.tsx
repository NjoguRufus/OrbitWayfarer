import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { doc, getDoc, updateDoc, Timestamp, arrayUnion } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import {
  User as LucideUser,
  Calendar,
  CreditCard,
  Settings,
  LogOut,
  Mail,
  Phone,
  MapPin,
  Image as ImageIcon,
  CalendarIcon,
  CreditCard as CreditCardIcon,
  Globe,
  PhoneIncoming,
} from 'lucide-react';

// --- Credit Card Component ---
interface CardProps {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cardType?: string;
}

const Card: React.FC<CardProps> = ({
  cardNumber,
  cardHolder,
  expiry,
  cardType = 'MASTERCARD',
}) => {
  return (
    <StyledCardWrapper>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <p className="heading_8264">{cardType.toUpperCase()}</p>
            {/* Logo SVG (example for MasterCard) */}
            <svg
              className="logo"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width={36}
              height={36}
              viewBox="0 0 48 48"
            >
              <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" />
              <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" />
              <path
                fill="#ff3d00"
                d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
              />
            </svg>
            {/* Chip SVG */}
            <svg
              className="chip"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30px"
              height="30px"
              viewBox="0 0 50 50"
            >
              <image
                width={50}
                height={50}
                x={0}
                y={0}
                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
              AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB6VBMVEUAAACNcTiVeUKVeUOY
              fEaafEeUeUSYfEWZfEaykleyklaXe0SWekSZZjOYfEWYe0WXfUWXe0WcgEicfkiXe0SVekSXekSW
              ekKYe0a9nF67m12ZfUWUeEaXfESVekOdgEmVeUWWekSniU+VeUKVeUOrjFKYfEWliE6WeESZe0GS
              e0WYfES7ml2Xe0WXeESUeEOWfEWcf0eWfESXe0SXfEWYekSVeUKXfEWxklawkVaZfEWWekOUekOW
              ekSYfESZe0eXekWYfEWZe0WZe0eVeUSWeETAnmDCoWLJpmbxy4P1zoXwyoLIpWbjvXjivnjgu3bf
              u3beunWvkFWxkle/nmDivXiWekTnwXvkwHrCoWOuj1SXe0TEo2TDo2PlwHratnKZfEbQrWvPrWua
              fUfbt3PJp2agg0v0zYX0zYSfgkvKp2frxX7mwHrlv3rsxn/yzIPgvHfduXWXe0XuyIDzzISsjVO1
              lVm0lFitjVPzzIPqxX7duna0lVncuHTLqGjvyIHeuXXxyYGZfUayk1iyk1e2lln1zYTEomO2llrb
              tnOafkjFpGSbfkfZtXLhvHfkv3nqxH3mwXujhU3KqWizlFilh06khk2fgkqsjlPHpWXJp2erjVOh
              g0yWe0SliE+XekShhEvAn2D///+gx8TWAAAARnRSTlMACVCTtsRl7Pv7+vxkBab7pZv5+ZlL/UnU
              /f3SJCVe+Fx39naA9/75XSMh0/3SSkia+pil/KRj7Pr662JPkrbP7OLQ0JFOijI1MwAAAAFiS0dE
              orDd34wAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0IEzgIwaKTAAACLElEQVRYw+1XS0iUURQ+f5qPyjQf
              lGRFEEFK76koKGxRbWyVVLSOgsCgwjZBJJYuKogSIoOonUK4q3U0WVBWFPZYiIE6kuArG3VGzK/F
              fPeMM/MLt99/NuHdfPd888/57jn3nvsQWWj/VcMlvMMd5KRTogqx9iCdIjUUmcGR9ImUYowyP3xN
              GQJoRLVaZ2DaZf8kyjEJALhI28ELioyiwC+Rc3QZwRYyO/DH51hQgWm6DMIh10KmD4u9O16K49it
              VoPOAmcGAWWOepXIRScAoJZ2Frro8oN+EyTT6lWkkg6msZfMSR35QTJmjU0g15tIGSJ08ZZMJkJk
              HpNZgSkyXosS13TkJpZ62mPIJvOSzC1bp8vRhhCakEk7G9/o4gmZdbpsTcKu0m63FbnBP9Qrc15z
              bkbemfgNDtEOI8NO5L5O9VYyRYgmJayZ9nPaxZrSjW4+F6Uw9yQqIiIZwhp2huQTf6OIvCZyGM6g
              DJBZbyXifJXr7FZjGXsdxADxI7HUJFB6iWvsIhFpkoiIiGTJfjJfiCuJg2ZEspq9EHGVpYgzKqwJ
              qSAOEwuJQ/pxPvE3cYltJCLdxBLiSKKIE5HxJKcTRNeadxfhDiuYw44zVs1dxKwRk/uCxIiQkxKB
              sSctRVAge9g1E15EHE6yRUaJecRxcWlukdRIbGFOSZCMWQA/iWauIP3slREHXPyliqBcrrD71Amz
              Z+rD1Mt2Yr8TZc/UR4/YtFnbijnHi3UrN9vKQ9rPaJf867ZiaqDB+czeKYmd3pNa6fuI75MiC0uX
              XSR5aEMf7s7a6r/PudVXkjFb/SsrCRfROk0Fx6+H1i9kkTGn/E1vEmt1m089fh+RKdQ5O+xNJPUi
              cUIjO0Dm7HwvErEr0YxeibL1StSh37STafE4I7zcBdRq1DiOkdmlTJVnkQTBTS7X1FYyvfO4piaI
              nKbDCDaT2anLudYXCRFsQBgAcIF2/Okwgvz5+Z4tsw118dzruvIvjhTB+HOuWy8UvovEH6beitBK
              xDyxm9MmISKCWrzB7bSlaqGlsf0FC0gMjzTg6GgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDIt
              MTNUMDg6MTk6NTYrMDA6MDCjlq7LAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTAyLTEzVDA4OjE5
              OjU2KzAwOjAwY2+u1gAAAABJRU5ErkJggg=="
              />
            </svg>
            <p className="number">{cardNumber || "#### #### #### ####"}</p>
            <p className="valid_thru">VALID THRU</p>
            <p className="date_8264">{expiry || "MM/YY"}</p>
            <p className="name">{cardHolder || "CARD HOLDER"}</p>
          </div>
          <div className="flip-card-back">
            <div className="strip" />
            <div className="mstrip" />
            <div className="sstrip">
              <p className="code">***</p>
            </div>
          </div>
        </div>
      </div>
    </StyledCardWrapper>
  );
};

const StyledCardWrapper = styled.div`
  .flip-card {
    background-color: transparent;
    width: 240px;
    height: 154px;
    perspective: 1000px;
    color: white;
    margin: 1rem;
  }
  .heading_8264 {
    position: absolute;
    letter-spacing: 0.2em;
    font-size: 0.5em;
    top: 2em;
    right: 1em;
  }
  .logo {
    position: absolute;
    top: 6.8em;
    right: 1.5em;
  }
  .chip {
    position: absolute;
    top: 2.3em;
    left: 1.5em;
  }
  .contactless {
    position: absolute;
    top: 3.5em;
    right: 3em;
  }
  .number {
    position: absolute;
    font-weight: bold;
    font-size: 0.6em;
    top: 8.3em;
    left: 1.6em;
  }
  .valid_thru {
    position: absolute;
    font-weight: bold;
    top: 13em;
    left: 1.6em;
    font-size: 0.3em;
  }
  .date_8264 {
    position: absolute;
    font-weight: bold;
    font-size: 0.5em;
    top: 13em;
    left: 5.5em;
  }
  .name {
    position: absolute;
    font-weight: bold;
    font-size: 0.5em;
    top: 16.1em;
    left: 1.6em;
  }
  .strip {
    position: absolute;
    background-color: black;
    width: 15em;
    height: 1.5em;
    top: 2.4em;
    background: repeating-linear-gradient(
      45deg,
      #303030,
      #303030 10px,
      #202020 10px,
      #202020 20px
    );
  }
  .mstrip {
    position: absolute;
    background-color: rgb(255, 255, 255);
    width: 8em;
    height: 0.8em;
    top: 5em;
    left: 0.8em;
    border-radius: 2.5px;
  }
  .sstrip {
    position: absolute;
    background-color: rgb(255, 255, 255);
    width: 4.1em;
    height: 0.8em;
    top: 5em;
    left: 10em;
    border-radius: 2.5px;
  }
  .code {
    font-weight: bold;
    text-align: center;
    margin: 0.2em;
    color: black;
  }
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }
  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }
  .flip-card-front,
  .flip-card-back {
    box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.2);
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 1rem;
  }
  .flip-card-front {
    background-color: #171717;
  }
  .flip-card-back {
    background-color: #171717;
    transform: rotateY(180deg);
  }
`;

// --- Main UserProfile Component ---
interface Booking {
  id: number;
  hotel: string;
  location: string;
  dates: string;
  image: string;
}

interface PaymentMethod {
  id: number;
  cardNumber: string;
  cardHolder: string;
  expiry: string;
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
  paymentMethods?: PaymentMethod[];
  // Other fields as needed
}

type ActiveTab = 'profile' | 'bookings' | 'payments' | 'settings';

const UserProfile: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [profileForm, setProfileForm] = useState({ name: '', avatar: '' });

  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
  });

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    hotel: '',
    location: '',
    dates: '',
    image: '',
  });

  // Settings form state (example fields)
  const [settingsForm, setSettingsForm] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    profilePicture: '',
    dateOfBirth: '',
    gender: 'Other',
    email: '',
    phone: '',
    secondaryContact: '',
    address: '',
    // Travel Preferences
    preferredDestinations: '',
    travelInterests: 'None',
    travelFrequency: 'monthly',
    travelCompanions: 'Solo',
    budgetRange: 'Medium',
    accommodationType: 'Hotel',
    transportation: 'Flight',
    dietaryPreferences: 'None',
    accessibilityNeeds: 'None',
    // Notification Preferences
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    notificationFrequency: 'daily',
    // Language and Currency
    preferredLanguage: 'English',
    currency: 'USD',
    // Payment and Booking Preferences
    autoFill: true,
    loyaltyPrograms: '',
    // Social Media Integration
    facebook: '',
    instagram: '',
    google: '',
    // Travel History and Wishlist
    travelHistory: '',
    wishlist: '',
    // Communication Preferences
    preferredContact: 'Email',
    doNotDisturb: '',
    // Customization Options
    tripReminders: '',
    personalizedRecs: true,
    // Emergency Contacts
    emergencyContactName: '',
    emergencyContactRelation: '',
    emergencyContactNumber: '',
    // Reviews and Feedback
    reviewPreferences: '',
    feedbackSettings: '',
    // Subscription and Membership
    subscriptionPlan: '',
    freeTrial: false,
    // Integration with Other Apps
    calendarSync: false,
    travelApps: '',
  });

  useEffect(() => {
    async function fetchUserData() {
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            const data = userSnap.data() as UserProfileData;
            setUserData(data);
            setProfileForm({ name: data.name, avatar: data.avatar });
            setSettingsForm((prev) => ({
              ...prev,
              email: data.email,
              firstName: data.name.split(' ')[0] || '',
              lastName: data.name.split(' ')[1] || '',
            }));
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

  // Profile form handlers
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userDocRef, {
          name: profileForm.name,
          avatar: profileForm.avatar,
        });
        setUserData((prev) =>
          prev ? { ...prev, name: profileForm.name, avatar: profileForm.avatar } : prev
        );
        setIsEditingProfile(false);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  // Payment form handlers
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const newPayment: PaymentMethod = {
          id: Date.now(),
          cardNumber: paymentForm.cardNumber,
          cardHolder: paymentForm.cardHolder,
          expiry: paymentForm.expiry,
        };
        await updateDoc(userDocRef, {
          paymentMethods: arrayUnion(newPayment),
        });
        setUserData((prev) => {
          if (prev) {
            const updatedMethods = prev.paymentMethods
              ? [...prev.paymentMethods, newPayment]
              : [newPayment];
            return { ...prev, paymentMethods: updatedMethods };
          }
          return prev;
        });
        setPaymentForm({ cardNumber: '', cardHolder: '', expiry: '' });
      } catch (error) {
        console.error('Error adding payment method:', error);
      }
    }
  };

  // Booking form handlers
  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const newBooking: Booking = {
          id: Date.now(),
          hotel: bookingForm.hotel,
          location: bookingForm.location,
          dates: bookingForm.dates,
          image: bookingForm.image,
        };
        await updateDoc(userDocRef, {
          upcomingBookings: arrayUnion(newBooking),
        });
        setUserData((prev) => {
          if (prev) {
            const updatedBookings = prev.upcomingBookings
              ? [...prev.upcomingBookings, newBooking]
              : [newBooking];
            return { ...prev, upcomingBookings: updatedBookings };
          }
          return prev;
        });
        setBookingForm({ hotel: '', location: '', dates: '', image: '' });
      } catch (error) {
        console.error('Error adding booking:', error);
      }
    }
  };

  // Settings form handlers with type narrowing
  const handleSettingsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let finalValue: string | boolean = value;
    if (type === 'checkbox') {
      finalValue = (e.target as HTMLInputElement).checked;
    }
    setSettingsForm({
      ...settingsForm,
      [name]: finalValue,
    });
  };

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userDocRef, {
          settings: settingsForm,
        });
        alert('Settings updated successfully!');
      } catch (error) {
        console.error('Error updating settings:', error);
      }
    }
  };

  if (loading) {
    return <div className="pt-16 min-h-screen bg-gray-50">Loading profile...</div>;
  }
  if (!userData) {
    return <div className="pt-16 min-h-screen bg-gray-50">No profile data found.</div>;
  }

  // Render main content based on activeTab
  const renderMainContent = () => {
    if (activeTab === 'profile') {
      return (
        <div>
          {isEditingProfile ? (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h3 className="text-xl font-semibold mb-6">Edit Profile</h3>
              <form onSubmit={handleProfileSubmit}>
                <div className="mb-4">
                  <label className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                    <LucideUser className="w-4 h-4" />
                    <span>Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                    <ImageIcon className="w-4 h-4" />
                    <span>Avatar URL</span>
                  </label>
                  <input
                    type="text"
                    name="avatar"
                    value={profileForm.avatar}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Profile Details</h3>
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-24 h-24 rounded-full"
                />
                <div>
                  <h2 className="text-xl font-semibold">{userData.name}</h2>
                  <p className="text-gray-600">{userData.email}</p>
                  <p className="text-sm text-gray-500">
                    Last Sign-In: {userData.lastSignInTime.toDate().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
    if (activeTab === 'bookings') {
      return (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-6">My Bookings</h3>
          <div className="mb-8">
            <h4 className="font-semibold mb-2">Add a New Booking</h4>
            <form onSubmit={handleBookingSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="hotel"
                  placeholder="Hotel Name"
                  value={bookingForm.hotel}
                  onChange={handleBookingChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={bookingForm.location}
                  onChange={handleBookingChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="dates"
                  placeholder="Dates"
                  value={bookingForm.dates}
                  onChange={handleBookingChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={bookingForm.image}
                  onChange={handleBookingChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Booking
              </button>
            </form>
          </div>
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
      );
    }
    if (activeTab === 'payments') {
      return (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-6">Payment Methods</h3>
          <div className="mb-8">
            <h4 className="font-semibold mb-2">Add a Payment Method</h4>
            <form onSubmit={handlePaymentSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={paymentForm.cardNumber}
                  onChange={handlePaymentChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="cardHolder"
                  placeholder="Card Holder"
                  value={paymentForm.cardHolder}
                  onChange={handlePaymentChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="expiry"
                  placeholder="Expiry Date (MM/YY)"
                  value={paymentForm.expiry}
                  onChange={handlePaymentChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Payment Method
              </button>
            </form>
          </div>
          <div className="flex flex-wrap">
            {userData.paymentMethods && userData.paymentMethods.length > 0 ? (
              userData.paymentMethods.map((pm) => (
                <Card
                  key={pm.id}
                  cardNumber={pm.cardNumber}
                  cardHolder={pm.cardHolder}
                  expiry={pm.expiry}
                  cardType="MasterCard"
                />
              ))
            ) : (
              <p className="text-gray-600">No payment methods added.</p>
            )}
          </div>
        </div>
      );
    }
    if (activeTab === 'settings') {
      return (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-6">Account Settings</h3>
          <form onSubmit={handleSettingsSubmit}>
            {/* 1. Personal Information */}
            <fieldset className="mb-6 border p-4 rounded">
              <legend className="flex items-center space-x-2 text-lg font-semibold mb-2">
                <LucideUser className="w-5 h-5" />
                <span>Personal Information</span>
              </legend>
              <div className="mb-4">
                <label className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                  <LucideUser className="w-4 h-4" />
                  <span>First Name</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={settingsForm.firstName}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                  <LucideUser className="w-4 h-4" />
                  <span>Last Name</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={settingsForm.lastName}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                  <ImageIcon className="w-4 h-4" />
                  <span>Profile Picture URL</span>
                </label>
                <input
                  type="text"
                  name="profilePicture"
                  value={settingsForm.profilePicture}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Date of Birth</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={settingsForm.dateOfBirth}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                  <Globe className="w-4 h-4" />
                  <span>Gender</span>
                </label>
                <select
                  name="gender"
                  value={settingsForm.gender}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={settingsForm.email}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                  <Phone className="w-4 h-4" />
                  <span>Phone</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={settingsForm.phone}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                  <PhoneIncoming className="w-4 h-4" />
                  <span>Secondary Contact</span>
                </label>
                <input
                  type="text"
                  name="secondaryContact"
                  value={settingsForm.secondaryContact}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                  <MapPin className="w-4 h-4" />
                  <span>Address</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={settingsForm.address}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
            </fieldset>
            {/* 2. Travel Preferences */}
            <fieldset className="mb-6 border p-4 rounded">
              <legend className="flex items-center space-x-2 text-lg font-semibold mb-2">
                <Calendar className="w-5 h-5" />
                <span>Travel Preferences</span>
              </legend>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Travel Destinations
                </label>
                <input
                  type="text"
                  name="preferredDestinations"
                  value={settingsForm.preferredDestinations}
                  onChange={handleSettingsChange}
                  placeholder="E.g., Europe, Asia"
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Travel Interests
                </label>
                <select
                  name="travelInterests"
                  value={settingsForm.travelInterests}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                >
                  <option value="None">None</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Beach">Beach</option>
                  <option value="Hiking">Hiking</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Travel Frequency
                </label>
                <select
                  name="travelFrequency"
                  value={settingsForm.travelFrequency}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Travel Companions
                </label>
                <select
                  name="travelCompanions"
                  value={settingsForm.travelCompanions}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                >
                  <option value="Solo">Solo</option>
                  <option value="Family">Family</option>
                  <option value="Friends">Friends</option>
                  <option value="Couples">Couples</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Budget Range
                </label>
                <select
                  name="budgetRange"
                  value={settingsForm.budgetRange}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Accommodation Type
                </label>
                <select
                  name="accommodationType"
                  value={settingsForm.accommodationType}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                >
                  <option value="Hotel">Hotel</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Airbnb">Airbnb</option>
                  <option value="Luxury Resort">Luxury Resort</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Transportation Preferences
                </label>
                <select
                  name="transportation"
                  value={settingsForm.transportation}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                >
                  <option value="Flight">Flight</option>
                  <option value="Train">Train</option>
                  <option value="Car Rental">Car Rental</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Dietary Preferences
                </label>
                <select
                  name="dietaryPreferences"
                  value={settingsForm.dietaryPreferences}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                >
                  <option value="None">None</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Gluten-Free">Gluten-Free</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Accessibility Needs
                </label>
                <select
                  name="accessibilityNeeds"
                  value={settingsForm.accessibilityNeeds}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                >
                  <option value="None">None</option>
                  <option value="Wheelchair Access">Wheelchair Access</option>
                  <option value="Special Assistance">Special Assistance</option>
                </select>
              </div>
            </fieldset>
            {/* 3. Notification Preferences */}
            <fieldset className="mb-6 border p-4 rounded">
              <legend className="flex items-center space-x-2 text-lg font-semibold mb-2">
                <CreditCardIcon className="w-5 h-5" />
                <span>Notification Preferences</span>
              </legend>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email Notifications
                </label>
                <select
                  name="emailNotifications"
                  value={settingsForm.emailNotifications ? 'enabled' : 'disabled'}
                  onChange={(e) =>
                    handleSettingsChange({
                      target: {
                        name: 'emailNotifications',
                        value: e.target.value === 'enabled',
                        type: 'checkbox',
                        checked: (e.target as HTMLSelectElement).value === 'enabled',
                      },
                    } as any)
                  }
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                >
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  SMS Notifications
                </label>
                <select
                  name="smsNotifications"
                  value={settingsForm.smsNotifications ? 'enabled' : 'disabled'}
                  onChange={(e) =>
                    handleSettingsChange({
                      target: {
                        name: 'smsNotifications',
                        value: e.target.value === 'enabled',
                        type: 'checkbox',
                        checked: (e.target as HTMLSelectElement).value === 'enabled',
                      },
                    } as any)
                  }
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                >
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Push Notifications
                </label>
                <select
                  name="pushNotifications"
                  value={settingsForm.pushNotifications ? 'enabled' : 'disabled'}
                  onChange={(e) =>
                    handleSettingsChange({
                      target: {
                        name: 'pushNotifications',
                        value: e.target.value === 'enabled',
                        type: 'checkbox',
                        checked: (e.target as HTMLSelectElement).value === 'enabled',
                      },
                    } as any)
                  }
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                >
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Frequency of Notifications
                </label>
                <select
                  name="notificationFrequency"
                  value={settingsForm.notificationFrequency}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="important">Only Important</option>
                </select>
              </div>
            </fieldset>
            {/* 4. Language and Currency */}
            <fieldset className="mb-6 border p-4 rounded">
              <legend className="flex items-center space-x-2 text-lg font-semibold mb-2">
                <Globe className="w-5 h-5" />
                <span>Language and Currency</span>
              </legend>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Language
                </label>
                <select
                  name="preferredLanguage"
                  value={settingsForm.preferredLanguage}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Currency
                </label>
                <select
                  name="currency"
                  value={settingsForm.currency}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </fieldset>
            {/* 5. Security and Privacy */}
            <fieldset className="mb-6 border p-4 rounded">
              <legend className="flex items-center space-x-2 text-lg font-semibold mb-2">
                <CreditCardIcon className="w-5 h-5" />
                <span>Security and Privacy</span>
              </legend>
              <p className="text-gray-600 text-sm mb-2">
                Password Management and Two-Factor Authentication would be handled through a dedicated module.
              </p>
            </fieldset>
            {/* 6. Payment and Booking Preferences */}
            <fieldset className="mb-6 border p-4 rounded">
              <legend className="flex items-center space-x-2 text-lg font-semibold mb-2">
                <CreditCardIcon className="w-5 h-5" />
                <span>Payment and Booking Preferences</span>
              </legend>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Auto-Fill Information
                </label>
                <select
                  name="autoFill"
                  value={settingsForm.autoFill ? 'enabled' : 'disabled'}
                  onChange={(e) =>
                    handleSettingsChange({
                      target: {
                        name: 'autoFill',
                        value: e.target.value === 'enabled',
                        type: 'checkbox',
                        checked: (e.target as HTMLSelectElement).value === 'enabled',
                      },
                    } as any)
                  }
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                >
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Loyalty Programs
                </label>
                <input
                  type="text"
                  name="loyaltyPrograms"
                  value={settingsForm.loyaltyPrograms}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
            </fieldset>
            {/* 7. Social Media Integration */}
            <fieldset className="mb-6 border p-4 rounded">
              <legend className="flex items-center space-x-2 text-lg font-semibold mb-2">
                <ImageIcon className="w-5 h-5" />
                <span>Social Media Integration</span>
              </legend>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Facebook
                </label>
                <input
                  type="text"
                  name="facebook"
                  value={settingsForm.facebook}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Instagram
                </label>
                <input
                  type="text"
                  name="instagram"
                  value={settingsForm.instagram}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Google
                </label>
                <input
                  type="text"
                  name="google"
                  value={settingsForm.google}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
            </fieldset>
            {/* 8. Travel History and Wishlist */}
            <fieldset className="mb-6 border p-4 rounded">
              <legend className="flex items-center space-x-2 text-lg font-semibold mb-2">
                <CalendarIcon className="w-5 h-5" />
                <span>Travel History and Wishlist</span>
              </legend>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Travel History
                </label>
                <input
                  type="text"
                  name="travelHistory"
                  value={settingsForm.travelHistory}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Wishlist
                </label>
                <input
                  type="text"
                  name="wishlist"
                  value={settingsForm.wishlist}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
            </fieldset>
            {/* 9. Communication Preferences */}
            <fieldset className="mb-6 border p-4 rounded">
              <legend className="flex items-center space-x-2 text-lg font-semibold mb-2">
                <PhoneIncoming className="w-5 h-5" />
                <span>Communication Preferences</span>
              </legend>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Contact Method
                </label>
                <select
                  name="preferredContact"
                  value={settingsForm.preferredContact}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                >
                  <option value="Email">Email</option>
                  <option value="Phone">Phone</option>
                  <option value="In-App">In-App Messaging</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Do Not Disturb (Times)
                </label>
                <input
                  type="text"
                  name="doNotDisturb"
                  value={settingsForm.doNotDisturb}
                  onChange={handleSettingsChange}
                  placeholder="E.g., 10:00 PM - 7:00 AM"
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
            </fieldset>
            {/* 10. Customization Options */}
            <fieldset className="mb-6 border p-4 rounded">
              <legend className="flex items-center space-x-2 text-lg font-semibold mb-2">
                <ImageIcon className="w-5 h-5" />
                <span>Customization Options</span>
              </legend>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Trip Reminders
                </label>
                <input
                  type="text"
                  name="tripReminders"
                  value={settingsForm.tripReminders}
                  onChange={handleSettingsChange}
                  placeholder="E.g., 3 days before trip"
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Personalized Recommendations
                </label>
                <select
                  name="personalizedRecs"
                  value={settingsForm.personalizedRecs ? 'enabled' : 'disabled'}
                  onChange={(e) =>
                    handleSettingsChange({
                      target: {
                        name: 'personalizedRecs',
                        value: e.target.value === 'enabled',
                        type: 'checkbox',
                        checked: (e.target as HTMLSelectElement).value === 'enabled',
                      },
                    } as any)
                  }
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                >
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
            </fieldset>
            {/* 11. Emergency Contacts */}
            <fieldset className="mb-6 border p-4 rounded">
              <legend className="flex items-center space-x-2 text-lg font-semibold mb-2">
                <Phone className="w-5 h-5" />
                <span>Emergency Contacts</span>
              </legend>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="emergencyContactName"
                  value={settingsForm.emergencyContactName}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Relationship
                </label>
                <input
                  type="text"
                  name="emergencyContactRelation"
                  value={settingsForm.emergencyContactRelation}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="emergencyContactNumber"
                  value={settingsForm.emergencyContactNumber}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
            </fieldset>
            {/* 12. Reviews and Feedback */}
            <fieldset className="mb-6 border p-4 rounded">
              <legend className="flex items-center space-x-2 text-lg font-semibold mb-2">
                <Globe className="w-5 h-5" />
                <span>Reviews and Feedback</span>
              </legend>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Review Preferences
                </label>
                <input
                  type="text"
                  name="reviewPreferences"
                  value={settingsForm.reviewPreferences}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Feedback Settings
                </label>
                <input
                  type="text"
                  name="feedbackSettings"
                  value={settingsForm.feedbackSettings}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
            </fieldset>
            {/* 13. Subscription and Membership */}
            <fieldset className="mb-6 border p-4 rounded">
              <legend className="flex items-center space-x-2 text-lg font-semibold mb-2">
                <CreditCardIcon className="w-5 h-5" />
                <span>Subscription and Membership</span>
              </legend>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Subscription Plan
                </label>
                <input
                  type="text"
                  name="subscriptionPlan"
                  value={settingsForm.subscriptionPlan}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Free Trial
                </label>
                <select
                  name="freeTrial"
                  value={settingsForm.freeTrial ? 'enabled' : 'disabled'}
                  onChange={(e) =>
                    handleSettingsChange({
                      target: {
                        name: 'freeTrial',
                        value: e.target.value === 'enabled',
                        type: 'checkbox',
                        checked: (e.target as HTMLSelectElement).value === 'enabled',
                      },
                    } as any)
                  }
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                >
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
            </fieldset>
            {/* 14. Integration with Other Apps */}
            <fieldset className="mb-6 border p-4 rounded">
              <legend className="flex items-center space-x-2 text-lg font-semibold mb-2">
                <CalendarIcon className="w-5 h-5" />
                <span>Integration with Other Apps</span>
              </legend>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Calendar Sync
                </label>
                <select
                  name="calendarSync"
                  value={settingsForm.calendarSync ? 'enabled' : 'disabled'}
                  onChange={(e) =>
                    handleSettingsChange({
                      target: {
                        name: 'calendarSync',
                        value: e.target.value === 'enabled',
                        type: 'checkbox',
                        checked: (e.target as HTMLSelectElement).value === 'enabled',
                      },
                    } as any)
                  }
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                >
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Travel Apps Integration
                </label>
                <input
                  type="text"
                  name="travelApps"
                  value={settingsForm.travelApps}
                  onChange={handleSettingsChange}
                  className="mt-1 block w-full border-gray-300 rounded p-2"
                />
              </div>
            </fieldset>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save Settings
            </button>
          </form>
        </div>
      );
    }
  };

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
                <p className="text-sm text-gray-500">
                  Last Sign-In: {userData.lastSignInTime.toDate().toLocaleString()}
                </p>
              </div>
              <nav className="space-y-2">
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setIsEditingProfile(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-4 py-2.5 rounded-lg text-left ${
                    activeTab === 'profile'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <LucideUser className="w-5 h-5" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`flex items-center space-x-3 w-full px-4 py-2.5 rounded-lg text-left ${
                    activeTab === 'bookings'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  <span>My Bookings</span>
                </button>
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`flex items-center space-x-3 w-full px-4 py-2.5 rounded-lg text-left ${
                    activeTab === 'payments'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Payment Methods</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center space-x-3 w-full px-4 py-2.5 rounded-lg text-left ${
                    activeTab === 'settings'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={logout}
                  className="flex w-full items-center space-x-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>
          {/* Main Content */}
          <div className="lg:col-span-3">{renderMainContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
