import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../store/userSlice';
import { useState } from 'react';

export default function Sidebar() {
    const dispatch = useDispatch();
    const { users, selectedUser } = useSelector((state) => state.users);
    const [searchQuery, setSearchQuery] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 8;

    const filteredUsers = users.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div className="w-72 bg-[#c0d0dc] border">
            
            {/* Sidebar header */}
            <div className="p-4 border-b">
                <h1 className="text-xl font-semibold">Users List</h1>
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* User list */}
            <div className="divide-y">
                {currentUsers.map((user) => (
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
                {currentUsers.length === 0 && (
                    <p className="p-4 text-gray-500 text-center">No users found</p>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="p-2 flex justify-between items-center border-t">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="text-sm">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}