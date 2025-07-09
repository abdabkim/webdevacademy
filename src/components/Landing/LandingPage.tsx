import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, BookOpen, Users, Trophy, Zap, Star, ArrowRight, Play, CheckCircle } from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Code className="h-8 w-8" />,
      title: 'Interactive Code Editor',
      description: 'Practice coding with our built-in editor and see results instantly',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'AI-Powered Learning',
      description: 'Get instant explanations and personalized help from our AI assistant',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Structured Curriculum',
      description: 'Learn from beginner to advanced with our carefully crafted lessons',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: 'Progress Tracking',
      description: 'Track your learning journey and celebrate your achievements',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const languages = [
    { name: 'HTML', icon: '🏗️', lessons: 45, color: 'from-orange-500 to-red-500' },
    { name: 'CSS', icon: '🎨', lessons: 60, color: 'from-blue-500 to-cyan-500' },
    { name: 'JavaScript', icon: '⚡', lessons: 75, color: 'from-yellow-500 to-orange-500' },
    { name: 'PHP', icon: '🐘', lessons: 80, color: 'from-purple-500 to-indigo-500' },
    { name: 'Laravel', icon: '🚀', lessons: 90, color: 'from-red-500 to-pink-500' },
    { name: 'React', icon: '⚛️', lessons: 85, color: 'from-cyan-500 to-blue-500' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Frontend Developer',
      avatar: '👩‍💻',
      text: 'CodeMaster transformed my career! The interactive lessons made complex concepts easy to understand.'
    },
    {
      name: 'Mike Chen',
      role: 'Full Stack Developer',
      avatar: '👨‍💻',
      text: 'The AI explanations are incredible. It\'s like having a personal tutor available 24/7.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Web Developer',
      avatar: '👩‍💻',
      text: 'From zero to hero in 6 months! The structured approach really works.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CodeMaster
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              Master Web Development with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI-Powered Learning
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Learn HTML, CSS, JavaScript, PHP, Laravel, and React through interactive lessons, 
              real-time coding practice, and personalized AI assistance. From beginner to advanced.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
                >
                  <Play className="h-5 w-5" />
                  <span>Start Learning Free</span>
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/curriculum'}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium text-lg hover:border-gray-400 transition-all duration-200 flex items-center space-x-2"
              >
                <BookOpen className="h-5 w-5" />
                <span>View Curriculum</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose CodeMaster?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of coding education with our revolutionary learning platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Web Development Curriculum
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Master 6 essential technologies with structured learning paths from beginner to advanced
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {languages.map((language, index) => (
              <motion.div
                key={language.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className={`h-32 bg-gradient-to-r ${language.color} flex items-center justify-center`}>
                  <span className="text-6xl">{language.icon}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{language.name}</h3>
                  <div className="flex items-center justify-between text-gray-600 mb-4">
                    <span>{language.lessons} Lessons</span>
                    <span>3 Levels</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Beginner to Advanced</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of developers who transformed their careers with CodeMaster
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
                <div className="flex items-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Start Your Coding Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join CodeMaster today and transform your career with our revolutionary learning platform
            </p>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium text-lg hover:bg-blue-50 transition-all duration-200 flex items-center space-x-2 mx-auto"
              >
                <span>Get Started Now</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Code className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold">CodeMaster</span>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2025 CodeMaster. All rights reserved.</p>
            <p className="mt-2">Empowering developers worldwide with AI-powered learning</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;