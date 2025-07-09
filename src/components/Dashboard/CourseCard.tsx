// components/Dashboard/CourseCard.tsx - Clean Version
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock, Play, CheckCircle } from 'lucide-react';

interface CourseCardProps {
  course: {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    isUnlocked: boolean;
    progress: {
      level: number;
      completedLessons: string[];
      totalLessons: number;
      lastAccessed: Date;
    };
    levels: {
      beginner: { name: string; lessons: number; description: string };
      intermediate: { name: string; lessons: number; description: string };
      advanced: { name: string; lessons: number; description: string };
    };
  };
  index: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index }) => {
  const progressPercentage = (course.progress.completedLessons.length / course.progress.totalLessons) * 100;
  const isStarted = course.progress.completedLessons.length > 0;
  const isCompleted = course.progress.completedLessons.length >= course.progress.totalLessons;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 ${
        !course.isUnlocked ? 'opacity-60' : ''
      }`}
    >
      {/* Course Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${course.color} flex items-center justify-center text-white text-2xl`}>
          {course.icon}
        </div>
        <div className="flex items-center space-x-2">
          {!course.isUnlocked && <Lock className="h-5 w-5 text-gray-400" />}
          {isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
        </div>
      </div>

      {/* Course Info */}
      <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
      <p className="text-gray-600 mb-4">{course.description}</p>

      {/* Progress Bar */}
      {isStarted && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`bg-gradient-to-r ${course.color} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{course.progress.completedLessons.length} lessons completed</span>
            <span>Level {course.progress.level}</span>
          </div>
        </div>
      )}

      {/* Course Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{course.levels.beginner.lessons}</div>
          <div className="text-xs text-gray-600">Beginner</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{course.levels.intermediate.lessons}</div>
          <div className="text-xs text-gray-600">Intermediate</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{course.levels.advanced.lessons}</div>
          <div className="text-xs text-gray-600">Advanced</div>
        </div>
      </div>

      {/* Action Button */}
      {course.isUnlocked ? (
        <Link
          to={`/course/${course.id}`}
          className={`w-full bg-gradient-to-r ${course.color} text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 block text-center`}
        >
          <Play className="h-5 w-5" />
          <span>{isStarted ? 'Continue Course' : 'Start Course'}</span>
        </Link>
      ) : (
        <button
          disabled
          className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-medium cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Lock className="h-5 w-5" />
          <span>Locked</span>
        </button>
      )}
    </motion.div>
  );
};

export default CourseCard;