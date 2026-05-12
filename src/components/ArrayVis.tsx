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
              className={`array-cell ${isHighlight ? 'highlight' : ''} ${isVisited ? 'visited' : ''}`}
              style={{
                width: 52, height: 52,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 10,
                fontFamily: 'var(--mono)',
                fontSize: '1rem',
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
