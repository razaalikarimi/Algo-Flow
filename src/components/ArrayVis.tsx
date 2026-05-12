import React from 'react';

interface Props {
  array: number[];
  highlight?: number[];
  visited?: number[];
  label?: string;
}

const ArrayVis: React.FC<Props> = ({ array, highlight = [], visited = [] }) => {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      {array.map((val, i) => {
        const isHighlight = highlight.includes(i);
        const isVisited = visited.includes(i);
        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div
              style={{
                width: 52, height: 52,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isHighlight ? 'rgba(124,58,237,0.3)' : isVisited ? 'rgba(16,185,129,0.15)' : 'var(--bg-3)',
                border: `2px solid ${isHighlight ? 'var(--primary)' : isVisited ? 'var(--green)' : 'var(--border-2)'}`,
                borderRadius: 10,
                fontFamily: 'var(--mono)',
                fontWeight: 600,
                fontSize: '1rem',
                color: isHighlight ? 'var(--primary-light)' : isVisited ? 'var(--green)' : 'var(--text)',
                boxShadow: isHighlight ? '0 0 20px var(--primary-glow)' : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {val}
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>{i}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ArrayVis;
