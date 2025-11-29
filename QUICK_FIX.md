# Quick Fix: Deploy Backend to Render

## The Problem
Your GitHub Pages frontend is trying to connect to `localhost:5000` which doesn't exist on other computers. You need to deploy your backend to a cloud server.

## Solution: Deploy to Render (5 minutes, FREE)

### Step-by-Step:

1. **Go to:** https://render.com/
2. **Sign Up/Login** with your GitHub account (BSuryaKiran)
3. Click **"New +"** → **"Web Service"**
4. Click **"Connect account"** to link GitHub
5. Select repository: **FoodConnect**
6. Fill in these settings:
   ```
   Name: foodconnect-api
   Region: Oregon (US West)
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

7. Click **"Advanced"** and add Environment Variable:
   ```
   Key: MONGODB_URI
   Value: mongodb+srv://2400030150_db_user:qFaR7yZjL0PxfbyM@fedf.cxedbt.mongodb.net/foodconnect?retryWrites=true&w=majority
   ```

8. Click **"Create Web Service"**

9. Wait 2-3 minutes for deployment

10. **COPY YOUR URL** (looks like: `https://foodconnect-api-xxxx.onrender.com`)

### Update Your Frontend:

After deployment, you'll get a URL like: `https://foodconnect-api-xxxx.onrender.com`

**Option 1 - Create .env file:**
```bash
# In project root (not in server folder)
echo VITE_API_URL=https://foodconnect-api-xxxx.onrender.com/api > .env
```

**Option 2 - Update api.js directly:**
Open `src/services/api.js` and change line 9:
```javascript
const API_BASE_URL = 'https://foodconnect-api-xxxx.onrender.com/api';
```

### Rebuild and Deploy:
```bash
npm run build
npm run deploy
```

### Push to GitHub:
```bash
git add .
git commit -m "Add backend deployment configuration"
git push origin main
```

## Done! 
Your app will now work on any device! 🎉

## Need Help?
- Render Dashboard: https://dashboard.render.com/
- Check logs if something goes wrong
- Free tier sleeps after 15 min (wakes up on first request, takes ~30 seconds)
