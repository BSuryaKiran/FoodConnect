# FoodConnect Backend Deployment Guide

## Deploy to Render (Free Tier)

### Step 1: Prepare the Backend
Your backend is already configured and ready to deploy!

### Step 2: Deploy to Render

1. **Go to Render:** https://render.com/
2. **Sign up/Login** with your GitHub account
3. **Click "New +"** and select **"Web Service"**
4. **Connect your GitHub repository:** BSuryaKiran/FoodConnect
5. **Configure the service:**
   - **Name:** foodconnect-api
   - **Region:** Choose closest to your users
   - **Branch:** main
   - **Root Directory:** server
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

6. **Add Environment Variables:**
   Click "Advanced" and add:
   ```
   MONGODB_URI=mongodb+srv://2400030150_db_user:qFaR7yZjL0PxfbyM@fedf.cxedbt.mongodb.net/foodconnect?retryWrites=true&w=majority
   NODE_ENV=production
   PORT=5000
   ```

7. **Click "Create Web Service"**

8. **Wait for deployment** (takes 2-3 minutes)

9. **Copy your service URL** (e.g., `https://foodconnect-api.onrender.com`)

### Step 3: Update Frontend Configuration

After deployment, update the API URL in your frontend:

**Option A - Set Environment Variable:**
Create `.env` file in project root:
```
VITE_API_URL=https://your-deployed-backend-url.onrender.com/api
```

**Option B - Update api.js directly:**
Replace the URL in `src/services/api.js`:
```javascript
const API_BASE_URL = 'https://your-deployed-backend-url.onrender.com/api';
```

### Step 4: Rebuild and Redeploy Frontend

```bash
npm run build
npm run deploy
```

## Alternative: Deploy to Railway

1. **Go to Railway:** https://railway.app/
2. **Sign up with GitHub**
3. **New Project** → **Deploy from GitHub repo**
4. **Select:** BSuryaKiran/FoodConnect
5. **Configure:**
   - Root Directory: `/server`
   - Start Command: `npm start`
6. **Add Environment Variables** (same as above)
7. **Deploy**

## Alternative: Deploy to Heroku

```bash
# Install Heroku CLI
# Login
heroku login

# Create app
cd server
heroku create foodconnect-api

# Set environment variables
heroku config:set MONGODB_URI="mongodb+srv://2400030150_db_user:qFaR7yZjL0PxfbyM@fedf.cxedbt.mongodb.net/foodconnect?retryWrites=true&w=majority"

# Deploy
git init
git add .
git commit -m "Deploy backend"
heroku git:remote -a foodconnect-api
git push heroku main
```

## Quick Fix for GitHub Pages

If you want to test immediately, you can temporarily use a CORS proxy:

Update `src/services/api.js`:
```javascript
const API_BASE_URL = 'https://cors-anywhere.herokuapp.com/https://your-backend-url';
```

**Note:** This is only for testing. Deploy your backend properly for production.

## Verify Backend is Running

After deployment, test your backend:
```bash
curl https://your-backend-url.onrender.com/api/health
```

You should see:
```json
{
  "status": "OK",
  "message": "FoodConnect API is running",
  "database": "Connected"
}
```

## Update Frontend After Backend Deployment

1. Get your deployed backend URL
2. Update `.env` or `api.js` with the URL
3. Commit changes:
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push origin main
   ```
4. Redeploy frontend:
   ```bash
   npm run build
   npm run deploy
   ```

## Troubleshooting

### CORS Errors
Make sure your backend's CORS is configured to allow your GitHub Pages domain:
```javascript
app.use(cors({
  origin: ['https://bsuryakiran.github.io', 'http://localhost:5173'],
  credentials: true
}));
```

### Database Connection Issues
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check environment variables are set correctly
- Verify connection string is correct

### API Not Responding
- Check Render logs for errors
- Verify service is running (not sleeping)
- Free tier services sleep after 15 min inactivity

## Current Status

✅ Backend code ready for deployment
✅ MongoDB Atlas configured
✅ Frontend configured to use deployed backend
⚠️ **ACTION REQUIRED:** Deploy backend to Render/Railway/Heroku

Once deployed, your app will work on any device!
