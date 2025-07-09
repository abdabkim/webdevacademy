// components/Learning/LiveCodeEditor.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  RotateCcw, 
  CheckCircle, 
  Eye, 
  EyeOff, 
  Code, 
  Target,
  Lightbulb,
  X
} from 'lucide-react';

interface LiveCodeEditorProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: {
    title: string;
    description: string;
    starterCode: string;
    expectedOutput: string;
    hints: string[];
    solution: string;
  };
  onComplete: () => void;
}

const LiveCodeEditor: React.FC<LiveCodeEditorProps> = ({
  isOpen,
  onClose,
  exercise,
  onComplete
}) => {
  const [code, setCode] = useState(exercise.starterCode);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const previewRef = useRef<HTMLIFrameElement>(null);

  // Update preview whenever code changes
  useEffect(() => {
    if (previewRef.current && isPreviewVisible) {
      const iframe = previewRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(code);
        doc.close();
      }
    }
  }, [code, isPreviewVisible]);

  // Check if solution is correct
  useEffect(() => {
    const normalizedCode = code.replace(/\s+/g, ' ').trim().toLowerCase();
    const normalizedExpected = exercise.expectedOutput.replace(/\s+/g, ' ').trim().toLowerCase();
    setIsCorrect(normalizedCode.includes(normalizedExpected));
  }, [code, exercise.expectedOutput]);

  const resetCode = () => {
    setCode(exercise.starterCode);
    setShowSolution(false);
    setCurrentHint(0);
  };

  const showSolutionCode = () => {
    setCode(exercise.solution);
    setShowSolution(true);
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-5/6 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{exercise.title}</h2>
                  <p className="text-purple-100">{exercise.description}</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {/* Success Message */}
              {isCorrect && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-green-500 bg-opacity-20 border border-green-300 rounded-lg p-3 flex items-center space-x-2"
                >
                  <CheckCircle className="h-5 w-5 text-green-200" />
                  <span className="text-green-100 font-medium">
                    Great job! Your code is working correctly! 🎉
                  </span>
                </motion.div>
              )}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
              {/* Code Editor */}
              <div className="w-1/2 border-r border-gray-200 flex flex-col">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Code className="h-4 w-4 text-gray-600" />
                    <span className="font-medium text-gray-700">HTML Editor</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={resetCode}
                      className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded"
                      title="Reset Code"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 relative">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-full p-4 font-mono text-sm border-0 resize-none focus:outline-none bg-gray-900 text-green-400"
                    style={{
                      background: '#1a1a1a',
                      color: '#00ff41',
                      fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                      lineHeight: '1.5'
                    }}
                    placeholder="Write your HTML code here..."
                    spellCheck={false}
                  />
                  
                  {/* Line Numbers */}
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-800 border-r border-gray-700 flex flex-col text-gray-500 text-xs font-mono pt-4">
                    {code.split('\n').map((_, index) => (
                      <div key={index} className="h-6 flex items-center justify-center">
                        {index + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview Panel */}
              <div className="w-1/2 flex flex-col">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-gray-600" />
                    <span className="font-medium text-gray-700">Live Preview</span>
                  </div>
                  <button
                    onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded"
                  >
                    {isPreviewVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                
                {isPreviewVisible ? (
                  <div className="flex-1 bg-white border-2 border-dashed border-gray-200 m-4 rounded-lg overflow-hidden">
                    <iframe
                      ref={previewRef}
                      className="w-full h-full border-0"
                      title="Live Preview"
                      sandbox="allow-same-origin"
                    />
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <EyeOff className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                      <p>Preview hidden</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Panel */}
            <div className="bg-gray-50 p-4 rounded-b-2xl border-t border-gray-200">
              <div className="flex items-center justify-between">
                {/* Help Section */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    <Lightbulb className="h-4 w-4" />
                    <span>Hints ({exercise.hints.length})</span>
                  </button>
                  
                  <button
                    onClick={showSolutionCode}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Show Solution
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                  
                  {isCorrect && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleComplete}
                      className="flex items-center space-x-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Complete Exercise</span>
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Hints Panel */}
              <AnimatePresence>
                {showHints && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-yellow-900">
                        Hint {currentHint + 1} of {exercise.hints.length}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setCurrentHint(Math.max(0, currentHint - 1))}
                          disabled={currentHint === 0}
                          className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded text-sm disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => setCurrentHint(Math.min(exercise.hints.length - 1, currentHint + 1))}
                          disabled={currentHint === exercise.hints.length - 1}
                          className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded text-sm disabled:opacity-50"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                    <p className="text-yellow-800">{exercise.hints[currentHint]}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expected Output */}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  Expected Output
                </h4>
                <div className="bg-white border border-blue-200 rounded p-3">
                  <div dangerouslySetInnerHTML={{ __html: exercise.expectedOutput }} />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiveCodeEditor;