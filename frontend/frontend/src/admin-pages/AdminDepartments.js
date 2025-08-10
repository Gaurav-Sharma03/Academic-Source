import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaEdit,
  FaTrash,
  FaSave,
  FaUniversity,
  FaBuilding
} from 'react-icons/fa';

// ✅ Axios instance
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE
});

const AdminDepartments = () => {
  const [universities, setUniversities] = useState([]);
  const [selectedUniversityId, setSelectedUniversityId] = useState('');
  const [departments, setDepartments] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await API.get('/api/universities');
        setUniversities(res.data);
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };
    fetchUniversities();
  }, []);

  useEffect(() => {
    if (!selectedUniversityId) {
      setDepartments([]);
      return;
    }
    const selected = universities.find((u) => u._id === selectedUniversityId);
    if (selected) {
      setDepartments(selected.departments || []);
    }
  }, [selectedUniversityId, universities]);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewName(departments[index].name);
  };

  const handleUpdate = async (deptId) => {
    try {
      await API.put(`/api/universities/${selectedUniversityId}/departments/${deptId}`, {
        name: newName
      });
      const updated = [...departments];
      updated[editingIndex].name = newName;
      setDepartments(updated);
      setEditingIndex(null);
      alert('✅ Department updated');
    } catch (err) {
      console.error('Update failed:', err);
      alert('❌ Could not update department');
    }
  };

  const handleDelete = async (deptId) => {
    if (!window.confirm('Are you sure you want to delete this department?')) return;
    try {
      await API.delete(`/api/universities/${selectedUniversityId}/departments/${deptId}`);
      const filtered = departments.filter((d) => d._id !== deptId);
      setDepartments(filtered);
      alert('✅ Department deleted');
    } catch (err) {
      console.error('Delete failed:', err);
      alert('❌ Could not delete department');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700 flex items-center justify-center gap-2">
        <FaBuilding /> Manage Departments
      </h2>

      {/* University Dropdown */}
      <div className="mb-8 flex flex-col md:flex-row items-center gap-4">
        <label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <FaUniversity /> Select University:
        </label>
        <select
          value={selectedUniversityId}
          onChange={(e) => setSelectedUniversityId(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full md:w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">-- Choose University --</option>
          {universities.map((uni) => (
            <option key={uni._id} value={uni._id}>
              {uni.name}
            </option>
          ))}
        </select>
      </div>

      {/* Department Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5">
        {departments.map((dept, index) => (
          <div
            key={dept._id}
            className="bg-white border rounded-lg p-4 flex justify-between items-center shadow-md hover:shadow-lg transition-all"
          >
            {editingIndex === index ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border border-gray-300 p-2 flex-grow rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            ) : (
              <p className="text-lg text-gray-800 font-medium flex-grow">{dept.name}</p>
            )}

            <div className="flex gap-2 items-center">
              {editingIndex === index ? (
                <button
                  onClick={() => handleUpdate(dept._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md flex items-center"
                >
                  <FaSave className="mr-1" /> Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-600 hover:text-blue-800 text-xl"
                  title="Edit"
                >
                  <FaEdit />
                </button>
              )}
              <button
                onClick={() => handleDelete(dept._id)}
                className="text-red-600 hover:text-red-800 text-xl"
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Departments */}
      {selectedUniversityId && departments.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No departments found for this university.
        </p>
      )}
    </div>
  );
};

export default AdminDepartments;
