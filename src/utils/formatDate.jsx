export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};
//     const parsedDate = new Date(date);
//     if (isNaN(parsedDate)) {
//         return "Invalid Date";
//     }
//     return parsedDate.toLocaleDateString('en-US', {
//         day: 'numeric',
//         month: 'short',
//         year: 'numeric',
//     });
// };

// export const formatDate = (date) => {
//     // Return empty string if date is null or undefined
//     if (!date) return '';
    
//     try {
//         // Handle different date formats
//         const dateObj = new Date(date);
        
//         // Check if date is valid
//         if (isNaN(dateObj.getTime())) {
//             return '';
//         }
        
//         return dateObj.toLocaleDateString('en-US', {
//             day: 'numeric',
//             month: 'short',
//             year: 'numeric',
//         });
//     } catch (error) {
//         console.error('Error formatting date:', error);
//         return '';
//     }
// };


// formatDate.jsx
// export const formatDate = (date) => {
//     if (!date) return '';
    
//     try {
//         const dateObj = new Date(date);
        
//         if (isNaN(dateObj.getTime())) {
//             return '';
//         }
        
//         return dateObj.toLocaleDateString('en-US', {
//             day: 'numeric',
//             month: 'short',
//             year: 'numeric',
//         });
//     } catch (error) {
//         console.error('Error formatting date:', error);
//         return '';
//     }
// };


// export const createNewTodo = (todoText) => {
//     return {
//         id: Date.now(), // This can also serve as a unique identifier
//         todo: todoText,
//         completed: false,
//         date: new Date().toISOString(), // Store date in ISO format
//     };
// };
