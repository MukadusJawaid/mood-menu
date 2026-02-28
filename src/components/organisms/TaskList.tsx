'use client';

import React from 'react';
import { TaskCard } from '../molecules/TaskCard';
import { Task } from '@/redux/slices/taskSlice';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  emptyMessage?: string;
}

export const TaskList = ({ tasks, onToggleTask, emptyMessage = "No tasks found." }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500 border-2 border-dashed border-card-border rounded-xl">
        <p className="text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <TaskCard task={task} onToggle={onToggleTask} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
