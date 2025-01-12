import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserTodos = createAsyncThunk('todos/fetchUserTodos', async (userId) => {
    const response = await fetch(`https://dummyjson.com/users/${userId}/todos`);
    const data = await response.json();
    return data.todos;
});

export const addTodo = createAsyncThunk('todos/addTodo', async ({ userId, todo }) => {
    const response = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            todo,
            userId,
            completed: false,
        }),
    });
    return await response.json();
});

export const toggleTodoCompletion = createAsyncThunk(
    'todos/toggleCompletion',
    async ({ todoId, completed }) => {
        const response = await fetch(`https://dummyjson.com/todos/${todoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                completed: completed,
            }),
        });
        return await response.json();
    }
);

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (todoId) => {
    await fetch(`https://dummyjson.com/todos/${todoId}`, {
        method: 'DELETE',
    });
    return todoId;
});

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.status = 'succeeded';
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            })
            .addCase(toggleTodoCompletion.fulfilled, (state, action) => {
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            });
    },
});

export default todoSlice.reducer;