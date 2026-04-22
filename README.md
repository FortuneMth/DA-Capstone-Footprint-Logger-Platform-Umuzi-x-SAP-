# 🌱 EcoTrack - Carbon Footprint Logger Platform

A comprehensive full-stack carbon footprint tracking application built for the Umuzi x SAP Data Analytics Capstone Project. Track your daily activities, monitor your environmental impact, and compare with community averages to make informed sustainability decisions.

![EcoTrack Dashboard](https://img.shields.io/badge/Status-Active-success?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square)
![React](https://img.shields.io/badge/React-18+-61dafb?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square)

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication with secure password hashing (bcrypt)
- Protected API endpoints with automatic token refresh
- Auto-logout on authentication failures

### 📊 Dashboard & Analytics
- Real-time carbon footprint tracking dashboard
- Interactive charts showing daily and category-wise emissions
- Community comparison metrics and weekly averages
- Progress tracking with visual indicators

### 📝 Activity Logging
- Comprehensive activity logging system
- Pre-defined activity categories with CO2 calculations
- CRUD operations for managing logged activities
- Date-based filtering and organization

### 🎨 User Experience
- Responsive SaaS design with blue-and-white theme
- Modular React components for maintainability
- Toast notifications for user feedback
- Mobile-friendly interface

### 🧪 Testing & Quality
- Unit test coverage for CO2 calculation utilities
- Consistent API response format
- Error handling and validation

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework with hooks
- **Vite** - Fast build tool and development server
- **Recharts** - Declarative charting library
- **CSS3** - Custom styling with responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcrypt** - Password hashing

### Development & Testing
- **Jest** - JavaScript testing framework
- **Nodemon** - Development auto-restart
- **ESLint** - Code linting

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB Atlas** account - [Sign up here](https://www.mongodb.com/atlas)
- **Git** - [Download here](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/FortuneMth/DA-Capstone-Footprint-Logger-Platform-Umuzi-x-SAP-.git
cd DA-Capstone-Footprint-Logger-Platform-Umuzi-x-SAP-
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `server/.env` with your configuration:

```env
MONGO_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/ecotrack?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-jwt-secret-here
PORT=5000
```

### 3. Frontend Setup

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install
```

### 4. Database Configuration

1. Create a MongoDB Atlas cluster
2. Whitelist your IP address (or use `0.0.0.0/0` for development)
3. Create a database user with read/write permissions
4. Copy the connection string to your `.env` file

## 🎯 Usage

### Development Mode

Run both frontend and backend simultaneously:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

Visit `http://localhost:5173` to access the application.

### Production Build

```bash
# Build frontend
cd client
npm run build

# Start backend
cd ../server
npm start
```

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| GET | `/api/health` | Health check |

### Activity Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/activities` | Get user's activities |
| POST | `/api/activities` | Create new activity |
| PUT | `/api/activities/:id` | Update activity |
| DELETE | `/api/activities/:id` | Delete activity |

### Statistics Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats/dashboard` | Dashboard statistics |
| GET | `/api/stats/community` | Community averages |

### API Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful"
}
```

## 📁 Project Structure

```
EcoTrack/
├── client/                          # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── charts/
│   │   │   │   ├── CategoryPieChart.jsx
│   │   │   │   └── DailyBarChart.jsx
│   │   │   ├── common/
│   │   │   │   ├── ProgressBar.jsx
│   │   │   │   ├── StatCard.jsx
│   │   │   │   └── Toast.jsx
│   │   │   ├── dashboard/
│   │   │   │   └── DashboardView.jsx
│   │   │   ├── insights/
│   │   │   │   └── InsightsView.jsx
│   │   │   ├── layout/
│   │   │   │   ├── AppHeader.jsx
│   │   │   │   └── AuthView.jsx
│   │   │   └── log/
│   │   │       └── ActivityForm.jsx
│   │   ├── constants/
│   │   │   └── activities.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── format.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── package.json
│   └── vite.config.js
├── server/                          # Express backend
│   ├── controllers/
│   │   ├── activityController.js
│   │   ├── authController.js
│   │   └── statsController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Activity.js
│   │   └── User.js
│   ├── routes/
│   │   ├── activity.js
│   │   ├── auth.js
│   │   └── stats.js
│   ├── utils/
│   │   ├── asyncHandler.js
│   │   ├── co2.js
│   │   ├── co2.test.js
│   │   └── response.js
│   ├── package.json
│   ├── server.js
│   └── .env.example
├── .gitignore
└── README.md
```

## 🧪 Testing

Run the test suite:

```bash
cd server
npm test
```

Current test coverage:
- `server/utils/co2.test.js` - CO2 calculation utilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow ESLint configuration
- Write tests for new features
- Use conventional commit messages
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Fortune Mthembu**
- GitHub: [@FortuneMth](https://github.com/FortuneMth)
- Project: Umuzi x SAP Data Analytics Capstone

## 🙏 Acknowledgments

- Umuzi and SAP for the capstone project opportunity
- MongoDB Atlas for database hosting
- The open-source community for amazing tools and libraries

---

**Made with ❤️ for a sustainable future**

Built by `Fortune` with Cursor-assisted development.
