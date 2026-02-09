# AgroShield Production Deployment Checklist

## Pre-Deployment

### Backend Setup
- [ ] MongoDB Atlas cluster created
- [ ] Database user created with strong password
- [ ] IP whitelist configured (0.0.0.0/0 for cloud deployment)
- [ ] Connection string obtained
- [ ] Gemini API key obtained from https://makersuite.google.com/app/apikey
- [ ] Strong JWT_SECRET generated (use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

### Environment Variables
- [ ] Backend .env configured with production values
- [ ] Frontend .env.production created with production API URL
- [ ] All sensitive keys secured (not in git)

### Code Updates
- [ ] All hardcoded localhost URLs updated to use API_URL
- [ ] Error handling added to critical components
- [ ] Loading states implemented
- [ ] Form validations in place

## Backend Deployment (Render/Railway)

### Render.com Steps
1. [ ] Create account at https://render.com
2. [ ] Click "New +" → "Web Service"
3. [ ] Connect GitHub repository
4. [ ] Configure:
   - Name: agroshield-backend
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `node index.js`
   - Instance Type: Free
5. [ ] Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agroshield
   JWT_SECRET=your_generated_secret
   JWT_EXPIRE=1h
   PORT=5557
   GEMINI_API_KEY=your_gemini_key
   ```
6. [ ] Deploy
7. [ ] Copy backend URL (e.g., https://agroshield-backend.onrender.com)
8. [ ] Test endpoints with Postman

### Update CORS
- [ ] Update Backend index.js CORS configuration:
```javascript
app.use(cors({
  origin: ['https://your-frontend-url.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

## Frontend Deployment (Vercel)

### Vercel Steps
1. [ ] Create account at https://vercel.com
2. [ ] Click "Add New" → "Project"
3. [ ] Import GitHub repository
4. [ ] Configure:
   - Framework Preset: Vite
   - Root Directory: Frontend
   - Build Command: `npm run build`
   - Output Directory: dist
5. [ ] Add Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   VITE_USE_DEMO_AUTH=false
   ```
6. [ ] Deploy
7. [ ] Copy frontend URL

## Post-Deployment Testing

### Backend Tests
- [ ] GET /api/users/count - Returns user count
- [ ] GET /api/articles/count - Returns article count
- [ ] POST /api/auth/register - Creates new user
- [ ] POST /api/auth/login - Returns JWT token
- [ ] GET /api/activities/recent - Returns activities
- [ ] POST /ai/treatment - Returns AI recommendations

### Frontend Tests
- [ ] Registration works
- [ ] Login works
- [ ] Admin dashboard loads
- [ ] User management works
- [ ] Article creation works
- [ ] AI treatment form works
- [ ] Material marketplace works
- [ ] All images load correctly

### Create Admin User
1. [ ] Register a new user via frontend
2. [ ] Connect to MongoDB Atlas
3. [ ] Find user in database
4. [ ] Update role field to "admin"
5. [ ] Login with admin credentials
6. [ ] Verify admin dashboard access

## Performance & Security

- [ ] Enable HTTPS (automatic on Vercel/Render)
- [ ] Test on mobile devices
- [ ] Check page load times
- [ ] Verify all API calls use HTTPS
- [ ] Test error scenarios
- [ ] Check browser console for errors

## Monitoring

- [ ] Set up Render dashboard monitoring
- [ ] Monitor MongoDB Atlas metrics
- [ ] Check Vercel analytics
- [ ] Set up error logging (optional: Sentry)

## Backup Plan

- [ ] Document rollback procedure
- [ ] Keep local development environment working
- [ ] Export MongoDB data regularly
- [ ] Keep .env files backed up securely

## Final Steps

- [ ] Update README with production URLs
- [ ] Document any deployment issues
- [ ] Share credentials securely with team
- [ ] Celebrate successful deployment! 🎉

## Common Issues & Solutions

### Backend won't start
- Check environment variables are set correctly
- Verify MongoDB connection string format
- Check Render logs for errors

### Frontend can't connect to backend
- Verify VITE_API_URL is correct
- Check CORS configuration
- Ensure backend is running

### Database connection fails
- Verify IP whitelist includes 0.0.0.0/0
- Check username/password in connection string
- Ensure database user has correct permissions

### AI treatment not working
- Verify GEMINI_API_KEY is set
- Check API key is valid
- Review backend logs for errors
