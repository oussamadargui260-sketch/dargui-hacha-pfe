import React, { useState, useEffect } from 'react';
import { 
  Library, 
  Users2, 
  Handshake, 
  TrendingUp, 
  ArrowUpRight,
  MoreHorizontal,
  Download,
  Plus,
  ArrowRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({ books: 0, users: 0, loans: 0 });

  useEffect(() => {
    const b = JSON.parse(localStorage.getItem('myLibrary')) || [];
    const u = JSON.parse(localStorage.getItem('myUsers')) || [];
    const l = JSON.parse(localStorage.getItem('myLoans')) || [];
    
    setStats({ 
      books: b.length, 
      users: u.length, 
      loans: l.filter(i => i.status === 'Active' || i.status === 'En cours').length 
    });
  }, []);

  const activityData = [
    { name: 'Lun', emprunts: 4 },
    { name: 'Mar', emprunts: 7 },
    { name: 'Mer', emprunts: 5 },
    { name: 'Jeu', emprunts: 12 },
    { name: 'Ven', emprunts: 9 },
    { name: 'Sam', emprunts: 15 },
    { name: 'Dim', emprunts: 10 },
  ];

  const categoryData = [
    { name: 'Informatique', value: 40 },
    { name: 'Roman', value: 30 },
    { name: 'Droit', value: 15 },
    { name: 'Science', value: 15 },
  ];

  const COLORS = ['#6366f1', '#8b5cf6', '#3b82f6', '#06b6d4'];

  const cards = [
    { title: 'Livres au Total', value: stats.books, icon: <Library size={22}/>, color: '#6366f1', bg: 'rgba(99, 102, 241, 0.1)' },
    { title: 'Membres Actifs', value: stats.users, icon: <Users2 size={22}/>, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' },
    { title: 'Prêts en Cours', value: stats.loans, icon: <Handshake size={22}/>, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
    { title: 'Taux de Croissance', value: '+14%', icon: <TrendingUp size={22}/>, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
  ];

  return (
    <div className="w-100">
      
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold m-0 text-dark" style={{ letterSpacing: '-1.2px' }}>Aperçu Général</h2>
          <p className="text-secondary small">Résumé de l'activité de votre bibliothèque pour aujourd'hui.</p>
        </div>
        <div className="d-flex gap-2">
           <button className="btn btn-white shadow-sm rounded-3 border-0 px-3 py-2 text-secondary fw-bold small d-flex align-items-center gap-2">
             <Download size={16} /> EXPORTER
           </button>
           <button className="btn btn-primary shadow-indigo rounded-3 px-4 py-2 fw-bold small border-0 d-flex align-items-center gap-2" style={{ background: '#6366f1' }}>
             <Plus size={18} /> AJOUTER UN LIVRE
           </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        {cards.map((card, i) => (
          <div key={i} className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 hover-lift">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="p-3 rounded-4 shadow-sm" style={{ backgroundColor: card.bg, color: card.color }}>
                  {card.icon}
                </div>
                <div className="bg-light p-1 rounded-circle cursor-pointer">
                  <MoreHorizontal size={16} className="text-muted" />
                </div>
              </div>
              <div>
                <p className="text-uppercase fw-bold text-muted mb-1" style={{ fontSize: '10px', letterSpacing: '1px' }}>{card.title}</p>
                <div className="d-flex align-items-baseline gap-2">
                    <h2 className="fw-bold m-0 text-slate-800">{card.value}</h2>
                    <span className="text-success small fw-bold" style={{ fontSize: '11px' }}><ArrowUpRight size={12}/> 2.5%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="row g-4">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold m-0 text-dark">Flux des Emprunts</h6>
              <div className="d-flex gap-2">
                <span className="badge bg-indigo-soft text-indigo border-0 rounded-pill px-3 py-2 small">Hebdomadaire</span>
              </div>
            </div>
            <div style={{ width: '100%', height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="colorIndigo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                  <Area type="monotone" dataKey="emprunts" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorIndigo)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <h6 className="fw-bold mb-4 text-dark">Répartition du Stock</h6>
            <div style={{ width: '100%', height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} innerRadius={70} outerRadius={90} paddingAngle={10} dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={10} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4">
               {categoryData.map((item, i) => (
                 <div key={i} className="d-flex align-items-center justify-content-between py-2 border-bottom border-light border-opacity-50">
                   <div className="d-flex align-items-center gap-2">
                     <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: COLORS[i] }}></div>
                     <span className="small text-secondary fw-medium">{item.name}</span>
                   </div>
                   <span className="small fw-bold text-dark">{item.value}%</span>
                 </div>
               ))}
            </div>

            <button className="btn btn-light w-100 mt-4 rounded-3 border-0 py-2 small fw-bold text-indigo d-flex align-items-center justify-content-center gap-2">
                DÉTAILS DU STOCK <ArrowRight size={14}/>
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          .shadow-indigo { box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3) !important; }
          .bg-indigo-soft { background-color: rgba(99, 102, 241, 0.1); }
          .text-indigo { color: #6366f1; }
          .text-slate-800 { color: #1e293b; }
          .hover-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
          .hover-lift:hover { transform: translateY(-5px); box-shadow: 0 15px 30px -5px rgba(0,0,0,0.1) !important; }
          .btn-white { background: white; color: #64748b; }
        `}
      </style>
    </div>
  );
};

export default Dashboard;