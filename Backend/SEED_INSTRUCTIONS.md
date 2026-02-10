# Seeding AgriStore with Sample Materials

## Quick Start

To populate your AgriStore with 12 sample agricultural materials, run:

```bash
cd Backend
npm run seed
```

## What Gets Added

The seed script adds 12 agricultural materials:

### Fertilizers (5 items)
1. **NPK 20-20-20 Fertilizer** - Rs. 850/kg
2. **Organic Compost** - Rs. 450/kg
3. **Urea Fertilizer** - Rs. 650/kg
4. **Potassium Sulphate** - Rs. 1,250/kg
5. **Micronutrient Mix** - Rs. 350/pack

### Pesticides (4 items)
1. **Cypermethrin Insecticide** - Rs. 1,200/liter
2. **Neem Oil Organic Pesticide** - Rs. 950/liter
3. **Chlorpyrifos Pesticide** - Rs. 1,500/liter
4. **Bacillus Thuringiensis (BT)** - Rs. 750/pack

### Herbicides (3 items)
1. **Glyphosate Herbicide** - Rs. 1,100/liter
2. **2,4-D Selective Herbicide** - Rs. 850/liter
3. **Paraquat Herbicide** - Rs. 1,350/liter

## Features

- ✅ Complete product information (name, category, usage, price)
- ✅ Realistic supplier details
- ✅ Product images from Unsplash
- ✅ Usage instructions for each material
- ✅ Safe to run multiple times (won't duplicate data)

## Manual Seeding

If you prefer to add materials manually, use the "Create Material" button in the AgriStore section.

## Clearing Data

To clear all materials and reseed:

```bash
# Connect to MongoDB
mongosh

# Use your database
use agroshield

# Delete all materials
db.materials.deleteMany({})

# Exit
exit

# Run seed again
npm run seed
```

## Notes

- The script checks if materials already exist before seeding
- All materials have realistic Sri Lankan supplier contacts
- Images are sourced from Unsplash (free to use)
- Prices are in Sri Lankan Rupees (Rs.)
