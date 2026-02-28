'use client';

import React from 'react';
import { Card } from '../atoms/Card';
import { CheckCircle2, Circle } from 'lucide-react';
import { Task } from '@/redux/slices/taskSlice';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
}

const moodColors: Record<string, string> = {
  happy: 'border-emerald-500',
  productive: 'border-sky-500',
  energetic: 'border-amber-500',
  relaxed: 'border-teal-500',
  inspired: 'border-yellow-400',
  tired: 'border-slate-500',
  stressed: 'border-red-500',
  anxious: 'border-indigo-400',
  overwhelmed: 'border-orange-500',
  sad: 'border-blue-500',
};

export const TaskCard = ({ task, onToggle }: TaskCardProps) => {
  return (
    <Card 
      hoverable 
      className={`p-4 flex items-center gap-4 border-l-4 ${moodColors[task.mood_level] || 'border-l-primary'}`}
      onClick={() => onToggle(task.id)}
    >
      <button 
        className="text-primary hover:text-accent transition-colors shrink-0"
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
      >
        {task.completed ? (
          <CheckCircle2 size={24} className="text-green-500" />
        ) : (
          <Circle size={24} />
        )}
      </button>
      
      <div className="flex-1 min-w-0">
        <h3 className={`font-medium text-lg truncate ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-text'}`}>
          {task.title}
        </h3>
        <p className="text-sm text-gray-500 capitalize tracking-wide">
          Suggested for: {task.mood_level} mood
        </p>
      </div>
    </Card>
  );
};
