export default function TodoInput({ newTodo, setNewTodo, handleAddTodo }) {
    return (
        <div>
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
            <div className="mt-3 flex gap-3">
                <button
                    onClick={() => setNewTodo('')}
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
    );
}