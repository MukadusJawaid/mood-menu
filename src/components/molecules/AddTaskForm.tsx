'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '@/redux/slices/taskSlice';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Plus, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AddTaskFormProps {
  currentMood: string | null;
}

export const AddTaskForm = ({ currentMood }: AddTaskFormProps) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(addTask({
      id: Date.now().toString(),
      title: title.trim(),
      mood_level: currentMood || 'neutral',
      completed: false,
    }));
    
    setTitle('');
    setIsOpen(false);
  };

  return (
    <div className="w-full mt-2">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <button 
              onClick={() => setIsOpen(true)}
              className="w-full mt-4 flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed border-primary/30 dark:border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary transition-all group"
            >
              <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-medium text-lg">Add New Task</span>
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            onSubmit={handleSubmit}
            className="w-full bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-xl border border-gray-100 dark:border-slate-700 flex flex-col gap-4"
          >
            <div className="flex items-center gap-2 text-primary">
              <Sparkles size={18} />
              <h3 className="font-heading font-semibold">What's on your mind?</h3>
            </div>
            
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., Reply to client emails..."
              className="text-lg py-6"
              autoFocus
            />
            
            <div className="flex gap-3 justify-end mt-2">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="px-8 shadow-lg shadow-primary/30">
                Save Task
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
