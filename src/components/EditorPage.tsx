import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, SkipBack, RefreshCw, BookOpen, ChevronRight, Search, Layers } from 'lucide-react';
import MonacoEditor from './MonacoEditor';
import BarsVis from './BarsVis';
import ArrayVis from './ArrayVis';
import GraphVis from './GraphVis';
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

const SAMPLE_GRAPH = {
  nodes: [
    { id: '0', x: 300, y: 60, label: 'A' },
    { id: '1', x: 180, y: 150, label: 'B' },
    { id: '2', x: 420, y: 150, label: 'C' },
    { id: '3', x: 100, y: 260, label: 'D' },
    { id: '4', x: 260, y: 260, label: 'E' },
    { id: '5', x: 500, y: 260, label: 'F' },
  ],
  edges: [
    { from: '0', to: '1' }, { from: '0', to: '2' },
    { from: '1', to: '3' }, { from: '1', to: '4' },
    { from: '2', to: '5' },
  ]
};

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
          <span className="sidebar-title">Algorithm Lab</span>
          <button className="btn-ghost" style={{ padding: '6px 10px', borderRadius: 8 }} onClick={() => setShowExamples(true)}>
            <BookOpen size={14} />
          </button>
        </div>
        
        <div className="sidebar-search">
          <Search size={16} className="sidebar-search-icon" />
          <input placeholder="Search library..." value={sidebarQuery} onChange={e => setSidebarQuery(e.target.value)} />
        </div>

        <div style={{ padding: '0 1.25rem 1rem', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {CATEGORIES.slice(0, 5).map(cat => (
            <button key={cat} onClick={() => setSidebarCategory(cat)}
              className={`nav-badge ${sidebarCategory === cat ? 'active' : ''}`}
              style={{ 
                cursor: 'pointer', 
                background: sidebarCategory === cat ? 'var(--primary)' : 'var(--bg-3)',
                color: sidebarCategory === cat ? 'white' : 'var(--text-2)',
                border: '1px solid transparent'
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '1.1rem' }}>{algo.icon}</span>
                <span>{algo.name}</span>
              </div>
              <span className={`sidebar-item-badge badge-${algo.difficulty.toLowerCase().replace('medium','med')}`} style={{ fontSize: '0.65rem' }}>
                {algo.difficulty}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* ── CENTER PANEL ── */}
      <div className="center-panel">
        <div className="editor-toolbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="nav-logo-icon" style={{ width: 32, height: 32, fontSize: '0.8rem' }}>{selectedAlgo.icon}</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)' }}>{selectedAlgo.name}</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase' }}>{selectedAlgo.category}</span>
            </div>
          </div>

          <div style={{ flex: 1 }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-3)', padding: '4px', borderRadius: 10 }}>
            {(['javascript', 'python'] as const).map(l => (
              <button 
                key={l}
                onClick={() => handleLangChange(l)}
                style={{
                  fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: 8,
                  background: lang === l ? 'white' : 'transparent',
                  color: lang === l ? 'var(--primary)' : 'var(--text-3)',
                  boxShadow: lang === l ? 'var(--shadow-sm)' : 'none'
                }}
              >
                {l === 'javascript' ? 'JS' : 'PY'}
              </button>
            ))}
          </div>

          <button className="btn-primary" onClick={() => setShowExamples(true)} style={{ padding: '6px 14px', fontSize: '0.82rem', borderRadius: 10 }}>
            <BookOpen size={14} /> Examples
          </button>
        </div>

        <div className="code-area">
          <MonacoEditor
            code={code}
            language={lang === 'javascript' ? 'javascript' : 'python'}
            onChange={setCode}
            activeLines={frame ? [frame.activeLine] : []}
          />
        </div>

        <div className="divider-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Layers size={14} style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Live Trace Visualization
            </span>
          </div>
          {frame && (
            <span style={{ 
              fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', background: 'white', 
              padding: '4px 12px', borderRadius: 20, boxShadow: 'var(--shadow-sm)',
              maxWidth: '50%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
            }}>
              {frame.label}
            </span>
          )}
        </div>

        {/* Visualization */}
        <div className="vis-canvas-wrap" style={{ height: '45%' }}>
          <div className="vis-canvas">
            {frame && (selectedAlgo.visType === 'bars' || selectedAlgo.id === 'bubble-sort' || selectedAlgo.id === 'merge-sort') ? (
              <BarsVis frames={frames} currentFrame={currentFrame} />
            ) : frame && selectedAlgo.visType === 'graph' ? (
              <GraphVis 
                nodes={SAMPLE_GRAPH.nodes} 
                edges={SAMPLE_GRAPH.edges} 
                highlightedNodes={frame.comparing.map(String)} 
                visitedNodes={frame.sorted.map(String)} 
              />
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
              {t === 'steps' ? 'Logic' : t === 'vars' ? 'Trace' : 'Docs'}
            </button>
          ))}
        </div>
        <div className="right-content">
          {rightTab === 'steps' && (
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: '1rem' }}>Algorithm Steps</div>
              {(selectedAlgo.steps || []).map((step, i) => (
                <div key={i} className={`step-item ${frame && frame.activeLine === i + 1 ? 'active' : ''}`}>
                  <span className="step-num">{i + 1}</span>
                  <span className="step-text" style={{ fontSize: '0.8rem', fontWeight: 500 }}>{step}</span>
                </div>
              ))}
            </div>
          )}
          {rightTab === 'vars' && (
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: '1rem' }}>Active Variables</div>
              {frame && Object.entries(frame.variables).map(([k, v]) => (
                <div key={k} className="var-row">
                  <span className="var-name">{k}</span>
                  <span className="var-val">{String(v)}</span>
                </div>
              ))}
              {(!frame || Object.keys(frame.variables || {}).length === 0) && (
                <div style={{ color: 'var(--text-3)', fontSize: '0.85rem', padding: '1rem', textAlign: 'center', border: '1px dashed var(--border)', borderRadius: 12 }}>
                  No active tracers
                </div>
              )}
            </div>
          )}
          {rightTab === 'info' && (
            <div>
              <div style={{ display: 'flex', gap: 12, marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '2rem', background: 'var(--bg-3)', width: 56, height: 56, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{selectedAlgo.icon}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{selectedAlgo.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-3)', fontWeight: 700 }}>{selectedAlgo.category}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-2)', lineHeight: 1.6, marginBottom: '1.5rem' }}>{selectedAlgo.description}</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div className="complexity-card">
                  <div className="complexity-label">Time</div>
                  <div className="complexity-val" style={{ color: 'var(--primary)' }}>{selectedAlgo.timeComplexity}</div>
                </div>
                <div className="complexity-card">
                  <div className="complexity-label">Space</div>
                  <div className="complexity-val" style={{ color: 'var(--secondary)' }}>{selectedAlgo.spaceComplexity}</div>
                </div>
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
