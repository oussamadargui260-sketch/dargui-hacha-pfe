import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, BookOpen, CheckCircle } from 'lucide-react';

const EditBook = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    category: '',
    stock: 1,
    status: 'Available'
  });

 
  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('myLibrary')) || [];
    const bookToEdit = savedBooks.find(b => Number(b.id) === Number(id));
    
    if (bookToEdit) {
      setBookData(bookToEdit);
    } else {
      alert("Book not found!");
      navigate('/admin/books');
    }
  }, [id, navigate]);

 
  const handleUpdate = (e) => {
    e.preventDefault();
    
    const savedBooks = JSON.parse(localStorage.getItem('myLibrary')) || [];
    
   
    const updatedBooks = savedBooks.map(b => 
      Number(b.id) === Number(id) ? { ...bookData } : b
    );

    localStorage.setItem('myLibrary', JSON.stringify(updatedBooks));
    alert("Book updated successfully!");
    navigate('/admin/books');
  };

  return (
    <div className="container-fluid py-4">
   
      <div className="d-flex align-items-center gap-3 mb-4">
        <button onClick={() => navigate('/admin/books')} className="btn btn-light rounded-circle p-2 shadow-sm">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="fw-bold h4 m-0">EDIT BOOK</h2>
          <p className="text-muted small">Update book information in the catalog.</p>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="form-label small fw-bold text-muted text-uppercase">Book Title</label>
                <div className="input-group">
                  <span className="input-group-text border-0 bg-light"><BookOpen size={18} /></span>
                  <input 
                    type="text" 
                    className="form-control border-0 bg-light p-3" 
                    value={bookData.title}
                    onChange={(e) => setBookData({...bookData, title: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted text-uppercase">Author</label>
                  <input 
                    type="text" 
                    className="form-control border-0 bg-light p-3 rounded-3" 
                    value={bookData.author}
                    onChange={(e) => setBookData({...bookData, author: e.target.value})}
                    required 
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted text-uppercase">Category</label>
                  <select 
                    className="form-select border-0 bg-light p-3 rounded-3"
                    value={bookData.category}
                    onChange={(e) => setBookData({...bookData, category: e.target.value})}
                  >
                    <option value="Fiction">Fiction</option>
                    <option value="Technology">Technology</option>
                    <option value="History">History</option>
                    <option value="Science">Science</option>
                  </select>
                </div>
              </div>

              <div className="row mb-5">
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted text-uppercase">Stock (Copies)</label>
                  <input 
                    type="number" 
                    className="form-control border-0 bg-light p-3 rounded-3" 
                    value={bookData.stock}
                    onChange={(e) => setBookData({...bookData, stock: e.target.value})}
                    min="1"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted text-uppercase">Status</label>
                  <select 
                    className="form-select border-0 bg-light p-3 rounded-3"
                    value={bookData.status}
                    onChange={(e) => setBookData({...bookData, status: e.target.value})}
                  >
                    <option value="Available">Available</option>
                    <option value="Borrowed">Borrowed</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary px-5 py-3 rounded-3 fw-bold shadow-sm d-flex align-items-center gap-2">
                  <Save size={20} /> Save Changes
                </button>
                <button type="button" onClick={() => navigate('/admin/books')} className="btn btn-light px-4 py-3 rounded-3 fw-bold">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBook;