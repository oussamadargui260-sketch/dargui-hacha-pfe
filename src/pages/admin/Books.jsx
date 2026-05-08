import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Search, Filter, BookOpen, MoreVertical, LayoutGrid, List } from 'lucide-react';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('myLibrary')) || [];
    setBooks(savedBooks);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce livre ?")) {
      const updatedBooks = books.filter(book => book.id !== id);
      setBooks(updatedBooks);
      localStorage.setItem('myLibrary', JSON.stringify(updatedBooks));
    }
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-100">
      
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold m-0 text-dark" style={{ letterSpacing: '-1.2px' }}>Catalogue de Livres</h2>
          <p className="text-secondary small">Gérez votre inventaire et suivez la disponibilité en temps réel.</p>
        </div>
        <Link to="/admin/books/create" className="btn btn-primary rounded-3 px-4 py-2 shadow-indigo d-flex align-items-center gap-2 border-0 fw-bold small" style={{ background: '#6366f1' }}>
          <Plus size={18} /> AJOUTER UN LIVRE
        </Link>
      </div>

      {/* Modern Filter Bar */}
      <div className="card border-0 shadow-sm rounded-4 p-2 mb-4 bg-white">
        <div className="row g-2 align-items-center">
          <div className="col-md-7 position-relative">
            <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={18} />
            <input 
              type="text" 
              className="form-control border-0 bg-light p-3 ps-5 rounded-3 shadow-none fw-medium small" 
              placeholder="Rechercher par titre, auteur ou catégorie..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-light w-100 p-3 rounded-3 d-flex align-items-center justify-content-center gap-2 border-0 text-secondary fw-bold small uppercase tracking-tighter">
              <Filter size={16} /> FILTRER PAR GENRE
            </button>
          </div>
          <div className="col-md-2 d-flex gap-1 justify-content-end pe-2">
            <button className="btn btn-white border shadow-sm p-2 rounded-3 text-indigo">
                <List size={20} />
            </button>
            <button className="btn btn-white border shadow-sm p-2 rounded-3 text-muted opacity-50">
                <LayoutGrid size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ backgroundColor: '#f8fafc' }}>
              <tr>
                <th className="ps-4 py-3 border-0 text-secondary small fw-bold text-uppercase">Détails du Livre</th>
                <th className="py-3 border-0 text-secondary small fw-bold text-uppercase text-center">Stock</th>
                <th className="py-3 border-0 text-secondary small fw-bold text-uppercase text-center">État</th>
                <th className="pe-4 py-3 border-0 text-secondary small fw-bold text-uppercase text-end">Actions</th>
              </tr>
            </thead>
            <tbody className="border-top-0">
              {filteredBooks.length > 0 ? filteredBooks.map((book) => (
                <tr key={book.id}>
                  <td className="ps-4 py-4">
                    <div className="d-flex align-items-center gap-3">
                      <div className="p-3 rounded-4 text-white shadow-indigo d-flex align-items-center justify-content-center" 
                           style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)', width: '48px', height: '48px' }}>
                        <BookOpen size={22} />
                      </div>
                      <div>
                        <div className="fw-bold text-dark fs-6 mb-0">{book.title}</div>
                        <div className="text-secondary small fw-medium">
                            <span className="text-indigo fw-bold">{book.category}</span> • {book.author}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="d-inline-flex flex-column">
                        <span className="fw-bold text-dark font-monospace h5 m-0">{book.stock}</span>
                        <small className="text-muted text-uppercase fw-bold" style={{fontSize: '9px'}}>unités</small>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="badge rounded-pill px-3 py-2 fw-bold" style={{ 
                        backgroundColor: book.status === 'Disponible' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                        color: book.status === 'Disponible' ? '#10b981' : '#f59e0b',
                        fontSize: '10px'
                      }}>
                      ● {book.status === 'Disponible' ? 'EN STOCK' : 'EMPRUNTÉ'}
                    </span>
                  </td>
                  <td className="pe-4 py-3 text-end">
                    <div className="d-flex justify-content-end gap-2">
                      <button className="btn btn-icon-hover rounded-3 p-2 border-0 shadow-sm bg-white">
                        <Edit3 size={18} className="text-indigo" />
                      </button>
                      <button onClick={() => handleDelete(book.id)} className="btn btn-icon-hover-danger rounded-3 p-2 border-0 shadow-sm bg-white">
                        <Trash2 size={18} className="text-danger" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="text-center py-5 border-0">
                    <div className="py-5">
                      <div className="bg-light d-inline-flex p-4 rounded-circle mb-3">
                         <BookOpen size={48} className="text-muted opacity-20" />
                      </div>
                      <h5 className="fw-bold text-dark">Aucun livre dans le catalogue</h5>
                      <p className="text-muted small">Commencez par ajouter votre premier ouvrage pour remplir la bibliothèque.</p>
                      <Link to="/admin/books/create" className="btn btn-indigo-soft btn-sm fw-bold">Ajouter maintenant</Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>
        {`
          .shadow-indigo { box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3) !important; }
          .text-indigo { color: #6366f1; }
          .btn-indigo-soft { background-color: rgba(99, 102, 241, 0.1); color: #6366f1; border: none; }
          .btn-indigo-soft:hover { background-color: #6366f1; color: white; }
          .btn-icon-hover:hover { transform: translateY(-2px); transition: all 0.2s; }
          .btn-icon-hover-danger:hover { transform: translateY(-2px); transition: all 0.2s; color: white; }
          .table-hover tbody tr:hover { background-color: #f8fafc !important; }
          .font-monospace { font-family: 'JetBrains Mono', monospace; }
          .btn-white { background: white; }
          .uppercase { text-transform: uppercase; }
        `}
      </style>
    </div>
  );
};

export default Books;