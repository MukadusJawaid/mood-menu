'use client';

import { Provider, useSelector, useDispatch } from 'react-redux';
import { store, RootState, AppDispatch } from './store';
import { useEffect } from 'react';
import { setUser } from './slices/authSlice';

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return <>{children}</>;
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  // Hydrate user from localStorage on first load
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem('auth:user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.id) {
          dispatch(setUser(parsed));
        }
      }
    } catch {
      // ignore
    }
  }, [dispatch]);

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (user) {
        window.localStorage.setItem('auth:user', JSON.stringify(user));
      } else {
        window.localStorage.removeItem('auth:user');
      }
    } catch {
      // ignore
    }
  }, [user]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeWrapper>
        <AuthWrapper>{children}</AuthWrapper>
      </ThemeWrapper>
    </Provider>
  );
}

