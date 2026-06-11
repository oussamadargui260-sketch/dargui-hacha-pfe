const sequelize = require('../config/database');
const Reservation = sequelize.models.Reservation;
const Book = sequelize.models.Book;

const createReservation = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;

    const book = await Book.findByPk(bookId);
    if (!book || book.available <= 0) {
      return res.status(400).json({ message: 'Book not available for reservation' });
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 3); // 3 days to pick up

    const reservation = await Reservation.create({
      userId,
      bookId,
      expiresAt
    });

    res.status(201).json({ message: 'Book reserved successfully', reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      where: { userId: req.user.id },
      include: [{ model: Book }],
      order: [['reservationDate', 'DESC']]
    });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation || reservation.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    reservation.status = 'cancelled';
    await reservation.save();
    res.json({ message: 'Reservation cancelled' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createReservation, getMyReservations, cancelReservation };