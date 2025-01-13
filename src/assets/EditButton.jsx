export function EditButton({ section, editingSection, onEdit, onSave }) {
    
    const handleClick = () => {
        if (editingSection === section) {
            onSave(section);
        } else {
            onEdit(section);
        }
    };

    return (
        <button
            onClick={handleClick}
            className="flex items-center gap-1 text-blue-600 px-2 py-1 text-sm border border-blue-600 rounded hover:bg-blue-50"
        >
            {editingSection === section ? 'Save' : (
                <>
                    <svg
                        className="w-3 h-3"
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
                    Edit
                </>
            )}
        </button>
    );
}