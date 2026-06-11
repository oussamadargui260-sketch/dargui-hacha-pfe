const sequelize = require('../config/database');
const Book = sequelize.models.Book;

const getAllBooks = async (req, res) => {
  try {
    const { search, category } = req.query;
    
    let where = {};
    
    if (search) {
      where = {
        [sequelize.Sequelize.Op.or]: [
          { title: { [sequelize.Sequelize.Op.iLike]: `%${search}%` } },
          { author: { [sequelize.Sequelize.Op.iLike]: `%${search}%` } },
          { isbn: { [sequelize.Sequelize.Op.iLike]: `%${search}%` } }
        ]
      };
    }
    
    if (category) {
      where.category = category;
    }

    const books = await Book.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, isbn, category, quantity, description, image } = req.body;
    
    const book = await Book.create({
      title,
      author,
      isbn,
      category,
      quantity: quantity || 1,
      available: quantity || 1,
      description,
      image
    });

    res.status(201).json({ message: 'Book added successfully', book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    await book.update(req.body);
    res.json({ message: 'Book updated successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    await book.destroy();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};