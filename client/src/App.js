import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Programs from './pages/Programs';
import Internships from './pages/Internships';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Careers from './pages/Careers';
import MentorForm from './pages/MentorForm';

import CampusAmbassadorForm from './pages/CampusAmbassadorForm';
import ProgramDetail from './pages/ProgramDetail';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import CancellationRefund from './pages/CancellationRefund';
import NotFound from './pages/NotFound';
import './App.css';
import { programsData } from './data/programsData';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/mentor" element={<MentorForm />} />

          <Route path="/careers/campus-ambassador" element={<CampusAmbassadorForm />} />
          <Route path="/programs/:programId" element={<ProgramDetail programsData={programsData} />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cancellation-refund" element={<CancellationRefund />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App; 