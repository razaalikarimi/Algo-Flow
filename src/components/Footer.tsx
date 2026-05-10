import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>AlgoFlow</h3>
          <p>Interactive platform for mastering data structures and algorithms.</p>
        </div>
        <div className="footer-links">
          <div className="link-group">
            <h4>Platform</h4>
            <a href="#">Visualizer</a>
            <a href="#">Courses</a>
            <a href="#">Challenges</a>
          </div>
          <div className="link-group">
            <h4>Resources</h4>
            <a href="#">Documentation</a>
            <a href="#">Blog</a>
            <a href="#">Community</a>
          </div>
          <div className="link-group">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Privacy</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 AlgoFlow. Built with ❤️ for Developers.</p>
      </div>


    </footer>
  );
};

export default Footer;
