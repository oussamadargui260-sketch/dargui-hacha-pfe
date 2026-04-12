import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Search, Filter, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('myLibrary')) || [];
    setBooks(savedBooks);
  }, []);

  const handleDelete = (id) => {

    if (window.confirm("Are you sure you want to delete this book? This action cannot be undone.")) {
      const updatedBooks = books.filter(book => book.id !== id);
      setBooks(updatedBooks);
      localStorage.setItem('myLibrary', JSON.stringify(updatedBooks));
    }
  };

  return (
    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold h4 m-0 text-dark text-uppercase">Book Management</h2>
          <p className="text-muted small">Complete catalog of your digital library.</p>
        </div>
        <Link to="/admin/books/create" className="btn btn-primary rounded-3 px-4 shadow-sm d-flex align-items-center gap-2">
          <Plus size={18} /> Add Book
        </Link>
      </div>

   
      <div className="card border-0 shadow-sm rounded-4 p-3 mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-md-10 position-relative">
            <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={18} />
            <input type="text" className="form-control border-0 bg-light p-3 ps-5 rounded-3" placeholder="Search by title, author..." />
          </div>
          <div className="col-md-2">
            <button className="btn btn-light w-100 p-3 rounded-3 d-flex align-items-center justify-content-center gap-2">
              <Filter size={18} /> More Filters
            </button>
          </div>
        </div>
      </div>

    
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <table className="table table-hover align-middle mb-0">
          <thead className="bg-light text-muted small text-uppercase font-monospace">
            <tr>
              <th className="ps-4 py-3 border-0">Book Details</th>
              <th className="py-3 border-0 text-center">Stock</th>
              <th className="py-3 border-0 text-center">Status</th>
              <th className="pe-4 py-3 border-0 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? books.map((book) => (
              <tr key={book.id}>
                <td className="ps-4 py-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-primary bg-opacity-10 p-2 rounded-3 text-primary">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <div className="fw-bold text-dark">{book.title}</div>
                      <div className="text-muted small">{book.author} • {book.category}</div>
                    </div>
                  </div>
                </td>
                <td className="text-center small font-monospace">{book.stock} ex.</td>
                <td className="text-center">
                  <span className={`badge rounded-pill px-3 py-2 ${
                    book.status === 'Disponible' ? 'bg-success bg-opacity-10 text-success' : 'bg-warning bg-opacity-10 text-warning'
                  }`}>
                    {book.status === 'Disponible' ? 'Available' : 'Borrowed'}
                  </span>
                </td>
                <td className="pe-4 py-3 text-end">
                  <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-sm btn-outline-primary border-0 rounded-circle p-2">
                      <Edit3 size={18} />
                    </button>
                    <button onClick={() => handleDelete(book.id)} className="btn btn-sm btn-outline-danger border-0 rounded-circle p-2">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="text-center py-5 text-muted">No books in catalog.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;