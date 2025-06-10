import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ModelsPage from './pages/ModelsPage';
import TrainingPage from './pages/TrainingPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';
import Layout from './components/Layout';
import { useAuth } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  const { currentUser } = useAuth();
  return (
    <div className="App">

      <Routes>

        {/* Public Routes - Accessible to everyone */}
        <Route path="/login" element={currentUser ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/register" element={currentUser ? <Navigate to="/" /> : <RegisterPage />} />

        {/* Protected Routes - Require authentication */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            {/* <Route path="/" element={<HomePage />} />  */}
            <Route path="/" element={<DashboardPage />} />
            {/* Add routes for the new pages */}
            <Route path="/models" element={<ModelsPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>



        {/* Optional: Add a catch-all 404 route */}
        <Route path="*" element={<div><h2>404 Page Not Found</h2><Link to="/">Go Home</Link></div>} />
      </Routes>
    </div>
  );
}

export default App;