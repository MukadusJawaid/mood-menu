export const generateMoodPrompt = (mood: string, existingTasks: any[]): string => {
    const taskList = existingTasks.length > 0
        ? existingTasks.map(t => `- ${t.title} (${t.completed ? 'Done' : 'Pending'})`).join('\n')
        : 'No tasks currently available.';

    return `System Prompt:
You are an empathetic, highly-effective AI productivity assistant. 
The user has reported currently feeling "${mood}". 

Based on their emotional state, kindly provide a single actionable micro-step they should take right now.

User's current task list:
${taskList}

Please output a short, encouraging 1-2 sentence suggestion perfectly tailored to someone feeling ${mood}.`;
};

export const getMockAiResponse = (mood: string): string => {
    const responses: Record<string, string[]> = {
        happy: ["Channel that joy into your biggest pending task!", "Great energy! Let's knock out something challenging."],
        productive: ["You're on fire. Keep the momentum going!", "Perfect time for deep work. Dive into your main project."],
        energetic: ["Burn that energy! Tackle something fast-paced.", "Let's blitz through your quick tasks right now."],
        relaxed: ["Stay zen. Do some light organizing or reading.", "Keep it smooth. Pick an easy, low-stress task."],
        inspired: ["Strike while the iron is hot! Work on something creative.", "Write down your ideas and sketch out a plan."],
        tired: ["Take it easy. Drink water and do a 5-minute review.", "Rest is productive too. Take a short nap or stretch."],
        stressed: ["Breathe. Break your biggest task into 3 tiny steps.", "Step away for 5 minutes. Then just do one small thing."],
        anxious: ["Focus on what you can control. Pick one tiny task.", "Write down your worries, then do a 2-minute task."],
        overwhelmed: ["Close all tabs. Pick just ONE thing to do today.", "Brain dump everything, then pick the easiest win."],
        sad: ["Be gentle with yourself. Do something comforting.", "Just do one tiny self-care task. That's enough for now."]
    };

    const fallback = ["Take a deep breath and review your list.", "Focus on one small win today."];
    const options = responses[mood] || fallback;
    return options[Math.floor(Math.random() * options.length)];
};
