import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Editor } from '@monaco-editor/react';
import { Play, RotateCcw, Eye, Lightbulb } from 'lucide-react';

interface CodeEditorProps {
  initialCode: string;
  language: string;
  onCodeChange: (code: string) => void;
  hints?: string[];
  solution?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  initialCode, 
  language, 
  onCodeChange, 
  hints = [], 
  solution 
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    onCodeChange(newCode);
  };

  const runCode = () => {
    if (language === 'html') {
      setOutput(code);
    } else if (language === 'javascript') {
      try {
        const result = eval(code);
        setOutput(String(result));
      } catch (error) {
        setOutput(`Error: ${error}`);
      }
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    onCodeChange(initialCode);
    setOutput('');
  };

  const showNextHint = () => {
    if (currentHint < hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-medium">Code Editor</h3>
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={runCode}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
            >
              <Play className="h-4 w-4" />
              <span>Run</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetCode}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </motion.button>
            {hints.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowHints(!showHints)}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-yellow-700 transition-colors"
              >
                <Lightbulb className="h-4 w-4" />
                <span>Hints</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 h-96">
        <div className="border-r border-gray-200">
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={handleCodeChange}
            theme="vs-dark"
            options={{
              fontSize: 14,
              wordWrap: 'on',
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>
        
        <div className="bg-gray-50 p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Output</h4>
            <Eye className="h-5 w-5 text-gray-600" />
          </div>
          <div className="bg-white rounded-lg p-4 h-full overflow-auto">
            {language === 'html' ? (
              <iframe
                srcDoc={output}
                className="w-full h-full border-none"
                title="HTML Output"
              />
            ) : (
              <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap">
                {output || 'Run your code to see the output'}
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Hints Panel */}
      {showHints && hints.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-yellow-50 border-t border-yellow-200 p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-yellow-800">Hint {currentHint + 1} of {hints.length}</h4>
            {currentHint < hints.length - 1 && (
              <button
                onClick={showNextHint}
                className="text-yellow-600 hover:text-yellow-800 text-sm"
              >
                Next Hint →
              </button>
            )}
          </div>
          <p className="text-yellow-700">{hints[currentHint]}</p>
        </motion.div>
      )}

      {/* Solution Panel */}
      {solution && (
        <div className="bg-gray-50 border-t border-gray-200 p-4">
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="text-blue-600 hover:text-blue-800 font-medium mb-2"
          >
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
          {showSolution && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-white rounded-lg p-4 font-mono text-sm"
            >
              <pre>{solution}</pre>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default CodeEditor;