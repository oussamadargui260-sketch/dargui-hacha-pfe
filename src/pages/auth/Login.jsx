import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Library } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic simple bach n-douzu l-dashboard
    if(email && password) {
        navigate('/admin/dashboard');
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            
            {/* Logo Section */}
            <div className="text-center mb-4">
              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow" style={{ width: '70px', height: '70px' }}>
                <Library size={35} />
              </div>
              <h2 className="fw-bold text-dark">AdminPanel</h2>
              <p className="text-muted">Connectez-vous pour gérer la bibliothèque</p>
            </div>

            {/* Login Card */}
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-sm-5">
                <form onSubmit={handleSubmit}>
                  
                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary">Adresse Email</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <Mail size={18} className="text-muted" />
                      </span>
                      <input 
                        type="email" 
                        className="form-control border-start-0 ps-0 shadow-none" 
                        placeholder="admin@exemple.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <label className="form-label small fw-bold text-secondary">Mot de passe</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <Lock size={18} className="text-muted" />
                      </span>
                      <input 
                        type="password" 
                        className="form-control border-start-0 ps-0 shadow-none" 
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary w-100 py-2 fw-bold rounded-3 shadow-sm mb-3">
                    <LogIn size={18} className="me-2" />
                    Se Connecter
                  </button>

                  <div className="text-center">
                    <p className="small text-muted mb-0">
                      Pas encore de compte ? 
                      <button 
                        type="button" 
                        onClick={() => navigate('/register')} 
                        className="btn btn-link p-0 ms-1 fw-bold text-decoration-none"
                      >
                        Créer un compte
                      </button>
                    </p>
                  </div>

                </form>
              </div>
            </div>

            <div className="text-center mt-4">
              <p className="small text-muted opacity-50">© 2026 Library Management System</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;