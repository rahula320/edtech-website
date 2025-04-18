import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';
import Careers from './pages/Careers';
import StudentPortal from './pages/StudentPortal';
import ProgramDetail from './pages/ProgramDetail';
import './App.css';
import { programsData } from './data/programsData';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/portal" element={<StudentPortal />} />
          <Route path="/programs/:programId" element={<ProgramDetail programsData={programsData} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App; 