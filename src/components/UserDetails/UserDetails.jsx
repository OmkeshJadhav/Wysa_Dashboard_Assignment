import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderCard from './HeaderCard';
import PersonalInfoCard from './PersonalInfoCard';
import AddressCard from './AddressCard';
import CompanyCard from './CompanyCard';
import { updateUser } from '../../store/userSlice';

export default function UserDetails() {
    const { selectedUser } = useSelector((state) => state.users);
    const [editingSection, setEditingSection] = useState(null);
    const [editedData, setEditedData] = useState({});
    const dispatch = useDispatch();

        const handleEdit = (section) => {
        setEditingSection(section);
        setEditedData(section === 'personal' ? {
            email: selectedUser.email,
            phone: selectedUser.phone,
            birthDate: selectedUser.birthDate,
            gender: selectedUser.gender
        } : section === 'address' ? {
            address: selectedUser.address?.address,
            city: selectedUser.address?.city,
            state: selectedUser.address?.state,
            postalCode: selectedUser.address?.postalCode
        } : section === 'company' ? {
            name: selectedUser.company?.name,
            department: selectedUser.company?.department,
            title: selectedUser.company?.title,
            address: selectedUser.company?.address?.address
        } : {});
    };

    const handleSave = (section) => {
        dispatch(updateUser({ section, data: editedData }));
        setEditingSection(null);
        setEditedData({});
    };

    const handleChange = (field, value) => {
        setEditedData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="h-full overflow-y-auto bg-white p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <HeaderCard
                    selectedUser={selectedUser}
                    editingSection={editingSection}
                    handleEdit={handleEdit}
                    handleSave={handleSave}
                />
                <PersonalInfoCard
                    selectedUser={selectedUser}
                    editingSection={editingSection}
                    handleEdit={handleEdit}
                    handleSave={handleSave}
                    handleChange={handleChange}
                    editedData={editedData}
                />
                <AddressCard
                    selectedUser={selectedUser}
                    editingSection={editingSection}
                    handleEdit={handleEdit}
                    handleSave={handleSave}
                    handleChange={handleChange}
                    editedData={editedData}
                />
                <CompanyCard
                    selectedUser={selectedUser}
                    editingSection={editingSection}
                    handleEdit={handleEdit}
                    handleSave={handleSave}
                    handleChange={handleChange}
                    editedData={editedData}
                />
            </div>
        </div>
    );
}
