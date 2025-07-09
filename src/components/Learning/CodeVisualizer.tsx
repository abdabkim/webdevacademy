// components/Learning/CodeVisualizer.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Eye, Code, Layers, Zap } from 'lucide-react';

interface CodeVisualizerProps {
  code: string;
  language: 'html' | 'css' | 'javascript';
  showPreview?: boolean;
  interactive?: boolean;
  explanations?: { [key: string]: string };
}

interface HTMLElement {
  tag: string;
  content: string;
  attributes: { [key: string]: string };
  children: HTMLElement[];
  id: string;
}

const CodeVisualizer: React.FC<CodeVisualizerProps> = ({
  code,
  language = 'html',
  showPreview = true,
  interactive = true,
  explanations = {}
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedElement, setHighlightedElement] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [parsedElements, setParsedElements] = useState<HTMLElement[]>([]);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const previewRef = useRef<HTMLDivElement>(null);

  // Parse HTML code into structured elements
  const parseHTML = (htmlString: string): HTMLElement[] => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${htmlString}</div>`, 'text/html');
    const elements: HTMLElement[] = [];
    
    const processNode = (node: Node, index: number): HTMLElement | null => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        const htmlElement: HTMLElement = {
          tag: element.tagName.toLowerCase(),
          content: element.textContent || '',
          attributes: {},
          children: [],
          id: `element-${index}`
        };
        
        // Extract attributes
        for (let i = 0; i < element.attributes.length; i++) {
          const attr = element.attributes[i];
          htmlElement.attributes[attr.name] = attr.value;
        }
        
        // Process children
        Array.from(element.childNodes).forEach((child, childIndex) => {
          const childElement = processNode(child, childIndex);
          if (childElement) {
            htmlElement.children.push(childElement);
          }
        });
        
        return htmlElement;
      }
      return null;
    };
    
    const rootDiv = doc.body.firstChild as Element;
    if (rootDiv) {
      Array.from(rootDiv.childNodes).forEach((child, index) => {
        const element = processNode(child, index);
        if (element) {
          elements.push(element);
        }
      });
    }
    
    return elements;
  };

  // Animation steps for building HTML structure
  const animationSteps = [
    { element: 'html', description: 'Start with the HTML document structure' },
    { element: 'head', description: 'Add the head section for metadata' },
    { element: 'title', description: 'Set the page title' },
    { element: 'body', description: 'Create the body for visible content' },
    { element: 'h1', description: 'Add a main heading' },
    { element: 'p', description: 'Insert a paragraph' },
    { element: 'img', description: 'Include an image' },
    { element: 'a', description: 'Add a link' }
  ];

  useEffect(() => {
    setParsedElements(parseHTML(code));
  }, [code]);

  // Auto-play animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < animationSteps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 2000 / animationSpeed);
    } else if (currentStep >= animationSteps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, animationSpeed]);

  // Handle element click for explanations
  const handleElementClick = (elementId: string, tag: string) => {
    setHighlightedElement(elementId);
    if (explanations[tag]) {
      setShowExplanation(true);
    }
  };

  // Render HTML structure tree
  const renderElementTree = (elements: HTMLElement[], depth = 0) => {
    return elements.map((element, index) => (
      <motion.div
        key={element.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`ml-${depth * 4}`}
      >
        <div
          className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-all ${
            highlightedElement === element.id
              ? 'bg-blue-100 border-2 border-blue-300'
              : 'hover:bg-gray-50 border border-transparent'
          }`}
          onClick={() => handleElementClick(element.id, element.tag)}
        >
          <div className="flex items-center space-x-1">
            <Layers className="h-4 w-4 text-gray-400" />
            <span className="font-mono text-sm font-medium text-purple-600">
              &lt;{element.tag}&gt;
            </span>
          </div>
          {element.content && (
            <span className="text-sm text-gray-600 truncate max-w-32">
              {element.content}
            </span>
          )}
          {Object.keys(element.attributes).length > 0 && (
            <div className="flex space-x-1">
              {Object.entries(element.attributes).map(([key, value]) => (
                <span key={key} className="text-xs bg-green-100 text-green-700 px-1 rounded">
                  {key}="{value}"
                </span>
              ))}
            </div>
          )}
        </div>
        {element.children.length > 0 && (
          <div className="ml-4">
            {renderElementTree(element.children, depth + 1)}
          </div>
        )}
      </motion.div>
    ));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header Controls */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <h3 className="font-semibold">Interactive Code Visualizer</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentStep(0)}
              className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <select
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(Number(e.target.value))}
              className="bg-white bg-opacity-20 text-white rounded px-2 py-1 text-sm"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span>Building webpage...</span>
            <span>{currentStep + 1} / {animationSteps.length}</span>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <motion.div
              className="bg-white h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / animationSteps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Code Structure View */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">HTML Structure</h4>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Eye className="h-4 w-4" />
              <span>Click elements to explore</span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <div className="font-mono text-sm space-y-1">
              {renderElementTree(parsedElements)}
            </div>
          </div>
          
          {/* Current Step Information */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">
                Step {currentStep + 1}: {animationSteps[currentStep]?.element}
              </span>
            </div>
            <p className="text-sm text-blue-700">
              {animationSteps[currentStep]?.description}
            </p>
          </motion.div>
        </div>

        {/* Live Preview */}
        {showPreview && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Live Preview</h4>
            
            <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-600 ml-4">Browser Preview</span>
                </div>
              </div>
              
              <div 
                ref={previewRef}
                className="p-6 min-h-48 bg-white"
                dangerouslySetInnerHTML={{ __html: code }}
              />
            </div>
            
            {/* Element Inspector */}
            {highlightedElement && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
              >
                <h5 className="font-medium text-yellow-900 mb-2">Element Inspector</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-yellow-700">Element:</span>
                    <span className="font-mono text-yellow-900">&lt;{parsedElements.find(el => el.id === highlightedElement)?.tag}&gt;</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-700">Purpose:</span>
                    <span className="text-yellow-900">
                      {explanations[parsedElements.find(el => el.id === highlightedElement)?.tag || ''] || 'Structural element'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Floating Explanation Modal */}
      <AnimatePresence>
        {showExplanation && highlightedElement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  &lt;{parsedElements.find(el => el.id === highlightedElement)?.tag}&gt; Element
                </h3>
                <button
                  onClick={() => setShowExplanation(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">What it does:</h4>
                  <p className="text-blue-800 text-sm">
                    {explanations[parsedElements.find(el => el.id === highlightedElement)?.tag || ''] || 
                     'This element helps structure your webpage content.'}
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Example usage:</h4>
                  <pre className="text-green-800 text-sm font-mono bg-white p-2 rounded border">
{`<${parsedElements.find(el => el.id === highlightedElement)?.tag}>
  Content goes here
</${parsedElements.find(el => el.id === highlightedElement)?.tag}>`}
                  </pre>
                </div>
                
                <button
                  onClick={() => setShowExplanation(false)}
                  className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Got it! 👍
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CodeVisualizer;