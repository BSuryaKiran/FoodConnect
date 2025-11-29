# FoodConnect - MongoDB Atlas Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (already configured)

### Installation Steps

1. **Install Frontend Dependencies**
```powershell
npm install
```

2. **Install Backend Dependencies**
```powershell
cd server
npm install
cd ..
```

### Running the Application

#### Option 1: Run Both Frontend and Backend Together (Recommended)
```powershell
npm start
```
This will start both the backend server (port 5000) and frontend dev server (port 3000) concurrently.

#### Option 2: Run Separately

**Terminal 1 - Backend Server:**
```powershell
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
npm run dev
```

### Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

### MongoDB Atlas Configuration
The application is connected to your MongoDB Atlas cluster:
- **Connection String**: Already configured in `server/.env`
- **Database Name**: `foodconnect`
- **Collections**: Users, Donations, Requests, Messages, Notifications

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile/:userId` - Get user profile

#### Donations
- `GET /api/donations/user/:userEmail` - Get user's donations
- `POST /api/donations` - Create donation
- `PATCH /api/donations/:id/status` - Update donation status
- `DELETE /api/donations/:id` - Delete donation

#### Requests
- `GET /api/requests/user/:userEmail` - Get user's requests
- `POST /api/requests` - Create request
- `PATCH /api/requests/:id/status` - Update request status
- `DELETE /api/requests/:id` - Delete request

#### Messages
- `GET /api/messages/user/:userEmail` - Get user's messages
- `POST /api/messages` - Create message
- `PATCH /api/messages/:id/read` - Mark as read
- `DELETE /api/messages/:id` - Delete message

#### Notifications
- `GET /api/notifications/user/:userEmail` - Get user's notifications
- `POST /api/notifications` - Create notification
- `PATCH /api/notifications/:id/read` - Mark as read
- `DELETE /api/notifications/user/:userEmail` - Clear all
- `DELETE /api/notifications/:id` - Delete notification

### Features Implemented

✅ **User Authentication**
- Registration with password hashing (bcrypt)
- Login with credential validation
- User type verification (donor, recipient, admin, analyst)
- Session management

✅ **Data Persistence**
- All data stored in MongoDB Atlas
- Real-time updates
- User-specific data isolation
- Automatic timestamps

✅ **Complete CRUD Operations**
- Users (Create, Read, Update)
- Donations (Create, Read, Update, Delete)
- Requests (Create, Read, Update, Delete)
- Messages (Create, Read, Delete)
- Notifications (Create, Read, Delete)

✅ **Delivery Fee System**
- Calculate fees based on distance and urgency
- Payment method selection
- Free food with paid delivery

### Database Schema

**Users Collection**
- email, password (hashed), name, type, phone, address, organization
- Indexed on: email, type

**Donations Collection**
- userId, userEmail, foodType, quantity, unit, expiryDate, location, description, status
- Indexed on: userId, userEmail, status

**Requests Collection**
- userId, userEmail, organization, foodType, quantity, urgency, deliveryFee, paymentMethod, status
- Indexed on: userId, userEmail, status

**Messages Collection**
- userId, userEmail, sender, subject, body, read, timestamp
- Indexed on: userId, userEmail, read

**Notifications Collection**
- userId, userEmail, message, type, read, timestamp
- Indexed on: userId, userEmail, read

### Troubleshooting

**Backend won't start:**
- Check if port 5000 is available
- Verify MongoDB connection string in `server/.env`
- Check MongoDB Atlas network access (whitelist IP: 0.0.0.0/0)

**Frontend can't connect to backend:**
- Ensure backend is running on port 5000
- Check proxy configuration in `vite.config.js`
- Verify API calls are using correct endpoints

**Database connection issues:**
- Verify MongoDB Atlas credentials
- Check network access settings in MongoDB Atlas
- Ensure database user has read/write permissions

### Environment Variables

**server/.env**
```
MONGODB_URI=mongodb+srv://2400030150_db_user:qFaR7yZjL0PxfbyM@fedf.cxedbt.mongodb.net/foodconnect?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

### Migration from localStorage

All previous localStorage data will need to be re-entered through the application. The new system:
- Stores data securely in MongoDB Atlas
- Provides better data persistence
- Enables multi-device access
- Supports user authentication
- Allows for future scalability

### Next Steps

1. Install dependencies: `npm install` (root) and `cd server && npm install`
2. Start application: `npm start` (from root)
3. Register new account
4. Start using the application with MongoDB Atlas storage!

### Support

For issues or questions:
1. Check MongoDB Atlas connection status
2. Verify all dependencies are installed
3. Check console logs for error messages
4. Ensure ports 3000 and 5000 are not blocked
