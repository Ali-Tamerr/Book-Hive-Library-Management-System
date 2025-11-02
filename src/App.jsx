import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import OTP from './pages/OTP';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Overdue from './pages/Overdue';
import UserManagement from './pages/UserManagement';
import TestAPI from './pages/TestAPI';
import Catalog from './pages/Catalog';
import Books from './pages/Books';
import Categories from './pages/Categories';
import Reports from './pages/Reports';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/overdue" element={<Overdue />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/test-api" element={<TestAPI />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/books" element={<Books />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
