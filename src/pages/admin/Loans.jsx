import React, { useState, useEffect } from 'react';
import { Plus, User, Book as BookIcon, Calendar, Save, X, Clock, CheckCircle, Trash2 } from 'lucide-react';

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
      dateOut: new Date().toLocaleDateString('en-US'),
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
    if (window.confirm("Are you sure you want to delete this loan record?")) {
      const updatedLoans = loans.filter(loan => loan.id !== loanId);
      setLoans(updatedLoans);
      localStorage.setItem('myLoans', JSON.stringify(updatedLoans));
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold h4 m-0 text-dark">LOAN MANAGEMENT</h2>
          <p className="text-muted small">Manage and track all book loans.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn btn-primary rounded-3 px-4 shadow-sm d-flex align-items-center gap-2"
        >
          {showForm ? <X size={18}/> : <Plus size={18}/>}
          {showForm ? "Cancel" : "New Loan"}
        </button>
      </div>

      {showForm && (
        <div className="card border-0 shadow-sm rounded-4 mb-4 p-4 bg-white border-start border-primary border-5">
          <form onSubmit={handleCreateLoan} className="row g-3">
            <div className="col-md-4">
              <label className="form-label small fw-bold text-muted text-uppercase">Member</label>
              <select 
                className="form-select border-0 bg-light p-3 rounded-3" 
                required 
                value={formData.userId}
                onChange={(e) => setFormData({...formData, userId: e.target.value})}
              >
                <option value="">Select Member</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold text-muted text-uppercase">Book</label>
              <select 
                className="form-select border-0 bg-light p-3 rounded-3" 
                required 
                value={formData.bookId}
                onChange={(e) => setFormData({...formData, bookId: e.target.value})}
              >
                <option value="">Select Book</option>
                {books.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold text-muted text-uppercase">Due Date</label>
              <input 
                type="date" 
                className="form-control border-0 bg-light p-3 rounded-3" 
                required 
                value={formData.dateDue}
                onChange={(e) => setFormData({...formData, dateDue: e.target.value})} 
              />
            </div>
            <div className="col-md-1 d-flex align-items-end">
              <button type="submit" className="btn btn-dark w-100 p-3 rounded-3 shadow">
                <Save size={20}/>
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light text-muted small text-uppercase font-monospace">
              <tr>
                <th className="ps-4 py-3 border-0">Member</th>
                <th className="py-3 border-0">Book Title</th>
                <th className="py-3 border-0">Issue Date</th>
                <th className="py-3 border-0">Due Date</th>
                <th className="py-3 border-0">Status</th>
                <th className="py-3 border-0 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {loans.length > 0 ? loans.map(loan => (
                <tr key={loan.id}>
                  <td className="ps-4 py-3 fw-semibold">
                    <div className="d-flex align-items-center gap-2">
                      <User size={14} className="text-primary"/> {loan.userName}
                    </div>
                  </td>
                  <td className="text-secondary small">
                    <BookIcon size={14} className="me-2 text-muted"/>{loan.bookTitle}
                  </td>
                  <td className="small text-muted font-monospace">{loan.dateOut}</td>
                  <td className="small fw-bold text-danger font-monospace">{loan.dateDue}</td>
                  <td>
                    <span className={`badge rounded-pill px-3 py-2 ${
                      loan.status === 'Active' ? 'bg-warning bg-opacity-10 text-warning' : 'bg-success bg-opacity-10 text-success'
                    }`}>
                      {loan.status === 'Active' ? <Clock size={12} className="me-1"/> : <CheckCircle size={12} className="me-1"/>}
                      {loan.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button 
                      onClick={() => handleDeleteLoan(loan.id)}
                      className="btn btn-link text-danger p-0 border-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default Loans;