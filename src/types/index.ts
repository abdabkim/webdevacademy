// Updated types.ts file
export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar: string;
  createdAt: Date;
  lastLoginAt: Date;
  progress: UserProgress;
  streakData: StreakData;
}

export interface UserProgress {
  [courseId: string]: CourseProgress;
}

export interface CourseProgress {
  courseId: string;
  courseName: string;
  level: number;
  completedLessons: string[];
  totalLessons: number;
  lastAccessed: Date;
  startedAt: Date;
  isCompleted: boolean;
  completedAt?: Date;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date;
  activityDates: Date[];
}

export interface LessonProgress {
  lessonId: string;
  courseId: string;
  completedAt: Date;
  timeSpent: number;
  score?: number;
}

export interface DashboardStats {
  coursesStarted: number;
  lessonsCompleted: number;
  currentLevel: number;
  learningStreak: number;
  completedCourses: number;
}