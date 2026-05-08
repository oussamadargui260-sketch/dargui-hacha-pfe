import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email && password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'admin');
        navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-0 m-0" style={{ backgroundColor: '#0f172a' }}>
      <div className="container-fluid p-0 h-100">
        <div className="row g-0 min-vh-100">
          
          {/* Left Side: Modern Image Overlay */}
          <div className="col-lg-7 d-none d-lg-flex flex-column justify-content-center p-5 text-white position-relative" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%), url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop")',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center'
               }}>
            
            <div className="position-absolute top-0 start-0 p-5 d-flex align-items-center gap-2">
               <div className="p-2 rounded-circle bg-white bg-opacity-10 shadow-sm border border-white border-opacity-20">
                  <Sparkles size={24} className="text-white" />
               </div>
               <span className="fw-bold fs-4 tracking-tighter">BiblioTech <span className="fw-light opacity-50">v2.0</span></span>
            </div>

            <div className="max-w-md">
              <h1 className="display-3 fw-bold mb-4 mt-5" style={{ letterSpacing: '-3px', lineHeight: '0.9' }}>
                L'intelligence <br/>au service du <br/><span style={{ color: '#818cf8' }}>savoir.</span>
              </h1>
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-success bg-opacity-20 p-2 rounded-circle">
                   <ShieldCheck size={20} className="text-success" />
                </div>
                <p className="m-0 opacity-75 fw-medium">Système de gestion sécurisé et optimisé.</p>
              </div>
            </div>
          </div>

          {/* Right Side: Clean Login Form */}
          <div className="col-lg-5 d-flex align-items-center justify-content-center bg-white shadow-lg border-start border-white border-opacity-10">
            <div className="p-5 w-100" style={{ maxWidth: '450px' }}>
              
              <div className="text-center mb-5">
                {/* New Custom Icon Instead of Library */}
                <div className="d-inline-flex p-4 rounded-4 mb-4 shadow-sm" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)' }}>
                   <Sparkles size={40} className="text-white" />
                </div>
                <h2 className="fw-bold text-dark mb-1" style={{ letterSpacing: '-1px' }}>Connexion Admin</h2>
                <p className="text-secondary small">Entrez vos accès pour piloter la plateforme</p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-slate-600 mb-2 uppercase tracking-wider" style={{ fontSize: '11px' }}>Email Professionnel</label>
                  <div className="position-relative">
                    <Mail size={18} className="text-muted position-absolute top-50 translate-middle-y ms-3" />
                    <input 
                      type="email" 
                      className="form-control bg-light border-0 py-3 ps-5 rounded-3 shadow-none fw-medium" 
                      placeholder="admin@bibliotech.ma"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between">
                    <label className="form-label small fw-bold text-slate-600 mb-2 uppercase tracking-wider" style={{ fontSize: '11px' }}>Mot de passe</label>
                  </div>
                  <div className="position-relative">
                    <Lock size={18} className="text-muted position-absolute top-50 translate-middle-y ms-3" />
                    <input 
                      type="password" 
                      className="form-control bg-light border-0 py-3 ps-5 rounded-3 shadow-none fw-medium" 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow-indigo border-0 d-flex align-items-center justify-content-center gap-2 mt-2"
                        style={{ background: '#6366f1', transition: 'all 0.3s ease' }}>
                  Se Connecter
                  <ArrowRight size={18} />
                </button>

                <div className="mt-5 pt-3 border-top text-center text-secondary small opacity-50">
                   Accès réservé au personnel autorisé
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>

      <style>
        {`
          .shadow-indigo {
            box-shadow: 0 10px 20px -5px rgba(99, 102, 241, 0.4) !important;
          }
          .shadow-indigo:hover {
            background: #4f46e5 !important;
            transform: translateY(-2px);
          }
          .max-w-md { max-width: 550px; }
          .form-control:focus {
            background-color: #f1f5f9 !important;
            box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2) !important;
          }
        `}
      </style>
    </div>
  );
};

export default Login;