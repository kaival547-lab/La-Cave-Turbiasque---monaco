# 🍽️ La Cave Turbiasque - Backend API

Express.js backend for the bistro website with MongoDB database and JWT authentication.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
# Copy the example file
copy env.example .env

# Edit .env and add your MongoDB URI and other credentials
```

### 3. Configure MongoDB
Follow the [MongoDB Setup Guide](../brain/mongodb_setup_guide.md) to:
- Create free MongoDB Atlas account
- Get your connection string
- Add it to `.env` file

### 4. Seed the Database
```bash
npm run seed
```

### 5. Start the Server
```bash
# Development mode (auto-restart)
npm run dev

# Production mode
npm start
```

Server will run at: **http://localhost:5000**

---

## 📁 Project Structure

```
backend/
├── config/
│   ├── db.js              # MongoDB connection
│   └── cloudinary.js      # Image upload config
├── models/
│   ├── User.js            # User schema
│   ├── MenuItem.js        # Menu item schema
│   ├── Reservation.js     # Reservation schema
│   └── Review.js          # Review schema
├── controllers/
│   ├── authController.js  # Authentication logic
│   └── menuController.js  # Menu CRUD operations
├── routes/
│   ├── auth.js            # Auth endpoints
│   └── menu.js            # Menu endpoints
├── middleware/
│   └── auth.js            # JWT verification
├── scripts/
│   └── seedMenu.js        # Database seeding
├── server.js              # Main Express server
├── package.json           # Dependencies
└── .env                   # Environment variables (create this!)
```

---

## 🛣️ API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Menu (`/api/menu`)
- `GET /api/menu` - Get all menu items
- `GET /api/menu/popular/items` - Get popular items
- `GET /api/menu/category/:category` - Get items by category
- `GET /api/menu/:id` - Get single item
- `POST /api/menu` - Create item (admin only)
- `PUT /api/menu/:id` - Update item (admin only)
- `DELETE /api/menu/:id` - Delete item (admin only)

---

## 🧪 Testing the API

### Using Browser
Visit: `http://localhost:5000/api/menu`

### Using curl
```bash
# Get all menu items
curl http://localhost:5000/api/menu

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

## 🔐 Environment Variables

Create a `.env` file with:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bistro

# JWT
JWT_SECRET=your_super_secret_key_here

# Cloudinary (optional for now)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend
FRONTEND_URL=http://localhost:3000
```

---

## 📦 Dependencies

### Production
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variables
- `cors` - Cross-origin resource sharing
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `express-validator` - Input validation
- `multer` - File uploads
- `cloudinary` - Image storage
- `nodemailer` - Email sending

### Development
- `nodemon` - Auto-restart server

---

## 🗄️ Database Models

### User
- Email/password authentication
- Role-based access (user/admin)
- Password hashing with bcrypt

### MenuItem
- Name, description, price
- Category (appetizers, mains, desserts, etc.)
- Dietary tags (vegetarian, vegan, etc.)
- Popularity and availability flags

### Reservation
- Guest details (name, email, phone)
- Date, time, number of guests
- Special requests
- Status tracking (pending/confirmed/cancelled)

### Review
- Customer rating (1-5 stars)
- Comment text
- Approval workflow for moderation

---

## 🔒 Authentication

Uses JWT (JSON Web Tokens) for authentication:

1. User registers/logs in
2. Server generates JWT token
3. Client stores token
4. Client sends token in Authorization header
5. Server verifies token for protected routes

**Protected routes require**:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🛠️ Available Scripts

```bash
npm start       # Start production server
npm run dev     # Start development server (auto-restart)
npm run seed    # Seed database with sample data
```

---

## 📚 Documentation

- [Backend Walkthrough](../brain/backend_walkthrough.md) - Complete implementation guide
- [MongoDB Setup Guide](../brain/mongodb_setup_guide.md) - Database setup instructions

---

## 🐛 Troubleshooting

### Server won't start
- Check MongoDB connection string in `.env`
- Ensure MongoDB Atlas IP whitelist includes your IP
- Verify all dependencies are installed

### "MongoServerError: bad auth"
- Check username/password in connection string
- Ensure database user is created in MongoDB Atlas

### CORS errors
- Verify `FRONTEND_URL` in `.env` matches your frontend URL
- Check CORS configuration in `server.js`

---

## 🎯 Next Steps

1. ✅ Set up MongoDB Atlas
2. ✅ Test API endpoints
3. ⏳ Connect frontend to backend
4. ⏳ Build admin panel
5. ⏳ Add reservation system
6. ⏳ Add review system
7. ⏳ Deploy to production

---

## 📞 Support

For issues or questions, refer to the comprehensive guides in the `brain/` folder.

---

**Built with ❤️ for La Cave Turbiasque**
