import React, { useEffect, useRef } from 'react';

interface Props {
  code: string;
  language: string;
  onChange: (val: string) => void;
  activeLines?: number[];
}

const MonacoEditor: React.FC<Props> = ({ code, language, onChange, activeLines = [] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const decorationsRef = useRef<any[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Load monaco via CDN script
    if (!(window as any).monaco) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/loader.js';
      script.onload = () => {
        const require = (window as any).require;
        require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' } });
        require(['vs/editor/editor.main'], (monaco: any) => {
          monacoRef.current = monaco;
          initEditor(monaco);
        });
      };
      document.head.appendChild(script);
    } else {
      monacoRef.current = (window as any).monaco;
      initEditor((window as any).monaco);
    }

    return () => {
      editorRef.current?.dispose();
    };
  }, []);

  function initEditor(monaco: any) {
    if (!containerRef.current || editorRef.current) return;
    
    monaco.editor.defineTheme('algoflow-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: '6366f1', fontStyle: 'bold' },
        { token: 'string', foreground: '10b981' },
        { token: 'number', foreground: '0ea5e9' },
        { token: 'comment', foreground: '94a3b8', fontStyle: 'italic' },
        { token: 'function', foreground: '8b5cf6' },
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#0f172a',
        'editor.lineHighlightBackground': '#f1f5f9',
        'editorLineNumber.foreground': '#94a3b8',
        'editorLineNumber.activeForeground': '#6366f1',
        'editor.selectionBackground': '#6366f120',
        'editorCursor.foreground': '#6366f1',
        'editor.inactiveSelectionBackground': '#6366f110',
        'scrollbarSlider.background': '#e2e8f0',
      },
    });

    editorRef.current = monaco.editor.create(containerRef.current, {
      value: code,
      language,
      theme: 'algoflow-light',
      fontSize: 14,
      fontFamily: "'JetBrains Mono', monospace",
      fontLigatures: true,
      lineHeight: 22,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      roundedSelection: true,
      padding: { top: 16, bottom: 16 },
      smoothScrolling: true,
      cursorBlinking: 'phase',
      cursorSmoothCaretAnimation: 'on',
      bracketPairColorization: { enabled: true },
      automaticLayout: true,
    });

    editorRef.current.onDidChangeModelContent(() => {
      onChange(editorRef.current.getValue());
    });
  }

  // Update code if changed externally
  useEffect(() => {
    if (editorRef.current) {
      const current = editorRef.current.getValue();
      if (current !== code) {
        editorRef.current.setValue(code);
      }
    }
  }, [code]);

  // Update language
  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      if (model) monacoRef.current.editor.setModelLanguage(model, language);
    }
  }, [language]);

  // Highlight active lines
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;
    const monaco = monacoRef.current;
    const newDecorations = activeLines.map(line => ({
      range: new monaco.Range(line, 1, line, 1),
      options: {
        isWholeLine: true,
        className: 'active-line-highlight',
        glyphMarginClassName: 'active-line-glyph',
      },
    }));
    decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, newDecorations);
  }, [activeLines]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
  );
};

export default MonacoEditor;
