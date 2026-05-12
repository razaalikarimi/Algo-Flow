import React from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
}

interface Edge {
  from: string;
  to: string;
}

interface Props {
  nodes: Node[];
  edges: Edge[];
  highlightedNodes: string[];
  visitedNodes: string[];
}

const GraphVis: React.FC<Props> = ({ nodes, edges, highlightedNodes, visitedNodes }) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: 'var(--bg)', overflow: 'hidden' }}>
      <svg style={{ width: '100%', height: '100%' }}>
        {/* Render Edges */}
        {edges.map((edge, i) => {
          const fromNode = nodes.find(n => n.id === edge.from);
          const toNode = nodes.find(n => n.id === edge.to);
          if (!fromNode || !toNode) return null;

          const isActive = (highlightedNodes.includes(edge.from) && highlightedNodes.includes(edge.to)) ||
                          (visitedNodes.includes(edge.from) && visitedNodes.includes(edge.to));

          return (
            <line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              className={`ds-edge ${isActive ? 'active' : ''}`}
            />
          );
        })}

        {/* Render Nodes */}
        {nodes.map((node) => {
          const isHighlighted = highlightedNodes.includes(node.id);
          const isVisited = visitedNodes.includes(node.id);
          
          return (
            <g key={node.id} transform={`translate(${node.x - 26}, ${node.y - 26})`}>
              <foreignObject width="52" height="52">
                <div className={`ds-node ${isHighlighted ? 'highlight' : ''} ${isVisited ? 'visited' : ''}`}>
                  {node.label}
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default GraphVis;
