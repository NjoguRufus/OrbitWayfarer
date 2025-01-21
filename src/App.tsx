import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchResults from './pages/SearchResults';
import BookingDetails from './pages/BookingDetails';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import AboutPage from './pages/AboutPage';
import DestinationsPage from './pages/DestinationsPage';
import ToursPage from './pages/ToursPage';
import ContactPage from './pages/ContactPage';
import Kenya from './pages/destinations/Kenya';
import Tanzania from './pages/destinations/Tanzania';
import Zanzibar from './pages/destinations/Zanzibar';
import Rwanda from './pages/destinations/Rwanda';
import Santorini from './pages/destinations/Santorini';
import Bali from './pages/destinations/Bali';
import Maldives from './pages/destinations/Maldives';
import PayPalProvider from './components/PayPalProvider';

function App() {
  return (
    <AuthProvider>
      <PayPalProvider>
        <Router>
          <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/destinations" element={<DestinationsPage />} />
                <Route path="/tours" element={<ToursPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/booking/:id" element={<BookingDetails />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/destinations/kenya" element={<Kenya />} />
                <Route path="/destinations/tanzania" element={<Tanzania />} />
                <Route path="/destinations/zanzibar" element={<Zanzibar />} />
                <Route path="/destinations/rwanda" element={<Rwanda />} />
                <Route path="/destinations/santorini" element={<Santorini />} />
                <Route path="/destinations/bali" element={<Bali />} />
                <Route path="/destinations/maldives" element={<Maldives />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </PayPalProvider>
    </AuthProvider>
  );
}

export default App;