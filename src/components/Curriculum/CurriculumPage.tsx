import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Lock, CheckCircle, Clock, Star, BookOpen } from 'lucide-react';

const CurriculumPage: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('html');

  const curriculum = {
    html: {
      name: 'HTML',
      icon: '🏗️',
      color: 'from-orange-500 to-red-500',
      description: 'Master the foundation of web development',
      totalLessons: 45,
      estimatedTime: '6-8 weeks',
      levels: {
        beginner: {
          name: 'Beginner',
          lessons: 15,
          duration: '2-3 weeks',
          topics: [
            'Introduction to HTML',
            'HTML Document Structure',
            'Basic HTML Tags',
            'Text Formatting',
            'Links and Navigation',
            'Images and Media',
            'Lists and Tables',
            'HTML Forms Basics',
            'Semantic HTML Elements',
            'HTML5 New Elements',
            'Accessibility Basics',
            'HTML Validation',
            'Best Practices',
            'Project: Personal Portfolio',
            'Beginner Assessment'
          ]
        },
        intermediate: {
          name: 'Intermediate',
          lessons: 15,
          duration: '2-3 weeks',
          topics: [
            'Advanced Form Elements',
            'HTML5 Input Types',
            'Form Validation',
            'Multimedia Elements',
            'Canvas Basics',
            'SVG Integration',
            'Microdata and Schema',
            'HTML Templates',
            'Web Components Intro',
            'Progressive Enhancement',
            'Cross-browser Compatibility',
            'Performance Optimization',
            'SEO Best Practices',
            'Project: Interactive Website',
            'Intermediate Assessment'
          ]
        },
        advanced: {
          name: 'Advanced',
          lessons: 15,
          duration: '2-3 weeks',
          topics: [
            'HTML5 APIs Overview',
            'Local Storage API',
            'Geolocation API',
            'Drag and Drop API',
            'File API',
            'Web Workers',
            'Service Workers Intro',
            'Custom Elements',
            'Shadow DOM',
            'HTML Imports',
            'Advanced Accessibility',
            'Internationalization',
            'Security Best Practices',
            'Project: Advanced Web App',
            'Advanced Assessment'
          ]
        }
      }
    },
    css: {
      name: 'CSS',
      icon: '🎨',
      color: 'from-blue-500 to-cyan-500',
      description: 'Style your web pages beautifully',
      totalLessons: 60,
      estimatedTime: '8-10 weeks',
      levels: {
        beginner: {
          name: 'Beginner',
          lessons: 20,
          duration: '3-4 weeks',
          topics: [
            'CSS Fundamentals',
            'Selectors and Specificity',
            'Colors and Typography',
            'Box Model',
            'Layout Basics',
            'Positioning',
            'Flexbox Fundamentals',
            'Grid Basics',
            'Responsive Design Intro',
            'Media Queries',
            'CSS Units',
            'Pseudo-classes',
            'Pseudo-elements',
            'CSS Variables',
            'Transitions',
            'Basic Animations',
            'CSS Frameworks Intro',
            'Debugging CSS',
            'Project: Responsive Layout',
            'Beginner Assessment'
          ]
        },
        intermediate: {
          name: 'Intermediate',
          lessons: 20,
          duration: '3-4 weeks',
          topics: [
            'Advanced Flexbox',
            'CSS Grid Mastery',
            'Advanced Animations',
            'Keyframes',
            'Transform Properties',
            'CSS Architecture',
            'BEM Methodology',
            'SASS/SCSS Basics',
            'CSS Modules',
            'Styled Components',
            'CSS-in-JS',
            'Performance Optimization',
            'Cross-browser Testing',
            'CSS Preprocessors',
            'PostCSS',
            'CSS Frameworks Deep Dive',
            'Component Libraries',
            'Design Systems',
            'Project: Interactive Dashboard',
            'Intermediate Assessment'
          ]
        },
        advanced: {
          name: 'Advanced',
          lessons: 20,
          duration: '3-4 weeks',
          topics: [
            'CSS Houdini',
            'Custom Properties Advanced',
            'CSS Containment',
            'Subgrid',
            'Container Queries',
            'CSS Logical Properties',
            'Advanced Selectors',
            'CSS Functions',
            'Math Functions',
            'CSS Shapes',
            'Clip Path',
            'Filters and Effects',
            'Blend Modes',
            'CSS Typography Advanced',
            'Variable Fonts',
            'CSS Security',
            'Performance Monitoring',
            'CSS Testing',
            'Project: Advanced Animation',
            'Advanced Assessment'
          ]
        }
      }
    },
    javascript: {
      name: 'JavaScript',
      icon: '⚡',
      color: 'from-yellow-500 to-orange-500',
      description: 'Add interactivity to your websites',
      totalLessons: 75,
      estimatedTime: '10-12 weeks',
      levels: {
        beginner: {
          name: 'Beginner',
          lessons: 25,
          duration: '4-5 weeks',
          topics: [
            'JavaScript Fundamentals',
            'Variables and Data Types',
            'Operators',
            'Control Structures',
            'Functions',
            'Arrays',
            'Objects',
            'Loops',
            'Conditionals',
            'String Methods',
            'Number Methods',
            'Date and Time',
            'Math Object',
            'Regular Expressions',
            'Error Handling',
            'Debugging',
            'DOM Introduction',
            'Event Handling',
            'Form Validation',
            'Local Storage',
            'JSON',
            'AJAX Basics',
            'Project: Interactive Calculator',
            'Project: Todo App',
            'Beginner Assessment'
          ]
        },
        intermediate: {
          name: 'Intermediate',
          lessons: 25,
          duration: '4-5 weeks',
          topics: [
            'Advanced Functions',
            'Closures',
            'Scope and Hoisting',
            'This Keyword',
            'Prototypes',
            'Classes',
            'Inheritance',
            'Modules',
            'Destructuring',
            'Spread Operator',
            'Template Literals',
            'Arrow Functions',
            'Higher Order Functions',
            'Array Methods',
            'Promises',
            'Async/Await',
            'Fetch API',
            'REST APIs',
            'Error Handling Advanced',
            'Testing Basics',
            'Package Managers',
            'Build Tools',
            'Project: Weather App',
            'Project: Movie Database',
            'Intermediate Assessment'
          ]
        },
        advanced: {
          name: 'Advanced',
          lessons: 25,
          duration: '4-5 weeks',
          topics: [
            'Advanced Async Programming',
            'Generators',
            'Iterators',
            'Symbols',
            'Proxy and Reflect',
            'WeakMap and WeakSet',
            'Memory Management',
            'Performance Optimization',
            'Design Patterns',
            'Functional Programming',
            'Object-Oriented Programming',
            'TypeScript Basics',
            'Node.js Introduction',
            'Express.js',
            'Database Integration',
            'Authentication',
            'Security Best Practices',
            'Testing Advanced',
            'Deployment',
            'Progressive Web Apps',
            'Service Workers',
            'Web APIs',
            'Project: Full Stack App',
            'Project: PWA',
            'Advanced Assessment'
          ]
        }
      }
    },
    php: {
      name: 'PHP',
      icon: '🐘',
      color: 'from-purple-500 to-indigo-500',
      description: 'Server-side programming language',
      totalLessons: 80,
      estimatedTime: '12-14 weeks',
      levels: {
        beginner: {
          name: 'Beginner',
          lessons: 25,
          duration: '4-5 weeks',
          topics: [
            'PHP Introduction',
            'Syntax and Variables',
            'Data Types',
            'Operators',
            'Control Structures',
            'Functions',
            'Arrays',
            'Strings',
            'Include and Require',
            'Forms Handling',
            'GET and POST',
            'Cookies',
            'Sessions',
            'File Handling',
            'Error Handling',
            'Regular Expressions',
            'Date and Time',
            'Math Functions',
            'Validation',
            'Security Basics',
            'MySQL Introduction',
            'Database Connection',
            'CRUD Operations',
            'Project: Contact Form',
            'Beginner Assessment'
          ]
        },
        intermediate: {
          name: 'Intermediate',
          lessons: 25,
          duration: '4-5 weeks',
          topics: [
            'Object-Oriented PHP',
            'Classes and Objects',
            'Inheritance',
            'Polymorphism',
            'Encapsulation',
            'Abstract Classes',
            'Interfaces',
            'Traits',
            'Namespaces',
            'Autoloading',
            'Exception Handling',
            'PDO Database',
            'Prepared Statements',
            'MVC Pattern',
            'Routing',
            'Template Engines',
            'Composer',
            'Package Management',
            'APIs and JSON',
            'RESTful Services',
            'Authentication Systems',
            'Password Hashing',
            'Project: Blog System',
            'Project: User Management',
            'Intermediate Assessment'
          ]
        },
        advanced: {
          name: 'Advanced',
          lessons: 30,
          duration: '5-6 weeks',
          topics: [
            'Advanced OOP Concepts',
            'Design Patterns',
            'Dependency Injection',
            'Unit Testing',
            'PHPUnit',
            'Code Quality',
            'PSR Standards',
            'Performance Optimization',
            'Caching Strategies',
            'Memory Management',
            'Security Advanced',
            'SQL Injection Prevention',
            'XSS Protection',
            'CSRF Protection',
            'API Development',
            'GraphQL',
            'Microservices',
            'Docker Basics',
            'Deployment',
            'CI/CD',
            'Monitoring',
            'Logging',
            'Database Optimization',
            'Scaling Applications',
            'Cloud Services',
            'AWS/Azure Basics',
            'Project: E-commerce API',
            'Project: Microservice',
            'Advanced Assessment',
            'Capstone Project'
          ]
        }
      }
    },
    laravel: {
      name: 'Laravel',
      icon: '🚀',
      color: 'from-red-500 to-pink-500',
      description: 'Modern PHP framework',
      totalLessons: 90,
      estimatedTime: '14-16 weeks',
      levels: {
        beginner: {
          name: 'Beginner',
          lessons: 30,
          duration: '5-6 weeks',
          topics: [
            'Laravel Introduction',
            'Installation and Setup',
            'Directory Structure',
            'Configuration',
            'Routing Basics',
            'Controllers',
            'Views and Blade',
            'Models and Eloquent',
            'Migrations',
            'Database Seeding',
            'Query Builder',
            'Relationships',
            'Forms and Validation',
            'Session Management',
            'Flash Messages',
            'Middleware',
            'Authentication',
            'Authorization',
            'File Uploads',
            'Email Sending',
            'Notifications',
            'Events and Listeners',
            'Queues',
            'Caching',
            'Localization',
            'Error Handling',
            'Logging',
            'Project: Task Manager',
            'Project: Blog Application',
            'Beginner Assessment'
          ]
        },
        intermediate: {
          name: 'Intermediate',
          lessons: 30,
          duration: '5-6 weeks',
          topics: [
            'Advanced Eloquent',
            'Model Factories',
            'Observers',
            'Mutators and Accessors',
            'Scopes',
            'API Resources',
            'RESTful APIs',
            'API Authentication',
            'Rate Limiting',
            'CORS',
            'Testing Introduction',
            'Feature Tests',
            'Unit Tests',
            'Database Testing',
            'Mocking',
            'Service Providers',
            'Facades',
            'Contracts',
            'Package Development',
            'Artisan Commands',
            'Task Scheduling',
            'Broadcasting',
            'WebSockets',
            'Real-time Features',
            'Payment Integration',
            'Third-party APIs',
            'Performance Optimization',
            'Project: Social Media App',
            'Project: E-commerce Platform',
            'Intermediate Assessment'
          ]
        },
        advanced: {
          name: 'Advanced',
          lessons: 30,
          duration: '5-6 weeks',
          topics: [
            'Advanced Architecture',
            'Repository Pattern',
            'Service Layer',
            'SOLID Principles',
            'Design Patterns in Laravel',
            'Domain Driven Design',
            'CQRS',
            'Event Sourcing',
            'Microservices with Laravel',
            'API Gateway',
            'Docker and Laravel',
            'Kubernetes Basics',
            'CI/CD Pipelines',
            'Automated Testing',
            'Performance Monitoring',
            'Database Optimization',
            'Caching Strategies',
            'Queue Optimization',
            'Security Best Practices',
            'Penetration Testing',
            'Code Review',
            'Scaling Laravel',
            'Load Balancing',
            'Cloud Deployment',
            'AWS Services',
            'Serverless Laravel',
            'GraphQL with Laravel',
            'Project: Enterprise Application',
            'Project: Microservices System',
            'Advanced Assessment'
          ]
        }
      }
    },
    react: {
      name: 'React',
      icon: '⚛️',
      color: 'from-cyan-500 to-blue-500',
      description: 'Build modern user interfaces',
      totalLessons: 85,
      estimatedTime: '12-14 weeks',
      levels: {
        beginner: {
          name: 'Beginner',
          lessons: 25,
          duration: '4-5 weeks',
          topics: [
            'React Introduction',
            'JSX Fundamentals',
            'Components',
            'Props',
            'State',
            'Event Handling',
            'Conditional Rendering',
            'Lists and Keys',
            'Forms',
            'Component Lifecycle',
            'Hooks Introduction',
            'useState Hook',
            'useEffect Hook',
            'Styling in React',
            'CSS Modules',
            'Styled Components',
            'React Router',
            'Navigation',
            'Error Boundaries',
            'Fragment',
            'Refs',
            'Context API',
            'Project: Todo App',
            'Project: Weather Dashboard',
            'Beginner Assessment'
          ]
        },
        intermediate: {
          name: 'Intermediate',
          lessons: 30,
          duration: '5-6 weeks',
          topics: [
            'Advanced Hooks',
            'useReducer',
            'useContext',
            'useMemo',
            'useCallback',
            'Custom Hooks',
            'Higher Order Components',
            'Render Props',
            'Code Splitting',
            'Lazy Loading',
            'Suspense',
            'Error Handling',
            'Testing with Jest',
            'React Testing Library',
            'State Management',
            'Redux Basics',
            'Redux Toolkit',
            'Zustand',
            'API Integration',
            'Axios',
            'React Query',
            'SWR',
            'Form Libraries',
            'Formik',
            'React Hook Form',
            'Animation Libraries',
            'Framer Motion',
            'Project: E-commerce Frontend',
            'Project: Social Media Dashboard',
            'Intermediate Assessment'
          ]
        },
        advanced: {
          name: 'Advanced',
          lessons: 30,
          duration: '5-6 weeks',
          topics: [
            'Advanced Patterns',
            'Compound Components',
            'Controlled Components',
            'Uncontrolled Components',
            'Performance Optimization',
            'React.memo',
            'Profiler',
            'Bundle Analysis',
            'Server-Side Rendering',
            'Next.js',
            'Static Site Generation',
            'Incremental Static Regeneration',
            'API Routes',
            'Middleware',
            'Authentication',
            'Authorization',
            'TypeScript with React',
            'PropTypes',
            'Storybook',
            'Component Documentation',
            'Micro Frontends',
            'Module Federation',
            'React Native Basics',
            'Progressive Web Apps',
            'Service Workers',
            'Deployment Strategies',
            'CI/CD for React',
            'Monitoring and Analytics',
            'Project: Full Stack Application',
            'Advanced Assessment'
          ]
        }
      }
    }
  };

  const currentCurriculum = curriculum[selectedLanguage as keyof typeof curriculum];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </motion.button>
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">Complete Curriculum</h1>
          </div>
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              Start Learning
            </motion.button>
          </Link>
        </div>

        {/* Language Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {Object.entries(curriculum).map(([key, lang]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedLanguage(key)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-200 ${
                  selectedLanguage === key
                    ? `bg-gradient-to-r ${lang.color} text-white shadow-lg`
                    : 'bg-white text-gray-700 hover:shadow-md'
                }`}
              >
                <span className="text-2xl">{lang.icon}</span>
                <div className="text-left">
                  <div className="font-bold">{lang.name}</div>
                  <div className="text-sm opacity-80">{lang.totalLessons} lessons</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Selected Language Details */}
        <motion.div
          key={selectedLanguage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
        >
          <div className={`bg-gradient-to-r ${currentCurriculum.color} p-8 text-white`}>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-6xl">{currentCurriculum.icon}</span>
              <div>
                <h2 className="text-4xl font-bold">{currentCurriculum.name}</h2>
                <p className="text-xl opacity-90">{currentCurriculum.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <BookOpen className="h-5 w-5" />
                  <span className="font-medium">Total Lessons</span>
                </div>
                <div className="text-2xl font-bold">{currentCurriculum.totalLessons}</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">Estimated Time</span>
                </div>
                <div className="text-2xl font-bold">{currentCurriculum.estimatedTime}</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="h-5 w-5" />
                  <span className="font-medium">Skill Levels</span>
                </div>
                <div className="text-2xl font-bold">3 Levels</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Learning Levels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {Object.entries(currentCurriculum.levels).map(([levelKey, level], index) => (
            <motion.div
              key={levelKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${
                levelKey === 'beginner' ? 'from-green-500 to-teal-500' :
                levelKey === 'intermediate' ? 'from-yellow-500 to-orange-500' :
                'from-red-500 to-pink-500'
              } p-6 text-white`}>
                <h3 className="text-2xl font-bold mb-2">{level.name}</h3>
                <div className="flex items-center justify-between text-sm opacity-90">
                  <span>{level.lessons} lessons</span>
                  <span>{level.duration}</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-3">
                  {level.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        levelKey === 'beginner' ? 'bg-green-500' :
                        levelKey === 'intermediate' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}>
                        {topicIndex + 1}
                      </div>
                      <span className="text-gray-700">{topic}</span>
                      {topic.includes('Project:') && (
                        <div className="ml-auto">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            Project
                          </span>
                        </div>
                      )}
                      {topic.includes('Assessment') && (
                        <div className="ml-auto">
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                            Test
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Master {currentCurriculum.name}?</h3>
          <p className="text-xl text-blue-100 mb-6">
            Join thousands of students who have transformed their careers with our comprehensive curriculum
          </p>
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium text-lg hover:bg-blue-50 transition-all duration-200 flex items-center space-x-2 mx-auto"
            >
              <Play className="h-5 w-5" />
              <span>Start Learning Now</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CurriculumPage;