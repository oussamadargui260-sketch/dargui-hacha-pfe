import React, { useState, useEffect } from 'react';
import { Plus, User, Book as BookIcon, Calendar, Save, X, Clock, CheckCircle, Trash2, Search, ArrowRight, Shield } from 'lucide-react';

const Loans = () => { 
  const [loans, setLoans] = useState([]);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ userId: '', bookId: '', dateDue: '' });

  const loadData = () => {
    const savedLoans = JSON.parse(localStorage.getItem('myLoans')) || [];
    const savedBooks = JSON.parse(localStorage.getItem('myLibrary')) || [];
    const savedUsers = JSON.parse(localStorage.getItem('myUsers')) || [];
    
    setLoans(savedLoans);
    setBooks(savedBooks.filter(b => b.status === 'Available' || b.status === 'Disponible'));
    setUsers(savedUsers.filter(u => u.status === 'Active' || u.status === 'Actif'));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateLoan = (e) => {
    e.preventDefault();
    const uId = Number(formData.userId);
    const bId = Number(formData.bookId);

    const selectedUser = users.find(u => Number(u.id) === uId);
    const selectedBook = books.find(b => Number(b.id) === bId);

    if (!selectedUser || !selectedBook) return;

    const newEntry = {
      id: Date.now(),
      userName: selectedUser.name,
      bookTitle: selectedBook.title,
      bookId: selectedBook.id,
      dateOut: new Date().toLocaleDateString('fr-FR'), // Date format local
      dateDue: formData.dateDue,
      status: 'Active'
    };

    const updatedLoans = [newEntry, ...loans];
    localStorage.setItem('myLoans', JSON.stringify(updatedLoans));

    const allBooks = JSON.parse(localStorage.getItem('myLibrary')) || [];
    const updatedBooks = allBooks.map(b => 
      Number(b.id) === bId ? { ...b, status: 'Borrowed' } : b 
    );
    localStorage.setItem('myLibrary', JSON.stringify(updatedBooks));

    setLoans(updatedLoans);
    setShowForm(false);
    setFormData({ userId: '', bookId: '', dateDue: '' });
    loadData();
  };

  const handleDeleteLoan = (loanId) => {
    if (window.confirm("Voulez-vous supprimer cet enregistrement de prêt ?")) {
      const updatedLoans = loans.filter(loan => loan.id !== loanId);
      setLoans(updatedLoans);
      localStorage.setItem('myLoans', JSON.stringify(updatedLoans));
    }
  };

  return (
    <div className="p-2">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold m-0 text-dark" style={{ letterSpacing: '-1px' }}>Prêts & Retours</h2>
          <p className="text-secondary small">Suivez les emprunts et gérez les délais de retour.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className={`btn ${showForm ? 'btn-light text-danger' : 'btn-primary shadow-indigo border-0'} rounded-3 px-4 py-2 d-flex align-items-center gap-2 transition-all`}
          style={!showForm ? { background: '#6366f1' } : {}}
        >
          {showForm ? <X size={18}/> : <Plus size={18}/>}
          {showForm ? "Annuler" : "Nouveau Prêt"}
        </button>
      </div>

      {/* Modern Inline Form */}
      {showForm && (
        <div className="card border-0 shadow-sm rounded-4 mb-5 p-4 animate-fade-in" style={{ borderLeft: '5px solid #6366f1' }}>
          <div className="d-flex align-items-center gap-2 mb-4">
            <Shield size={18} className="text-indigo" />
            <h6 className="m-0 fw-bold text-dark text-uppercase small">Enregistrer une transaction</h6>
          </div>
          <form onSubmit={handleCreateLoan} className="row g-3">
            <div className="col-md-4">
              <label className="form-label small fw-bold text-slate-500 uppercase tracking-tighter" style={{ fontSize: '11px' }}>Membre Emprunteur</label>
              <div className="position-relative">
                <User size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <select 
                  className="form-select border-0 bg-light p-3 ps-5 rounded-3 shadow-none fw-medium" 
                  required 
                  value={formData.userId}
                  onChange={(e) => setFormData({...formData, userId: e.target.value})}
                >
                  <option value="">Sélectionner un membre</option>
                  {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold text-slate-500 uppercase tracking-tighter" style={{ fontSize: '11px' }}>Livre Sélectionné</label>
              <div className="position-relative">
                <BookIcon size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <select 
                  className="form-select border-0 bg-light p-3 ps-5 rounded-3 shadow-none fw-medium" 
                  required 
                  value={formData.bookId}
                  onChange={(e) => setFormData({...formData, bookId: e.target.value})}
                >
                  <option value="">Sélectionner un livre</option>
                  {books.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold text-slate-500 uppercase tracking-tighter" style={{ fontSize: '11px' }}>Date de retour</label>
              <div className="position-relative">
                <Calendar size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <input 
                  type="date" 
                  className="form-control border-0 bg-light p-3 ps-5 rounded-3 shadow-none fw-medium" 
                  required 
                  value={formData.dateDue}
                  onChange={(e) => setFormData({...formData, dateDue: e.target.value})} 
                />
              </div>
            </div>
            <div className="col-md-1 d-flex align-items-end">
              <button type="submit" className="btn btn-dark w-100 p-3 rounded-3 shadow-sm border-0 d-flex align-items-center justify-content-center" style={{ background: '#1e293b' }}>
                <ArrowRight size={22}/>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Loans Table */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ backgroundColor: '#f8fafc' }}>
              <tr>
                <th className="ps-4 py-3 border-0 text-secondary small fw-bold text-uppercase">Membre</th>
                <th className="py-3 border-0 text-secondary small fw-bold text-uppercase">Livre</th>
                <th className="py-3 border-0 text-secondary small fw-bold text-uppercase">Sortie</th>
                <th className="py-3 border-0 text-secondary small fw-bold text-uppercase">Échéance</th>
                <th className="py-3 border-0 text-secondary small fw-bold text-uppercase">Statut</th>
                <th className="pe-4 py-3 border-0 text-secondary small fw-bold text-uppercase text-end">Action</th>
              </tr>
            </thead>
            <tbody className="border-top-0">
              {loans.length > 0 ? loans.map(loan => (
                <tr key={loan.id}>
                  <td className="ps-4 py-4 fw-bold text-dark">
                    <div className="d-flex align-items-center gap-2">
                      <div className="p-2 rounded-circle bg-indigo-soft">
                        <User size={14} className="text-indigo"/>
                      </div>
                      {loan.userName}
                    </div>
                  </td>
                  <td className="text-secondary fw-medium">
                    <span className="text-dark fw-bold d-block">{loan.bookTitle}</span>
                    <small className="opacity-50 font-monospace" style={{fontSize: '10px'}}>ID: {loan.bookId}</small>
                  </td>
                  <td className="small text-muted font-monospace">{loan.dateOut}</td>
                  <td className="small fw-bold font-monospace">
                    <span className="text-danger bg-danger bg-opacity-10 px-2 py-1 rounded">
                        {loan.dateDue}
                    </span>
                  </td>
                  <td>
                    <span className={`badge rounded-pill px-3 py-2 fw-bold d-inline-flex align-items-center gap-1`} style={{ 
                        backgroundColor: loan.status === 'Active' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: loan.status === 'Active' ? '#f59e0b' : '#10b981',
                        fontSize: '11px'
                      }}>
                      {loan.status === 'Active' ? <Clock size={12}/> : <CheckCircle size={12}/>}
                      {loan.status === 'Active' ? 'EN COURS' : 'RETOURNE'}
                    </span>
                  </td>
                  <td className="pe-4 py-3 text-end">
                    <button 
                      onClick={() => handleDeleteLoan(loan.id)}
                      className="btn btn-icon-hover-danger rounded-circle p-2 border-0 shadow-none"
                    >
                      <Trash2 size={18} className="text-danger" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                     <div className="opacity-20 mb-3"><Clock size={48} /></div>
                     <p className="text-muted fw-medium">Aucune transaction enregistrée.</p>
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
          .bg-indigo-soft { background-color: rgba(99, 102, 241, 0.1); }
          .btn-icon-hover-danger:hover { background-color: rgba(239, 68, 68, 0.1); }
          .animate-fade-in { animation: fadeIn 0.3s ease-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
          .font-monospace { font-family: 'JetBrains Mono', monospace; }
        `}
      </style>
    </div>
  );
};

export default Loans;