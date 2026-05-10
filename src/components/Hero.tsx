import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Zap, Code, Shield } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge">New: Graph Visualizer 2.0</span>
          <h1 className="hero-title">
            Master Algorithms <br />
            <span className="gradient-text">Through Visualization</span>
          </h1>
          <p className="hero-description">
            The most advanced interactive platform to learn Data Structures and Algorithms. 
            Real-time execution, step-by-step debugging, and multi-language support.
          </p>
          <div className="hero-btns">
            <button className="glow-button" onClick={onStart}>
              Get Started <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </button>
            <button className="secondary-btn">
              Browse Library
            </button>
          </div>
          
          <div className="hero-features">
            <div className="feature-item">
              <Zap size={20} color="#6366f1" />
              <span>Real-time Visualization</span>
            </div>
            <div className="feature-item">
              <Code size={20} color="#a855f7" />
              <span>C++, Java, Python, JS</span>
            </div>
            <div className="feature-item">
              <Shield size={20} color="#10b981" />
              <span>100% Interactive</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="visual-container">
          <img src="/hero_illustration.png" alt="AlgoFlow Visualization" className="hero-img" />
          <div className="visual-overlay"></div>
        </div>
      </motion.div>


    </section>
  );
};

export default Hero;
