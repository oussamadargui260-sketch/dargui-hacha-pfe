import React, { useState, useEffect } from 'react';
import { Book, Users, ClipboardList, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({ books: 0, users: 0, loans: 0 });

  useEffect(() => {
    const b = JSON.parse(localStorage.getItem('myLibrary')) || [];
    const u = JSON.parse(localStorage.getItem('myUsers')) || [];
    const l = JSON.parse(localStorage.getItem('myLoans')) || [];
    setStats({ books: b.length, users: u.length, loans: l.filter(i => i.status === 'En cours').length });
  }, []);

  const cards = [
    { title: 'Total Livres', value: stats.books, icon: <Book />, color: 'primary' },
    { title: 'Utilisateurs', value: stats.users, icon: <Users />, color: 'success' },
    { title: 'Emprunts Actifs', value: stats.loans, icon: <ClipboardList />, color: 'warning' },
    { title: 'Nouveaux', value: '+12', icon: <TrendingUp />, color: 'info' },
  ];

  return (
    <div className="container-fluid py-4">
      <h2 className="fw-bold mb-4">Tableau de Bord</h2>
      <div className="row g-4">
        {cards.map((card, i) => (
          <div key={i} className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted small mb-1">{card.title}</p>
                  <h3 className="fw-bold m-0">{card.value}</h3>
                </div>
                <div className={`bg-${card.color} bg-opacity-10 p-3 rounded-3 text-${card.color}`}>
                  {card.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default Dashboard;