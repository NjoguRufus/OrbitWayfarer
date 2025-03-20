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
  Heart,
  Info,
  Send,
  Navigation
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative mt-12">
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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center mb-4">
              <img 
                src="https://i.imgur.com/yU6jInv.jpg" 
                alt="OrbitWayfarer Logo" 
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="ml-2 text-lg font-bold text-white">OrbitWayfarer</span>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              "Embark on extraordinary journeys, create timeless memories"
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300 hover:text-blue-400 transition-colors group cursor-pointer">
                <Phone className="w-4 h-4 mr-2 text-blue-400 transform group-hover:rotate-12 transition-transform" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300 group">
                <Mail className="w-4 h-4 mr-2 text-blue-400 transform group-hover:scale-110 transition-transform" />
                <a href="mailto:info@orbitwayfarer.com" className="hover:text-blue-400 transition-colors text-sm">
                  info@orbitwayfarer.com
                </a>
              </div>
              <div className="flex items-center text-gray-300 group">
                <MapPin className="w-4 h-4 mr-2 text-blue-400 transform group-hover:bounce transition-transform" />
                <span className="text-sm">123 Adventure Street, Travel City</span>
              </div>
            </div>
          </div>

          {/* Quick Links and Opening Hours Container */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-700">
            {/* Quick Links */}
            <div className="sm:pr-6 pb-4 sm:pb-0">
              <h3 className="text-white text-base font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-blue-400 flex items-center group text-sm">
                    <Globe className="w-3 h-3 mr-2 transform group-hover:rotate-180 transition-transform duration-500" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/destinations" className="text-gray-300 hover:text-blue-400 flex items-center group text-sm">
                    <Navigation className="w-3 h-3 mr-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link to="/tours" className="text-gray-300 hover:text-blue-400 flex items-center group text-sm">
                    <Plane className="w-3 h-3 mr-2 transform group-hover:translate-x-2 transition-transform" />
                    Tours
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-blue-400 flex items-center group text-sm">
                    <Send className="w-3 h-3 mr-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Opening Hours */}
            <div className="sm:pl-6 pt-4 sm:pt-0">
              <h3 className="text-white text-base font-semibold mb-4">Opening Hours</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300 group text-sm">
                  <Clock className="w-3 h-3 mr-2 text-blue-400 transform group-hover:rotate-180 transition-transform duration-700" />
                  Mon - Fri: 9:00 AM - 6:00 PM
                </li>
                <li className="flex items-center text-gray-300 group text-sm">
                  <Clock className="w-3 h-3 mr-2 text-blue-400 transform group-hover:rotate-180 transition-transform duration-700" />
                  Saturday: 10:00 AM - 4:00 PM
                </li>
                <li className="flex items-center text-gray-300 group text-sm">
                  <Clock className="w-3 h-3 mr-2 text-blue-400 transform group-hover:rotate-180 transition-transform duration-700" />
                  Sunday: Closed
                </li>
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-3">
            <h3 className="text-white text-base font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-3">
              <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-all hover:scale-110 group">
                <Facebook className="w-4 h-4 text-white transform group-hover:rotate-12 transition-transform" />
              </a>
              <a href="#" className="bg-blue-400 p-2 rounded-full hover:bg-blue-500 transition-all hover:scale-110 group">
                <Twitter className="w-4 h-4 text-white transform group-hover:-rotate-12 transition-transform" />
              </a>
              <a href="#" className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-all hover:scale-110 group">
                <Instagram className="w-4 h-4 text-white transform group-hover:rotate-12 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs mb-2 sm:mb-0">
              © 2024 OrbitWayfarer. All rights reserved.
            </p>
            <div className="flex items-center space-x-4"> {/* Added space-x-4 for spacing */}
              <div className="flex items-center text-gray-400 text-xs group">
                <span>Made with</span>
                <Heart className="w-3 h-3 mx-1 text-red-500 fill-current animate-pulse group-hover:scale-125 transition-transform" />
                <span>by OrbitWayfarer Team</span>
              </div>
              {/* Developer Credit */}
              <div className="flex items-center text-gray-400 text-xs group">
                <span>Developed and Maintained by</span>
                <a 
                  href="https://astraronix.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center text-blue-400 hover:underline ml-1"
                >
                  <img 
                    src="https://i.imgur.com/T7mH4Ly.png" 
                    alt="Astraronix Logo" 
                    className="w-4 h-4 mr-1" 
                  />
                  Astraronix Solutions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;