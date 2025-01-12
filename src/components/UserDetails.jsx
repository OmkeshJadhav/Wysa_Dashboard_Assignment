// import {useState} from 'react'
// import { useSelector, useDispatch } from 'react-redux';

// export default function UserDetails() {
//     const { selectedUser } = useSelector((state) => state.users);
//     const [editingSection, setEditingSection] = useState(null);
//     const [editedData, setEditedData] = useState({});
//     const dispatch = useDispatch();

//     const handleEdit = (section) => {
//         setEditingSection(section);
//         setEditedData(section === 'personal' ? {
//             email: selectedUser.email,
//             phone: selectedUser.phone,
//             birthDate: selectedUser.birthDate,
//             gender: selectedUser.gender
//         } : section === 'address' ? {
//             address: selectedUser.address?.address,
//             city: selectedUser.address?.city,
//             state: selectedUser.address?.state,
//             postalCode: selectedUser.address?.postalCode
//         } : section === 'company' ? {
//             name: selectedUser.company?.name,
//             department: selectedUser.company?.department,
//             title: selectedUser.company?.title,
//             address: selectedUser.company?.address?.address
//         } : {});
//     };

//     const handleSave = (section) => {
//         // Here you would typically dispatch an action to update the user data
//         // dispatch(updateUserData({ section, data: editedData }));
//         setEditingSection(null);
//         setEditedData({});
//     };

//     const handleChange = (field, value) => {
//         setEditedData(prev => ({ ...prev, [field]: value }));
//     };
    
//     const EditButton = ({ section }) => (
//         <button 
//             onClick={() => editingSection === section ? handleSave(section) : handleEdit(section)}
//             className="flex items-center gap-1 text-blue-600 px-2 py-1 text-sm border border-blue-600 rounded hover:bg-blue-50"
//         >
//             {editingSection === section ? 'Save' : (
//                 <>
//                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                     </svg>
//                     Edit
//                 </>
//             )}
//         </button>
//     );

//     const EditableField = ({ label, value, field, section }) => (
//         <div>
//             <p className="text-sm text-gray-500 mb-1">{label}</p>
//             {editingSection === section ? (
//                 <input
//                     type="text"
//                     value={editedData[field] || ''}
//                     onChange={(e) => handleChange(field, e.target.value)}
//                     className="w-full p-1 border border-gray-300 rounded text-gray-700"
//                 />
//             ) : (
//                 <p className="text-gray-700">{value}</p>
//             )}
//         </div>
//     );

//     return (
//         <div className="space-y-6 scroll">

//             {/* User Header Card */}
//             <div className="bg-white p-6 border border-gray-200 rounded-lg shadow">
//                 <div className="flex justify-between items-start">
//                     <div>
//                         <h2 className="text-xl font-semibold mb-4">{`${selectedUser.firstName} ${selectedUser.lastName}`}</h2>
//                         <p className="text-gray-600 font-semibold">{selectedUser.company?.title || 'Frontend Developer'}</p>
//                         <p className="text-gray-600 font-semibold">{`${selectedUser.address?.city}, ${selectedUser.address?.state}, ${selectedUser.address?.country}`}</p>
//                     </div>
//                     <EditButton />
//                 </div>
//             </div>

//             {/* Personal Information Card */}
//             <div className="bg-white p-6 border border-gray-200 rounded-lg shadow">
//                 <div className="flex justify-between items-start mb-4">
//                     <h3 className="text-lg font-semibold">Personal Information</h3>
//                     <EditButton />
//                 </div>        

//                 <div className="grid grid-cols-2 gap-4">
//                     <div>
//                         <p className="text-sm text-gray-500 mb-1">Email</p>
//                         <p>{selectedUser.email}</p>
//                     </div>
//                     <div>
//                         <p className="text-sm text-gray-500 mb-1">Phone</p>
//                         <p>{selectedUser.phone}</p>
//                     </div>
//                     <div>
//                         <p className="text-sm text-gray-500 mb-1">Birthday</p>
//                         <p>{selectedUser.birthDate}</p>
//                     </div>
//                     <div>
//                         <p className="text-sm text-gray-500 mb-1">Gender</p>
//                         <p>{selectedUser.gender}</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Address Card */}
//             <div className="bg-white p-6 border border-gray-200 rounded-lg shadow">
//                 <div className="flex justify-between items-start mb-4">
//                     <h3 className="text-lg font-semibold">Address</h3>
//                     <EditButton />
//                 </div>
//                 <div className="grid grid-cols-2 gap-6">
//                     <div>
//                         <p className="text-sm text-gray-500 mb-1">Street</p>
//                         <p>{selectedUser.address?.address}</p>
//                     </div>
//                     <div>
//                         <p className="text-sm text-gray-500 mb-1">City</p>
//                         <p>{selectedUser.address?.city}</p>
//                     </div>
//                     <div>
//                         <p className="text-sm text-gray-500 mb-1">State</p>
//                         <p>{selectedUser.address?.state}</p>
//                     </div>
//                     <div>
//                         <p className="text-sm text-gray-500 mb-1">Postal Code</p>
//                         <p>{selectedUser.address?.postalCode}</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Company Card */}
//             <div className="bg-white p-6 border border-gray-200 rounded-lg shadow">
//                 <div className="flex justify-between items-start mb-4">
//                     <h3 className="text-lg font-semibold">Company</h3>
//                     <EditButton />
//                 </div>
//                 <div className="grid grid-cols-2 gap-6">
//                     <div>
//                         <p className="text-sm text-gray-500 mb-1">Company Name</p>
//                         <p>{selectedUser.company?.name}</p>
//                     </div>
//                     <div>
//                         <p className="text-sm text-gray-500 mb-1">Department</p>
//                         <p>{selectedUser.company?.department}</p>
//                     </div>
//                     <div>
//                         <p className="text-sm text-gray-500 mb-1">Position</p>
//                         <p>{selectedUser.company?.title}</p>
//                     </div>
//                     <div>
//                         <p className="text-sm text-gray-500 mb-1">Address</p>
//                         <p>{selectedUser.company?.address?.address}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }



import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

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
        // Here you would typically dispatch an action to update the user data
        // dispatch(updateUserData({ section, data: editedData }));
        setEditingSection(null);
        setEditedData({});
    };

    const handleChange = (field, value) => {
        setEditedData(prev => ({ ...prev, [field]: value }));
    };

    const EditButton = ({ section }) => (
        <button 
            onClick={() => editingSection === section ? handleSave(section) : handleEdit(section)}
            className="flex items-center gap-1 text-blue-600 px-2 py-1 text-sm border border-blue-600 rounded hover:bg-blue-50"
        >
            {editingSection === section ? 'Save' : (
                <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit
                </>
            )}
        </button>
    );

    return (
        <div className="h-full overflow-y-auto bg-white p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* User Header Card */}
                <div className="p-6 border border-gray-200 rounded-lg bg-white">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-xl font-semibold">{`${selectedUser.firstName} ${selectedUser.lastName}`}</h2>
                            <p className="text-gray-600">{selectedUser.company?.title || 'Frontend Developer'}</p>
                            <p className="text-gray-600">{`${selectedUser.address?.city || 'Los Angeles'}, ${selectedUser.address?.state || 'California'}, ${selectedUser.address?.country || 'USA'}`}</p>
                        </div>
                        <EditButton section="header" />
                    </div>
                </div>

                {/* Personal Information Card */}
                <div className="p-6 border border-gray-200 rounded-lg bg-white">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold">Personal Information</h3>
                        <EditButton section="personal" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Email</div>
                            {editingSection === 'personal' ? (
                                <input
                                    type="text"
                                    value={editedData.email || ''}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded text-gray-700"
                                />
                            ) : (
                                <div className="text-gray-700">{selectedUser.email}</div>
                            )}
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Phone</div>
                            {editingSection === 'personal' ? (
                                <input
                                    type="text"
                                    value={editedData.phone || ''}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded text-gray-700"
                                />
                            ) : (
                                <div className="text-gray-700">{selectedUser.phone}</div>
                            )}
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Birthday</div>
                            {editingSection === 'personal' ? (
                                <input
                                    type="text"
                                    value={editedData.birthDate || ''}
                                    onChange={(e) => handleChange('birthDate', e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded text-gray-700"
                                />
                            ) : (
                                <div className="text-gray-700">{selectedUser.birthDate}</div>
                            )}
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Gender</div>
                            {editingSection === 'personal' ? (
                                <input
                                    type="text"
                                    value={editedData.gender || ''}
                                    onChange={(e) => handleChange('gender', e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded text-gray-700"
                                />
                            ) : (
                                <div className="text-gray-700">{selectedUser.gender}</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Address Card */}
                <div className="p-6 border border-gray-200 rounded-lg bg-white">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold">Address</h3>
                        <EditButton section="address" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Street</div>
                            {editingSection === 'address' ? (
                                <input
                                    type="text"
                                    value={editedData.address || ''}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded text-gray-700"
                                />
                            ) : (
                                <div className="text-gray-700">{selectedUser.address?.address}</div>
                            )}
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 mb-1">City</div>
                            {editingSection === 'address' ? (
                                <input
                                    type="text"
                                    value={editedData.city || ''}
                                    onChange={(e) => handleChange('city', e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded text-gray-700"
                                />
                            ) : (
                                <div className="text-gray-700">{selectedUser.address?.city}</div>
                            )}
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 mb-1">State</div>
                            {editingSection === 'address' ? (
                                <input
                                    type="text"
                                    value={editedData.state || ''}
                                    onChange={(e) => handleChange('state', e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded text-gray-700"
                                />
                            ) : (
                                <div className="text-gray-700">{selectedUser.address?.state}</div>
                            )}
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Postal Code</div>
                            {editingSection === 'address' ? (
                                <input
                                    type="text"
                                    value={editedData.postalCode || ''}
                                    onChange={(e) => handleChange('postalCode', e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded text-gray-700"
                                />
                            ) : (
                                <div className="text-gray-700">{selectedUser.address?.postalCode}</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Company Card */}
                <div className="p-6 border border-gray-200 rounded-lg bg-white">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold">Company</h3>
                        <EditButton section="company" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Company Name</div>
                            {editingSection === 'company' ? (
                                <input
                                    type="text"
                                    value={editedData.name || ''}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded text-gray-700"
                                />
                            ) : (
                                <div className="text-gray-700">{selectedUser.company?.name}</div>
                            )}
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Department</div>
                            {editingSection === 'company' ? (
                                <input
                                    type="text"
                                    value={editedData.department || ''}
                                    onChange={(e) => handleChange('department', e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded text-gray-700"
                                />
                            ) : (
                                <div className="text-gray-700">{selectedUser.company?.department}</div>
                            )}
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Position</div>
                            {editingSection === 'company' ? (
                                <input
                                    type="text"
                                    value={editedData.title || ''}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded text-gray-700"
                                />
                            ) : (
                                <div className="text-gray-700">{selectedUser.company?.title}</div>
                            )}
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Address</div>
                            {editingSection === 'company' ? (
                                <input
                                    type="text"
                                    value={editedData.address || ''}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded text-gray-700"
                                />
                            ) : (
                                <div className="text-gray-700">{selectedUser.company?.address?.address}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}








// import { useSelector, useDispatch } from 'react-redux';
// import { useState } from 'react';

// export default function UserDetails() {
//     const { selectedUser } = useSelector((state) => state.users);
//     const [editingSection, setEditingSection] = useState(null);
//     const [editedData, setEditedData] = useState({});
//     // Add local state to store updated values
//     const [localUserData, setLocalUserData] = useState(selectedUser);
//     const dispatch = useDispatch();

//     const handleEdit = (section) => {
//         setEditingSection(section);
//         setEditedData(section === 'personal' ? {
//             email: localUserData.email,
//             phone: localUserData.phone,
//             birthDate: localUserData.birthDate,
//             gender: localUserData.gender
//         } : section === 'address' ? {
//             address: localUserData.address?.address,
//             city: localUserData.address?.city,
//             state: localUserData.address?.state,
//             postalCode: localUserData.address?.postalCode
//         } : section === 'company' ? {
//             name: localUserData.company?.name,
//             department: localUserData.company?.department,
//             title: localUserData.company?.title,
//             address: localUserData.company?.address?.address
//         } : {});
//     };

//     const handleSave = async (section) => {
//         // Update local state immediately for optimistic update
//         setLocalUserData(prevData => {
//             if (section === 'personal') {
//                 return { ...prevData, ...editedData };
//             } else if (section === 'address') {
//                 return {
//                     ...prevData,
//                     address: { ...(prevData.address || {}), ...editedData }
//                 };
//             } else if (section === 'company') {
//                 return {
//                     ...prevData,
//                     company: {
//                         ...(prevData.company || {}),
//                         ...editedData,
//                         address: {
//                             ...(prevData.company?.address || {}),
//                             address: editedData.address
//                         }
//                     }
//                 };
//             }
//             return prevData;
//         });

//         try {
//             // Attempt to update on the server
//             // await dispatch(updateUserData({ section, data: editedData }));
//         } catch (error) {
//             // If the API call fails, you might want to show an error message
//             console.error('Failed to save changes:', error);
//             // Optionally revert the local state if you want
//             // setLocalUserData(selectedUser);
//         }

//         setEditingSection(null);
//         setEditedData({});
//     };

//     const handleChange = (field, value) => {
//         setEditedData(prev => ({ ...prev, [field]: value }));
//     };

//     const EditButton = ({ section }) => (
//         <button 
//             onClick={() => editingSection === section ? handleSave(section) : handleEdit(section)}
//             className="flex items-center gap-1 text-blue-600 px-2 py-1 text-sm border border-blue-600 rounded hover:bg-blue-50"
//         >
//             {editingSection === section ? 'Save' : (
//                 <>
//                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                     </svg>
//                     Edit
//                 </>
//             )}
//         </button>
//     );

//     return (
//         <div className="h-full overflow-y-auto bg-white p-6">
//             <div className="max-w-4xl mx-auto space-y-6">
//                 {/* User Header Card */}
//                 <div className="p-6 border border-gray-200 rounded-lg bg-white">
//                     <div className="flex justify-between items-start">
//                         <div>
//                             <h2 className="text-xl font-semibold">{`${localUserData.firstName} ${localUserData.lastName}`}</h2>
//                             <p className="text-gray-600">{localUserData.company?.title || 'Frontend Developer'}</p>
//                             <p className="text-gray-600">{`${localUserData.address?.city || 'Los Angeles'}, ${localUserData.address?.state || 'California'}, ${localUserData.address?.country || 'USA'}`}</p>
//                         </div>
//                         <EditButton section="header" />
//                     </div>
//                 </div>

//                 {/* Personal Information Card */}
//                 <div className="p-6 border border-gray-200 rounded-lg bg-white">
//                     <div className="flex justify-between items-start mb-4">
//                         <h3 className="text-lg font-semibold">Personal Information</h3>
//                         <EditButton section="personal" />
//                     </div>
//                     <div className="grid grid-cols-2 gap-6">
//                         <div>
//                             <div className="text-sm text-gray-500 mb-1">Email</div>
//                             {editingSection === 'personal' ? (
//                                 <input
//                                     type="text"
//                                     value={editedData.email || ''}
//                                     onChange={(e) => handleChange('email', e.target.value)}
//                                     className="w-full p-1 border border-gray-300 rounded text-gray-700"
//                                 />
//                             ) : (
//                                 <div className="text-gray-700">{localUserData.email}</div>
//                             )}
//                         </div>
//                         <div>
//                             <div className="text-sm text-gray-500 mb-1">Phone</div>
//                             {editingSection === 'personal' ? (
//                                 <input
//                                     type="text"
//                                     value={editedData.phone || ''}
//                                     onChange={(e) => handleChange('phone', e.target.value)}
//                                     className="w-full p-1 border border-gray-300 rounded text-gray-700"
//                                 />
//                             ) : (
//                                 <div className="text-gray-700">{localUserData.phone}</div>
//                             )}
//                         </div>
//                         <div>
//                             <div className="text-sm text-gray-500 mb-1">Birthday</div>
//                             {editingSection === 'personal' ? (
//                                 <input
//                                     type="text"
//                                     value={editedData.birthDate || ''}
//                                     onChange={(e) => handleChange('birthDate', e.target.value)}
//                                     className="w-full p-1 border border-gray-300 rounded text-gray-700"
//                                 />
//                             ) : (
//                                 <div className="text-gray-700">{localUserData.birthDate}</div>
//                             )}
//                         </div>
//                         <div>
//                             <div className="text-sm text-gray-500 mb-1">Gender</div>
//                             {editingSection === 'personal' ? (
//                                 <input
//                                     type="text"
//                                     value={editedData.gender || ''}
//                                     onChange={(e) => handleChange('gender', e.target.value)}
//                                     className="w-full p-1 border border-gray-300 rounded text-gray-700"
//                                 />
//                             ) : (
//                                 <div className="text-gray-700">{localUserData.gender}</div>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Address Card */}
//                 <div className="p-6 border border-gray-200 rounded-lg bg-white">
//                     <div className="flex justify-between items-start mb-4">
//                         <h3 className="text-lg font-semibold">Address</h3>
//                         <EditButton section="address" />
//                     </div>
//                     <div className="grid grid-cols-2 gap-6">
//                         <div>
//                             <div className="text-sm text-gray-500 mb-1">Street</div>
//                             {editingSection === 'address' ? (
//                                 <input
//                                     type="text"
//                                     value={editedData.address || ''}
//                                     onChange={(e) => handleChange('address', e.target.value)}
//                                     className="w-full p-1 border border-gray-300 rounded text-gray-700"
//                                 />
//                             ) : (
//                                 <div className="text-gray-700">{localUserData.address?.address}</div>
//                             )}
//                         </div>
//                         <div>
//                             <div className="text-sm text-gray-500 mb-1">City</div>
//                             {editingSection === 'address' ? (
//                                 <input
//                                     type="text"
//                                     value={editedData.city || ''}
//                                     onChange={(e) => handleChange('city', e.target.value)}
//                                     className="w-full p-1 border border-gray-300 rounded text-gray-700"
//                                 />
//                             ) : (
//                                 <div className="text-gray-700">{localUserData.address?.city}</div>
//                             )}
//                         </div>
//                         <div>
//                             <div className="text-sm text-gray-500 mb-1">State</div>
//                             {editingSection === 'address' ? (
//                                 <input
//                                     type="text"
//                                     value={editedData.state || ''}
//                                     onChange={(e) => handleChange('state', e.target.value)}
//                                     className="w-full p-1 border border-gray-300 rounded text-gray-700"
//                                 />
//                             ) : (
//                                 <div className="text-gray-700">{localUserData.address?.state}</div>
//                             )}
//                         </div>
//                         <div>
//                             <div className="text-sm text-gray-500 mb-1">Postal Code</div>
//                             {editingSection === 'address' ? (
//                                 <input
//                                     type="text"
//                                     value={editedData.postalCode || ''}
//                                     onChange={(e) => handleChange('postalCode', e.target.value)}
//                                     className="w-full p-1 border border-gray-300 rounded text-gray-700"
//                                 />
//                             ) : (
//                                 <div className="text-gray-700">{localUserData.address?.postalCode}</div>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Company Card */}
//                 <div className="p-6 border border-gray-200 rounded-lg bg-white">
//                     <div className="flex justify-between items-start mb-4">
//                         <h3 className="text-lg font-semibold">Company</h3>
//                         <EditButton section="company" />
//                     </div>
//                     <div className="grid grid-cols-2 gap-6">
//                         <div>
//                             <div className="text-sm text-gray-500 mb-1">Company Name</div>
//                             {editingSection === 'company' ? (
//                                 <input
//                                     type="text"
//                                     value={editedData.name || ''}
//                                     onChange={(e) => handleChange('name', e.target.value)}
//                                     className="w-full p-1 border border-gray-300 rounded text-gray-700"
//                                 />
//                             ) : (
//                                 <div className="text-gray-700">{localUserData.company?.name}</div>
//                             )}
//                         </div>
//                         <div>
//                             <div className="text-sm text-gray-500 mb-1">Department</div>
//                             {editingSection === 'company' ? (
//                                 <input
//                                     type="text"
//                                     value={editedData.department || ''}
//                                     onChange={(e) => handleChange('department', e.target.value)}
//                                     className="w-full p-1 border border-gray-300 rounded text-gray-700"
//                                 />
//                             ) : (
//                                 <div className="text-gray-700">{localUserData.company?.department}</div>
//                             )}
//                         </div>
//                         <div>
//                             <div className="text-sm text-gray-500 mb-1">Position</div>
//                             {editingSection === 'company' ? (
//                                 <input
//                                     type="text"
//                                     value={editedData.title || ''}
//                                     onChange={(e) => handleChange('title', e.target.value)}
//                                     className="w-full p-1 border border-gray-300 rounded text-gray-700"
//                                 />
//                             ) : (
//                                 <div className="text-gray-700">{localUserData.company?.title}</div>
//                             )}
//                         </div>
//                         <div>
//                             <div className="text-sm text-gray-500 mb-1">Address</div>
//                             {editingSection === 'company' ? (
//                                 <input
//                                     type="text"
//                                     value={editedData.address || ''}
//                                     onChange={(e) => handleChange('address', e.target.value)}
//                                     className="w-full p-1 border border-gray-300 rounded text-gray-700"
//                                 />
//                             ) : (
//                                 <div className="text-gray-700">{localUserData.company?.address?.address}</div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }