// hooks/useLessonProgress.ts
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { completeLesson, startCourse } from '../services/progressService';
import toast from 'react-hot-toast';

export const useLessonProgress = () => {
  const { currentUser, refreshUserData } = useAuth();
  const [isCompleting, setIsCompleting] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  const markLessonComplete = async (
    courseId: string, 
    lessonId: string, 
    timeSpent: number = 0
  ) => {
    if (!currentUser) {
      toast.error('Please log in to track progress');
      return;
    }

    setIsCompleting(true);
    try {
      await completeLesson(currentUser.uid, courseId, lessonId, timeSpent);
      await refreshUserData(); // Refresh user data to update UI
      return true;
    } catch (error: any) {
      console.error('Error completing lesson:', error);
      toast.error(error.message || 'Failed to complete lesson');
      return false;
    } finally {
      setIsCompleting(false);
    }
  };

  const startNewCourse = async (courseId: string, courseName: string, totalLessons: number) => {
    if (!currentUser) {
      toast.error('Please log in to start courses');
      return;
    }

    setIsStarting(true);
    try {
      await startCourse(currentUser.uid, courseId, courseName, totalLessons);
      await refreshUserData();
      return true;
    } catch (error: any) {
      console.error('Error starting course:', error);
      toast.error(error.message || 'Failed to start course');
      return false;
    } finally {
      setIsStarting(false);
    }
  };

  return {
    markLessonComplete,
    startNewCourse,
    isCompleting,
    isStarting
  };
};