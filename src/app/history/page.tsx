'use client';

import React from 'react';
import { MainLayout } from '@/components/templates/MainLayout';
import { Card } from '@/components/atoms/Card';
import { BarChart3, TrendingUp, CalendarDays } from 'lucide-react';

export default function HistoryPage() {
  
  return (
    <MainLayout>
      
      <div className="mb-8">
         <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
           Your Insights
         </h1>
         <p className="text-gray-500">A look back at your tracked moods and productivity patterns.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <Card className="relative overflow-hidden p-6 border-0 bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/20">
          <div className="relative z-10 flex justify-between items-start mb-6">
            <div>
              <p className="text-emerald-50 font-medium">Most Frequent Mood</p>
              <h3 className="text-3xl font-heading font-bold mt-1 capitalize shadow-sm">Energetic</h3>
            </div>
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
              <TrendingUp size={28} className="text-white" />
            </div>
          </div>
          <p className="relative z-10 text-emerald-50 font-medium">Tracked 5 days this week</p>
          
          <TrendingUp className="absolute -bottom-10 -right-10 w-48 h-48 text-white/10" />
        </Card>

        <Card className="relative overflow-hidden p-6 border-0 bg-gradient-to-br from-primary to-indigo-600 text-white shadow-lg shadow-primary/20">
          <div className="relative z-10 flex justify-between items-start mb-6">
            <div>
              <p className="text-indigo-100 font-medium">Tasks Completed</p>
              <h3 className="text-3xl font-heading font-bold mt-1 shadow-sm">24</h3>
            </div>
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
              <BarChart3 size={28} className="text-white" />
            </div>
          </div>
          <p className="relative z-10 text-indigo-100 font-medium">+12% from last week</p>

          <BarChart3 className="absolute -bottom-10 -right-10 w-48 h-48 text-white/10" />
        </Card>
      </div>

      <section className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <CalendarDays className="text-primary" />
          <h2 className="text-xl font-heading font-semibold text-text">Recent Entries (Mock)</h2>
        </div>
        
        <div className="flex flex-col gap-3">
          {[
            { date: 'Today', mood: 'Happy', desc: 'Completed a lot of work', color: 'bg-green-100 text-green-700' },
            { date: 'Yesterday', mood: 'Stressed', desc: 'Tight deadlines', color: 'bg-red-100 text-red-700' },
            { date: 'Mon, Oct 24', mood: 'Energetic', desc: 'Good workout morning', color: 'bg-yellow-100 text-yellow-700' },
          ].map((entry, i) => (
            <Card key={i} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-text">{entry.date}</p>
                <p className="text-sm text-gray-500">{entry.desc}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${entry.color}`}>
                {entry.mood}
              </span>
            </Card>
          ))}
        </div>
      </section>

    </MainLayout>
  );
}
