import { EditButton } from "../../assets/EditButton";

export default function HeaderCard({ selectedUser, editingSection, handleEdit, handleSave }) {
    return (
        <div className="p-6 border border-gray-200 rounded-lg bg-white">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-xl font-semibold">
                        {`${selectedUser.firstName} ${selectedUser.lastName}`}
                    </h2>
                    <p className="text-gray-600">
                        {selectedUser.company?.title || 'Frontend Developer'}
                    </p>
                    <p className="text-gray-600">
                        {`${selectedUser.address?.city || 'Los Angeles'}, ${selectedUser.address?.state || 'California'}, ${selectedUser.address?.country || 'USA'}`}
                    </p>
                </div>
                <EditButton
                    section="header"
                    editingSection={editingSection}
                    onEdit={() => handleEdit('header')}
                    onSave={() => handleSave('header')}
                />
            </div>
        </div>
    );
}
