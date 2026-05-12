import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Code, Play, ChevronRight, BookOpen, Cpu, BarChart3, Globe } from 'lucide-react';

interface Props { onStart: () => void; }

const features = [
  { icon: <Code size={24} />, title: 'Advanced Editor', desc: 'Enterprise-grade Monaco editor with full intellisense and smart highlighting.', color: 'var(--primary-glow)', textColor: 'var(--primary)' },
  { icon: <Play size={24} />, title: 'Deep Tracing', desc: 'Trace every variable mutation and comparison with frame-perfect precision.', color: 'var(--secondary-glow)', textColor: 'var(--secondary)' },
  { icon: <BookOpen size={24} />, title: 'Curated Library', desc: 'From basic sorting to complex graph algorithms and dynamic programming.', color: 'var(--tertiary-glow)', textColor: 'var(--tertiary)' },
  { icon: <Globe size={24} />, title: 'Polyglot Support', desc: 'Toggle between high-level Python and robust JavaScript in a single click.', color: 'rgba(245,158,11,0.1)', textColor: 'var(--yellow)' },
  { icon: <Cpu size={24} />, title: 'Engine Insights', desc: 'See how the memory stack and heap change as your code executes.', color: 'rgba(244,63,94,0.1)', textColor: 'var(--accent)' },
  { icon: <BarChart3 size={24} />, title: 'Visual Metrics', desc: 'Analyze time complexity and operation counts with live data charts.', color: 'rgba(139,92,246,0.1)', textColor: '#8b5cf6' },
];

const LandingPage: React.FC<Props> = ({ onStart }) => {
  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="hero-badge">
            <Zap size={13} /> Beta — Free forever for students
          </div>
        </motion.div>

        <motion.h1 className="hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          Visualize{' '}
          <span className="gradient-text">Algorithms</span>
          <br />& Data Structures
        </motion.h1>

        <motion.p className="hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          The most powerful DSA visualization tool. Write code, watch it come alive, understand algorithms deeply — all in your browser.
        </motion.p>

        <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <button className="btn-primary" onClick={onStart} style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
            <Play size={18} /> Start Visualizing
          </button>
          <button className="btn-ghost" onClick={onStart} style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
            View Examples <ChevronRight size={16} />
          </button>
        </motion.div>

        <motion.div className="hero-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}>
          {[['10+', 'Algorithms'], ['2', 'Languages'], ['Free', 'Always']].map(([val, label]) => (
            <div key={label} className="stat">
              <span className="stat-val gradient-text">{val}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <h2 className="section-title">Everything you need to <span className="gradient-text">master DSA</span></h2>
        <p className="section-sub">A complete interactive environment built for students, engineers, and educators.</p>
        <div className="features-grid">
          {features.map((f, i) => (
            <motion.div key={i} className="feature-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
              <div className="feature-icon" style={{ background: f.color, color: f.textColor }}>{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '5rem 2rem 7rem' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.15),rgba(6,182,212,0.08))', border: '1px solid rgba(124,58,237,0.25)', borderRadius: 24, padding: '3rem 2rem', maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 800, marginBottom: '1rem' }}>
            Ready to <span className="gradient-text">visualize?</span>
          </h2>
          <p style={{ color: 'var(--text-2)', marginBottom: '2rem', lineHeight: 1.7 }}>
            No signup needed. Open the editor and start learning immediately.
          </p>
          <button className="btn-primary" onClick={onStart} style={{ padding: '0.85rem 2.5rem', fontSize: '1rem', margin: '0 auto' }}>
            <Zap size={18} /> Launch Editor
          </button>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="nav-logo" style={{ marginBottom: '0.75rem' }}>
                <div className="nav-logo-icon">⚡</div>
                <span>AlgoFlow</span>
              </div>
              <p>An interactive DSA visualization platform for students and developers.</p>
            </div>
            <div className="footer-links-grid">
              <div className="footer-col">
                <h4>Platform</h4>
                <a href="#" onClick={onStart}>Editor</a>
                <a href="#" onClick={onStart}>Examples</a>
                <a href="#">Documentation</a>
              </div>
              <div className="footer-col">
                <h4>Algorithms</h4>
                <a href="#">Sorting</a>
                <a href="#">Searching</a>
                <a href="#">Graph Traversal</a>
              </div>
              <div className="footer-col">
                <h4>Community</h4>
                <a href="#">GitHub</a>
                <a href="#">Discord</a>
                <a href="#">Feedback</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2025 AlgoFlow. Built for learners worldwide.</span>
            <span>Open Source · Free Forever</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
