// components/Learning/AITutor.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  MessageCircle, 
  Lightbulb, 
  Target, 
  BarChart3, 
  RefreshCw,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Zap
} from 'lucide-react';

interface AITutorProps {
  isOpen: boolean;
  onClose: () => void;
  currentLesson: string;
  userProgress: any;
  learningLevel: 'beginner' | 'intermediate' | 'advanced';
}

interface TutorSuggestion {
  type: 'explanation' | 'analogy' | 'practice' | 'visual' | 'break';
  title: string;
  content: string;
  action?: string;
  icon: React.ReactNode;
}

interface FlashCard {
  id: string;
  question: string;
  answer: string;
  difficulty: number;
  lastReviewed: Date;
  nextReview: Date;
}

const AITutor: React.FC<AITutorProps> = ({ 
  isOpen, 
  onClose, 
  currentLesson, 
  userProgress, 
  learningLevel 
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'suggestions' | 'flashcards' | 'progress'>('chat');
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'ai', content: string}>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [currentFlashCard, setCurrentFlashCard] = useState<FlashCard | null>(null);
  const [showFlashCardAnswer, setShowFlashCardAnswer] = useState(false);

  // AI-generated suggestions based on current context
  const [suggestions] = useState<TutorSuggestion[]>([
    {
      type: 'explanation',
      title: 'Struggling with HTML tags?',
      content: 'Let me break down HTML tags with a simple analogy - they\'re like containers that organize your content.',
      action: 'Show analogy',
      icon: <Lightbulb className="h-4 w-4" />
    },
    {
      type: 'visual',
      title: 'See it in action',
      content: 'Watch how HTML elements come together to build a complete webpage.',
      action: 'Start animation',
      icon: <Play className="h-4 w-4" />
    },
    {
      type: 'practice',
      title: 'Quick practice',
      content: 'Try a 2-minute drag-and-drop exercise to reinforce what you\'ve learned.',
      action: 'Start practice',
      icon: <Target className="h-4 w-4" />
    },
    {
      type: 'break',
      title: 'Take a brain break',
      content: 'You\'ve been learning for 20 minutes. A 5-minute break can help consolidate memory.',
      action: 'Set timer',
      icon: <RefreshCw className="h-4 w-4" />
    }
  ]);

  // Spaced repetition flashcards
  const [flashCards] = useState<FlashCard[]>([
    {
      id: '1',
      question: 'What does HTML stand for?',
      answer: 'HyperText Markup Language',
      difficulty: 1,
      lastReviewed: new Date(Date.now() - 86400000), // 1 day ago
      nextReview: new Date()
    },
    {
      id: '2',
      question: 'What\'s the difference between a tag and an element?',
      answer: 'A tag is the keyword in brackets like <h1>, while an element includes the tags plus the content: <h1>Hello</h1>',
      difficulty: 2,
      lastReviewed: new Date(Date.now() - 172800000), // 2 days ago
      nextReview: new Date()
    },
    {
      id: '3',
      question: 'What are HTML attributes used for?',
      answer: 'Attributes provide additional information about elements, like src for images or href for links',
      difficulty: 1,
      lastReviewed: new Date(Date.now() - 43200000), // 12 hours ago
      nextReview: new Date(Date.now() + 86400000) // Tomorrow
    }
  ]);

  // Simulate AI chat responses
  const aiResponses = {
    'what is html': 'HTML is like the skeleton of a website! 🦴 It provides structure and tells the browser what each piece of content is. Think of it like building blocks - each HTML tag is a different type of block you can use to build your webpage.',
    'help': 'I\'m here to help you learn! You can ask me to:\n• Explain any concept with analogies\n• Show visual examples\n• Create practice exercises\n• Suggest break times\n• Quiz you on what you\'ve learned',
    'confused': 'No worries! Learning can feel overwhelming sometimes. Let me help break this down into smaller, easier pieces. What specific part is confusing you?',
    'analogy': 'Great question! I love analogies - they make complex ideas click! 💡 HTML tags are like containers in your kitchen - you have different containers for different things (cereal box, milk carton, soup can). Each HTML tag is a different type of container for different types of content!',
    'practice': 'Let\'s practice! I\'ll give you a quick challenge: Can you tell me what this HTML does?\n\n<h1>Welcome to my site</h1>\n<p>This is my first paragraph</p>\n\nTake your time and think about what each element represents!'
  };

  // Handle chat message sending
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = findBestResponse(userMessage);
      setChatMessages(prev => [...prev, { role: 'ai', content: response }]);
      setIsTyping(false);
      
      if (voiceEnabled) {
        speakText(response);
      }
    }, 1000 + Math.random() * 1000);
  };

  // Simple AI response matching
  const findBestResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    for (const [key, response] of Object.entries(aiResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    // Default helpful response
    return `That's a great question about "${message}"! Let me help you understand this better. HTML is all about structure and meaning. Would you like me to explain this concept with a real-world analogy, or would you prefer to see a visual example?`;
  };

  // Text-to-speech function
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  // Flashcard management
  const getNextFlashCard = (): FlashCard | null => {
    const dueCards = flashCards.filter(card => card.nextReview <= new Date());
    return dueCards.length > 0 ? dueCards[0] : null;
  };

  const handleFlashCardResponse = (difficulty: 'easy' | 'medium' | 'hard') => {
    if (!currentFlashCard) return;
    
    // Update next review based on spaced repetition algorithm
    const intervals = {
      easy: 7, // 7 days
      medium: 3, // 3 days  
      hard: 1 // 1 day
    };
    
    const nextReview = new Date(Date.now() + intervals[difficulty] * 86400000);
    // In real implementation, you'd update the database here
    
    setShowFlashCardAnswer(false);
    setCurrentFlashCard(getNextFlashCard());
  };

  // Initialize first flashcard
  useEffect(() => {
    if (activeTab === 'flashcards' && !currentFlashCard) {
      setCurrentFlashCard(getNextFlashCard());
    }
  }, [activeTab]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6" />
                <h3 className="text-lg font-bold">AI Learning Assistant</h3>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 text-xl"
              >
                ×
              </button>
            </div>
            <p className="text-sm text-purple-100">Your personal learning companion</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            {[
              { id: 'chat', label: 'Chat', icon: <MessageCircle className="h-4 w-4" /> },
              { id: 'suggestions', label: 'Tips', icon: <Lightbulb className="h-4 w-4" /> },
              { id: 'flashcards', label: 'Review', icon: <Zap className="h-4 w-4" /> },
              { id: 'progress', label: 'Progress', icon: <BarChart3 className="h-4 w-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 px-2 text-xs font-medium flex items-center justify-center space-x-1 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-purple-500 text-purple-600 bg-purple-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {/* Chat Tab */}
            {activeTab === 'chat' && (
              <div className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.length === 0 && (
                    <div className="text-center text-gray-500 mt-8">
                      <Brain className="h-12 w-12 mx-auto mb-4 text-purple-300" />
                      <p className="text-sm">Hi! I'm your AI tutor. Ask me anything about HTML or learning!</p>
                      <div className="mt-4 space-y-2">
                        <button
                          onClick={() => setChatMessages([{role: 'user', content: 'What is HTML?'}])}
                          className="block w-full text-left p-2 bg-gray-50 rounded-lg text-sm hover:bg-gray-100"
                        >
                          💭 "What is HTML?"
                        </button>
                        <button
                          onClick={() => setChatMessages([{role: 'user', content: 'I need an analogy'}])}
                          className="block w-full text-left p-2 bg-gray-50 rounded-lg text-sm hover:bg-gray-100"
                        >
                          🧠 "I need an analogy"
                        </button>
                        <button
                          onClick={() => setChatMessages([{role: 'user', content: 'Give me practice'}])}
                          className="block w-full text-left p-2 bg-gray-50 rounded-lg text-sm hover:bg-gray-100"
                        >
                          🎯 "Give me practice"
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {chatMessages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs p-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-3 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Chat Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <button
                      onClick={() => setVoiceEnabled(!voiceEnabled)}
                      className={`p-2 rounded-lg ${
                        voiceEnabled ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Ask me anything..."
                        className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!inputMessage.trim()}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-700 disabled:text-gray-300"
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Suggestions Tab */}
            {activeTab === 'suggestions' && (
              <div className="p-4 space-y-4">
                <h4 className="font-semibold text-gray-900 mb-4">Smart Learning Suggestions</h4>
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 p-2 bg-white rounded-full">
                        {suggestion.icon}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 mb-1">{suggestion.title}</h5>
                        <p className="text-sm text-gray-600 mb-3">{suggestion.content}</p>
                        {suggestion.action && (
                          <button className="text-sm font-medium text-purple-600 hover:text-purple-800">
                            {suggestion.action} →
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Flashcards Tab */}
            {activeTab === 'flashcards' && (
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Spaced Repetition Review</h4>
                {currentFlashCard ? (
                  <div className="space-y-4">
                    <div className="bg-white border-2 border-purple-200 rounded-xl p-6 text-center min-h-48 flex flex-col justify-center">
                      <h5 className="text-lg font-medium text-gray-900 mb-4">
                        {showFlashCardAnswer ? 'Answer:' : 'Question:'}
                      </h5>
                      <p className="text-gray-700">
                        {showFlashCardAnswer ? currentFlashCard.answer : currentFlashCard.question}
                      </p>
                    </div>
                    
                    {!showFlashCardAnswer ? (
                      <button
                        onClick={() => setShowFlashCardAnswer(true)}
                        className="w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                      >
                        Show Answer
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 text-center mb-3">How well did you know this?</p>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            onClick={() => handleFlashCardResponse('hard')}
                            className="py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                          >
                            Hard 😅
                          </button>
                          <button
                            onClick={() => handleFlashCardResponse('medium')}
                            className="py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600"
                          >
                            Medium 🤔
                          </button>
                          <button
                            onClick={() => handleFlashCardResponse('easy')}
                            className="py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                          >
                            Easy 😊
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 mt-8">
                    <Zap className="h-12 w-12 mx-auto mb-4 text-purple-300" />
                    <p className="text-sm">Great job! No cards due for review right now.</p>
                    <p className="text-xs mt-2">Come back later for more practice!</p>
                  </div>
                )}
              </div>
            )}

            {/* Progress Tab */}
            {activeTab === 'progress' && (
              <div className="p-4 space-y-4">
                <h4 className="font-semibold text-gray-900 mb-4">Learning Analytics</h4>
                
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Today's Progress</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Time spent learning</span>
                      <span className="font-medium">23 minutes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Concepts explained</span>
                      <span className="font-medium">4 terms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Practice questions</span>
                      <span className="font-medium">2 completed</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Adaptive Learning</h5>
                  <p className="text-sm text-gray-600 mb-3">
                    Based on your interaction patterns, I'm adjusting explanations to your {learningLevel} level.
                  </p>
                  <div className="text-xs text-purple-600">
                    ✓ More visual analogies added<br/>
                    ✓ Step-by-step mode enabled<br/>
                    ✓ Interactive elements highlighted
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Learning Streak</h5>
                  <div className="flex items-center space-x-2">
                    <div className="text-2xl">🔥</div>
                    <div>
                      <div className="font-bold text-lg">3 days</div>
                      <div className="text-xs text-gray-600">Keep it up!</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AITutor;