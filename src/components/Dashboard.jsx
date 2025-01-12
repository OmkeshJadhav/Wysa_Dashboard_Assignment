import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/userSlice';
import Sidebar from './Sidebar';
import UserDetails from './UserDetails';
import TodoList from './TodoList';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('details');
    const dispatch = useDispatch();
    const { selectedUser } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 overflow-hidden">
                <div className="p-6">
                    {selectedUser ? (
                        <>
                            <div className="mb-6">
                                <div className="flex space-x-4 border-b">
                                    <button
                                        className={`px-4 py-2 ${activeTab === 'details' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                                        onClick={() => setActiveTab('details')}
                                    >
                                        User Details
                                    </button>
                                    <button
                                        className={`px-4 py-2 ${activeTab === 'todos' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                                        onClick={() => setActiveTab('todos')}
                                    >
                                        To-dos
                                    </button>
                                </div>
                            </div>
                            {activeTab === 'details' ? <UserDetails /> : <TodoList />}
                        </>
                    ) : (
                        <div className="text-center text-gray-500 mt-10">
                            Select a user from the sidebar to view details
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}