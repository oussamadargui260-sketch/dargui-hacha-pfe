import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';

// 1. Check match bin smiya dial l-fichie o l-import
import Dashboard from './pages/admin/Dashboard';
import Books from './pages/admin/Books';
import Users from './pages/admin/Users';
import CreateBook from './pages/admin/CreateBook';
import CreateUser from './pages/admin/CreateUser';
import EditBook from './pages/admin/EditBook';

// HADA HOWA LI KAN FIH L-MOUCHKIL: 
// T-akked blli smiya hiya "Loans.jsx" f dossier admin
import Loans from './pages/admin/Loans'; 

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="books" element={<Books />} />
          <Route path="users" element={<Users />} />
          <Route path="create-book" element={<CreateBook />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="books/edit/:id" element={<EditBook />} />
          
          {/* T-akked blli Loans hna machi objet */}
          <Route path="loans" element={<Loans />} />
        </Route>

        <Route path="*" element={<Navigate to="/admin/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;