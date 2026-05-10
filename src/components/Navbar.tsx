import React from 'react';
import { Layout, Play, BookOpen, Settings, Github, Menu } from 'lucide-react';

interface NavbarProps {
  onNavigate: (algo: string | null) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="navbar glass">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => onNavigate(null)}>
          <div className="logo-icon">
            <Layout size={24} color="#6366f1" />
          </div>
          <span className="logo-text">Algo<span className="gradient-text">Flow</span></span>
        </div>

        <div className="nav-links">
          <button onClick={() => onNavigate('sorting')}>Algorithms</button>
          <button onClick={() => onNavigate('data-structures')}>Data Structures</button>
          <button>Complexity</button>
          <button>Quiz</button>
        </div>

        <div className="nav-actions">
          <button className="icon-btn"><Github size={20} /></button>
          <button className="icon-btn"><Settings size={20} /></button>
          <button className="glow-button">Sign In</button>
          <button className="mobile-menu"><Menu size={24} /></button>
        </div>
      </div>


    </nav>
  );
};

export default Navbar;
