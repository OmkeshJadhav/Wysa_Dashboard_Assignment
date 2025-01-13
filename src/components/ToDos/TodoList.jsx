import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addTodo, deleteTodo, fetchUserTodos, toggleTodoCompletion, } from "../../store/todoSlice"
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

export default function TodoList() {
    const [newTodo, setNewTodo] = useState('');
    const [editingTodo, setEditingTodo] = useState(null);
    const [editedText, setEditedText] = useState('');
    const dispatch = useDispatch();
    const { selectedUser } = useSelector((state) => state.users);
    const { todos, status } = useSelector((state) => state.todos);

    useEffect(() => {
        if (selectedUser) {
            dispatch(fetchUserTodos(selectedUser.id));
        }
    }, [dispatch, selectedUser]);

    const handleAddTodo = async () => {
        if (newTodo.trim()) {
            try {
                await dispatch(
                    addTodo({
                        userId: selectedUser.id,
                        todo: newTodo,
                        date: new Date().toISOString(),
                    })
                );
                setNewTodo('');
                toast.success('To-do added successfully!');
            } catch (error) {
                toast.error('Failed to add to-do.');
            }
        }
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
            toast.success('To-do status changed successfully!');
        } catch (error) {
            toast.error('Failed to delete to-do.');
        }

    }

    const handleDeleteTodo = async (todoId) => {
        try {
            await dispatch(deleteTodo(todoId));
            toast.success('To-do deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete to-do.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg">
            <TodoInput
                newTodo={newTodo}
                setNewTodo={setNewTodo}
                handleAddTodo={handleAddTodo}
            />
            <div className="space-y-3 mt-6">
                {todos.map((todo) => (
                    <TodoItem
                    key={`${todo.id}-${todo.date}`}
                        todo={todo}
                        editingTodo={editingTodo}
                        setEditingTodo={setEditingTodo}
                        editedText={editedText}
                        setEditedText={setEditedText}
                        handleToggleCompletion={handleToggleCompletion}
                        handleDeleteTodo={handleDeleteTodo}
                        dispatch={dispatch}
                    />
                ))}
            </div>
        </div>
    );
}