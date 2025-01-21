import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plane, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  MapPin,
  Globe,
  Clock,
  Heart
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative mt-20">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center rounded-t-3xl overflow-hidden"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2000)',
        }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center mb-6">
              <img 
                src="https://i.imgur.com/yU6jInv.jpg" 
                alt="OrbitWayfarer Logo" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="ml-2 text-xl font-bold text-white">OrbitWayfarer</span>
            </div>
            <p className="text-gray-300 mb-6 text-lg">
              "Embark on extraordinary journeys, create timeless memories"
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                <Phone className="w-5 h-5 mr-3 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 mr-3 text-blue-400" />
                <a href="mailto:info@orbitwayfarer.com" className="hover:text-blue-400 transition-colors">
                  info@orbitwayfarer.com
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-3 text-blue-400" />
                <span>123 Adventure Street, Travel City</span>
              </div>
            </div>
          </div>

          {/* Quick Links and Opening Hours Container */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-700">
            {/* Quick Links */}
            <div className="sm:pr-8 pb-6 sm:pb-0">
              <h3 className="text-white text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-blue-400 flex items-center group">
                    <Globe className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/destinations" className="text-gray-300 hover:text-blue-400 flex items-center group">
                    <MapPin className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link to="/tours" className="text-gray-300 hover:text-blue-400 flex items-center group">
                    <Plane className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Tours
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-blue-400 flex items-center group">
                    <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Opening Hours */}
            <div className="sm:pl-8 pt-6 sm:pt-0">
              <h3 className="text-white text-lg font-semibold mb-6">Opening Hours</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-300 group">
                  <Clock className="w-4 h-4 mr-2 text-blue-400 group-hover:scale-110 transition-transform" />
                  Mon - Fri: 9:00 AM - 6:00 PM
                </li>
                <li className="flex items-center text-gray-300 group">
                  <Clock className="w-4 h-4 mr-2 text-blue-400 group-hover:scale-110 transition-transform" />
                  Saturday: 10:00 AM - 4:00 PM
                </li>
                <li className="flex items-center text-gray-300 group">
                  <Clock className="w-4 h-4 mr-2 text-blue-400 group-hover:scale-110 transition-transform" />
                  Sunday: Closed
                </li>
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-3">
            <h3 className="text-white text-lg font-semibold mb-6">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-all hover:scale-110">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="bg-blue-400 p-2 rounded-full hover:bg-blue-500 transition-all hover:scale-110">
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-all hover:scale-110">
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 sm:mb-0">
              © 2024 OrbitWayfarer. All rights reserved.
            </p>
            <div className="flex items-center text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 mx-1 text-red-500 fill-current animate-pulse" />
              <span>by OrbitWayfarer Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;