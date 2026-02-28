'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getMockAiResponse } from '@/utils/aiSuggestion';
import { Card } from '../atoms/Card';
import { Sparkles } from 'lucide-react';

export const AISuggestionCard = () => {
  const { currentMood } = useSelector((state: RootState) => state.mood);
  const { tasks } = useSelector((state: RootState) => state.tasks);

  const [suggestion, setSuggestion] = useState<string>(
    'Select a mood above to receive a tailored suggestion.',
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentMood) {
      setSuggestion('Select a mood above to receive a tailored suggestion.');
      setError(null);
      return;
    }

    let cancelled = false;
    const fetchSuggestion = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/ai-suggestion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mood: currentMood,
            tasks,
          }),
        });

        const data = await res.json();

        if (cancelled) return;

        if (!res.ok || !data.suggestion) {
          setSuggestion(getMockAiResponse(currentMood));
        } else {
          setSuggestion(data.suggestion);
        }
      } catch (err) {
        if (cancelled) return;
        setError('Could not get live AI suggestion. Showing a smart fallback.');
        setSuggestion(getMockAiResponse(currentMood));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchSuggestion();

    return () => {
      cancelled = true;
    };
  }, [currentMood, tasks]);

  return (
    <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border-indigo-100 dark:border-indigo-900 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 text-indigo-200 dark:text-indigo-800/40 blur-sm opacity-50">
        <Sparkles size={120} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="text-indigo-500" size={20} />
          <h3 className="font-heading font-semibold text-indigo-900 dark:text-indigo-200 text-lg">
            AI Suggestion
          </h3>
        </div>

        <p className="text-indigo-800 dark:text-indigo-300 leading-relaxed text-lg">
          {loading ? 'Thinking of a suggestion for you…' : suggestion}
        </p>

        {error && (
          <p className="mt-2 text-xs text-indigo-700/80 dark:text-indigo-300/80">
            {error}
          </p>
        )}
      </div>
    </Card>
  );
};

