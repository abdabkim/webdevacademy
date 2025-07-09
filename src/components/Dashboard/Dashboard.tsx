import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Code, Star, Trophy, Clock, BookOpen, Zap } from 'lucide-react';
import ProgressCard from './ProgressCard';
import CourseCard from './CourseCard';

const Dashboard: React.FC = () => {
  const { userData } = useAuth();

  const courses = [
    {
      id: 'html',
      name: 'HTML',
      description: 'Master the foundation of web development',
      icon: '🏗️',
      color: 'from-orange-500 to-red-500',
      isUnlocked: true,
      progress: userData?.progress?.html || { level: 0, completedLessons: [], totalLessons: 45, lastAccessed: new Date() },
      levels: {
        beginner: { name: 'Beginner', lessons: 15, description: 'HTML basics and structure' },
        intermediate: { name: 'Intermediate', lessons: 15, description: 'Forms, tables, and semantic HTML' },
        advanced: { name: 'Advanced', lessons: 15, description: 'HTML5 APIs and accessibility' }
      }
    },
    {
      id: 'css',
      name: 'CSS',
      description: 'Style your web pages beautifully',
      icon: '🎨',
      color: 'from-blue-500 to-cyan-500',
      isUnlocked: (userData?.progress?.html?.completedLessons?.length || 0) >= 45,
      progress: userData?.progress?.css || { level: 0, completedLessons: [], totalLessons: 60, lastAccessed: new Date() },
      levels: {
        beginner: { name: 'Beginner', lessons: 20, description: 'CSS basics, selectors, and properties' },
        intermediate: { name: 'Intermediate', lessons: 20, description: 'Flexbox, Grid, and responsive design' },
        advanced: { name: 'Advanced', lessons: 20, description: 'Animations, preprocessors, and frameworks' }
      }
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      description: 'Add interactivity to your websites',
      icon: '⚡',
      color: 'from-yellow-500 to-orange-500',
      isUnlocked: (userData?.progress?.css?.completedLessons?.length || 0) >= 60,
      progress: userData?.progress?.javascript || { level: 0, completedLessons: [], totalLessons: 75, lastAccessed: new Date() },
      levels: {
        beginner: { name: 'Beginner', lessons: 25, description: 'Variables, functions, and basic concepts' },
        intermediate: { name: 'Intermediate', lessons: 25, description: 'DOM manipulation, events, and APIs' },
        advanced: { name: 'Advanced', lessons: 25, description: 'ES6+, async programming, and frameworks' }
      }
    },
    {
      id: 'php',
      name: 'PHP',
      description: 'Server-side programming language',
      icon: '🐘',
      color: 'from-purple-500 to-indigo-500',
      isUnlocked: (userData?.progress?.javascript?.completedLessons?.length || 0) >= 75,
      progress: userData?.progress?.php || { level: 0, completedLessons: [], totalLessons: 80, lastAccessed: new Date() },
      levels: {
        beginner: { name: 'Beginner', lessons: 25, description: 'PHP syntax, variables, and functions' },
        intermediate: { name: 'Intermediate', lessons: 25, description: 'OOP, databases, and sessions' },
        advanced: { name: 'Advanced', lessons: 30, description: 'Advanced patterns and best practices' }
      }
    },
    {
      id: 'laravel',
      name: 'Laravel',
      description: 'Modern PHP framework',
      icon: '🚀',
      color: 'from-red-500 to-pink-500',
      isUnlocked: (userData?.progress?.php?.completedLessons?.length || 0) >= 80,
      progress: userData?.progress?.laravel || { level: 0, completedLessons: [], totalLessons: 90, lastAccessed: new Date() },
      levels: {
        beginner: { name: 'Beginner', lessons: 30, description: 'Laravel basics, routing, and MVC' },
        intermediate: { name: 'Intermediate', lessons: 30, description: 'Eloquent, authentication, and APIs' },
        advanced: { name: 'Advanced', lessons: 30, description: 'Advanced features and deployment' }
      }
    },
    {
      id: 'react',
      name: 'React',
      description: 'Build modern user interfaces',
      icon: '⚛️',
      color: 'from-cyan-500 to-blue-500',
      isUnlocked: (userData?.progress?.laravel?.completedLessons?.length || 0) >= 90,
      progress: userData?.progress?.react || { level: 0, completedLessons: [], totalLessons: 85, lastAccessed: new Date() },
      levels: {
        beginner: { name: 'Beginner', lessons: 25, description: 'React basics, components, and JSX' },
        intermediate: { name: 'Intermediate', lessons: 30, description: 'Hooks, state management, and routing' },
        advanced: { name: 'Advanced', lessons: 30, description: 'Performance, testing, and deployment' }
      }
    }
  ];

  // Calculate real stats from userData
  const coursesStarted = Object.keys(userData?.progress || {}).length;
  const lessonsCompleted = Object.values(userData?.progress || {}).reduce(
    (total, course) => total + (course.completedLessons?.length || 0), 0
  );
  const currentLevel = Object.values(userData?.progress || {}).reduce(
    (max, course) => Math.max(max, course.level || 0), 0
  );
  const learningStreak = userData?.streakData?.currentStreak || 0;

  const stats = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Courses Started',
      value: coursesStarted,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: 'Lessons Completed',
      value: lessonsCompleted,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: 'Current Level',
      value: currentLevel,
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Learning Streak',
      value: `${learningStreak} ${learningStreak === 1 ? 'day' : 'days'}`,
      color: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {userData?.displayName}! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Ready to continue your web development journey?
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center text-white mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Learning Path</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* AI Assistant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">AI Learning Assistant</h2>
              <p className="text-green-100 mb-4">
                Get personalized explanations and coding help anytime
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors"
              >
                Ask AI Assistant
              </motion.button>
            </div>
            <div className="text-6xl">🤖</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;