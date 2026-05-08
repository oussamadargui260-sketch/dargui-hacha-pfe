import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, BookOpen, User, Tag, AlignLeft, Sparkles, Hash } from 'lucide-react';

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
    
    // N-stakhdmou navigate deghya bla alert alert l-khayba
    navigate('/admin/books');
  };

  return (
    <div className="container-fluid py-2">
      
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <div className="bg-indigo-soft p-2 rounded-3">
              <Sparkles size={18} className="text-indigo" />
            </div>
            <h2 className="fw-bold m-0 text-dark" style={{ letterSpacing: '-1px' }}>Nouveau Livre</h2>
          </div>
          <p className="text-secondary small m-0">Enrichissez votre catalogue numérique en quelques secondes.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/books')} 
          className="btn btn-light d-flex align-items-center gap-2 rounded-3 px-3 border-0 text-secondary fw-bold small shadow-none"
        >
          <X size={18} /> ANNULER
        </button>
      </div>

      <div className="row g-4">
        {/* Form Column */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit}>
                
                {/* Title Input */}
                <div className="mb-4">
                  <label className="form-label fw-bold small text-slate-600 mb-2 uppercase tracking-wider">
                    <BookOpen size={14} className="me-2" /> Titre du Livre
                  </label>
                  <input 
                    type="text" 
                    name="title"
                    className="form-control form-control-lg bg-light border-0 p-3 rounded-3 fs-6 shadow-none fw-medium" 
                    placeholder="Ex: L'Alchimiste" 
                    required
                    onChange={handleChange} 
                    value={bookData.title}
                  />
                </div>

                <div className="row">
                  {/* Author */}
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-bold small text-slate-600 mb-2 uppercase tracking-wider">
                      <User size={14} className="me-2" /> Auteur
                    </label>
                    <input 
                      type="text" 
                      name="author"
                      className="form-control form-control-lg bg-light border-0 p-3 rounded-3 fs-6 shadow-none fw-medium" 
                      placeholder="Ex: Paulo Coelho" 
                      required
                      onChange={handleChange}
                      value={bookData.author}
                    />
                  </div>

                  {/* Category */}
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-bold small text-slate-600 mb-2 uppercase tracking-wider">
                      <Tag size={14} className="me-2" /> Catégorie
                    </label>
                    <select 
                      name="category"
                      className="form-select form-select-lg bg-light border-0 p-3 rounded-3 fs-6 shadow-none fw-medium cursor-pointer"
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

                <div className="row">
                   {/* Stock */}
                   <div className="col-md-12 mb-4">
                    <label className="form-label fw-bold small text-slate-600 mb-2 uppercase tracking-wider">
                      <Hash size={14} className="me-2" /> Nombre d'exemplaires
                    </label>
                    <input 
                      type="number" 
                      name="stock"
                      min="1"
                      className="form-control form-control-lg bg-light border-0 p-3 rounded-3 fs-6 shadow-none fw-medium w-25" 
                      required
                      onChange={handleChange}
                      value={bookData.stock}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mb-5">
                  <label className="form-label fw-bold small text-slate-600 mb-2 uppercase tracking-wider">
                    <AlignLeft size={14} className="me-2" /> Description / Résumé
                  </label>
                  <textarea 
                    name="description"
                    className="form-control bg-light border-0 p-3 rounded-3 fs-6 shadow-none fw-medium" 
                    rows="4"
                    placeholder="De quoi parle ce livre ?"
                    onChange={handleChange}
                    value={bookData.description}
                  ></textarea>
                </div>

                {/* Action Button */}
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-3 rounded-3 fw-bold border-0 shadow-indigo d-flex align-items-center justify-content-center gap-2"
                  style={{ background: '#6366f1' }}
                >
                  <Save size={20} /> Enregistrer dans la Bibliothèque
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Info Column (Preview Sidebar) */}
        <div className="col-lg-4">
            <div className="card border-0 rounded-4 p-4 text-white shadow-indigo h-100" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)' }}>
                <h5 className="fw-bold mb-4">Guide de Saisie</h5>
                <ul className="list-unstyled d-flex flex-column gap-3 small opacity-90">
                    <li className="d-flex gap-2">
                        <div className="bg-white bg-opacity-20 rounded p-1 h-fit"><Sparkles size={14}/></div>
                        <span>Utilisez des titres officiels pour une meilleure recherche.</span>
                    </li>
                    <li className="d-flex gap-2">
                        <div className="bg-white bg-opacity-20 rounded p-1 h-fit"><Sparkles size={14}/></div>
                        <span>Vérifiez l'auteur pour éviter les doublons.</span>
                    </li>
                    <li className="d-flex gap-2">
                        <div className="bg-white bg-opacity-20 rounded p-1 h-fit"><Sparkles size={14}/></div>
                        <span>La catégorie aide à l'organisation automatique.</span>
                    </li>
                </ul>
                <div className="mt-auto pt-5">
                    <div className="p-3 bg-white bg-opacity-10 rounded-3 border border-white border-opacity-10">
                        <p className="small mb-0 opacity-75 italic">"Un bon catalogue est le cœur d'une bibliothèque efficace."</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <style>
        {`
          .bg-indigo-soft { background-color: rgba(99, 102, 241, 0.1); }
          .text-indigo { color: #6366f1; }
          .text-slate-600 { color: #475569; }
          .shadow-indigo { box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4) !important; }
          .h-fit { height: fit-content; }
          .uppercase { text-transform: uppercase; }
          input:focus, select:focus, textarea:focus {
             background-color: #f1f5f9 !important;
             box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2) !important;
          }
        `}
      </style>
    </div>
  );
};

export default CreateBook;