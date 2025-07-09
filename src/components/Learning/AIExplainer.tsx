import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Lightbulb, Code, BookOpen } from 'lucide-react';

interface AIExplainerProps {
  selectedText: string;
  onClose: () => void;
  position: { x: number; y: number };
}

const AIExplainer: React.FC<AIExplainerProps> = ({ selectedText, onClose, position }) => {
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateExplanation = async () => {
    setIsLoading(true);
    // Simulate AI explanation generation
    setTimeout(() => {
      setExplanation(getExplanationForText(selectedText));
      setIsLoading(false);
    }, 1000);
  };

  const getExplanationForText = (text: string): string => {
    // Simple explanation generator based on common web dev terms
    const explanations: { [key: string]: string } = {
      'html': 'HTML (HyperText Markup Language) is the foundation of web pages. It uses tags to structure content and define elements like headings, paragraphs, and links.',
      'css': 'CSS (Cascading Style Sheets) controls the visual appearance of web pages. It handles colors, fonts, layouts, and animations.',
      'javascript': 'JavaScript is a programming language that adds interactivity to websites. It can manipulate HTML elements, handle user events, and communicate with servers.',
      'div': 'A <div> is a container element in HTML that groups other elements together. It\'s commonly used for layout and styling purposes.',
      'function': 'A function is a reusable block of code that performs a specific task. It can accept parameters and return values.',
      'variable': 'A variable is a container that stores data values. In programming, you can assign different types of data to variables.',
      'loop': 'A loop is a programming construct that repeats a block of code multiple times until a condition is met.',
      'array': 'An array is a data structure that stores multiple values in a single variable. Values are accessed using index numbers.',
      'object': 'An object is a collection of related data and functions. It represents a real-world entity with properties and methods.',
      'class': 'A class is a template for creating objects. It defines the properties and methods that objects of that type will have.',
    };

    const lowerText = text.toLowerCase();
    for (const [key, value] of Object.entries(explanations)) {
      if (lowerText.includes(key)) {
        return value;
      }
    }

    return `Let me explain "${text}": This is a web development concept that's fundamental to building modern websites. It's used to create interactive and functional web applications.`;
  };

  React.useEffect(() => {
    generateExplanation();
  }, [selectedText]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed z-50 bg-white rounded-2xl shadow-2xl max-w-md w-80 border border-gray-200"
        style={{
          left: Math.min(position.x, window.innerWidth - 320),
          top: Math.min(position.y, window.innerHeight - 200),
        }}
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span className="font-medium">AI Explainer</span>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-3">
            <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {selectedText}
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">Explanation</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{explanation}</p>
              </div>

              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Code className="h-4 w-4" />
                  <span>Show Example</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Learn More</span>
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIExplainer;