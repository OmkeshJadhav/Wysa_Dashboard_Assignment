import { EditButton } from "../../assets/EditButton";

export default function AddressCard({
    selectedUser,
    editingSection,
    handleEdit,
    handleSave,
    handleChange,
    editedData,
}) {
    const addressInfo = {
        address: selectedUser.address?.address,
        city: selectedUser.address?.city,
        state: selectedUser.address?.state,
        postalCode: selectedUser.address?.postalCode,
    };

    return (
        <div className="p-6 border border-gray-200 rounded-lg bg-white">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Address</h3>
                <EditButton
                    section="address"
                    editingSection={editingSection}
                    onEdit={() => handleEdit('address', addressInfo)}
                    onSave={() => handleSave('address')}
                />
            </div>
            <div className="grid grid-cols-2 gap-6">
                {Object.entries(addressInfo).map(([key, value]) => (
                    <div key={key}>
                        <div className="text-sm text-gray-500 mb-1 capitalize">{key}</div>
                        {editingSection === 'address' ? (
                            <input
                                type="text"
                                value={editedData[key] || ''}
                                onChange={(e) => handleChange(key, e.target.value)}
                                className="w-full p-1 border border-gray-300 rounded text-gray-700"
                            />
                        ) : (
                            <div className="text-gray-700">{value}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
