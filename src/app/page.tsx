'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import DashboardPage from '@/app/home/page';
import LoginPage from './login/page';

export default function RootPage() {
  const user = useSelector((state: RootState) => state.auth.user);

  // If not logged in, show login page at "/"
  if (!user) {
    return <LoginPage />;
  }

  // If logged in, show the dashboard (home) experience
  return <DashboardPage />;
}

