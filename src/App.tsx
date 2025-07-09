import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Layout/Navbar';
import LandingPage from './components/Landing/LandingPage';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import ForgotPasswordForm from './components/Auth/ForgotPasswordForm';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import CurriculumPage from './components/Curriculum/CurriculumPage';
import LessonPage from './components/Learning/LessonPage';
import ProtectedRoute from './components/ProtectedRoute';
import CoursePage from './components/Learning/CoursePage';

const AppContent: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="App">
      {currentUser && <Navbar />}
      <Routes>
        <Route path="/" element={currentUser ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
        <Route path="/login" element={currentUser ? <Navigate to="/dashboard" replace /> : <LoginForm />} />
        <Route path="/signup" element={currentUser ? <Navigate to="/dashboard" replace /> : <SignupForm />} />
        <Route path="/forgot-password" element={currentUser ? <Navigate to="/dashboard" replace /> : <ForgotPasswordForm />} />
        <Route path="/curriculum" element={<CurriculumPage />} />
        <Route path="/learn/:courseId/:lessonId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
          },
        }}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;