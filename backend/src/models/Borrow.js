const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Borrow = sequelize.define('Borrow', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' }
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Books', key: 'id' }
    },
    borrowDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('borrowed', 'returned', 'overdue'),
      defaultValue: 'borrowed'
    },
    fine: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    }
  }, {
    timestamps: true
  });

  return Borrow;
};