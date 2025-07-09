// components/Learning/CoursePage.tsx - FINAL WORKING VERSION
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowLeft, Play, Lock, CheckCircle, Clock } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
}

const CoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { userData } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState<string>('beginner');

  // Course data
  const courseData: { [key: string]: any } = {
    html: {
      name: 'HTML',
      description: 'Master the foundation of web development',
      icon: '🏗️',
      color: 'from-orange-500 to-red-500',
      levels: {
        beginner: {
          id: 'beginner',
          name: 'Beginner',
          description: 'HTML basics and structure',
          lessons: [
            { id: 'html-1', title: 'Introduction to HTML', description: 'What is HTML and how it works', duration: '10 min' },
            { id: 'html-2', title: 'HTML Document Structure', description: 'DOCTYPE, html, head, and body tags', duration: '15 min' },
            { id: 'html-3', title: 'Text Elements', description: 'Headings, paragraphs, and text formatting', duration: '12 min' },
            { id: 'html-4', title: 'Links and Anchors', description: 'Creating links with the anchor tag', duration: '10 min' },
            { id: 'html-5', title: 'Images', description: 'Adding images to your web pages', duration: '8 min' },
            { id: 'html-6', title: 'Lists', description: 'Ordered and unordered lists', duration: '8 min' },
            { id: 'html-7', title: 'HTML Attributes', description: 'Adding attributes to elements', duration: '10 min' },
            { id: 'html-8', title: 'Div and Span', description: 'Container elements', duration: '8 min' },
            { id: 'html-9', title: 'HTML Comments', description: 'Adding comments to your code', duration: '5 min' },
            { id: 'html-10', title: 'Basic Page Layout', description: 'Creating a simple webpage structure', duration: '15 min' },
          ]
        },
        intermediate: {
          id: 'intermediate',
          name: 'Intermediate',
          description: 'Forms, tables, and semantic HTML',
          lessons: [
            { id: 'html-11', title: 'HTML Forms', description: 'Creating interactive forms', duration: '20 min' },
            { id: 'html-12', title: 'Form Input Types', description: 'Text, email, password, and more', duration: '15 min' },
            { id: 'html-13', title: 'Form Validation', description: 'Client-side form validation', duration: '18 min' },
            { id: 'html-14', title: 'Tables', description: 'Creating data tables', duration: '18 min' },
            { id: 'html-15', title: 'Semantic HTML', description: 'Using semantic elements properly', duration: '12 min' },
            { id: 'html-16', title: 'HTML5 Elements', description: 'New HTML5 semantic elements', duration: '14 min' },
            { id: 'html-17', title: 'Media Elements', description: 'Audio and video elements', duration: '16 min' },
            { id: 'html-18', title: 'Iframe and Embed', description: 'Embedding external content', duration: '12 min' },
            { id: 'html-19', title: 'Meta Tags', description: 'Document metadata and SEO', duration: '14 min' },
            { id: 'html-20', title: 'Responsive Images', description: 'Making images responsive', duration: '16 min' },
          ]
        },
        advanced: {
          id: 'advanced',
          name: 'Advanced',
          description: 'HTML5 APIs and accessibility',
          lessons: [
            { id: 'html-21', title: 'HTML5 APIs', description: 'Local storage, geolocation, and more', duration: '25 min' },
            { id: 'html-22', title: 'Accessibility (A11y)', description: 'Making your HTML accessible', duration: '20 min' },
            { id: 'html-23', title: 'ARIA Attributes', description: 'Accessibility attributes', duration: '18 min' },
            { id: 'html-24', title: 'SEO Optimization', description: 'HTML best practices for SEO', duration: '15 min' },
            { id: 'html-25', title: 'Performance', description: 'Optimizing HTML for performance', duration: '18 min' },
            { id: 'html-26', title: 'Progressive Web Apps', description: 'HTML for PWAs', duration: '22 min' },
            { id: 'html-27', title: 'Custom Elements', description: 'Creating custom HTML elements', duration: '25 min' },
            { id: 'html-28', title: 'Web Components', description: 'Building reusable components', duration: '30 min' },
            { id: 'html-29', title: 'HTML Best Practices', description: 'Professional HTML development', duration: '20 min' },
            { id: 'html-30', title: 'Final Project', description: 'Build a complete HTML website', duration: '45 min' },
          ]
        }
      }
    },
    css: {
      name: 'CSS',
      description: 'Style your web pages beautifully',
      icon: '🎨',
      color: 'from-blue-500 to-cyan-500',
      levels: {
        beginner: {
          id: 'beginner',
          name: 'Beginner',
          description: 'CSS basics, selectors, and properties',
          lessons: [
            { id: 'css-1', title: 'Introduction to CSS', description: 'What is CSS and how it works', duration: '12 min' },
            { id: 'css-2', title: 'CSS Selectors', description: 'Targeting HTML elements', duration: '15 min' },
            { id: 'css-3', title: 'Colors and Typography', description: 'Styling text and colors', duration: '18 min' },
            { id: 'css-4', title: 'Box Model', description: 'Understanding margins, padding, and borders', duration: '20 min' },
            { id: 'css-5', title: 'Layout Basics', description: 'Display, position, and float', duration: '22 min' },
          ]
        },
        intermediate: {
          id: 'intermediate',
          name: 'Intermediate',
          description: 'Flexbox, Grid, and responsive design',
          lessons: [
            { id: 'css-21', title: 'Flexbox', description: 'Modern layout with flexbox', duration: '25 min' },
            { id: 'css-22', title: 'CSS Grid', description: 'Advanced layout with grid', duration: '30 min' },
            { id: 'css-23', title: 'Responsive Design', description: 'Making sites work on all devices', duration: '28 min' },
          ]
        },
        advanced: {
          id: 'advanced',
          name: 'Advanced',
          description: 'Animations, preprocessors, and frameworks',
          lessons: [
            { id: 'css-41', title: 'CSS Animations', description: 'Creating smooth animations', duration: '30 min' },
            { id: 'css-42', title: 'Transitions', description: 'Smooth state changes', duration: '20 min' },
          ]
        }
      }
    },
    javascript: {
      name: 'JavaScript',
      description: 'Add interactivity to your websites',
      icon: '⚡',
      color: 'from-yellow-500 to-orange-500',
      levels: {
        beginner: {
          id: 'beginner',
          name: 'Beginner',
          description: 'Variables, functions, and basic concepts',
          lessons: [
            { id: 'js-1', title: 'Introduction to JavaScript', description: 'What is JavaScript and how it works', duration: '15 min' },
            { id: 'js-2', title: 'Variables and Data Types', description: 'Storing and working with data', duration: '18 min' },
          ]
        },
        intermediate: {
          id: 'intermediate',
          name: 'Intermediate',
          description: 'DOM manipulation, events, and APIs',
          lessons: [
            { id: 'js-26', title: 'DOM Manipulation', description: 'Interacting with HTML elements', duration: '25 min' },
          ]
        },
        advanced: {
          id: 'advanced',
          name: 'Advanced',
          description: 'ES6+, async programming, and frameworks',
          lessons: [
            { id: 'js-51', title: 'ES6+ Features', description: 'Modern JavaScript syntax', duration: '35 min' },
          ]
        }
      }
    }
  };

  const course = courseData[courseId!];
  const userProgress = userData?.progress?.[courseId!];

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link to="/dashboard" className="text-blue-600 hover:text-blue-800">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Add lesson states based on user progress
  Object.values(course.levels).forEach((level: any) => {
    level.lessons.forEach((lesson: Lesson, index: number) => {
      lesson.isCompleted = userProgress?.completedLessons?.includes(lesson.id) || false;
      // First lesson is always unlocked, others unlock when previous is completed
      if (index === 0) {
        lesson.isLocked = false;
      } else {
        lesson.isLocked = !level.lessons[index - 1].isCompleted;
      }
    });
  });

  const currentLevel = course.levels[selectedLevel];
  const completedLessons = userProgress?.completedLessons?.length || 0;
  const totalLessons = Object.values(course.levels).reduce((total: number, level: any) => 
    total + level.lessons.length, 0
  );
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${course.color} flex items-center justify-center text-white text-3xl`}>
              {course.icon}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{course.name}</h1>
              <p className="text-gray-600 text-lg">{course.description}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Course Progress</h3>
              <span className="text-sm text-gray-600">{completedLessons} / {totalLessons} lessons</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`bg-gradient-to-r ${course.color} h-3 rounded-full transition-all duration-300`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>{Math.round(progressPercentage)}% Complete</span>
              <span>Level {userProgress?.level || 0}</span>
            </div>
          </div>
        </motion.div>

        {/* Level Tabs */}
        <div className="flex space-x-1 mb-8 bg-white rounded-2xl p-2 shadow-lg">
          {Object.values(course.levels).map((level: any) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                selectedLevel === level.id
                  ? `bg-gradient-to-r ${course.color} text-white`
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {level.name}
            </button>
          ))}
        </div>

        {/* Current Level Info */}
        <motion.div
          key={selectedLevel}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentLevel.name} Level</h2>
            <p className="text-gray-600">{currentLevel.description}</p>
          </div>

          {/* Lessons Grid */}
          <div className="grid gap-4">
            {currentLevel.lessons.map((lesson: Lesson, index: number) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all ${
                  lesson.isLocked ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      lesson.isCompleted 
                        ? 'bg-green-500 text-white' 
                        : lesson.isLocked 
                          ? 'bg-gray-300 text-gray-500'
                          : `bg-gradient-to-r ${course.color} text-white`
                    }`}>
                      {lesson.isCompleted ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : lesson.isLocked ? (
                        <Lock className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{lesson.title}</h3>
                      <p className="text-gray-600">{lesson.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {lesson.duration}
                        </span>
                        {lesson.isCompleted && (
                          <span className="text-green-600 font-medium">Completed</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {!lesson.isLocked && (
                    <Link
                      to={`/learn/${courseId}/${lesson.id}`}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                        lesson.isCompleted
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : `bg-gradient-to-r ${course.color} text-white hover:opacity-90`
                      }`}
                    >
                      {lesson.isCompleted ? 'Review' : 'Start'}
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CoursePage;