// services/progressService.ts
import { 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc, 
    collection, 
    query, 
    where, 
    orderBy, 
    getDocs,
    writeBatch,
    serverTimestamp,
    increment
  } from 'firebase/firestore';
  import { db } from '../firebase/config';
  import { CourseProgress, StreakData } from '../types';
  
  // Start a new course
  export const startCourse = async (
    userId: string, 
    courseId: string, 
    courseName: string, 
    totalLessons: number
  ) => {
    const userRef = doc(db, 'users', userId);
    
    const courseProgress: CourseProgress = {
      courseId,
      courseName,
      level: 0,
      completedLessons: [],
      totalLessons,
      lastAccessed: new Date(),
      startedAt: new Date(),
      isCompleted: false
    };
    
    await updateDoc(userRef, {
      [`progress.${courseId}`]: {
        ...courseProgress,
        lastAccessed: serverTimestamp(),
        startedAt: serverTimestamp()
      }
    });
    
    return courseProgress;
  };
  
  // Complete a lesson
  export const completeLesson = async (
    userId: string, 
    courseId: string, 
    lessonId: string, 
    timeSpent: number = 0
  ) => {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) throw new Error('User not found');
    
    const userData = userDoc.data();
    const currentProgress = userData.progress?.[courseId];
    
    if (!currentProgress) {
      throw new Error('Course not started. Please start the course first.');
    }
    
    // Check if lesson already completed
    if (currentProgress.completedLessons.includes(lessonId)) {
      return currentProgress; // Already completed
    }
    
    const newCompletedLessons = [...currentProgress.completedLessons, lessonId];
    const completionPercentage = (newCompletedLessons.length / currentProgress.totalLessons) * 100;
    const newLevel = Math.floor(completionPercentage / 10); // Level 0-10 based on completion percentage
    const isCompleted = newCompletedLessons.length >= currentProgress.totalLessons;
    
    const batch = writeBatch(db);
    
    // Update course progress
    batch.update(userRef, {
      [`progress.${courseId}.completedLessons`]: newCompletedLessons,
      [`progress.${courseId}.level`]: newLevel,
      [`progress.${courseId}.lastAccessed`]: serverTimestamp(),
      [`progress.${courseId}.isCompleted`]: isCompleted,
      ...(isCompleted && { [`progress.${courseId}.completedAt`]: serverTimestamp() })
    });
    
    // Add lesson completion record
    const lessonRef = doc(db, 'users', userId, 'lessons', `${courseId}_${lessonId}`);
    batch.set(lessonRef, {
      lessonId,
      courseId,
      completedAt: serverTimestamp(),
      timeSpent
    });
    
    // Update daily activity for streak calculation
    const today = new Date().toISOString().split('T')[0];
    const activityRef = doc(db, 'users', userId, 'activity', today);
    batch.set(activityRef, {
      date: today,
      lessonsCompleted: increment(1),
      timeSpent: increment(timeSpent),
      lastActivity: serverTimestamp()
    }, { merge: true });
    
    await batch.commit();
    
    // Update streak
    await updateUserStreak(userId);
    
    return {
      ...currentProgress,
      completedLessons: newCompletedLessons,
      level: newLevel,
      isCompleted
    };
  };
  
  // Calculate and update user streak
  export const updateUserStreak = async (userId: string) => {
    const activityQuery = query(
      collection(db, 'users', userId, 'activity'),
      orderBy('date', 'desc')
    );
    
    const activityDocs = await getDocs(activityQuery);
    const activityDates = activityDocs.docs.map(doc => doc.id).sort().reverse();
    
    let currentStreak = 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    // Calculate current streak
    if (activityDates.includes(today)) {
      currentStreak = 1;
      let checkDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      while (currentStreak < activityDates.length) {
        const dateStr = checkDate.toISOString().split('T')[0];
        if (activityDates.includes(dateStr)) {
          currentStreak++;
          checkDate = new Date(checkDate.getTime() - 24 * 60 * 60 * 1000);
        } else {
          break;
        }
      }
    } else if (activityDates.includes(yesterday)) {
      // Streak continues from yesterday
      currentStreak = 1;
      let checkDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
      
      while (currentStreak < activityDates.length) {
        const dateStr = checkDate.toISOString().split('T')[0];
        if (activityDates.includes(dateStr)) {
          currentStreak++;
          checkDate = new Date(checkDate.getTime() - 24 * 60 * 60 * 1000);
        } else {
          break;
        }
      }
    }
    
    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 0;
    
    for (let i = 0; i < activityDates.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const currentDate = new Date(activityDates[i]);
        const previousDate = new Date(activityDates[i - 1]);
        const diffTime = previousDate.getTime() - currentDate.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        
        if (diffDays === 1) {
          tempStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);
    
    // Update user streak data
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      'streakData.currentStreak': currentStreak,
      'streakData.longestStreak': longestStreak,
      'streakData.lastActivityDate': serverTimestamp(),
      'streakData.activityDates': activityDates.map(date => new Date(date))
    });
    
    return { currentStreak, longestStreak };
  };
  
  // Get user dashboard stats
  export const getUserDashboardStats = async (userId: string) => {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      return {
        coursesStarted: 0,
        lessonsCompleted: 0,
        currentLevel: 0,
        learningStreak: 0,
        completedCourses: 0
      };
    }
    
    const userData = userDoc.data();
    const progress = userData.progress || {};
    
    const coursesStarted = Object.keys(progress).length;
    const lessonsCompleted = Object.values(progress).reduce(
      (total: number, course: any) => total + (course.completedLessons?.length || 0), 0
    );
    const currentLevel = Object.values(progress).reduce(
      (max: number, course: any) => Math.max(max, course.level || 0), 0
    );
    const learningStreak = userData.streakData?.currentStreak || 0;
    const completedCourses = Object.values(progress).filter(
      (course: any) => course.isCompleted
    ).length;
    
    return {
      coursesStarted,
      lessonsCompleted,
      currentLevel,
      learningStreak,
      completedCourses
    };
  };