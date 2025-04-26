import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Programs from './pages/Programs';
import About from './pages/About';
import Careers from './pages/Careers';
import MentorForm from './pages/MentorForm';
import BdaForm from './pages/BdaForm';
import CampusAmbassadorForm from './pages/CampusAmbassadorForm';
import StudentPortal from './pages/StudentPortal';
import ProgramDetail from './pages/ProgramDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import './App.css';
import { programsData } from './data/programsData';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {!isAdminRoute && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/mentor" element={<MentorForm />} />
          <Route path="/careers/business-development" element={<BdaForm />} />
          <Route path="/careers/campus-ambassador" element={<CampusAmbassadorForm />} />
          <Route path="/portal" element={<StudentPortal />} />
          <Route path="/programs/:programId" element={<ProgramDetail programsData={programsData} />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App; 