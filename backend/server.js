const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./src/config/database');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Test Route
app.get('/', (req, res) => {
  res.json({ message: '✅ Library Backend is running!' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Routes (will be added gradually)
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/books', require('./src/routes/bookRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/borrows', require('./src/routes/borrowRoutes'));
app.use('/api/reservations', require('./src/routes/reservationRoutes'));
app.use('/api/dashboard', require('./src/routes/dashboardRoutes'));

// Sync Database & Start Server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');

    // Sync models (use force: true only in development)
    await sequelize.sync({ alter: true }); 
    console.log('✅ Models synchronized');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to database:', error);
  }
};

startServer();