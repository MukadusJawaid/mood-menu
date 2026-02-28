'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMood } from '@/redux/slices/moodSlice';
import { RootState } from '@/redux/store';
import { Smile, Frown, Flame, Zap, Moon, Lightbulb, Coffee, Layers, Crosshair, Wind } from 'lucide-react';

const moods = [
  { id: 'happy', label: 'Happy', icon: Smile, color: 'text-emerald-500 hover:bg-emerald-500/10 border-emerald-500/20' },
  { id: 'productive', label: 'Productive', icon: Crosshair, color: 'text-sky-500 hover:bg-sky-500/10 border-sky-500/20' },
  { id: 'energetic', label: 'Energetic', icon: Zap, color: 'text-amber-500 hover:bg-amber-500/10 border-amber-500/20' },
  { id: 'relaxed', label: 'Relaxed', icon: Coffee, color: 'text-teal-500 hover:bg-teal-500/10 border-teal-500/20' },
  { id: 'inspired', label: 'Inspired', icon: Lightbulb, color: 'text-yellow-400 hover:bg-yellow-400/10 border-yellow-400/20' },
  { id: 'tired', label: 'Tired', icon: Moon, color: 'text-slate-500 hover:bg-slate-500/10 border-slate-500/20' },
  { id: 'stressed', label: 'Stressed', icon: Flame, color: 'text-red-500 hover:bg-red-500/10 border-red-500/20' },
  { id: 'anxious', label: 'Anxious', icon: Wind, color: 'text-indigo-400 hover:bg-indigo-400/10 border-indigo-400/20' },
  { id: 'overwhelmed', label: 'Overwhelmed', icon: Layers, color: 'text-orange-500 hover:bg-orange-500/10 border-orange-500/20' },
  { id: 'sad', label: 'Sad', icon: Frown, color: 'text-blue-500 hover:bg-blue-500/10 border-blue-500/20' },
];

export const MoodSelector = () => {
  const dispatch = useDispatch();
  const currentMood = useSelector((state: RootState) => state.mood.currentMood);

  return (
    <div className="w-full flex flex-col gap-6">
      <h2 className="text-2xl font-heading font-bold text-text">How are you feeling?</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {moods.map((mood) => {
          const Icon = mood.icon;
          const isSelected = currentMood === mood.id;
          return (
            <button
              key={mood.id}
              onClick={() => dispatch(setMood(mood.id))}
              className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300
                ${isSelected 
                  ? 'border-primary ring-2 ring-primary/30 scale-105 glass shadow-lg shadow-primary/10' 
                  : `glass-card hover:scale-105 hover:-translate-y-1 ${mood.color}`
                }
                ${isSelected ? mood.color : 'text-gray-600 dark:text-gray-300'}
              `}
              aria-pressed={isSelected}
            >
              <Icon size={36} className={`mb-3 ${isSelected ? 'animate-bounce' : ''}`} strokeWidth={1.5} />
              <span className="text-sm font-semibold tracking-wide">{mood.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
