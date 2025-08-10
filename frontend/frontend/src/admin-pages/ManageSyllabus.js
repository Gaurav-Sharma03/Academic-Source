import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaTrash,
  FaDownload,
  FaUniversity,
  FaLayerGroup,
  FaListAlt,
} from 'react-icons/fa';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
});

const ManageSyllabus = () => {
  const [syllabus, setSyllabus] = useState([]);

  const fetchSyllabus = async () => {
    try {
      const res = await API.get('/api/resources');
      const filtered = res.data.filter(item => item.type === 'syllabus');
      setSyllabus(filtered);
    } catch (err) {
      console.error('Failed to fetch syllabus:', err);
    }
  };

  useEffect(() => {
    fetchSyllabus();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this syllabus?')) return;
    try {
      await API.delete(`/api/resources/${id}`);
      alert('✅ Syllabus deleted successfully.');
      fetchSyllabus();
    } catch (err) {
      console.error('❌ Delete failed:', err);
      alert('❌ Failed to delete syllabus.');
    }
  };

  const handleDownload = (item) => {
    const downloadUrl = `${process.env.REACT_APP_API_BASE}/api/resources/download/${item._id}`;
    window.open(downloadUrl, '_blank', 'noopener,noreferrer');
  };

  const groupedByUniversity = syllabus.reduce((acc, item) => {
    if (!acc[item.universityName]) acc[item.universityName] = {};
    if (!acc[item.universityName][item.department]) acc[item.universityName][item.department] = [];
    acc[item.universityName][item.department].push(item);
    return acc;
  }, {});

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10 flex items-center justify-center gap-3">
        <FaListAlt className="text-green-600" />
        Syllabus by University
      </h2>

      {Object.entries(groupedByUniversity).length === 0 ? (
        <p className="text-gray-500 text-center mt-10 text-lg">
          No syllabus available.
        </p>
      ) : (
        <div className="space-y-10">
          {Object.entries(groupedByUniversity).map(([universityName, departments]) => (
            <div
              key={universityName}
              className="bg-white border-l-4 border-green-500 shadow-md rounded-lg p-6"
            >
              <div className="text-center mb-4">
                <h3 className="text-3xl font-extrabold text-green-700 flex items-center justify-center gap-2">
                  <FaUniversity className="text-green-600" />
                  {universityName}
                </h3>
              </div>

              {Object.entries(departments).map(([department, deptItems]) => (
                <div key={department} className="mb-8 border-t pt-6 border-gray-300">
                  <div className="text-center mb-4">
                    <h4 className="text-2xl font-semibold text-gray-800 flex justify-center items-center gap-2">
                      <FaLayerGroup className="text-green-600" />
                      {department}
                    </h4>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
                    {deptItems.map((item) => (
                      <div
                        key={item._id}
                        className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-lg transition flex flex-col justify-between"
                      >
                        <div>
                          <h5 className="text-lg font-semibold text-blue-800 mb-1">
                            {item.course}
                          </h5>
                          <p className="text-sm text-gray-600">
                            <strong>Semester:</strong> {item.semester}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Title:</strong> {item.title}
                          </p>
                        </div>

                        <div className="flex justify-between mt-3">
                          <button
                            onClick={() => handleDownload(item)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 text-sm rounded flex items-center gap-2"
                          >
                            <FaDownload /> Download
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 text-sm rounded flex items-center gap-2"
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageSyllabus;
