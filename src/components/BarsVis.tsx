import React from 'react';

interface VisFrame {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  label?: string;
}

interface Props {
  frames: VisFrame[];
  currentFrame: number;
}

const BarsVis: React.FC<Props> = ({ frames, currentFrame }) => {
  const frame = frames[currentFrame] || { array: [], comparing: [], swapping: [], sorted: [] };
  const max = Math.max(...frame.array, 1);

  return (
    <div className="bars-wrap">
      {frame.array.map((val, i) => {
        const isComparing = frame.comparing.includes(i);
        const isSwapping = frame.swapping.includes(i);
        const isSorted = frame.sorted.includes(i);
        let cls = 'vis-bar';
        if (isSwapping) cls += ' swapping';
        else if (isComparing) cls += ' comparing';
        else if (isSorted) cls += ' sorted';

        return (
          <div
            key={i}
            className={cls}
            style={{ height: `${(val / max) * 100}%` }}
          >
            {frame.array.length <= 20 && (
              <span className="vis-bar-label">{val}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BarsVis;
