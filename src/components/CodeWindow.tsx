import React from 'react';

interface CodeWindowProps {
  currentLine: number;
}

const CodeWindow: React.FC<CodeWindowProps> = ({ currentLine }) => {
  const codeLines = [
    "procedure bubbleSort(list) :",
    "  n = length(list)",
    "  for i = 0 to n-2 :",
    "    for j = 0 to n-i-2 :",
    "      if list[j] > list[j+1] :",
    "        swap(list[j], list[j+1])",
    "      end if",
    "    end for",
    "  end for",
    "end procedure"
  ];

  return (
    <div className="code-window glass">
      <div className="code-header">
        <div className="dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <span className="file-name">bubble_sort.py</span>
      </div>
      <div className="code-content">
        {codeLines.map((line, idx) => (
          <div key={idx} className={`code-line ${currentLine === idx ? 'active' : ''}`}>
            <span className="line-num">{idx + 1}</span>
            <pre>{line}</pre>
          </div>
        ))}
      </div>


    </div>
  );
};

export default CodeWindow;
