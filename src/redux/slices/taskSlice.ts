import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
    id: string;
    user_id?: string;
    title: string;
    mood_level: string;
    completed: boolean;
}

interface TaskState {
    tasks: Task[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: TaskState = {
    tasks: [],
    status: 'idle',
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        toggleTaskCompletion: (state, action: PayloadAction<string>) => {
            const task = state.tasks.find(t => t.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
    },
});

export const { setTasks, addTask, toggleTaskCompletion } = taskSlice.actions;
export default taskSlice.reducer;
