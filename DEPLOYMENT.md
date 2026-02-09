# AgroShield Production Deployment Guide

## 🎯 Overview

Deploy AgroShield for **FREE** using:
- **Backend**: Render.com (Free tier)
- **Frontend**: Vercel (Free tier)
- **Database**: MongoDB Atlas (Free tier)

**Total Cost**: $0/month

---

## 📋 Prerequisites

- GitHub account
- MongoDB Atlas account
- Render account
- Vercel account
- Gemini API key

---

## Part 1: Database Setup (5 minutes)

### Step 1: Create MongoDB Atlas Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Login
3. Click **"Build a Database"**
4. Select **"M0 FREE"** tier
5. Choose cloud provider and region (closest to you)
6. Cluster Name: `agroshield`
7. Click **"Create"**

### Step 2: Create Database User

1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Username: `agroshield_user`
4. Password: Generate strong password (save it!)
5. Database User Privileges: **"Read and write to any database"**
6. Click **"Add User"**

### Step 3: Configure Network Access

1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"**
4. IP Address: `0.0.0.0/0`
5. Click **"Confirm"**

### Step 4: Get Connection String

1. Go to **"Database"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Select **"Connect your application"**
4. Copy connection string
5. Replace `<password>` with your database password
6. Replace `<dbname>` with `agroshield`

**Example**:
```
mongodb+srv://agroshield_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/agroshield?retryWrites=true&w=majority
```

✅ **Save this connection string - you'll need it!**

---

## Part 2: Backend Deployment (10 minutes)

### Step 1: Prepare Backend

1. Ensure your code is pushed to GitHub
2. Make sure `.env` is in `.gitignore` (already done)

### Step 2: Deploy to Render

1. Go to https://render.com
2. Sign up / Login with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Select the repository

### Step 3: Configure Service

**Basic Settings:**
- Name: `agroshield-backend`
- Region: Choose closest to you
- Branch: `main` (or your default branch)
- Root Directory: `Backend`
- Runtime: `Node`
- Build Command: `npm install`
- Start Command: `npm start`

**Instance Type:**
- Select: **"Free"**

### Step 4: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `JWT_EXPIRE` | `1h` |
| `PORT` | `5557` |
| `GEMINI_API_KEY` | Your Gemini API key |

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Once deployed, copy your backend URL
   - Example: `https://agroshield-backend.onrender.com`

### Step 6: Update CORS (Important!)

After deployment, update `Backend/index.js`:

```javascript
app.use(cors({
  origin: [
    'https://your-frontend-url.vercel.app', // Add after frontend deployment
    'http://localhost:5173'
  ],
  credentials: true
}));
```

Commit and push changes. Render will auto-redeploy.

✅ **Backend deployed! Save your backend URL.**

---

## Part 3: Frontend Deployment (5 minutes)

### Step 1: Create Production Environment

Create `Frontend/.env.production`:

```env
VITE_API_URL=https://your-backend-url.onrender.com
VITE_USE_DEMO_AUTH=false
```

Replace with your actual backend URL from Part 2.

### Step 2: Commit Changes

```bash
git add Frontend/.env.production
git commit -m "Add production environment"
git push
```

### Step 3: Deploy to Vercel

1. Go to https://vercel.com
2. Sign up / Login with GitHub
3. Click **"Add New"** → **"Project"**
4. Import your GitHub repository
5. Click **"Import"**

### Step 4: Configure Project

**Framework Preset**: Vite
**Root Directory**: `Frontend`
**Build Command**: `npm run build`
**Output Directory**: `dist`

### Step 5: Add Environment Variables

Click **"Environment Variables"**

Add:
| Name | Value |
|------|-------|
| `VITE_API_URL` | Your backend URL (e.g., `https://agroshield-backend.onrender.com`) |
| `VITE_USE_DEMO_AUTH` | `false` |

### Step 6: Deploy

1. Click **"Deploy"**
2. Wait for deployment (2-3 minutes)
3. Copy your frontend URL
   - Example: `https://agroshield.vercel.app`

✅ **Frontend deployed!**

---

## Part 4: Post-Deployment Setup (5 minutes)

### Step 1: Update Backend CORS

Update `Backend/index.js` with your Vercel URL:

```javascript
app.use(cors({
  origin: [
    'https://agroshield.vercel.app', // Your actual Vercel URL
    'http://localhost:5173'
  ],
  credentials: true
}));
```

Commit and push. Render will auto-redeploy.

### Step 2: Test Your Application

1. Visit your Vercel URL
2. Click **"Register"**
3. Create a new account
4. Login

### Step 3: Create Admin User

1. Connect to MongoDB Atlas:
   - Go to **"Database"** → **"Browse Collections"**
   - Or use MongoDB Compass with your connection string

2. Find your user in `agroshield.users` collection

3. Update the user:
   ```javascript
   // In MongoDB Compass or Atlas
   {
     "role": "admin"  // Change from "farmer" to "admin"
   }
   ```

4. Logout and login again
5. You should now see the Admin Dashboard

✅ **Deployment Complete!**

---

## 🧪 Testing Checklist

Test these features:

- [ ] User registration works
- [ ] User login works
- [ ] Admin dashboard loads
- [ ] User management works
- [ ] Article creation works
- [ ] AI treatment form works
- [ ] Material marketplace works
- [ ] No console errors

---

## 🔧 Troubleshooting

### Backend Issues

**"Application failed to respond"**
- Check Render logs
- Verify environment variables
- Ensure MongoDB connection string is correct

**"Cannot connect to database"**
- Verify MongoDB Atlas IP whitelist (0.0.0.0/0)
- Check database user credentials
- Test connection string locally first

### Frontend Issues

**"Network Error" or "Failed to fetch"**
- Verify `VITE_API_URL` is correct
- Check backend CORS configuration
- Ensure backend is running

**"Unauthorized" errors**
- Clear browser cache and cookies
- Check JWT_SECRET is set in backend
- Try registering a new user

### CORS Errors

Update `Backend/index.js`:
```javascript
app.use(cors({
  origin: '*', // Temporary - for testing only
  credentials: true
}));
```

Then narrow it down to specific domains once working.

---

## 🔄 Redeployment

### Backend Changes
```bash
git add .
git commit -m "Update backend"
git push
```
Render auto-deploys on push.

### Frontend Changes
```bash
git add .
git commit -m "Update frontend"
git push
```
Vercel auto-deploys on push.

### Environment Variable Changes
- **Render**: Dashboard → Environment → Edit → Save → Manual Deploy
- **Vercel**: Settings → Environment Variables → Edit → Redeploy

---

## 📊 Monitoring

### Render Dashboard
- View logs: Dashboard → Logs
- Check metrics: Dashboard → Metrics
- Manual deploy: Dashboard → Manual Deploy

### Vercel Dashboard
- View deployments: Project → Deployments
- Check analytics: Project → Analytics
- View logs: Deployment → Build Logs

### MongoDB Atlas
- Monitor usage: Dashboard → Metrics
- View collections: Database → Browse Collections
- Check performance: Performance Advisor

---

## 🎉 Success!

Your AgroShield application is now live!

**URLs to save:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com`
- Database: MongoDB Atlas Dashboard

**Next Steps:**
- Share your app URL
- Monitor usage and performance
- Add more features
- Collect user feedback

---

## 📞 Need Help?

- Check [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- Review [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
- Check Render/Vercel documentation
- Review application logs

---

**Deployment Time**: ~25 minutes  
**Cost**: $0/month  
**Status**: Production Ready ✅
