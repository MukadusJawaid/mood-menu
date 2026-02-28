import { NextRequest, NextResponse } from 'next/server';
import { generateMoodPrompt, getMockAiResponse } from '@/utils/aiSuggestion';

export async function POST(req: NextRequest) {
  try {
    const { mood, tasks = [] } = await req.json();

    if (!mood) {
      return NextResponse.json(
        { error: 'mood is required' },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If no Gemini key is configured, fall back to the existing mock logic
    if (!apiKey) {
      const suggestion = getMockAiResponse(mood);
      return NextResponse.json(
        { suggestion, source: 'mock' },
        { status: 200 },
      );
    }

    const prompt = generateMoodPrompt(mood, tasks);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      const fallback = getMockAiResponse(mood);
      return NextResponse.json(
        { suggestion: fallback, source: 'fallback' },
        { status: 200 },
      );
    }

    const data = await response.json();
    const text =
      data.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text)
        .join(' ')
        .trim() || getMockAiResponse(mood);

    return NextResponse.json(
      { suggestion: text, source: 'gemini' },
      { status: 200 },
    );
  } catch (err) {
    console.error('AI suggestion error:', err);
    const fallback = getMockAiResponse('neutral');
    return NextResponse.json(
      { suggestion: fallback, source: 'error-fallback' },
      { status: 200 },
    );
  }
}

