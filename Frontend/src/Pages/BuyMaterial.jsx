import React, { useEffect, useState } from "react";
import { FaSort, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import Spinner from "../components/Spinner";
import UserTopNavbar from "../components/UserTopNavbar";
import AgriStoreHeader from "../components/AgriStoreHeader";
import MaterialDetailsModal from "../components/MaterialDetailsModal";
import Cart from "../components/Cart";

const mockMaterials = [
  { _id: '1', materialName: "NPK 20-20-20 Fertilizer", category: "Fertilizer", pricePerUnit: 850, unitType: "kg", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500" },
  { _id: '2', materialName: "Organic Compost", category: "Fertilizer", pricePerUnit: 450, unitType: "kg", image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=500" },
  { _id: '3', materialName: "Urea Fertilizer", category: "Fertilizer", pricePerUnit: 650, unitType: "kg", image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500" },
  { _id: '4', materialName: "Cypermethrin Insecticide", category: "Pesticide", pricePerUnit: 1200, unitType: "liters", image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500" },
  { _id: '5', materialName: "Neem Oil Pesticide", category: "Pesticide", pricePerUnit: 950, unitType: "liters", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500" },
  { _id: '6', materialName: "Glyphosate Herbicide", category: "Herbicide", pricePerUnit: 1100, unitType: "liters", image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=500" },
  { _id: '7', materialName: "2,4-D Herbicide", category: "Herbicide", pricePerUnit: 850, unitType: "liters", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500" },
  { _id: '8', materialName: "Potassium Sulphate", category: "Fertilizer", pricePerUnit: 1250, unitType: "kg", image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=500" },
  { _id: '9', materialName: "Micronutrient Mix", category: "Fertilizer", pricePerUnit: 350, unitType: "packs", image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500" },
  { _id: '10', materialName: "BT Pesticide", category: "Pesticide", pricePerUnit: 750, unitType: "packs", image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=500" },
  { _id: '11', materialName: "Paraquat Herbicide", category: "Herbicide", pricePerUnit: 1350, unitType: "liters", image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500" },
  { _id: '12', materialName: "Chlorpyrifos Pesticide", category: "Pesticide", pricePerUnit: 1500, unitType: "liters", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500" }
];

const BuyMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("materialName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterCategory, setFilterCategory] = useState("");
  const [cart, setCart] = useState({});
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [materialDetails, setMaterialDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setMaterials(mockMaterials);
      setLoading(false);
    }, 500);
  }, []);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleQuantityChange = (materialId, change) => {
    setCart((prevCart) => {
      const newQuantity = (prevCart[materialId] || 0) + change;
      if (newQuantity <= 0) {
        const { [materialId]: _, ...rest } = prevCart;
        return rest;
      }
      return { ...prevCart, [materialId]: newQuantity };
    });
  };

  const openMaterialDetails = (materialId) => {
    setLoadingDetails(true);
    setSelectedMaterial(materialId);

    axios
      .get(`http://localhost:5557/materials/${materialId}`)
      .then((response) => {
        setMaterialDetails(response.data);
        setLoadingDetails(false);
      })
      .catch((error) => {
        console.error("Error fetching material details:", error);
        setLoadingDetails(false);
      });
  };

  const closeMaterialDetails = () => {
    setSelectedMaterial(null);
    setMaterialDetails(null);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [materialId, quantity]) => {
      const material = materials.find((m) => m._id === materialId);
      return total + (material ? material.pricePerUnit * quantity : 0);
    }, 0);
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const customerInfo = {
      name: formData.get("name"),
      address: formData.get("address"),
      phone: formData.get("phone"),
    };

    // Here you would typically send the order to your backend
    console.log("Order submitted:", { customerInfo, cart });

    // Clear cart after checkout
    setCart({});
    setShowCart(false);

    // Show success message
    alert("Your order has been placed successfully!");
  };

  const filteredAndSortedMaterials = materials
    .filter(
      (material) =>
        material.materialName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        (filterCategory === "" || material.category === filterCategory)
    )
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="min-h-screen">
      <UserTopNavbar />
      <AgriStoreHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg p-4 mb-16">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => handleSort("materialName")}
                className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center text-sm"
              >
                <FaSort className="mr-1" />
                Name
              </button>
              <button
                onClick={() => handleSort("pricePerUnit")}
                className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center text-sm"
              >
                <FaSort className="mr-1" />
                Price
              </button>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
              >
                <option value="">All Categories</option>
                <option value="Fertilizer">Fertilizer</option>
                <option value="Pesticide">Pesticide</option>
                <option value="Herbicide">Herbicide</option>
              </select>
            </div>

            <div className="absolute left-1/2  transform -translate-x-1/2 -translate-y-1">
              <div className="relative w-96">
                <input
                  type="text"
                  placeholder="Search materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 pl-8 border-2 border-green-400 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                />
                <MdSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <button
              onClick={toggleCart}
              className="flex items-center bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
            >
              <FaShoppingCart className="mr-2" />
              <span>Cart ({getTotalItems()})</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredAndSortedMaterials.map((material) => (
              <div
                key={material._id}
                className="bg-gray-100 rounded-3xl shadow-2xl overflow-hidden"
              >
                <div className="relative h-56">
                  {material.image ? (
                    <img
                      src={material.image}
                      alt={material.materialName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <h2 className="text-sm font-semibold text-gray-800 truncate mt-4">
                    {material.materialName}
                  </h2>
                  <p className="text-xs text-gray-600 mt-2">
                    {material.category}
                  </p>
                  <p className="text-sm font-bold text-green-600 mt-2">
                    Rs.{material.pricePerUnit}/{material.unitType}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(material._id, -1)}
                        className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-xs mt-2"
                      >
                        <FaMinus />
                      </button>
                      <span className="mx-2 text-sm font-semibold">
                        {cart[material._id] || 0}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(material._id, 1)}
                        className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-xs"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <button
                      onClick={() => handleQuantityChange(material._id, 1)}
                      className="bg-green-600 text-white px-2 py-1 rounded-full hover:bg-green-700 transition-colors text-xs"
                    >
                      Add
                    </button>
                  </div>
                  <button
                    onClick={() => openMaterialDetails(material._id)}
                    className="block w-full text-center mt-4 text-sm text-green-600 hover:text-green-800 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredAndSortedMaterials.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg shadow-md">
            <p className="text-xl text-gray-600">No materials found.</p>
          </div>
        )}
      </div>

      {/* Material Details Modal - Now using the separate component */}
      <AnimatePresence>
        {selectedMaterial && (
          <MaterialDetailsModal
            selectedMaterial={selectedMaterial}
            materialDetails={materialDetails}
            loadingDetails={loadingDetails}
            closeMaterialDetails={closeMaterialDetails}
            whe
            handleQuantityChange={handleQuantityChange}
            cart={cart}
          />
        )}
      </AnimatePresence>

      {/* Cart Modal */}
      <Cart
        showCart={showCart}
        toggleCart={toggleCart}
        cart={cart}
        materials={materials}
        handleQuantityChange={handleQuantityChange}
        getTotalPrice={getTotalPrice}
        handleCheckout={handleCheckout}
      />
    </div>
  );
};

export default BuyMaterial;
