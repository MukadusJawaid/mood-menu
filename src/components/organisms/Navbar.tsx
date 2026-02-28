'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CheckSquare, History, Settings, Sun, Moon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/redux/slices/themeSlice';
import { RootState } from '@/redux/store';

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/tasks', label: 'Tasks', icon: CheckSquare },
  { href: '/history', label: 'History', icon: History },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export const Navbar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex flex-shrink-0 items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
              M
            </div>
            <Link href="/" className="font-heading text-xl font-bold tracking-tight text-text">
              MoodMenu
            </Link>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group relative
                    ${isActive 
                      ? 'text-primary' 
                      : 'text-gray-500 hover:text-text'
                    }`}
                >
                  <Icon size={18} className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className={`${isActive ? 'block' : 'hidden sm:block'}`}>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full" />
                  )}
                </Link>
              );
            })}
            
            {/* User badge */}
            {user && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-700 dark:text-gray-200">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-semibold">
                  {user.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="font-semibold truncate max-w-[120px]">
                    {user.full_name || user.email}
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Logged in
                  </span>
                </div>
              </div>
            )}

            {/* Theme Toggle Button */}
            <div className="ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
              <button
                onClick={() => dispatch(toggleTheme())}
                className="p-2 rounded-lg text-gray-500 hover:text-primary transition-colors hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none"
                aria-label="Toggle Theme"
              >
                {themeMode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

