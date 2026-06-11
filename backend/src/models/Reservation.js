const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Reservation = sequelize.define('Reservation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reservationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'expired'),
      defaultValue: 'pending'
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    timestamps: true
  });

  return Reservation;
};