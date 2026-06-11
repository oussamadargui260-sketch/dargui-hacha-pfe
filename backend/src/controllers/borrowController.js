const sequelize = require('../config/database');
const Borrow = sequelize.models.Borrow;
const Book = sequelize.models.Book;
const User = sequelize.models.User;

// Helper: normalize a borrow record for the frontend
const normalizeBorrow = (borrow) => {
  const raw = borrow.toJSON ? borrow.toJSON() : borrow;
  return {
    id: raw.id,
    status: raw.status,
    borrowDate: raw.borrowDate,
    dueDate: raw.dueDate,
    returnDate: raw.returnDate,
    fine: raw.fine,
    // Sequelize returns included models as capitalized (Book, User)
    book: raw.Book ?? raw.book ?? null,
    user: raw.User
      ? {
        id: raw.User.id,
        name: raw.User.name,
        email: raw.User.email,
        role: raw.User.role,
      }
      : raw.user ?? null,
  };
};

const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;

    const existingBorrow = await Borrow.findOne({
      where: {
        userId,
        bookId,
        status: {
          [sequelize.Sequelize.Op.in]: ['borrowed', 'overdue'],
        },
      },
    });

    if (existingBorrow) {
      return res.status(400).json({ message: 'Vous avez déjà emprunté ce livre.' });
    }

    const book = await Book.findByPk(bookId);
    if (!book || book.available <= 0) {
      return res.status(400).json({ message: "Ce livre n'est pas disponible." });
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    const borrow = await Borrow.create({ userId, bookId, dueDate });

    book.available -= 1;
    await book.save();

    res.status(201).json({ message: 'Livre emprunté avec succès.', borrow });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const returnBook = async (req, res) => {
  try {
    const { borrowId } = req.body;
    const borrow = await Borrow.findByPk(borrowId);

    if (!borrow) return res.status(404).json({ message: 'Emprunt introuvable.' });
    if (borrow.status === 'returned') return res.status(400).json({ message: 'Déjà rendu.' });

    const returnDate = new Date();
    borrow.returnDate = returnDate;
    borrow.status = 'returned';

    if (returnDate > borrow.dueDate) {
      const daysLate = Math.ceil((returnDate - borrow.dueDate) / (1000 * 3600 * 24));
      borrow.fine = daysLate * 10;
    }

    await borrow.save();

    const book = await Book.findByPk(borrow.bookId);
    if (book) {
      book.available += 1;
      await book.save();
    }

    res.json({ message: 'Livre rendu avec succès.', fine: borrow.fine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getMyBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Book,
          attributes: ['id', 'title', 'author', 'isbn', 'category', 'image'],
        },
      ],
      order: [['borrowDate', 'DESC']],
    });

    res.json(borrows.map(normalizeBorrow));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getAllBorrows = async (req, res) => {
  try {
    const { status, search } = req.query;
    const where = {};
    if (status) where.status = status;

    const Op = sequelize.Sequelize.Op;
    let userWhere = undefined;
    let bookWhere = undefined;

    if (search) {
      // We'll search in both book title and user name
      // Since it's an AND between main where and includes, but OR inside includes is tricky with separate models.
      // Usually, we can use $User.name$ etc. in top-level where, or separate conditions.
      // For simplicity, we'll allow searching if either User matches or Book matches.
      // Actually, Sequelize handles simple include where well.
      // If we want OR across models, we can use top-level where with nested keys.
      where[Op.or] = [
        { '$User.name$': { [Op.iLike]: `%${search}%` } },
        { '$Book.title$': { [Op.iLike]: `%${search}%` } }
      ];
    }

    const borrows = await Borrow.findAll({
      where,
      include: [
        {
          model: Book,
          attributes: ['id', 'title', 'author', 'isbn', 'category'],
        },
        {
          model: User,
          attributes: ['id', 'name', 'email', 'role'],
        },
      ],
      order: [['borrowDate', 'DESC']],
    });

    res.json(borrows.map(normalizeBorrow));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { borrowBook, returnBook, getMyBorrows, getAllBorrows };