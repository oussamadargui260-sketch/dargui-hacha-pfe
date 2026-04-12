import React from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm rounded-4 border-0" style={{ width: '400px' }}>
        <h3 className="fw-bold mb-4 text-center">Créer un compte</h3>
        <form onSubmit={(e) => { e.preventDefault(); navigate('/login'); }}>
          <div className="mb-3">
            <label className="form-label">Nom complet</label>
            <input type="text" className="form-control bg-light border-0 p-3" placeholder="Nom..." required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control bg-light border-0 p-3" placeholder="Email..." required />
          </div>
          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input type="password" className="form-control bg-light border-0 p-3" placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn btn-primary w-100 p-3 fw-bold rounded-3">S'inscrire</button>
          <button onClick={() => navigate('/login')} className="btn btn-link w-100 mt-2 text-decoration-none text-muted">Déjà un compte ? Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default Register;