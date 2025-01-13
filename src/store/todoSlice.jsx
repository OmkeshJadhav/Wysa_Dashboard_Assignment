import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserTodos = createAsyncThunk('todos/fetchUserTodos', async (userId) => {
    const response = await fetch(`https://dummyjson.com/users/${userId}/todos`);
    const data = await response.json();
    
    return data.todos.map(todo => ({
        ...todo,
        date: todo.date || new Date().toISOString()
    }));
});

export const addTodo = createAsyncThunk('todos/addTodo', async ({ userId, todo, date }) => {
    const response = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            todo,
            userId,
            completed: false,
            date: date || new Date().toISOString(),
        }),
    });
    const data = await response.json();
    return {
        ...data,
        date: date || new Date().toISOString()
    };
});

export const toggleTodoCompletion = createAsyncThunk(
    'todos/toggleCompletion',
    async ({ todoId, completed, currentTodo }) => {
        const response = await fetch(`https://dummyjson.com/todos/${todoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                completed: completed,
                date: currentTodo.date
            }),
        });
        const data = await response.json();

        return {
            ...data,
            date: currentTodo.date
        };
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
    reducers: {
        updateTodoText: (state, action) => {
            const updatedTodos = action.payload;
            state.todos = updatedTodos;
            
            const { todoId, newText } = action.payload;
            const todo = state.todos.find(todo => todo.id === todoId);
            if (todo) {
                todo.todo = newText;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todos = action.payload;
            })
            .addCase(fetchUserTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
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

export const { updateTodoText } = todoSlice.actions;

export default todoSlice.reducer;