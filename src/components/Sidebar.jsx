import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../store/userSlice';

export default function Sidebar() {
    const dispatch = useDispatch();
    const { users, selectedUser } = useSelector((state) => state.users);

    return (
        <div className="w-64 bg-white border-r overflow-y-auto">
            <div className="p-4 border-b">
                <h1 className="text-xl font-semibold">Users List</h1>
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div className="divide-y">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedUser?.id === user.id ? 'bg-blue-50' : ''
                            }`}
                        onClick={() => dispatch(setSelectedUser(user))}
                    >
                        <h3 className="font-medium">{`${user.firstName} ${user.lastName}`}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}