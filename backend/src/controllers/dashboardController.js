const sequelize = require('../config/database');
const Book = sequelize.models.Book;
const User = sequelize.models.User;
const Borrow = sequelize.models.Borrow;
const Reservation = sequelize.models.Reservation;

const getDashboardStats = async (req, res) => {
  try {
    const totalBooks = await Book.count();
    const availableBooks = await Book.sum('available') || 0;

    const borrowedBooks = await Borrow.count({ where: { status: 'borrowed' } });
    const returnedBooks = await Borrow.count({ where: { status: 'returned' } });
    const overdueBooks = await Borrow.count({
      where: {
        status: 'borrowed',
        dueDate: { [sequelize.Sequelize.Op.lt]: new Date() }
      }
    });

    const totalUsers = await User.count();
    const activeUsers = await User.count({ where: { status: 'active' } });
    const totalReservations = await Reservation.count({ where: { status: 'pending' } });

    // Category aggregation
    const categoryQuery = await Borrow.findAll({
      attributes: [
        [sequelize.col('Book.category'), 'name'],
        [sequelize.fn('COUNT', sequelize.col('Borrow.id')), 'value']
      ],
      include: [{ model: Book, attributes: [] }],
      group: ['Book.category']
    });

    // Top Books
    const topBooksQuery = await Borrow.findAll({
      attributes: [
        [sequelize.col('Book.title'), 'title'],
        [sequelize.col('Book.author'), 'author'],
        [sequelize.fn('COUNT', sequelize.col('Borrow.id')), 'count']
      ],
      include: [{ model: Book, attributes: [] }],
      group: ['Book.id', 'Book.title', 'Book.author'],
      order: [[sequelize.literal('count'), 'DESC']],
      limit: 5
    });

    // Recent Activity
    const recentActivity = await Borrow.findAll({
      include: [
        { model: Book, attributes: ['title'] },
        { model: User, attributes: ['name'] }
      ],
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    // Monthly Loans (last 6 months JS aggregation)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);

    const recentBorrowsForMonthly = await Borrow.findAll({
      where: {
        createdAt: { [sequelize.Sequelize.Op.gte]: sixMonthsAgo }
      }
    });

    const monthsRaw = {};
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const mLabel = d.toLocaleString('fr-FR', { month: 'short' });
      monthsRaw[mLabel] = { month: mLabel, emprunts: 0, retours: 0 };
    }

    recentBorrowsForMonthly.forEach(b => {
      const bMonth = new Date(b.createdAt).toLocaleString('fr-FR', { month: 'short' });
      if (monthsRaw[bMonth]) monthsRaw[bMonth].emprunts++;
      if (b.returnDate) {
        const rMonth = new Date(b.returnDate).toLocaleString('fr-FR', { month: 'short' });
        if (monthsRaw[rMonth]) monthsRaw[rMonth].retours++;
      }
    });
    const monthlyLoans = Object.values(monthsRaw);

    res.json({
      totalBooks, availableBooks, borrowedBooks, returnedBooks,
      totalUsers, activeUsers, totalReservations, overdueBooks,
      categoryData: categoryQuery,
      topBooks: topBooksQuery,
      recentActivity,
      monthlyLoans,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getDashboardStats };