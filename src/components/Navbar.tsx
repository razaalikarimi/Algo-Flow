import React from 'react';
import { LogIn } from 'lucide-react';

interface Props {
  page: 'home' | 'editor';
  onNavigate: (p: 'home' | 'editor') => void;
}

const Navbar: React.FC<Props> = ({ page, onNavigate }) => {

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none' }}>
          <div className="nav-logo-icon">⚡</div>
          <span>AlgoFlow</span>
          <span className="nav-badge">BETA</span>
        </button>

        <div className="nav-tabs">
          <button className={`nav-tab ${page === 'editor' ? 'active' : ''}`} onClick={() => onNavigate('editor')}>
            Editor
          </button>
          <button className="nav-tab">Documentation</button>
          <button className="nav-tab">Articles</button>
          <button className="nav-tab">Feedback</button>
        </div>

        <div className="nav-right">
          <button className="btn-ghost" style={{ fontSize: '0.85rem' }}>
            <LogIn size={15} /> Login
          </button>
          <button className="btn-primary" onClick={() => onNavigate('editor')} style={{ fontSize: '0.85rem' }}>
            Open Editor
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
