'use client';

import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { MainLayout } from '@/components/templates/MainLayout';
import { MoodSelector } from '@/components/molecules/MoodSelector';
import { AISuggestionCard } from '@/components/molecules/AISuggestionCard';
import { TaskList } from '@/components/organisms/TaskList';
import { Button } from '@/components/atoms/Button';
import { toggleTaskCompletion, setTasks } from '@/redux/slices/taskSlice';
import Link from 'next/link';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { currentMood } = useSelector((state: RootState) => state.mood);
  const { tasks } = useSelector((state: RootState) => state.tasks);

  // Load mock data on initial mount to simulate DB
  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(
        setTasks([
          {
            id: '1',
            title: 'Go for a 15 min walk',
            mood_level: 'sad',
            completed: false,
          },
          {
            id: '2',
            title: 'Start a new project',
            mood_level: 'energetic',
            completed: false,
          },
          {
            id: '3',
            title: 'Read 10 pages of a book',
            mood_level: 'tired',
            completed: false,
          },
          {
            id: '4',
            title: 'Deep breathing exercise',
            mood_level: 'stressed',
            completed: false,
          },
          {
            id: '5',
            title: 'Call a friend',
            mood_level: 'happy',
            completed: true,
          },
        ]),
      );
    }
  }, [dispatch, tasks.length]);

  const handleToggle = (id: string) => {
    dispatch(toggleTaskCompletion(id));
  };

  const filteredTasks = useMemo(() => {
    if (!currentMood) return tasks;
    return tasks.filter((task) => task.mood_level === currentMood);
  }, [tasks, currentMood]);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] p-6 sm:p-10 md:p-14 mb-6 mt-4 glass border-white/40 shadow-[0_35px_60px_-15px_rgba(79,70,229,0.3)] dark:border-white/10">
        <div className="absolute inset-0 z-0 opacity-80 dark:opacity-60 mix-blend-overlay">
          <div className="absolute top-0 -left-20 w-96 h-96 bg-gradient-to-br from-primary via-indigo-400 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-accent via-purple-400 to-transparent rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-secondary/30 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-4 sm:mb-6 tracking-tighter text-text drop-shadow-sm leading-[1.1]">
            Track your mood. <br />
            <span className="bg-gradient-to-br from-primary via-accent to-secondary bg-clip-text text-transparent">
              Own your day.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-text/70 font-body leading-relaxed max-w-2xl font-medium">
            Select how you feel and see tasks that match your energy.
          </p>
        </div>
      </section>

      {/* Mood Selection */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <MoodSelector />
      </section>

      {/* AI Suggestion for current mood */}
      {currentMood && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <AISuggestionCard />
        </section>
      )}

      {/* Task List for current mood */}
      <section className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-heading font-semibold text-text">
            {currentMood ? `Tasks for when you're ${currentMood}` : 'All your tasks'}
          </h2>
          <Button variant="ghost" size="sm" asChild className="hidden md:flex">
            <Link href="/tasks">View All</Link>
          </Button>
        </div>

        <TaskList
          tasks={filteredTasks}
          onToggleTask={handleToggle}
          emptyMessage={`No specific tasks found for a ${currentMood || 'blank'} mood.`}
        />
      </section>
    </MainLayout>
  );
}

