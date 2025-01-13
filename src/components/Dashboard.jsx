import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/userSlice';
import Sidebar from './Sidebar';
import UserDetails from './UserDetails/UserDetails';
import TodoList from './ToDos/TodoList';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('details');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const dispatch = useDispatch();
    const { selectedUser } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    }, [selectedUser]);

    return (
        <div className="relative flex h-screen overflow-hidden">
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="md:hidden fixed top-0 left-0 right-0 bg-white z-10 border-b px-4 py-2">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                >
                    <Bars3Icon className="h-6 w-6" />
                </button>
            </div>

            <div className={`
                fixed md:static inset-y-0 left-0 z-30
                w-72 bg-[#c0d0dc] border transform transition-transform duration-200 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
            `}>
                <div className="flex justify-between items-center p-4 border-b md:hidden">
                    <h1 className="text-xl font-semibold">Users List</h1>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                <Sidebar />
            </div>

            <div className="flex-1 overflow-hidden mt-14 md:mt-0">
                <div className="h-full p-4 md:p-6">
                    {selectedUser ? (
                        <>
                            <div className="mb-6">
                                <div className="flex space-x-4 border-b overflow-x-auto">
                                    <button
                                        className={`px-4 py-2 whitespace-nowrap ${
                                            activeTab === 'details' 
                                                ? 'border-b-2 border-blue-500 text-blue-600' 
                                                : 'text-gray-500'
                                        }`}
                                        onClick={() => setActiveTab('details')}
                                    >
                                        User Details
                                    </button>
                                    <button
                                        className={`px-4 py-2 whitespace-nowrap ${
                                            activeTab === 'todos' 
                                                ? 'border-b-2 border-blue-500 text-blue-600' 
                                                : 'text-gray-500'
                                        }`}
                                        onClick={() => setActiveTab('todos')}
                                    >
                                        To-dos
                                    </button>
                                </div>
                            </div>
                            <div className="h-[calc(100%-4rem)] overflow-y-auto">
                                {activeTab === 'details' ? <UserDetails /> : <TodoList />}
                            </div>
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
};

export default Dashboard;