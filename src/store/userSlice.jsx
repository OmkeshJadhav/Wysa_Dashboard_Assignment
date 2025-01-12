import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch('https://dummyjson.com/users');
    const data = await response.json();
    return data.users;
});

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        selectedUser: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        updateUser: (state, action) => {
            const { section, data } = action.payload;
            
            if (section === 'personal') {
                state.selectedUser = {
                    ...state.selectedUser,
                    email: data.email,
                    phone: data.phone,
                    birthDate: data.birthDate,
                    gender: data.gender,
                };
            } else if (section === 'address') {
                state.selectedUser = {
                    ...state.selectedUser,
                    address: {
                        ...state.selectedUser.address,
                        ...data,
                    },
                };
            } else if (section === 'company') {
                state.selectedUser = {
                    ...state.selectedUser,
                    company: {
                        ...state.selectedUser.company,
                        ...data,
                    },
                };
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setSelectedUser, updateUser } = userSlice.actions;
export default userSlice.reducer;