import React, { useState, useEffect } from 'react';
import {
  FaUniversity,
  FaPlus,
  FaTrash,
  FaGlobe,
  FaChalkboardTeacher,
  FaBook,
  FaTimes,
} from 'react-icons/fa';
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
});

const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [newUniversity, setNewUniversity] = useState({
    name: '',
    shortName: '',
    description: '',
    location: '',
    website: '',
    logo: '',
    departments: [
      {
        name: '',
        courses: [
          { name: '', level: '', duration: '', semesters: '' },
        ],
      },
    ],
  });

  const fetchUniversities = async () => {
    try {
      const res = await API.get('/api/universities');
      setUniversities(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch universities:', err);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  const handleChange = (e) => {
    setNewUniversity({ ...newUniversity, [e.target.name]: e.target.value });
  };

  const handleDeptChange = (index, e) => {
    const updated = [...newUniversity.departments];
    updated[index][e.target.name] = e.target.value;
    setNewUniversity({ ...newUniversity, departments: updated });
  };

  const handleCourseChange = (deptIndex, courseIndex, e) => {
    const updated = [...newUniversity.departments];
    updated[deptIndex].courses[courseIndex][e.target.name] = e.target.value;
    setNewUniversity({ ...newUniversity, departments: updated });
  };

  const addDepartment = () => {
    setNewUniversity({
      ...newUniversity,
      departments: [
        ...newUniversity.departments,
        {
          name: '',
          courses: [
            { name: '', level: '', duration: '', semesters: '' },
          ],
        },
      ],
    });
  };

  const addCourse = (deptIndex) => {
    const updated = [...newUniversity.departments];
    updated[deptIndex].courses.push({
      name: '',
      level: '',
      duration: '',
      semesters: '',
    });
    setNewUniversity({ ...newUniversity, departments: updated });
  };

  const handleAdd = async () => {
    const { name, shortName, description, location, website } = newUniversity;

    if (!name || !shortName || !description || !location || !website) {
      return alert('⚠️ Please fill in all required fields.');
    }

    try {
      const res = await API.post('/api/universities', newUniversity);
      if (res.status === 201 || res.status === 200) {
        setUniversities([...universities, res.data]);
        setNewUniversity({
          name: '',
          shortName: '',
          description: '',
          location: '',
          website: '',
          logo: '',
          departments: [
            {
              name: '',
              courses: [
                { name: '', level: '', duration: '', semesters: '' },
              ],
            },
          ],
        });
        setShowForm(false);
      } else {
        alert('❌ Failed to add university');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Server error while adding university');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this university?')) return;

    try {
      const res = await API.delete(`/api/universities/${id}`);
      if (res.status === 200) {
        setUniversities(universities.filter((u) => u._id !== id));
      } else {
        alert('❌ Failed to delete university');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Server error while deleting university');
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Heading */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-blue-800 flex items-center gap-3">
          <FaUniversity className="text-yellow-500" />
          Universities Dashboard
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white shadow transition 
            ${showForm ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? 'Cancel' : 'Add University'}
        </button>
      </div>

      {/* Add University Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-md space-y-6 border border-gray-200 mb-10">
          <h3 className="text-xl font-semibold text-gray-800">University Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input name="name" placeholder="University Name" value={newUniversity.name} onChange={handleChange} className="border px-4 py-2 rounded" />
            <input name="shortName" placeholder="Short Name (e.g. SPU)" value={newUniversity.shortName} onChange={handleChange} className="border px-4 py-2 rounded" />
            <input name="location" placeholder="Location" value={newUniversity.location} onChange={handleChange} className="border px-4 py-2 rounded" />
            <input name="website" placeholder="Website" value={newUniversity.website} onChange={handleChange} className="border px-4 py-2 rounded" />
            <input name="logo" placeholder="Logo URL" value={newUniversity.logo} onChange={handleChange} className="border px-4 py-2 rounded" />
          </div>
          <textarea name="description" placeholder="Description" value={newUniversity.description} onChange={handleChange} className="w-full border px-4 py-2 rounded" />

          {/* Departments and Courses */}
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FaChalkboardTeacher /> Departments & Courses
            </h4>
            {newUniversity.departments.map((dept, deptIndex) => (
              <div key={deptIndex} className="p-4 border rounded bg-gray-50 mt-4 space-y-2">
                <input
                  type="text"
                  name="name"
                  placeholder={`Department ${deptIndex + 1} Name`}
                  value={dept.name}
                  onChange={(e) => handleDeptChange(deptIndex, e)}
                  className="w-full border px-3 py-2 rounded"
                />
                {dept.courses.map((course, courseIndex) => (
                  <div key={courseIndex} className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <input name="name" placeholder="Course Name" value={course.name} onChange={(e) => handleCourseChange(deptIndex, courseIndex, e)} className="border px-3 py-2 rounded" />
                    <select name="level" value={course.level} onChange={(e) => handleCourseChange(deptIndex, courseIndex, e)} className="border px-3 py-2 rounded">
                      <option value="">Level</option>
                      <option value="UG">UG</option>
                      <option value="PG">PG</option>
                      <option value="PhD">PhD</option>
                    </select>
                    <input name="duration" placeholder="Duration" value={course.duration} onChange={(e) => handleCourseChange(deptIndex, courseIndex, e)} className="border px-3 py-2 rounded" />
                    <input name="semesters" type="number" placeholder="Semesters" value={course.semesters} onChange={(e) => handleCourseChange(deptIndex, courseIndex, e)} className="border px-3 py-2 rounded" />
                  </div>
                ))}
                <button type="button" onClick={() => addCourse(deptIndex)} className="text-sm text-blue-600 mt-2 hover:underline">
                  + Add Course
                </button>
              </div>
            ))}
            <button type="button" onClick={addDepartment} className="text-sm text-green-600 mt-2 hover:underline">
              + Add Department
            </button>
          </div>

          <div className="text-right">
            <button onClick={handleAdd} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-semibold shadow">
              Submit University
            </button>
          </div>
        </div>
      )}

      {/* Universities List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {universities.map((uni) => (
          <div key={uni._id} className="bg-white p-5 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-800 mb-1 flex items-center gap-2">
              <FaUniversity className="text-indigo-500" />
              {uni.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{uni.description}</p>
            <div className="text-sm text-gray-500 mb-2">📍 {uni.location}</div>
            <a href={uni.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm mb-2">
              <FaGlobe /> Visit Website
            </a>
            <div className="flex justify-end">
              <button
                onClick={() => handleDelete(uni._id)}
                className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 text-sm flex items-center gap-1"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Universities;
