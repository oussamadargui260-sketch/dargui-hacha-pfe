import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, X, Save, Mail, Shield, Activity } from 'lucide-react';

const CreateUser = () => {
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: 'Client',
    status: 'Actif'
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem('myUsers')) || [
      { id: 1, name: 'Oussama Dr', email: 'oussama@gmail.com', role: 'Admin', status: 'Actif' },
      { id: 2, name: 'Sami Ben', email: 'sami@example.com', role: 'Client', status: 'Actif' },
      { id: 3, name: 'Houda Al', email: 'houda@example.com', role: 'Client', status: 'Inactif' }
    ];

    const newUser = {
      ...userData,
      id: Date.now()
    };

    const updatedUsers = [newUser, ...existingUsers];
    localStorage.setItem('myUsers', JSON.stringify(updatedUsers));

    alert("Utilisateur ajouté avec succès !");
    navigate('/admin/users');
  };

  return (
    <div className="container-fluid py-4">
     
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold m-0 h4 text-dark text-uppercase tracking-wide">Nouvel Utilisateur</h2>
          <p className="text-muted small m-0">Créez un nouveau compte membre ou administrateur.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/users')} 
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
                <UserPlus size={16} /> NOM COMPLET
              </label>
              <input 
                type="text" 
                name="name"
                className="form-control form-control-lg bg-light border-0 p-3 rounded-3 fs-6" 
                placeholder="Ex: Ahmed Benani" 
                required
                onChange={handleChange} 
                value={userData.name}
              />
            </div>

           
            <div className="mb-4">
              <label className="form-label fw-bold small text-secondary d-flex align-items-center gap-2">
                <Mail size={16} /> ADRESSE EMAIL
              </label>
              <input 
                type="email" 
                name="email"
                className="form-control form-control-lg bg-light border-0 p-3 rounded-3 fs-6" 
                placeholder="ahmed@example.com" 
                required
                onChange={handleChange}
                value={userData.email}
              />
            </div>

            <div className="row">
            
              <div className="col-md-6 mb-4">
                <label className="form-label fw-bold small text-secondary d-flex align-items-center gap-2">
                  <Shield size={16} /> RÔLE
                </label>
                <select 
                  name="role"
                  className="form-select form-select-lg bg-light border-0 p-3 rounded-3 fs-6 cursor-pointer"
                  onChange={handleChange}
                  value={userData.role}
                >
                  <option value="Client">Client</option>
                  <option value="Admin">Admin</option>
                  <option value="Bibliothécaire">Bibliothécaire</option>
                </select>
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label fw-bold small text-secondary d-flex align-items-center gap-2">
                  <Activity size={16} /> STATUT
                </label>
                <select 
                  name="status"
                  className="form-select form-select-lg bg-light border-0 p-3 rounded-3 fs-6 cursor-pointer"
                  onChange={handleChange}
                  value={userData.status}
                >
                  <option value="Actif">Actif</option>
                  <option value="Inactif">Inactif</option>
                </select>
              </div>
            </div>

          
            <div className="pt-2">
              <button 
                type="submit" 
                className="btn btn-primary w-100 py-3 rounded-3 fw-bold border-0 shadow-lg d-flex align-items-center justify-content-center gap-2"
                style={{ backgroundColor: '#0061f2' }}
              >
                <Save size={20} /> Créer l'utilisateur
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;