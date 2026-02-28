'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { MainLayout } from '@/components/templates/MainLayout';
import { TaskList } from '@/components/organisms/TaskList';
import { toggleTaskCompletion } from '@/redux/slices/taskSlice';
import { AddTaskForm } from '@/components/molecules/AddTaskForm';

export default function TasksPage() {
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const { currentMood } = useSelector((state: RootState) => state.mood);
  const dispatch = useDispatch();

  const handleToggle = (id: string) => {
    dispatch(toggleTaskCompletion(id));
  };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <MainLayout title="My Tasks">
      
      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-heading font-semibold text-text">
                Tasks for today
              </h2>
              <p className="text-sm text-gray-500">
                Capture everything in one place, then check items off as you go.
              </p>
            </div>
          </div>
          <AddTaskForm currentMood={currentMood} />
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold text-text mb-4">
            Pending tasks
          </h2>
          <TaskList
            tasks={pendingTasks}
            onToggleTask={handleToggle}
            emptyMessage="All caught up! Time to relax or add more tasks."
          />
        </section>

        {completedTasks.length > 0 && (
          <section className="opacity-80">
            <h2 className="text-xl font-heading font-semibold text-text mb-4">
              Completed
            </h2>
            <TaskList
              tasks={completedTasks}
              onToggleTask={handleToggle}
              emptyMessage="No completed tasks yet."
            />
          </section>
        )}
      </div>

    </MainLayout>
  );
}
