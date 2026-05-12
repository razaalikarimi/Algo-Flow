import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { ALGORITHMS } from '../data/algorithms';

type Lang = 'javascript' | 'python';

interface Props {
  onSelect: (id: string, lang: Lang) => void;
  onClose: () => void;
}

const DIFF_COLORS: Record<string, string> = {
  Easy: 'badge-easy',
  Medium: 'badge-med',
  Hard: 'badge-hard',
};

const ExamplesModal: React.FC<Props> = ({ onSelect, onClose }) => {
  const [query, setQuery] = useState('');
  const [lang, setLang] = useState<Lang>('javascript');

  const filtered = ALGORITHMS.filter(a =>
    a.name.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-title">Example Algorithms</div>
            <div className="modal-sub">{ALGORITHMS.length}+ code examples ready to visualize</div>
          </div>
          <button className="btn-ghost" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="modal-search">
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={15} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--text-3)' }} />
            <input
              placeholder="Search algorithms..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{ paddingLeft: 36, width:'100%' }}
              autoFocus
            />
          </div>
          <select
            value={lang}
            onChange={e => setLang(e.target.value as Lang)}
            className="lang-select"
            style={{ minWidth: 120 }}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
        </div>

        <div className="modal-list">
          {filtered.map(algo => (
            <div key={algo.id} className="example-card" onClick={() => { onSelect(algo.id, lang); onClose(); }}>
              <div className="example-icon" style={{ background: 'var(--bg-4)' }}>{algo.icon}</div>
              <div className="example-info">
                <div className="example-name">{algo.name}</div>
                <div className="example-desc">{algo.description}</div>
              </div>
              <div className="example-meta">
                <span className={`sidebar-item-badge ${DIFF_COLORS[algo.difficulty]}`}>{algo.difficulty}</span>
                <span className="lang-pill">{lang === 'javascript' ? 'JS' : 'PY'}</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign:'center', color:'var(--text-3)', padding:'2rem' }}>No algorithms found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamplesModal;
