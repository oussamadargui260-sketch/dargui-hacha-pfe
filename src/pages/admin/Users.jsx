import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, Activity, Edit2, Trash2, UserPlus, Search } from 'lucide-react';

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const savedUsers = localStorage.getItem('myUsers');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      const initialData = [
        { id: 1, name: 'Oussama Dr', email: 'oussama@gmail.com', role: 'Admin', status: 'Actif' },
        { id: 2, name: 'Sami Ben', email: 'sami@example.com', role: 'Client', status: 'Actif' },
        { id: 3, name: 'Houda Al', email: 'houda@example.com', role: 'Client', status: 'Inactif' }
      ];
      setUsers(initialData);
      localStorage.setItem('myUsers', JSON.stringify(initialData));
    }
  }, []);

  
  const handleDelete = (id) => {
    if (window.confirm("Bghiti t-mseh had l-utilisateur?")) {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem('myUsers', JSON.stringify(updatedUsers));
    }
  };

  return (
    <div className="container-fluid py-4">
   
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold m-0 h4 text-dark">Gestion des Utilisateurs</h2>
          <p className="text-muted small m-0">Liste des membres inscrits sur la plateforme.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/create-user')} 
          className="btn btn-primary d-flex align-items-center gap-2 rounded-3 px-3 shadow-sm"
        >
          <UserPlus size={18} /> Nouvel Utilisateur
        </button>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr className="text-muted small text-uppercase">
                <th className="ps-4 py-3 border-0">Utilisateur</th>
                <th className="py-3 border-0">Rôle</th>
                <th className="py-3 border-0">Statut</th>
                <th className="pe-4 py-3 border-0 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="ps-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-light p-2 rounded-circle border">
                        <User size={20} className="text-secondary" />
                      </div>
                      <div>
                        <h6 className="m-0 fw-bold text-dark">{user.name}</h6>
                        <span className="text-muted small d-flex align-items-center gap-1">
                          <Mail size={12} /> {user.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-10 px-3 py-2 rounded-pill small">
                      <Shield size={12} className="me-1" /> {user.role}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={`badge px-3 py-2 rounded-pill ${
                      user.status === 'Actif' 
                        ? 'bg-success bg-opacity-10 text-success' 
                        : 'bg-danger bg-opacity-10 text-danger'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="pe-4 py-3 text-end">
                    <button className="btn btn-sm btn-outline-primary border-0 me-1 rounded-3">
                      <Edit2 size={16} />
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger border-0 rounded-3"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;