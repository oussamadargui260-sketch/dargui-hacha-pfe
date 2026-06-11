const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
  }
);

// Import models as functions
const UserModel = require('../models/User');
const BookModel = require('../models/Book');
const BorrowModel = require('../models/Borrow');
const ReservationModel = require('../models/Reservation');



// Initialize models
const User = UserModel(sequelize);
const Book = BookModel(sequelize);
const Borrow = BorrowModel(sequelize);
const Reservation = ReservationModel(sequelize);



// ... previous code



// Add associations
User.hasMany(Borrow, { foreignKey: 'userId' });
Borrow.belongsTo(User, { foreignKey: 'userId' });

Book.hasMany(Borrow, { foreignKey: 'bookId' });
Borrow.belongsTo(Book, { foreignKey: 'bookId' });

User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

Book.hasMany(Reservation, { foreignKey: 'bookId' });
Reservation.belongsTo(Book, { foreignKey: 'bookId' });

// Add to sequelize.models
sequelize.models.User = User;
sequelize.models.Book = Book;
sequelize.models.Borrow = Borrow;
sequelize.models.Reservation = Reservation;







module.exports = sequelize;