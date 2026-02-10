# Seed Production Database with Sample Materials

## 🚀 Quick Method - Using Browser or Postman

### Option 1: Using Browser
1. Open your browser
2. Navigate to: `https://your-backend-url.com/api/seed-materials`
3. You'll see a JSON response confirming the materials were added

### Option 2: Using Postman or Thunder Client
1. Create a new POST request
2. URL: `https://your-backend-url.com/api/seed-materials`
3. Method: POST
4. Click Send
5. You'll receive a success response with all 12 materials

### Option 3: Using cURL (Command Line)
```bash
curl -X POST https://your-backend-url.com/api/seed-materials
```

### Option 4: Using JavaScript Fetch (Browser Console)
```javascript
fetch('https://your-backend-url.com/api/seed-materials', {
  method: 'POST'
})
.then(res => res.json())
.then(data => console.log(data));
```

## 📋 What Gets Added

12 agricultural materials will be added:
- 5 Fertilizers (NPK, Organic Compost, Urea, Potassium Sulphate, Micronutrient Mix)
- 4 Pesticides (Cypermethrin, Neem Oil, Chlorpyrifos, BT)
- 3 Herbicides (Glyphosate, 2,4-D, Paraquat)

## ✅ Success Response
```json
{
  "message": "Successfully seeded materials!",
  "count": 12,
  "materials": [...]
}
```

## ⚠️ Already Seeded Response
```json
{
  "message": "Database already has X materials. Seeding skipped.",
  "existingCount": X
}
```

## 🔒 Security Note
- This endpoint is public for easy one-time seeding
- After seeding, you can optionally remove the route from production
- The endpoint won't duplicate data if materials already exist

## 🗑️ To Clear and Re-seed (if needed)

If you need to clear materials and re-seed:

1. Delete all materials via MongoDB Atlas:
   - Go to MongoDB Atlas Dashboard
   - Browse Collections → materials
   - Delete all documents

2. Call the seed endpoint again

## 📝 After Deployment

1. Deploy your backend with the new seedRoute
2. Call the endpoint once: `POST https://your-backend-url.com/api/seed-materials`
3. Verify materials appear in your AgriStore
4. Done! ✅

## 🔗 Your Backend URLs

Replace `your-backend-url.com` with your actual backend URL:
- Render: `https://your-app-name.onrender.com`
- Heroku: `https://your-app-name.herokuapp.com`
- Railway: `https://your-app-name.up.railway.app`

Example:
```
POST https://agroshield-backend.onrender.com/api/seed-materials
```
