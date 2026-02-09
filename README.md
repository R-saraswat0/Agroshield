# AgroShield - Smart Agriculture Management System

> Modern agricultural management platform with AI-powered disease treatment recommendations

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-green.svg)](https://www.mongodb.com/)

## 🌾 Features

- **Multi-Role Authentication** - Farmer, Admin, Manager, Supplier roles
- **AI Treatment Recommendations** - Powered by Google Gemini AI
- **Article Management** - Create, edit, and share agricultural content
- **Material Marketplace** - Buy and sell agricultural materials
- **User Management** - Complete admin dashboard with analytics
- **Real-time Activity Tracking** - Monitor user actions and engagement
- **Report Generation** - Export data in PDF, CSV, and JSON formats

## 🚀 Quick Start

### Prerequisites
- Node.js 16 or higher
- MongoDB (local or Atlas)
- Gemini API key ([Get it here](https://makersuite.google.com/app/apikey))

### Installation

```bash
# Clone repository
cd agro

# Backend setup
cd Backend
npm install
cp .env.example .env
# Edit .env with your credentials

# Frontend setup
cd ../Frontend
npm install
cp .env.example .env
# Edit .env with backend URL

# Start MongoDB (if local)
# Windows: net start MongoDB
# Mac/Linux: sudo systemctl start mongod

# Run Backend (Terminal 1)
cd Backend
npm start

# Run Frontend (Terminal 2)
cd Frontend
npm run dev
```

Visit: http://localhost:5173

📖 **Detailed guide**: See [QUICKSTART.md](./QUICKSTART.md)

## 🌐 Production Deployment

### Recommended Stack (100% Free)
- **Backend**: Render.com
- **Frontend**: Vercel
- **Database**: MongoDB Atlas

### Quick Deploy Steps

1. **Setup MongoDB Atlas**
   - Create free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Get connection string
   - Whitelist IP: 0.0.0.0/0

2. **Deploy Backend to Render**
   - Connect GitHub repo
   - Add environment variables
   - Deploy

3. **Deploy Frontend to Vercel**
   - Connect GitHub repo
   - Add `VITE_API_URL` with backend URL
   - Deploy

📋 **Complete guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)  
✅ **Checklist**: See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

## 📁 Project Structure

```
agro/
├── Backend/              # Node.js + Express API
│   ├── Models/          # MongoDB schemas
│   ├── Routes/          # API endpoints
│   ├── Middleware/      # Auth middleware
│   └── index.js         # Entry point
├── Frontend/            # React + Vite
│   └── src/
│       ├── Pages/       # Page components
│       ├── components/  # Reusable components
│       └── config/      # Configuration
└── Documentation files
```

## 🔑 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/agroshield
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=1h
PORT=5557
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5557
VITE_USE_DEMO_AUTH=false
```

## 🛠️ Tech Stack

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Google Gemini AI
- Multer (file uploads)

**Frontend**
- React 18 + Vite
- Tailwind CSS
- Framer Motion
- React Router
- Axios
- Material-UI

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/count` - Get user count
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Articles
- `GET /api/articles` - Get all articles
- `POST /api/articles` - Create article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article

### AI Treatment
- `POST /ai/treatment` - Get AI recommendations

[View all endpoints →](./PROJECT_SUMMARY.md#-api-endpoints)

## 👥 User Roles

- **Farmer** - Submit inquiries, view articles, buy materials
- **Admin** - Full system access, user management, analytics
- **Manager** - Respond to inquiries, create alerts
- **Supplier** - Manage materials, view analytics

## 🔐 Security

- JWT token authentication
- Password hashing with bcrypt
- Environment variable protection
- CORS configuration
- Role-based access control

## 📊 Default Admin Setup

After registration, create admin user:

```bash
mongosh
use agroshield
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

## 🐛 Troubleshooting

**Port already in use**
```bash
# Windows
netstat -ano | findstr :5557
taskkill /PID <PID> /F
```

**MongoDB connection failed**
- Ensure MongoDB is running
- Check connection string in .env

**Gemini API not working**
- Verify API key in Backend/.env
- Check quota at [Google AI Studio](https://makersuite.google.com/)

## 📖 Documentation

- [QUICKSTART.md](./QUICKSTART.md) - 5-minute setup guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Production deployment
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Deployment steps
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Complete overview

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google Gemini AI for treatment recommendations
- MongoDB Atlas for database hosting
- Render & Vercel for free hosting

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for detailed info

---

**Built with ❤️ for modern agriculture**

**Status**: ✅ Production Ready | **Version**: 1.0.0
