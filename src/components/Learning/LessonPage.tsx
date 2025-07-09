// components/Learning/LessonPage.tsx - COMPLETE ENHANCED VERSION
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Brain,
  Eye,
  Settings,
  Lightbulb,
  Target,
  Zap,
  Code
} from 'lucide-react';
import AITutor from './AITutor';
import CodeVisualizer from './CodeVisualizer';
import LiveCodeEditor from './LiveCodeEditor';
import { useLessonProgress } from '../../hooks/useLessonProgress';

interface SmartExplanation {
  term: string;
  simple: string;
  detailed: string;
  analogy: string;
  example: string;
}

interface LessonSettings {
  theme: 'light' | 'dark' | 'dyslexia' | 'high-contrast';
  stepByStep: boolean;
  showAnalogies: boolean;
  explanationLevel: 'beginner' | 'intermediate' | 'advanced';
  autoProgress: boolean;
}

interface Exercise {
  title: string;
  description: string;
  starterCode: string;
  expectedOutput: string;
  hints: string[];
  solution: string;
}

const LessonPage: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const { markLessonComplete, isCompleting } = useLessonProgress();
  
  // State management
  const [isCompleted, setIsCompleted] = useState(false);
  const [showAITutor, setShowAITutor] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState<SmartExplanation | null>(null);
  const [codeVisualizerActive, setCodeVisualizerActive] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showLiveEditor, setShowLiveEditor] = useState(false);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [settings, setSettings] = useState<LessonSettings>({
    theme: 'light',
    stepByStep: true,
    showAnalogies: true,
    explanationLevel: 'beginner',
    autoProgress: false
  });
  const [startTime] = useState(Date.now());

  // Smart explanations database
  const explanations: { [key: string]: SmartExplanation } = {
    'html': {
      term: 'HTML',
      simple: 'HTML is like the skeleton of a website - it gives structure to web pages.',
      detailed: 'HTML (HyperText Markup Language) is a markup language that uses tags to define the structure and content of web pages.',
      analogy: 'Think of HTML like building a house: it provides the frame, walls, and rooms, but CSS adds the paint and furniture.',
      example: 'When you see headings, paragraphs, and images on a website, that\'s all HTML!'
    },
    'tag': {
      term: 'Tag',
      simple: 'Tags are like labels that tell the browser what each piece of content is.',
      detailed: 'HTML tags are keywords enclosed in angle brackets that define how content should be displayed or structured.',
      analogy: 'Tags are like containers or boxes - each one holds different types of content, just like how you might have separate boxes for toys, books, and clothes.',
      example: '<h1> is a tag that says "this is a big heading", while <p> says "this is a paragraph"'
    },
    'element': {
      term: 'Element',
      simple: 'An element is a complete piece of HTML - the tags plus the content inside.',
      detailed: 'An HTML element consists of an opening tag, content, and usually a closing tag.',
      analogy: 'Like a sandwich: the bread is the opening and closing tags, and the filling is the content.',
      example: '<h1>Welcome to my website</h1> - the whole thing is an element!'
    }
  };

  // Enhanced lesson content with exercises
  const lessonContent = {
    'html-1': {
      title: 'Introduction to HTML',
      description: 'What is HTML and how it works',
      duration: '10 min',
      totalSteps: 4,
      steps: [
        {
          title: 'What is HTML?',
          content: `
            <div class="smart-content">
              <p>Welcome to your first HTML lesson! 🎉</p>
              <p><span class="clickable-term" data-term="html">HTML</span> stands for HyperText Markup Language. It's the foundation of every website you visit!</p>
              
              <div class="concept-visualization">
                <div class="analogy-box">
                  <h4>🏠 Think of it like building a house:</h4>
                  <ul>
                    <li><strong>HTML</strong> = The foundation and frame</li>
                    <li><strong>CSS</strong> = The paint and decorations</li>
                    <li><strong>JavaScript</strong> = The electricity and plumbing</li>
                  </ul>
                </div>
              </div>
              
              <p>Every webpage starts with HTML. It tells the browser what content to show and how it's organized.</p>
            </div>
          `,
          codeExample: `<!DOCTYPE html>
<html>
<head>
    <title>My First Webpage</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first HTML page.</p>
</body>
</html>`
        },
        {
          title: 'HTML Tags and Elements',
          content: `
            <div class="smart-content">
              <p>HTML uses <span class="clickable-term" data-term="tag">tags</span> to mark up content. Tags are like instructions that tell the browser how to display things.</p>
              
              <div class="tag-explanation">
                <div class="tag-demo">
                  <div class="tag-part opening">&lt;h1&gt;</div>
                  <div class="tag-part content">Hello World</div>
                  <div class="tag-part closing">&lt;/h1&gt;</div>
                </div>
                <p class="tag-description">Opening tag + Content + Closing tag = <span class="clickable-term" data-term="element">Element</span></p>
              </div>
              
              <p>Most tags come in pairs: an opening tag and a closing tag. The closing tag has a forward slash (/) before the tag name.</p>
            </div>
          `,
          codeExample: `<h1>This is a heading</h1>
<h2>This is a smaller heading</h2>
<p>This is a paragraph of text.</p>
<strong>This text is bold</strong>
<em>This text is italic</em>`
        },
        {
          title: 'HTML Document Structure',
          content: `
            <div class="smart-content">
              <p>Every HTML document follows the same basic structure. Think of it like a book:</p>
              
              <div class="document-structure">
                <div class="structure-item">
                  <strong>&lt;!DOCTYPE html&gt;</strong> - "This is an HTML5 document"
                </div>
                <div class="structure-item">
                  <strong>&lt;html&gt;</strong> - The root container (like the book cover)
                </div>
                <div class="structure-item">
                  <strong>&lt;head&gt;</strong> - Information about the page (like the title page)
                </div>
                <div class="structure-item">
                  <strong>&lt;body&gt;</strong> - The visible content (like the book pages)
                </div>
              </div>
              
              <p>Everything the user sees goes inside the &lt;body&gt; tag!</p>
            </div>
          `,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
</head>
<body>
    <h1>Welcome to my website!</h1>
    <p>This is where all the visible content goes.</p>
</body>
</html>`
        },
        {
          title: 'Practice Time!',
          content: `
            <div class="smart-content">
              <p>Now it's time to practice what you've learned! 🎯</p>
              
              <div class="challenge-box">
                <h4>🚀 Hands-On Exercise:</h4>
                <p>Create your first HTML page using the structure you just learned. Don't worry - I'll guide you through it!</p>
              </div>
              
              <p>Click the "Start Coding" button below to open the live code editor. You'll be able to write HTML and see the result instantly!</p>
            </div>
          `,
          hasExercise: true
        }
      ],
      exercise: {
        title: 'Create Your First HTML Page',
        description: 'Build a simple webpage with a heading, paragraph, and learn about HTML structure.',
        starterCode: `<!DOCTYPE html>
<html>
<head>
    <title><!-- Add your page title here --></title>
</head>
<body>
    <!-- Add a main heading here -->
    
    <!-- Add a paragraph about yourself here -->
    
</body>
</html>`,
        expectedOutput: '<h1>Welcome to My Website</h1><p>Hello! I\'m learning HTML and this is my first webpage.</p>',
        hints: [
          'Use <h1> tags to create a main heading',
          'Use <p> tags to create a paragraph',
          'Replace the comments (<!-- -->) with actual HTML elements',
          'Make sure to close all your tags properly'
        ],
        solution: `<!DOCTYPE html>
<html>
<head>
    <title>My First Website</title>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <p>Hello! I'm learning HTML and this is my first webpage.</p>
</body>
</html>`
      },
      quiz: {
        question: 'What are the three main parts of an HTML document?',
        options: [
          'DOCTYPE, html, and css',
          'html, head, and body',
          'title, content, and footer',
          'opening, content, and closing'
        ],
        correct: 1,
        explanation: 'Great! The three main parts are: html (root container), head (metadata), and body (visible content).'
      },
      nextLesson: 'html-2'
    }
  };

  const lesson = lessonContent[lessonId as keyof typeof lessonContent];
  const userProgress = userData?.progress?.[courseId!];

  // Check if lesson is already completed
  useEffect(() => {
    if (userProgress?.completedLessons?.includes(lessonId!)) {
      setIsCompleted(true);
    }
  }, [userProgress, lessonId]);

  // Handle clickable terms
  const handleTermClick = (e: Event) => {
    const target = e.target as HTMLElement;
    const termKey = target.getAttribute('data-term');
    if (termKey && explanations[termKey]) {
      setCurrentExplanation(explanations[termKey]);
      setShowExplanation(true);
    }
  };

  // Handle lesson completion with Firebase
  const handleCompleteLesson = async () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000 / 60);
    
    const success = await markLessonComplete(courseId!, lessonId!, timeSpent);
    
    if (success) {
      setIsCompleted(true);
      
      setTimeout(() => {
        if (lesson.nextLesson) {
          navigate(`/learn/${courseId}/${lesson.nextLesson}`);
        } else {
          navigate(`/course/${courseId}`);
        }
      }, 2000);
    }
  };

  // Handle exercise completion
  const handleExerciseComplete = () => {
    setExerciseCompleted(true);
    setShowLiveEditor(false);
  };

  // Auto-advance in step-by-step mode
  useEffect(() => {
    if (settings.autoProgress && settings.stepByStep) {
      const timer = setTimeout(() => {
        if (currentStep < lesson.totalSteps - 1) {
          setCurrentStep(prev => prev + 1);
        }
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, settings.autoProgress, settings.stepByStep, lesson.totalSteps]);

  // Add click listeners for interactive terms
  useEffect(() => {
    const clickableTerms = document.querySelectorAll('.clickable-term');
    clickableTerms.forEach(term => {
      term.addEventListener('click', handleTermClick);
    });

    return () => {
      clickableTerms.forEach(term => {
        term.removeEventListener('click', handleTermClick);
      });
    };
  }, [currentStep]);

  // Theme classes
  const getThemeClasses = () => {
    switch (settings.theme) {
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'dyslexia':
        return 'bg-cream text-gray-900 font-opendyslexic';
      case 'high-contrast':
        return 'bg-black text-yellow-400';
      default:
        return 'bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50';
    }
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson not found</h1>
          <Link to={`/course/${courseId}`} className="text-blue-600 hover:text-blue-800">
            Return to Course
          </Link>
        </div>
      </div>
    );
  }

  const currentStepData = lesson.steps[currentStep];

  return (
    <div className={`min-h-screen ${getThemeClasses()}`}>
      {/* AI Tutor Component */}
      <AITutor
        isOpen={showAITutor}
        onClose={() => setShowAITutor(false)}
        currentLesson={lessonId!}
        userProgress={userProgress}
        learningLevel={settings.explanationLevel}
      />

      {/* Live Code Editor */}
      {lesson.exercise && (
        <LiveCodeEditor
          isOpen={showLiveEditor}
          onClose={() => setShowLiveEditor(false)}
          exercise={lesson.exercise}
          onComplete={handleExerciseComplete}
        />
      )}

      {/* Smart Explanation Modal */}
      <AnimatePresence>
        {showExplanation && currentExplanation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Lightbulb className="h-6 w-6 mr-2 text-yellow-500" />
                  {currentExplanation.term}
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
                  <h4 className="font-semibold text-blue-900 mb-2">Simple Explanation</h4>
                  <p className="text-blue-800">{currentExplanation.simple}</p>
                </div>
                
                {settings.showAnalogies && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                      <Brain className="h-4 w-4 mr-2" />
                      Think of it like this...
                    </h4>
                    <p className="text-green-800">{currentExplanation.analogy}</p>
                  </div>
                )}
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Example</h4>
                  <p className="text-purple-800">{currentExplanation.example}</p>
                </div>
                
                <button
                  onClick={() => setShowExplanation(false)}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Got it! 👍
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        {/* Header with Smart Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <Link 
              to={`/course/${courseId}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Course
            </Link>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowAITutor(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Brain className="h-4 w-4" />
                <span>AI Tutor</span>
              </button>
              
              <button
                onClick={() => setCodeVisualizerActive(!codeVisualizerActive)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  codeVisualizerActive 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Eye className="h-4 w-4" />
                <span>Live Preview</span>
              </button>
            </div>
          </div>
          
          {/* Lesson Header */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
                <p className="text-gray-600">{lesson.description}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center text-gray-500 mb-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{lesson.duration}</span>
                </div>
                {isCompleted && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">Completed!</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Progress Indicator */}
            {settings.stepByStep && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Step {currentStep + 1} of {lesson.totalSteps}</span>
                  <span>{Math.round(((currentStep + 1) / lesson.totalSteps) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / lesson.totalSteps) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Lesson Content */}
          <div className="xl:col-span-2 space-y-6">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{currentStepData.title}</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Target className="h-4 w-4" />
                  <span>Click blue terms for explanations</span>
                </div>
              </div>
              
              <div 
                className="lesson-content prose max-w-none"
                dangerouslySetInnerHTML={{ __html: currentStepData.content }}
              />

              {/* Exercise Button */}
              {currentStepData.hasExercise && lesson.exercise && (
                <div className="mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowLiveEditor(true)}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-lg font-bold text-lg hover:from-green-600 hover:to-blue-600 transition-all flex items-center justify-center space-x-3"
                  >
                    <Code className="h-6 w-6" />
                    <span>🚀 Start Coding Exercise</span>
                  </motion.button>
                  
                  {exerciseCompleted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2"
                    >
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-green-800 font-medium">Exercise completed! Great job! 🎉</span>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Code Visualizer */}
            {codeVisualizerActive && currentStepData.codeExample && (
              <CodeVisualizer
                code={currentStepData.codeExample}
                language="html"
                showPreview={true}
                interactive={true}
                explanations={{
                  'html': 'The root element that contains all other elements',
                  'head': 'Contains metadata about the document',
                  'body': 'Contains all visible content',
                  'h1': 'Main heading - the most important title on the page',
                  'p': 'Paragraph of text content'
                }}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Settings */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Learning Preferences
              </h3>
              
              <div className="space-y-3">
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={settings.stepByStep}
                    onChange={(e) => setSettings(prev => ({ ...prev, stepByStep: e.target.checked }))}
                    className="mr-2"
                  />
                  Step-by-step mode
                </label>
                
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={settings.showAnalogies}
                    onChange={(e) => setSettings(prev => ({ ...prev, showAnalogies: e.target.checked }))}
                    className="mr-2"
                  />
                  Show analogies
                </label>
                
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={settings.autoProgress}
                    onChange={(e) => setSettings(prev => ({ ...prev, autoProgress: e.target.checked }))}
                    className="mr-2"
                  />
                  Auto-advance (10s)
                </label>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-2">
                <button
                  onClick={() => setShowAITutor(true)}
                  className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <Brain className="h-4 w-4 mr-3 text-purple-600" />
                    <div>
                      <div className="font-medium text-purple-900">Ask AI Tutor</div>
                      <div className="text-xs text-purple-600">Get instant help</div>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => setShowQuiz(true)}
                  className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 mr-3 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-900">Quick Quiz</div>
                      <div className="text-xs text-blue-600">Test your knowledge</div>
                    </div>
                  </div>
                </button>

                {currentStepData.hasExercise && lesson.exercise && (
                  <button
                    onClick={() => setShowLiveEditor(true)}
                    className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                  >
                    <div className="flex items-center">
                      <Code className="h-4 w-4 mr-3 text-green-600" />
                      <div>
                        <div className="font-medium text-green-900">Live Code Editor</div>
                        <div className="text-xs text-green-600">Practice what you learned</div>
                      </div>
                    </div>
                  </button>
                )}
                
                <button
                  onClick={() => setCodeVisualizerActive(!codeVisualizerActive)}
                  className="w-full text-left p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-3 text-orange-600" />
                    <div>
                      <div className="font-medium text-orange-900">
                        {codeVisualizerActive ? 'Hide' : 'Show'} Live Preview
                      </div>
                      <div className="text-xs text-orange-600">See code in action</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Learning Tips */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6">
              <h3 className="font-semibold text-yellow-900 mb-3 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                Learning Tip
              </h3>
              <p className="text-sm text-yellow-800 mb-3">
                Practice makes perfect! Don't worry about getting everything right the first time - coding is all about learning from mistakes.
              </p>
              <div className="text-xs text-yellow-700">
                💡 Try the live coding exercises - they're the best way to learn HTML hands-on!
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous Step</span>
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {currentStep < lesson.totalSteps - 1 ? (
                <button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <span>Next Step</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCompleteLesson}
                  disabled={isCompleting}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>
                    {isCompleting ? 'Saving...' : isCompleted ? 'Completed! 🎉' : 'Complete Lesson'}
                  </span>
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && lesson.quiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Target className="h-6 w-6 mr-2 text-blue-500" />
                  Quick Knowledge Check
                </h3>
                <button
                  onClick={() => setShowQuiz(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3">{lesson.quiz.question}</h4>
                  <div className="space-y-2">
                    {lesson.quiz.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (index === lesson.quiz.correct) {
                            alert(`Correct! 🎉 ${lesson.quiz.explanation}`);
                          } else {
                            alert(`Not quite right. ${lesson.quiz.explanation}`);
                          }
                          setShowQuiz(false);
                        }}
                        className="w-full text-left p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        {String.fromCharCode(65 + index)}. {option}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="text-center">
                  <button
                    onClick={() => setShowQuiz(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Skip for now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Styles */}
      <style>
        {`
        .clickable-term {
          color: #3b82f6;
          cursor: pointer;
          text-decoration: underline;
          font-weight: 500;
          padding: 2px 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        .clickable-term:hover {
          background-color: #dbeafe;
          transform: scale(1.05);
        }
        .analogy-box {
          background: linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%);
          border: 2px solid #f59e0b;
          border-radius: 12px;
          padding: 20px;
          margin: 20px 0;
        }
        .concept-visualization {
          margin: 24px 0;
        }
        .tag-explanation {
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          margin: 20px 0;
        }
        .tag-demo {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 18px;
        }
        .tag-part {
          padding: 8px 12px;
          margin: 0 4px;
          border-radius: 6px;
          font-weight: bold;
        }
        .tag-part.opening {
          background: #fecaca;
          color: #991b1b;
        }
        .tag-part.content {
          background: #d1fae5;
          color: #065f46;
        }
        .tag-part.closing {
          background: #fecaca;
          color: #991b1b;
        }
        .tag-description {
          text-align: center;
          font-weight: 600;
          color: #374151;
        }
        .document-structure {
          background: #f0f9ff;
          border: 2px solid #0ea5e9;
          border-radius: 12px;
          padding: 20px;
          margin: 20px 0;
        }
        .structure-item {
          background: white;
          border: 1px solid #0ea5e9;
          border-radius: 8px;
          padding: 12px;
          margin: 8px 0;
          font-family: 'Monaco', 'Menlo', monospace;
        }
        .challenge-box {
          background: linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%);
          border: 2px solid #8b5cf6;
          border-radius: 12px;
          padding: 20px;
          margin: 20px 0;
        }
        .font-opendyslexic {
          font-family: 'OpenDyslexic', Arial, sans-serif;
        }
        .bg-cream {
          background-color: #f7f5f3;
        }
        .smart-content {
          line-height: 1.7;
          font-size: 16px;
        }
        .smart-content h4 {
          color: #1f2937;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .smart-content ul {
          margin: 12px 0;
          padding-left: 20px;
        }
        .smart-content li {
          margin: 8px 0;
        }
        .smart-content strong {
          color: #1e40af;
          font-weight: 600;
        }
        `}
      </style>
    </div>
  );
};

export default LessonPage;