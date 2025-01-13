import { EditButton } from "../../assets/EditButton";

export default function CompanyCard({
    selectedUser,
    editingSection,
    handleEdit,
    handleSave,
    handleChange,
    editedData,
}) {
    const companyInfo = {
        name: selectedUser.company?.name,
        department: selectedUser.company?.department,
        title: selectedUser.company?.title,
        address: selectedUser.company?.address?.address,
    };

    return (
        <div className="p-6 border border-gray-200 rounded-lg bg-white">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Company</h3>
                <EditButton
                    section="company"
                    editingSection={editingSection}
                    onEdit={() => handleEdit('company', companyInfo)}
                    onSave={() => handleSave('company')}
                />
            </div>
            <div className="grid grid-cols-2 gap-6">
                {Object.entries(companyInfo).map(([key, value]) => (
                    <div key={key}>
                        <div className="text-sm text-gray-500 mb-1 capitalize">{key}</div>
                        {editingSection === 'company' ? (
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
