import React from 'react';
import { motion } from 'framer-motion';

interface ProgressCardProps {
  title: string;
  progress: number;
  total: number;
  color: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ title, progress, total, color }) => {
  const percentage = (progress / total) * 100;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-3 rounded-full bg-gradient-to-r ${color}`}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{progress} completed</span>
          <span>{total} total</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressCard;