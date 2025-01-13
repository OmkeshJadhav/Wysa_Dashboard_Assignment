import { useDispatch } from "react-redux";
import DeleteBin from "../../assets/DeleteBin";
import EditPen from "../../assets/EditPen";
import { formatDate } from "../../utils/formatDate";
import { updateTodoText } from "../../store/todoSlice";

export default function TodoItem({
    todo,
    editingTodo,
    setEditingTodo,
    editedText,
    setEditedText,
    handleToggleCompletion,
    handleDeleteTodo,
}) {
    const formattedDate = formatDate(todo.date);
    const dispatch = useDispatch();

    const handleBlur = () => {
        if (editedText.trim() !== todo.todo) {
            dispatch(updateTodoText({ todoId: todo.id, newText: editedText }));
        }
        setEditingTodo(null);  // Close the edit mode
    };

    return (
        <div className="flex items-center justify-between p-4 border rounded-lg">
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
                        // onBlur={() => setEditingTodo(null)}
                        onBlur={handleBlur}
                        className="flex-1 px-2 py-1 border rounded"
                        autoFocus
                    />
                ) : (
                    <div className="flex-1">
                        <span
                            className={`block ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
                                }`}
                        >
                            {todo.todo}
                        </span>
                        {formattedDate && (
                            <span className="text-sm text-gray-500">{formattedDate}</span>
                        )}
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
                    <EditPen />
                </button>
                <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="p-1.5 text-gray-600 hover:text-red-600"
                ><DeleteBin />
                </button>
            </div>
        </div>
    );
}




// import { useDispatch } from 'react-redux';
// import DeleteBin from "../../assets/DeleteBin";
// import EditPen from "../../assets/EditPen";
// import { formatDate } from "../../utils/formatDate";
// import { updateTodoText } from '../../store/todoSlice';

// export default function TodoItem({
//     todo,
//     editingTodo,
//     setEditingTodo,
//     editedText,
//     setEditedText,
//     handleToggleCompletion,
//     handleDeleteTodo,
// }) {
//     const dispatch = useDispatch();
//     const formattedDate = formatDate(todo.date);

//     const handleBlur = () => {
//         if (editedText.trim() !== todo.todo) {
//             dispatch(updateTodoText({ todoId: todo.id, newText: editedText }));
//         }
//         setEditingTodo(null);  // Close the edit mode
//     };

//     return (
//         <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div className="flex items-center gap-3 flex-1">
//                 <input
//                     type="checkbox"
//                     checked={todo.completed}
//                     onChange={() => handleToggleCompletion(todo.id)}
//                     className="h-5 w-5 text-blue-500 rounded cursor-pointer"
//                 />
//                 {editingTodo === todo.id ? (
//                     <input
//                         type="text"
//                         value={editedText}
//                         onChange={(e) => setEditedText(e.target.value)}
//                         onBlur={handleBlur}  // Trigger the blur handler
//                         className="flex-1 px-2 py-1 border rounded"
//                         autoFocus
//                     />
//                 ) : (
//                     <div className="flex-1">
//                         <span
//                             className={`block ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
//                                 }`}
//                         >
//                             {todo.todo}
//                         </span>
//                         {formattedDate && (
//                             <span className="text-sm text-gray-500">{formattedDate}</span>
//                         )}
//                     </div>
//                 )}
//             </div>
//             <div className="flex items-center gap-2">
//                 <button
//                     onClick={() => {
//                         setEditingTodo(todo.id);
//                         setEditedText(todo.todo);
//                     }}
//                     className="p-1.5 text-gray-600 hover:text-blue-600"
//                 >
//                     <EditPen />
//                 </button>
//                 <button
//                     onClick={() => handleDeleteTodo(todo.id)}
//                     className="p-1.5 text-gray-600 hover:text-red-600"
//                 >
//                     <DeleteBin />
//                 </button>
//             </div>
//         </div>
//     );
// }



// import { useDispatch } from 'react-redux';
// import DeleteBin from "../../assets/DeleteBin";
// import EditPen from "../../assets/EditPen";
// import { formatDate } from "../../utils/formatDate";
// import { updateTodoText } from '../../store/todoSlice';

// export default function TodoItem({
//     todo,
//     editingTodo,
//     setEditingTodo,
//     editedText,
//     setEditedText,
//     handleToggleCompletion,
//     handleDeleteTodo,
// }) {
//     const dispatch = useDispatch();
//     const formattedDate = formatDate(todo.date);

//     const handleBlur = () => {
//         if (editedText.trim() !== todo.todo) {
//             dispatch(updateTodoText({ todoId: todo.id, newText: editedText }));
//         }
//         setEditingTodo(null);  // Close the edit mode
//     };

//     return (
//         <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div className="flex items-center gap-3 flex-1">
//                 <input
//                     type="checkbox"
//                     checked={todo.completed}
//                     onChange={() => handleToggleCompletion(todo.id)}  // Toggle completion state
//                     className="h-5 w-5 text-blue-500 rounded cursor-pointer"
//                 />
//                 {editingTodo === todo.id ? (
//                     <input
//                         type="text"
//                         value={editedText}
//                         onChange={(e) => setEditedText(e.target.value)}
//                         onBlur={handleBlur}  // Trigger the blur handler
//                         className="flex-1 px-2 py-1 border rounded"
//                         autoFocus
//                     />
//                 ) : (
//                     <div className="flex-1">
//                         <span
//                             className={`block ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
//                                 }`}
//                         >
//                             {todo.todo}
//                         </span>
//                         {formattedDate && (
//                             <span className="text-sm text-gray-500">{formattedDate}</span>
//                         )}
//                     </div>
//                 )}
//             </div>
//             <div className="flex items-center gap-2">
//                 <button
//                     onClick={() => {
//                         setEditingTodo(todo.id);
//                         setEditedText(todo.todo);
//                     }}
//                     className="p-1.5 text-gray-600 hover:text-blue-600"
//                 >
//                     <EditPen />
//                 </button>
//                 <button
//                     onClick={() => handleDeleteTodo(todo.id)}
//                     className="p-1.5 text-gray-600 hover:text-red-600"
//                 >
//                     <DeleteBin />
//                 </button>
//             </div>
//         </div>
//     );
// }
