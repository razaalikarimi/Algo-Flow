import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, SkipBack, RefreshCw, BookOpen, ChevronRight, Search, Layers } from 'lucide-react';
import MonacoEditor from './MonacoEditor';
import BarsVis from './BarsVis';
import ArrayVis from './ArrayVis';
import ExamplesModal from './ExamplesModal';
import { ALGORITHMS } from '../data/algorithms';
import { generateFrames } from '../engine/visualizer';
import type { VisFrame } from '../engine/visualizer';

type Lang = 'javascript' | 'python';

interface AlgoExample {
  id: string; name: string; category: string; difficulty: string;
  description: string; icon: string; visType: string;
  timeComplexity: string; spaceComplexity: string;
  code: { javascript: string; python: string };
  steps: string[];
}

const CATEGORIES = ['All', 'Sorting', 'Searching', 'Graph', 'Tree', 'Dynamic Programming', 'Stack & Queue', 'Linked List'];

const EditorPage: React.FC = () => {
  const [selectedAlgo, setSelectedAlgo] = useState<AlgoExample>(ALGORITHMS[0] as AlgoExample);
  const [lang, setLang] = useState<Lang>('javascript');


  const [code, setCode] = useState(ALGORITHMS[0].code.javascript);
  const [frames, setFrames] = useState<VisFrame[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [showExamples, setShowExamples] = useState(false);
  const [rightTab, setRightTab] = useState<'steps' | 'vars' | 'info'>('steps');
  const [sidebarQuery, setSidebarQuery] = useState('');
  const [sidebarCategory, setSidebarCategory] = useState('All');
  const playRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const randomArr = () => Array.from({ length: 12 }, () => Math.floor(Math.random() * 80) + 10);

  const loadAlgo = useCallback((algo: AlgoExample, l: Lang = lang) => {
    setSelectedAlgo(algo);
    setLang(l);
    setCode(algo.code[l]);
    const arr = randomArr();
    setFrames(generateFrames(algo.id, arr));
    setCurrentFrame(0);
    setIsPlaying(false);
  }, [lang]);

  useEffect(() => {
    const arr = randomArr();
    setFrames(generateFrames(selectedAlgo.id, arr));
  }, []);

  const stopPlay = () => {
    if (playRef.current) clearInterval(playRef.current);
    playRef.current = null;
  };

  useEffect(() => {
    if (isPlaying) {
      const delay = Math.max(100, 1000 - speed * 9);
      playRef.current = setInterval(() => {
        setCurrentFrame(f => {
          if (f >= frames.length - 1) {
            setIsPlaying(false);
            stopPlay();
            return f;
          }
          return f + 1;
        });
      }, delay);
    } else {
      stopPlay();
    }
    return stopPlay;
  }, [isPlaying, speed, frames.length]);

  const handleSelectAlgo = (id: string, l: Lang) => {
    const algo = ALGORITHMS.find(a => a.id === id);
    if (algo) loadAlgo(algo, l);
  };

  const handleReset = () => {
    stopPlay();
    setIsPlaying(false);
    const arr = randomArr();
    setFrames(generateFrames(selectedAlgo.id, arr));
    setCurrentFrame(0);
  };

  const handleLangChange = (l: Lang) => {
    setLang(l);
    setCode(selectedAlgo.code[l]);
  };

  const frame = frames[currentFrame];
  const progress = frames.length > 1 ? (currentFrame / (frames.length - 1)) * 100 : 0;

  const filteredAlgos = ALGORITHMS.filter(a =>
    (sidebarCategory === 'All' || a.category === sidebarCategory) &&
    a.name.toLowerCase().includes(sidebarQuery.toLowerCase())
  );

  return (
    <div className="editor-page">
      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-title">Algorithms</span>
          <button className="btn-ghost" style={{ padding: '4px 8px', fontSize: '0.75rem' }} onClick={() => setShowExamples(true)}>
            <BookOpen size={13} /> Browse
          </button>
        </div>
        <div className="sidebar-search">
          <Search size={14} className="sidebar-search-icon" />
          <input placeholder="Search..." value={sidebarQuery} onChange={e => setSidebarQuery(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: 4, padding: '0 0.75rem 0.5rem', flexWrap: 'wrap' }}>
          {CATEGORIES.slice(0, 5).map(cat => (
            <button key={cat} onClick={() => setSidebarCategory(cat)}
              style={{
                fontSize: '0.7rem', padding: '3px 8px', borderRadius: 6, cursor: 'pointer',
                background: sidebarCategory === cat ? 'rgba(124,58,237,0.2)' : 'var(--bg-3)',
                color: sidebarCategory === cat ? 'var(--primary-light)' : 'var(--text-3)',
                border: `1px solid ${sidebarCategory === cat ? 'var(--primary)' : 'transparent'}`,
                transition: 'all 0.2s',
              }}>
              {cat}
            </button>
          ))}
        </div>
        <div className="sidebar-list">
          {filteredAlgos.map(algo => (
            <div
              key={algo.id}
              className={`sidebar-item ${selectedAlgo.id === algo.id ? 'active' : ''}`}
              onClick={() => loadAlgo(algo)}
            >
              <span>{algo.icon} {algo.name}</span>
              <span className={`sidebar-item-badge badge-${algo.difficulty.toLowerCase().replace('medium','med')}`}>
                {algo.difficulty}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* ── CENTER PANEL ── */}
      <div className="center-panel">
        {/* Toolbar */}
        <div className="editor-toolbar">
          <select className="lang-select" value={lang} onChange={e => handleLangChange(e.target.value as Lang)}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
          <div className="toolbar-sep" />
          <button className="btn-ghost" onClick={() => setShowExamples(true)} style={{ fontSize: '0.82rem', padding: '5px 12px' }}>
            <BookOpen size={14} /> Examples
          </button>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-3)', background: 'var(--bg-3)', padding: '4px 10px', borderRadius: 6 }}>
            {selectedAlgo.icon} {selectedAlgo.name}
          </span>
        </div>

        {/* Monaco Editor */}
        <div className="code-area" style={{ height: '45%' }}>
          <MonacoEditor
            code={code}
            language={lang === 'javascript' ? 'javascript' : 'python'}
            onChange={setCode}
            activeLines={frame ? [frame.activeLine] : []}
          />
        </div>

        {/* Divider */}
        <div className="divider-bar">
          <span className="divider-label">
            <Layers size={12} style={{ display:'inline', marginRight:5, verticalAlign:'middle' }} />
            Visualization
          </span>
          {frame && <span style={{ fontSize: '0.75rem', color: 'var(--primary-light)', fontWeight: 600 }}>{frame.label}</span>}
        </div>

        {/* Visualization */}
        <div className="vis-canvas-wrap" style={{ height: '45%' }}>
          <div className="vis-canvas">
            {frame && (selectedAlgo.visType === 'bars' || selectedAlgo.id === 'bubble-sort' || selectedAlgo.id === 'merge-sort') ? (
              <BarsVis frames={frames} currentFrame={currentFrame} />
            ) : frame ? (
              <ArrayVis array={frame.array} highlight={frame.comparing} visited={frame.sorted} />
            ) : (
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', color:'var(--text-3)', fontSize:'0.9rem' }}>
                Click ▶ to start visualization
              </div>
            )}
          </div>

          {/* Playback bar */}
          <div className="playback-bar">
            <button className="btn-ghost" style={{ padding: '5px 8px' }} onClick={() => setCurrentFrame(0)}>
              <SkipBack size={15} />
            </button>
            <button className="btn-ghost" style={{ padding: '5px 8px' }} onClick={() => setCurrentFrame(f => Math.max(0, f - 1))}>
              <ChevronRight size={15} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button
              className="btn-primary"
              style={{ padding: '6px 16px', fontSize: '0.82rem' }}
              onClick={() => { if (currentFrame >= frames.length - 1) { setCurrentFrame(0); setIsPlaying(true); } else setIsPlaying(p => !p); }}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button className="btn-ghost" style={{ padding: '5px 8px' }} onClick={() => setCurrentFrame(f => Math.min(frames.length - 1, f + 1))}>
              <ChevronRight size={15} />
            </button>
            <button className="btn-ghost" style={{ padding: '5px 8px' }} onClick={handleReset}>
              <RefreshCw size={14} />
            </button>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="playback-step">{currentFrame + 1}/{frames.length}</span>
            <div className="speed-wrap">
              <span>Speed</span>
              <input type="range" min={1} max={99} value={speed} onChange={e => setSpeed(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="right-panel">
        <div className="right-tabs">
          {(['steps', 'vars', 'info'] as const).map(t => (
            <button key={t} className={`right-tab ${rightTab === t ? 'active' : ''}`} onClick={() => setRightTab(t)}>
              {t === 'steps' ? 'Steps' : t === 'vars' ? 'Variables' : 'Info'}
            </button>
          ))}
        </div>
        <div className="right-content">
          {rightTab === 'steps' && (
            <div>
              {(selectedAlgo.steps || []).map((step, i) => (
                <div key={i} className={`step-item ${frame && frame.activeLine === i + 1 ? 'active' : ''}`}>
                  <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="step-text">{step}</span>
                </div>
              ))}
              {frame && (
                <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 10, fontSize: '0.82rem', color: 'var(--text-2)' }}>
                  <div style={{ color: 'var(--primary-light)', fontWeight: 600, marginBottom: 4 }}>Current Step</div>
                  {frame.label}
                </div>
              )}
            </div>
          )}
          {rightTab === 'vars' && (
            <div>
              {frame && Object.entries(frame.variables).map(([k, v]) => (
                <div key={k} className="var-row">
                  <span className="var-name">{k}</span>
                  <span className="var-val">{String(v)}</span>
                </div>
              ))}
              {(!frame || Object.keys(frame.variables || {}).length === 0) && (
                <div style={{ color: 'var(--text-3)', fontSize: '0.85rem', padding: '0.5rem' }}>No variables tracked yet</div>
              )}
            </div>
          )}
          {rightTab === 'info' && (
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '1.5rem' }}>{selectedAlgo.icon}</span>
                <div>
                  <div style={{ fontWeight: 700 }}>{selectedAlgo.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-2)' }}>{selectedAlgo.category}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-2)', lineHeight: 1.6, marginBottom: '1.25rem' }}>{selectedAlgo.description}</p>
              <div className="complexity-card">
                <div className="complexity-label">Time Complexity</div>
                <div className="complexity-val gradient-text">{selectedAlgo.timeComplexity}</div>
              </div>
              <div className="complexity-card">
                <div className="complexity-label">Space Complexity</div>
                <div className="complexity-val" style={{ color: 'var(--cyan)' }}>{selectedAlgo.spaceComplexity}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showExamples && (
        <ExamplesModal onSelect={handleSelectAlgo} onClose={() => setShowExamples(false)} />
      )}
    </div>
  );
};

export default EditorPage;
