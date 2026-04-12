import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, BookOpen, User, Tag, AlignLeft } from 'lucide-react';

const CreateBook = () => {
  const navigate = useNavigate();

 
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    category: 'Fiction',
    description: '',
    stock: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    
    const existingBooks = JSON.parse(localStorage.getItem('myLibrary')) || [];

    const newBook = {
      ...bookData,
      id: Date.now(), 
      status: 'Disponible'
    };


    const updatedBooks = [newBook, ...existingBooks];
    localStorage.setItem('myLibrary', JSON.stringify(updatedBooks));

  
    alert("Livre '" + bookData.title + "' ajouté avec succès !");
    navigate('/admin/books');
  };

  return (
    <div className="container-fluid py-4">
     
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold m-0 h4 text-dark text-uppercase tracking-wide">Ajouter un nouveau livre</h2>
          <p className="text-muted small m-0">Remplissez les informations pour enrichir votre bibliothèque.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/books')} 
          className="btn btn-outline-secondary d-flex align-items-center gap-2 rounded-3 px-3 shadow-sm"
        >
          <X size={18} /> Annuler
        </button>
      </div>

     
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-body p-4 p-md-5">
          <form onSubmit={handleSubmit}>
            
           
            <div className="mb-4">
              <label className="form-label fw-bold small text-secondary d-flex align-items-center gap-2">
                <BookOpen size={16} /> TITRE DU LIVRE
              </label>
              <input 
                type="text" 
                name="title"
                className="form-control form-control-lg bg-light border-0 p-3 rounded-3 fs-6" 
                placeholder="Ex: L'Alchimiste" 
                required
                onChange={handleChange} 
                value={bookData.title}
              />
            </div>

            <div className="row">
            
              <div className="col-md-6 mb-4">
                <label className="form-label fw-bold small text-secondary d-flex align-items-center gap-2">
                  <User size={16} /> AUTEUR
                </label>
                <input 
                  type="text" 
                  name="author"
                  className="form-control form-control-lg bg-light border-0 p-3 rounded-3 fs-6" 
                  placeholder="Ex: Paulo Coelho" 
                  required
                  onChange={handleChange}
                  value={bookData.author}
                />
              </div>

            
              <div className="col-md-6 mb-4">
                <label className="form-label fw-bold small text-secondary d-flex align-items-center gap-2">
                  <Tag size={16} /> CATÉGORIE
                </label>
                <select 
                  name="category"
                  className="form-select form-select-lg bg-light border-0 p-3 rounded-3 fs-6 cursor-pointer"
                  onChange={handleChange}
                  value={bookData.category}
                >
                  <option value="Fiction">Fiction</option>
                  <option value="Science">Science</option>
                  <option value="Histoire">Histoire</option>
                  <option value="Technologie">Technologie</option>
                  <option value="Droit">Droit</option>
                </select>
              </div>
            </div>

          
            <div className="mb-4">
              <label className="form-label fw-bold small text-secondary d-flex align-items-center gap-2">
                <AlignLeft size={16} /> DESCRIPTION
              </label>
              <textarea 
                name="description"
                className="form-control bg-light border-0 p-3 rounded-3 fs-6" 
                rows="4"
                placeholder="Résumé du livre..."
                onChange={handleChange}
                value={bookData.description}
              ></textarea>
            </div>

           
            <div className="pt-2">
              <button 
                type="submit" 
                className="btn btn-primary w-100 py-3 rounded-3 fw-bold border-0 shadow-lg d-flex align-items-center justify-content-center gap-2 transition-all"
                style={{ backgroundColor: '#0061f2' }}
              >
                <Save size={20} /> Enregistrer le livre dans le catalogue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;