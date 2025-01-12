import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../store/userSlice';
import { useState } from 'react';

export default function Sidebar() {
    const dispatch = useDispatch();
    const { users, selectedUser } = useSelector((state) => state.users);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsers = users.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-64 bg-[#c0d0dc] border-r overflow-y-auto">
            <div className="p-4 border-b">
                <h1 className="text-xl font-semibold">Users List</h1>
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="divide-y">
                {filteredUsers.map((user) => (
                    <div
                        key={user.id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedUser?.id === user.id ? 'bg-[#fdfeff]' : ''
                            }`}
                        onClick={() => dispatch(setSelectedUser(user))}
                    >
                        <h3 className="font-medium">{`${user.firstName} ${user.lastName}`}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                ))}
                {filteredUsers.length === 0 && (
                    <p className="p-4 text-gray-500 text-center">No users found</p>
                )}
            </div>
        </div>
    );
}