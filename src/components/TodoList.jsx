import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    fetchUserTodos,
    addTodo,
    deleteTodo,
    toggleTodoCompletion,
} from '../store/todoSlice';

export default function TodoList() {
    const [newTodo, setNewTodo] = useState('');
    const [editingTodo, setEditingTodo] = useState(null);
    const [editedText, setEditedText] = useState(''); // Track edited text
    const dispatch = useDispatch();
    const { selectedUser } = useSelector((state) => state.users);
    const { todos, status } = useSelector((state) => state.todos);

    useEffect(() => {
        if (selectedUser) {
            dispatch(fetchUserTodos(selectedUser.id));
        }
    }, [dispatch, selectedUser]);

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            try {
                await dispatch(
                    addTodo({
                        userId: selectedUser.id,
                        todo: newTodo,
                        date: new Date().toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        }),
                    })
                );
                setNewTodo('');
                toast.success('To-do added successfully!');
            } catch (error) {
                toast.error('Failed to add to-do.');
            }
        }
    };

    const handleClear = () => {
        setNewTodo('');
    };

    const handleEditTodo = (todoId) => {
        try {
            const updatedTodos = todos.map((todo) => {
                if (todo.id === todoId) {
                    return { ...todo, todo: editedText };
                }
                return todo;
            });

            dispatch({
                type: 'todos/updateTodoText',
                payload: updatedTodos,
            });
            setEditingTodo(null);
            toast.success('To-do updated successfully!');
        } catch (error) {
            toast.error('Failed to update to-do.');
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const handleToggleCompletion = (todoId) => {
        try {
            const updatedTodos = todos.map((todo) =>
                todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
            );
            dispatch({
                type: 'todos/updateTodoText',
                payload: updatedTodos,
            });

            dispatch(
                toggleTodoCompletion({
                    todoId,
                    completed: !todos.find((todo) => todo.id === todoId).completed,
                })
            )
                .unwrap()
                .then(() => {
                    toast.success('To-do completion status updated!');
                })
                .catch((error) => {
                    const revertedTodos = todos.map((todo) =>
                        todo.id === todoId ? { ...todo, completed: todo.completed } : todo
                    );
                    dispatch({
                        type: 'todos/updateTodoText',
                        payload: revertedTodos,
                    });
                    toast.error('Failed to toggle completion.');
                });
        } catch (error) {
            toast.error('An error occurred while toggling completion.');
        }
    };

    const handleDeleteTodo = (todoId) => {
        try {
            dispatch(deleteTodo(todoId));
            toast.success('To-do deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete to-do.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg">
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add a new to-do..."
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        maxLength="150"
                    />
                    <div className="absolute right-3 top-2.5 text-sm text-gray-400">
                        {newTodo.length}/150
                    </div>
                </div>
                <div className="mt-3 flex justify-start gap-3">
                    <button
                        onClick={handleClear}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleAddTodo}
                        disabled={!newTodo.trim()}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    >
                        Add To-do
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                {todos.map((todo) => (
                    <div
                        key={todo.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                    >
                        <div className="flex items-center gap-3 flex-1">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggleCompletion(todo.id)}
                                className="h-5 w-5 text-blue-500 rounded cursor-pointer"
                            />
                            {editingTodo === todo.id ? (
                                <input
                                    type="text"
                                    value={editedText}
                                    onChange={(e) => setEditedText(e.target.value)}
                                    className="flex-1 px-2 py-1 border rounded"
                                    onBlur={() => handleEditTodo(todo.id)}
                                    autoFocus
                                />
                            ) : (
                                <div className="flex-1">
                                    <span
                                        className={`block ${
                                            todo.completed
                                                ? 'line-through text-gray-400'
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        {todo.todo}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {formatDate(todo.date || new Date())}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => {
                                    setEditingTodo(todo.id);
                                    setEditedText(todo.todo);
                                }}
                                className="p-1.5 text-gray-600 hover:text-blue-600"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={() => handleDeleteTodo(todo.id)}
                                className="p-1.5 text-gray-600 hover:text-red-600"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
