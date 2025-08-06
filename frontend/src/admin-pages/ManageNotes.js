import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaTrash,
  FaDownload,
  FaUniversity,
  FaBookOpen,
  FaLayerGroup
} from 'react-icons/fa';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
});

const ManageNotes = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await API.get('/api/resources');
      const filteredNotes = res.data.filter(item => item.type === 'notes');
      setNotes(filteredNotes);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await API.delete(`/api/resources/${id}`);
      alert('✅ Note deleted successfully.');
      fetchNotes();
    } catch (err) {
      console.error('❌ Delete failed:', err);
      alert('❌ Failed to delete note.');
    }
  };

  const handleDownload = (note) => {
    const downloadUrl = `${process.env.REACT_APP_API_BASE}/api/resources/download/${note._id}`;
    window.open(downloadUrl, '_blank', 'noopener,noreferrer');
  };

  const groupedByUniversity = notes.reduce((acc, note) => {
    if (!acc[note.universityName]) acc[note.universityName] = {};
    if (!acc[note.universityName][note.department]) acc[note.universityName][note.department] = [];
    acc[note.universityName][note.department].push(note);
    return acc;
  }, {});

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10 flex items-center justify-center gap-3">
        <FaBookOpen className="text-green-600" />
        Notes by University
      </h2>

      {Object.entries(groupedByUniversity).length === 0 ? (
        <p className="text-gray-500 text-center mt-10 text-lg">
          No notes available.
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

              {Object.entries(departments).map(([department, deptNotes]) => (
                <div
                  key={department}
                  className="mb-8 border-t pt-6 border-gray-300"
                >
                  <div className="text-center mb-4">
  <h4 className="text-2xl font-semibold text-gray-800 flex justify-center items-center gap-2">
    <FaLayerGroup className="text-green-600" />
    {department}
  </h4>
</div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
                    {deptNotes.map((note) => (
                      <div
                        key={note._id}
                        className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-lg transition flex flex-col justify-between"
                      >
                        <div>
                          <h5 className="text-lg font-semibold text-blue-800 mb-1">
                            {note.course}
                          </h5>
                          <p className="text-sm text-gray-600">
                            <strong>Semester:</strong> {note.semester}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Title:</strong> {note.title}
                          </p>
                        </div>

                        <div className="flex justify-between mt-3">
                          <button
                            onClick={() => handleDownload(note)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 text-sm rounded flex items-center gap-2"
                          >
                            <FaDownload /> Download
                          </button>
                          <button
                            onClick={() => handleDelete(note._id)}
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

export default ManageNotes;
