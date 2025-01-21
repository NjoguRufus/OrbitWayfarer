import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DestinationCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
}

const getDestinationPath = (name: string): string => {
  return `/destinations/${name.toLowerCase().split(',')[0]}`;
};

const DestinationCard = ({ id, name, image, price, rating }: DestinationCardProps) => {
  return (
    <Link to={getDestinationPath(name)} className="group">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 group-hover:-translate-y-2">
        <div className="relative h-64">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
            ${price}
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-2 text-gray-600">{rating} / 5.0</span>
            </div>
            <span className="text-blue-600 flex items-center group-hover:translate-x-1 transition-transform">
              Explore <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;