import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, SkipForward, Pause, Code as CodeIcon, Info } from 'lucide-react';
import CodeWindow from './CodeWindow';

interface VisualizerProps {
  type: string;
}

const AlgorithmVisualizer: React.FC<VisualizerProps> = ({ type }) => {
  const [array, setArray] = useState<number[]>([]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    resetArray();
  }, [type]);

  const resetArray = () => {
    const newArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 80) + 10);
    setArray(newArray);
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setIsRunning(false);
    setCurrentStep(0);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    setIsRunning(true);
    let arr = [...array];
    let n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isRunning && i > 0) return; // Basic stop check
        
        setComparing([j, j + 1]);
        await sleep(100 - speed);
        
        if (arr[j] > arr[j + 1]) {
          setSwapping([j, j + 1]);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(100 - speed);
          setSwapping([]);
        }
        setComparing([]);
      }
      setSorted(prev => [...prev, n - i - 1]);
    }
    setSorted(Array.from({ length: n }, (_, i) => i));
    setIsRunning(false);
  };

  return (
    <div className="visualizer-container">
      <div className="visualizer-main">
        <div className="visualizer-header">
          <div>
            <h2>Bubble Sort <Info size={16} className="info-icon" /></h2>
            <p>Time Complexity: O(n²)</p>
          </div>
          <div className="controls">
            <button className="icon-btn" onClick={resetArray}><RotateCcw size={20} /></button>
            <button className="glow-button flex-center" onClick={bubbleSort} disabled={isRunning}>
              {isRunning ? <Pause size={18} /> : <Play size={18} />}
              <span style={{ marginLeft: '8px' }}>{isRunning ? 'Running...' : 'Visualize'}</span>
            </button>
            <div className="speed-control">
              <span>Speed</span>
              <input type="range" min="1" max="99" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
            </div>
          </div>
        </div>

        <div className="visualizer-stage glass">
          <div className="bars-container">
            {array.map((value, idx) => (
              <motion.div
                key={idx}
                layout
                className={`bar ${comparing.includes(idx) ? 'comparing' : ''} ${swapping.includes(idx) ? 'swapping' : ''} ${sorted.includes(idx) ? 'sorted' : ''}`}
                style={{ height: `${value}%` }}
              >
                <span className="bar-value">{value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="visualizer-side">
        <CodeWindow currentLine={currentStep} />
        <div className="explanation glass">
          <h3>Algorithm Logic</h3>
          <p>Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.</p>
          <ul>
            <li>Compare adjacent elements.</li>
            <li>Swap if left &gt; right.</li>
            <li>Repeat until sorted.</li>
          </ul>
        </div>
      </div>


    </div>
  );
};

export default AlgorithmVisualizer;
