import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import EditorPage from './components/EditorPage';
import './index.css';

const App: React.FC = () => {
  const [page, setPage] = useState<'home' | 'editor'>('home');

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar page={page} onNavigate={setPage} />
      {page === 'home' ? (
        <LandingPage onStart={() => setPage('editor')} />
      ) : (
        <EditorPage />
      )}
    </div>
  );
};

export default App;
