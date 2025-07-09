// components/Lesson/LessonComponent.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { useLessonProgress } from '../../hooks/useLessonProgress';
import { useAuth } from '../../contexts/AuthContext';

interface LessonComponentProps {
  courseId: string;
  lessonId: string;
  title: string;
  content: string;
  nextLessonId?: string;
}

const LessonComponent: React.FC<LessonComponentProps> = ({
  courseId,
  lessonId,
  title,
  content,
  nextLessonId
}) => {
  const { userData } = useAuth();
  const { markLessonComplete, isCompleting } = useLessonProgress();
  const [startTime] = useState(Date.now());
  const [isCompleted, setIsCompleted] = useState(false);

  // Check if lesson is already completed
  useEffect(() => {
    const courseProgress = userData?.progress?.[courseId];
    if (courseProgress) {
      setIsCompleted(courseProgress.completedLessons.includes(lessonId));
    }
  }, [userData, courseId, lessonId]);

  const handleCompleteLesson = async () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000 / 60); // Convert to minutes
    await markLessonComplete(courseId, lessonId, timeSpent);
    setIsCompleted(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        {/* Lesson Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Course: {courseId.toUpperCase()}
              </span>
              {isCompleted && (
                <span className="flex items-center text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Completed
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="prose max-w-none mb-8">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            {!isCompleted && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCompleteLesson}
                disabled={isCompleting}
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <CheckCircle className="h-5 w-5" />
                <span>{isCompleting ? 'Completing...' : 'Mark as Complete'}</span>
              </motion.button>
            )}

            {isCompleted && nextLessonId && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center space-x-2"
                onClick={() => {
                  // Navigate to next lesson
                  window.location.href = `/course/${courseId}/lesson/${nextLessonId}`;
                }}
              >
                <span>Next Lesson</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            )}
          </div>

          <div className="text-sm text-gray-500">
            Lesson {lessonId} of {courseId.toUpperCase()}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LessonComponent;