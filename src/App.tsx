import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AlgorithmVisualizer from './components/AlgorithmVisualizer';
import Footer from './components/Footer';
import './index.css';

const App: React.FC = () => {
  const [selectedAlgo, setSelectedAlgo] = useState<string | null>(null);

  return (
    <div className="app-container">
      <Navbar onNavigate={(algo) => setSelectedAlgo(algo)} />
      
      {!selectedAlgo ? (
        <Hero onStart={() => setSelectedAlgo('sorting')} />
      ) : (
        <main className="main-content">
          <AlgorithmVisualizer type={selectedAlgo} />
        </main>
      )}
      
      <Footer />
    </div>
  );
};

export default App;
