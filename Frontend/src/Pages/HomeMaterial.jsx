import React, { useState } from 'react';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const mockMaterials = [
  {
    id: 1,
    name: "NPK 20-20-20 Fertilizer",
    category: "Fertilizer",
    price: 850,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500",
    description: "Complete balanced fertilizer for all crops"
  },
  {
    id: 2,
    name: "Organic Compost",
    category: "Fertilizer",
    price: 450,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=500",
    description: "Rich organic matter for soil health"
  },
  {
    id: 3,
    name: "Urea Fertilizer",
    category: "Fertilizer",
    price: 650,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500",
    description: "High nitrogen content for leafy growth"
  },
  {
    id: 4,
    name: "Cypermethrin Insecticide",
    category: "Pesticide",
    price: 1200,
    unit: "liter",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500",
    description: "Effective against aphids and beetles"
  },
  {
    id: 5,
    name: "Neem Oil Pesticide",
    category: "Pesticide",
    price: 950,
    unit: "liter",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500",
    description: "Natural organic pest control"
  },
  {
    id: 6,
    name: "Glyphosate Herbicide",
    category: "Herbicide",
    price: 1100,
    unit: "liter",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=500",
    description: "Non-selective weed killer"
  },
  {
    id: 7,
    name: "2,4-D Herbicide",
    category: "Herbicide",
    price: 850,
    unit: "liter",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500",
    description: "Controls broadleaf weeds"
  },
  {
    id: 8,
    name: "Potassium Sulphate",
    category: "Fertilizer",
    price: 1250,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=500",
    description: "Improves fruit quality"
  },
  {
    id: 9,
    name: "Micronutrient Mix",
    category: "Fertilizer",
    price: 350,
    unit: "pack",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500",
    description: "Essential trace elements"
  },
  {
    id: 10,
    name: "BT Pesticide",
    category: "Pesticide",
    price: 750,
    unit: "pack",
    image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=500",
    description: "Biological caterpillar control"
  },
  {
    id: 11,
    name: "Paraquat Herbicide",
    category: "Herbicide",
    price: 1350,
    unit: "liter",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500",
    description: "Fast-acting contact herbicide"
  },
  {
    id: 12,
    name: "Chlorpyrifos Pesticide",
    category: "Pesticide",
    price: 1500,
    unit: "liter",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500",
    description: "Controls soil insects"
  }
];

const HomeMaterial = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  console.log('HomeMaterial rendered');
  console.log('Total mockMaterials:', mockMaterials.length);

  const filteredMaterials = mockMaterials.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  console.log('Filtered materials:', filteredMaterials.length);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Fertilizer': return 'bg-green-500';
      case 'Pesticide': return 'bg-red-500';
      case 'Herbicide': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">🌾 AgriStore</h1>
            <p className="text-gray-600">Quality Agricultural Materials for Your Farm</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="All">All Categories</option>
                <option value="Fertilizer">Fertilizers</option>
                <option value="Pesticide">Pesticides</option>
                <option value="Herbicide">Herbicides</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMaterials.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <span className={`absolute top-2 right-2 ${getCategoryColor(item.category)} text-white text-xs px-3 py-1 rounded-full`}>
                    {item.category}
                  </span>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-green-600">Rs. {item.price}</span>
                      <span className="text-sm text-gray-500">/{item.unit}</span>
                    </div>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                      <FaShoppingCart />
                      <span>Buy</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMaterials.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No materials found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeMaterial;
