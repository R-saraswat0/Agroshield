# AgroShield Quick Start Guide

## Local Development Setup (5 minutes)

### Prerequisites
- Node.js 16+ installed
- MongoDB installed locally OR MongoDB Atlas account
- Git installed

### Step 1: Clone & Install (2 min)
```bash
# Clone repository
cd agro

# Install Backend
cd Backend
npm install

# Install Frontend
cd ../Frontend
npm install
```

### Step 2: Configure Environment (1 min)

**Backend (.env)**
```bash
cd Backend
# Copy example file
copy .env.example .env

# Edit .env with your values:
MONGODB_URI=mongodb://localhost:27017/agroshield
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=1h
PORT=5557
GEMINI_API_KEY=your_gemini_key_here
```

**Frontend (.env)**
```bash
cd Frontend
# Copy example file
copy .env.example .env

# Edit .env:
VITE_API_URL=http://localhost:5557
VITE_USE_DEMO_AUTH=false
```

### Step 3: Start MongoDB (if local)
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

### Step 4: Run Application (1 min)

**Terminal 1 - Backend:**
```bash
cd Backend
npm start
# Should see: "App is listening on port: 5557"
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
# Should see: "Local: http://localhost:5173"
```

### Step 5: Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5557

### Step 6: Create First User
1. Go to http://localhost:5173/register
2. Fill registration form
3. Click Register
4. Login at http://localhost:5173/login

### Step 7: Create Admin User (Optional)
```bash
# Connect to MongoDB
mongosh

# Switch to database
use agroshield

# Find your user
db.users.find({ email: "your@email.com" })

# Update role to admin
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)

# Verify
db.users.findOne({ email: "your@email.com" })
```

## Quick Test Checklist
- [ ] Backend running on port 5557
- [ ] Frontend running on port 5173
- [ ] Can register new user
- [ ] Can login
- [ ] Dashboard loads
- [ ] No console errors

## Common Issues

### Port already in use
```bash
# Windows - Kill process on port
netstat -ano | findstr :5557
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5557 | xargs kill -9
```

### MongoDB connection failed
- Ensure MongoDB is running
- Check connection string in .env
- Try: `mongosh` to test connection

### Module not found
```bash
# Reinstall dependencies
cd Backend
rm -rf node_modules package-lock.json
npm install

cd ../Frontend
rm -rf node_modules package-lock.json
npm install
```

### Gemini API not working
- Get key from: https://makersuite.google.com/app/apikey
- Add to Backend/.env
- Restart backend server

## Development Tips

### Hot Reload
- Frontend: Auto-reloads on file changes
- Backend: Install nodemon for auto-restart
  ```bash
  npm install -g nodemon
  nodemon index.js
  ```

### View Database
- MongoDB Compass: mongodb://localhost:27017
- Or use: `mongosh` command line

### API Testing
- Use Postman or Thunder Client
- Import collection from /docs (if available)

### Clear Database
```bash
mongosh
use agroshield
db.dropDatabase()
```

## Next Steps
- Read DEPLOYMENT.md for production deployment
- Check README.md for full documentation
- Review API endpoints in Backend/Routes/

## Need Help?
- Check console logs (F12 in browser)
- Review Backend terminal for errors
- Ensure all environment variables are set
- Verify MongoDB is running

Happy Coding! 🚀
