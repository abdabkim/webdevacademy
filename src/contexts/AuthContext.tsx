// contexts/AuthContext.tsx - FIXED VERSION
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, enableNetwork, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { User } from '../types';
import toast from 'react-hot-toast';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userData: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUserData = async () => {
    if (currentUser) {
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          
          // Ensure all required fields exist with defaults
          const completeUserData: User = {
            id: data.id || currentUser.uid,
            email: data.email || currentUser.email || '',
            displayName: data.displayName || currentUser.displayName || 'User',
            avatar: data.avatar || 'male',
            createdAt: data.createdAt?.toDate?.() || new Date(),
            lastLoginAt: data.lastLoginAt?.toDate?.() || new Date(),
            progress: data.progress || {},
            streakData: data.streakData || {
              currentStreak: 0,
              longestStreak: 0,
              lastActivityDate: new Date(),
              activityDates: []
            }
          };
          
          setUserData(completeUserData);
        } else {
          // Create user document if it doesn't exist
          await createUserDocument(currentUser);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user data');
      }
    }
  };

  const createUserDocument = async (user: FirebaseUser) => {
    try {
      const newUser: User = {
        id: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'User',
        avatar: 'male',
        createdAt: new Date(),
        lastLoginAt: new Date(),
        progress: {},
        streakData: {
          currentStreak: 0,
          longestStreak: 0,
          lastActivityDate: new Date(),
          activityDates: []
        }
      };
      
      await setDoc(doc(db, 'users', user.uid), {
        ...newUser,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        'streakData.lastActivityDate': serverTimestamp()
      });
      
      setUserData(newUser);
    } catch (error) {
      console.error('Error creating user document:', error);
      toast.error('Failed to create user profile');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await refreshUserData();
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await enableNetwork(db);
      await signInWithEmailAndPassword(auth, email, password);
      
      // Update last login time if user exists
      if (auth.currentUser) {
        try {
          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            lastLoginAt: serverTimestamp()
          });
        } catch (error) {
          // If user document doesn't exist, create it
          await createUserDocument(auth.currentUser);
        }
      }
      
      toast.success('Welcome back!');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const signup = async (email: string, password: string, displayName: string) => {
    try {
      await enableNetwork(db);
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName });
      
      // Create initial user document
      await createUserDocument(user);
      
      toast.success('Account created successfully!');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await enableNetwork(db);
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!currentUser) return;
    
    try {
      await enableNetwork(db);
      await updateDoc(doc(db, 'users', currentUser.uid), updates);
      setUserData(prev => prev ? { ...prev, ...updates } : null);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const value: AuthContextType = {
    currentUser,
    userData,
    loading,
    login,
    signup,
    logout,
    resetPassword,
    updateUserProfile,
    refreshUserData
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};