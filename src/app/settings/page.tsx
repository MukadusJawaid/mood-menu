'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/templates/MainLayout';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { toggleTheme } from '@/redux/slices/themeSlice';
import { RootState } from '@/redux/store';
import { clearUser } from '@/redux/slices/authSlice';
import { Moon, Sun, User, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { mode } = useSelector((state: RootState) => state.theme);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSignOut = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
    } catch {
      // ignore network errors for logout
    }
    dispatch(clearUser());
    router.push('/login');
  };

  const displayName = user?.full_name || user?.email || 'Anonymous user';
  const displayEmail = user?.email || 'No email available';

  return (
    <MainLayout title="Settings">
      <div className="flex flex-col gap-6 max-w-lg w-full">
        <section>
          <h2 className="text-lg font-heading font-medium text-gray-500 mb-3 uppercase tracking-wider text-sm">
            Appearance
          </h2>
          <Card className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-text">
              {mode === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              <span className="font-medium">Theme Preference</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch(toggleTheme())}
            >
              Toggle {mode === 'dark' ? 'Light' : 'Dark'}
            </Button>
          </Card>
        </section>

        <section>
          <h2 className="text-lg font-heading font-medium text-gray-500 mb-3 uppercase tracking-wider text-sm">
            Account
          </h2>
          <Card className="p-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <User size={24} />
              </div>
              <div>
                <h3 className="font-bold text-text truncate max-w-xs">
                  {displayName}
                </h3>
                <p className="text-sm text-gray-500 truncate max-w-xs">
                  {displayEmail}
                </p>
              </div>
            </div>

            <div className="border-t border-card-border pt-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleSignOut}
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </Button>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-lg font-heading font-medium text-gray-500 mb-3 uppercase tracking-wider text-sm">
            About
          </h2>
          <Card className="p-4 text-center">
            <p className="text-sm text-gray-500">Mood Menu PWA v1.0.0</p>
          </Card>
        </section>
      </div>
    </MainLayout>
  );
}

