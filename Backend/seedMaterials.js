import mongoose from 'mongoose';
import { Material } from './Models/materialModel.js';
import { mongoDBURL } from './config.js';

const sampleMaterials = [
  {
    materialName: "NPK 20-20-20 Fertilizer",
    category: "Fertilizer",
    diseaseUsage: ["Plant Growth"],
    usageInstructions: "Apply 2-3 kg per acre. Mix with water and spray on crops during early growth stage. Repeat every 15 days.",
    unitType: "kg",
    pricePerUnit: 850,
    supplierName: "AgroFert Solutions",
    supplierContact: "+94 77 123 4567",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500"
  },
  {
    materialName: "Organic Compost",
    category: "Fertilizer",
    diseaseUsage: ["Plant Growth"],
    usageInstructions: "Apply 5-10 kg per plant. Mix with soil before planting or use as top dressing. Rich in organic matter.",
    unitType: "kg",
    pricePerUnit: 450,
    supplierName: "Green Earth Organics",
    supplierContact: "+94 71 234 5678",
    image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=500"
  },
  {
    materialName: "Urea Fertilizer",
    category: "Fertilizer",
    diseaseUsage: ["Plant Growth"],
    usageInstructions: "Apply 50-100 kg per acre. Broadcast before planting or as side dressing. High nitrogen content for leafy growth.",
    unitType: "kg",
    pricePerUnit: 650,
    supplierName: "FarmChem Industries",
    supplierContact: "+94 76 345 6789",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500"
  },
  {
    materialName: "Cypermethrin Insecticide",
    category: "Pesticide",
    diseaseUsage: ["Insect Control"],
    usageInstructions: "Mix 2ml per liter of water. Spray on affected plants. Effective against aphids, beetles, and caterpillars.",
    unitType: "liters",
    pricePerUnit: 1200,
    supplierName: "CropGuard Ltd",
    supplierContact: "+94 75 456 7890",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500"
  },
  {
    materialName: "Neem Oil Organic Pesticide",
    category: "Pesticide",
    diseaseUsage: ["Insect Control"],
    usageInstructions: "Mix 5ml per liter of water. Spray weekly. Natural pest control for organic farming. Safe for beneficial insects.",
    unitType: "liters",
    pricePerUnit: 950,
    supplierName: "BioAgro Solutions",
    supplierContact: "+94 72 567 8901",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500"
  },
  {
    materialName: "Chlorpyrifos Pesticide",
    category: "Pesticide",
    diseaseUsage: ["Insect Control"],
    usageInstructions: "Apply 2.5 liters per acre. Effective against soil insects, termites, and root pests. Use with caution.",
    unitType: "liters",
    pricePerUnit: 1500,
    supplierName: "AgriProtect Inc",
    supplierContact: "+94 78 678 9012",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500"
  },
  {
    materialName: "Glyphosate Herbicide",
    category: "Herbicide",
    diseaseUsage: ["Weed Killers"],
    usageInstructions: "Mix 30ml per liter of water. Spray directly on weeds. Non-selective herbicide. Avoid contact with crops.",
    unitType: "liters",
    pricePerUnit: 1100,
    supplierName: "WeedOut Solutions",
    supplierContact: "+94 74 789 0123",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=500"
  },
  {
    materialName: "2,4-D Selective Herbicide",
    category: "Herbicide",
    diseaseUsage: ["Weed Killers"],
    usageInstructions: "Apply 1-2 liters per acre. Controls broadleaf weeds in cereal crops. Safe for grasses when used correctly.",
    unitType: "liters",
    pricePerUnit: 850,
    supplierName: "CropCare Chemicals",
    supplierContact: "+94 73 890 1234",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500"
  },
  {
    materialName: "Potassium Sulphate",
    category: "Fertilizer",
    diseaseUsage: ["Plant Growth"],
    usageInstructions: "Apply 25-50 kg per acre. Improves fruit quality and disease resistance. Ideal for vegetables and fruits.",
    unitType: "kg",
    pricePerUnit: 1250,
    supplierName: "NutriGrow Fertilizers",
    supplierContact: "+94 77 901 2345",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=500"
  },
  {
    materialName: "Micronutrient Mix",
    category: "Fertilizer",
    diseaseUsage: ["Plant Growth"],
    usageInstructions: "Foliar spray: 2g per liter. Contains Zinc, Boron, Iron, Manganese. Prevents nutrient deficiency.",
    unitType: "packs",
    pricePerUnit: 350,
    supplierName: "MicroFert Pro",
    supplierContact: "+94 71 012 3456",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500"
  },
  {
    materialName: "Bacillus Thuringiensis (BT)",
    category: "Pesticide",
    diseaseUsage: ["Insect Control"],
    usageInstructions: "Mix 1g per liter. Biological pesticide for caterpillars. Safe for humans and environment. Organic certified.",
    unitType: "packs",
    pricePerUnit: 750,
    supplierName: "BioControl Systems",
    supplierContact: "+94 76 123 4567",
    image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=500"
  },
  {
    materialName: "Paraquat Herbicide",
    category: "Herbicide",
    diseaseUsage: ["Weed Killers"],
    usageInstructions: "Apply 2-3 liters per acre. Fast-acting contact herbicide. Use protective equipment. Keep away from water sources.",
    unitType: "liters",
    pricePerUnit: 1350,
    supplierName: "HerbControl Ltd",
    supplierContact: "+94 75 234 5678",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(mongoDBURL);
    console.log('Connected to MongoDB');

    const count = await Material.countDocuments();
    
    if (count > 0) {
      console.log(`Database already has ${count} materials. Skipping seed.`);
      console.log('To reseed, delete existing materials first.');
    } else {
      await Material.insertMany(sampleMaterials);
      console.log(`Successfully added ${sampleMaterials.length} materials to the database!`);
    }

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
