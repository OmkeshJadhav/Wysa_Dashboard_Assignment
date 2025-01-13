// import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateUser } from '../store/userSlice';

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
//         dispatch(updateUser({ section, data: editedData }));
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
//                             <h2 className="text-xl font-semibold">{`${selectedUser.firstName} ${selectedUser.lastName}`}</h2>
//                             <p className="text-gray-600">{selectedUser.company?.title || 'Frontend Developer'}</p>
//                             <p className="text-gray-600">{`${selectedUser.address?.city || 'Los Angeles'}, ${selectedUser.address?.state || 'California'}, ${selectedUser.address?.country || 'USA'}`}</p>
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
//                                 <div className="text-gray-700">{selectedUser.email}</div>
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
//                                 <div className="text-gray-700">{selectedUser.phone}</div>
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
//                                 <div className="text-gray-700">{selectedUser.birthDate}</div>
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
//                                 <div className="text-gray-700">{selectedUser.gender}</div>
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
//                                 <div className="text-gray-700">{selectedUser.address?.address}</div>
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
//                                 <div className="text-gray-700">{selectedUser.address?.city}</div>
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
//                                 <div className="text-gray-700">{selectedUser.address?.state}</div>
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
//                                 <div className="text-gray-700">{selectedUser.address?.postalCode}</div>
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
//                                 <div className="text-gray-700">{selectedUser.company?.name}</div>
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
//                                 <div className="text-gray-700">{selectedUser.company?.department}</div>
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
//                                 <div className="text-gray-700">{selectedUser.company?.title}</div>
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
//                                 <div className="text-gray-700">{selectedUser.company?.address?.address}</div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }