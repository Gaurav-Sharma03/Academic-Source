import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUniversity, FaPlusCircle, FaBook, FaGraduationCap, FaClock, FaLayerGroup } from 'react-icons/fa';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
});

const AddDepartmentOrCourse = () => {
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [mode, setMode] = useState('department');

  const [department, setDepartment] = useState({ name: '', courses: [] });
  const [course, setCourse] = useState({ name: '', level: 'UG', duration: '', semesters: '' });
  const [departmentName, setDepartmentName] = useState('');
  const [availableDepartments, setAvailableDepartments] = useState([]);

  useEffect(() => {
    API.get('/api/universities')
      .then((res) => setUniversities(res.data))
      .catch((err) => console.error('Failed to fetch universities:', err));
  }, []);

  useEffect(() => {
    if (!selectedUniversity) return;
    const uni = universities.find((u) => u._id === selectedUniversity);
    if (uni) {
      setAvailableDepartments(uni.departments || []);
    }
  }, [selectedUniversity, universities]);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!selectedUniversity) return alert('⚠️ Please select a university');

    try {
      if (mode === 'department') {
        const trimmedName = department.name.trim();
        if (!trimmedName) return alert('❌ Department name required');

        await API.patch(`/api/universities/${selectedUniversity}/add-department`, {
          department: { name: trimmedName },
        });

        alert('✅ Department added successfully');
        setDepartment({ name: '', courses: [] });
      } else {
        if (!departmentName.trim() || !course.name.trim()) {
          return alert('❌ Department and Course name required');
        }

        await API.patch(`/api/universities/${selectedUniversity}/add-course`, {
          departmentName,
          course,
        });

        alert('✅ Course added successfully');
        setCourse({ name: '', level: 'UG', duration: '', semesters: '' });
      }

      const updated = await API.get('/api/universities');
      setUniversities(updated.data);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-white flex items-center gap-2 mb-6">
        <FaPlusCircle className="text-blue-600" />
        Add Department or Course
      </h2>

      {/* University Selection */}
      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <FaUniversity />
          Select University
        </label>
        <select
          value={selectedUniversity}
          onChange={(e) => setSelectedUniversity(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:text-white"
        >
          <option value="">-- Select University --</option>
          {universities.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      {/* Mode Selection */}
      <div className="flex items-center gap-6 mb-6">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <input
            type="radio"
            value="department"
            checked={mode === 'department'}
            onChange={() => setMode('department')}
          />
          Add Department
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <input
            type="radio"
            value="course"
            checked={mode === 'course'}
            onChange={() => setMode('course')}
          />
          Add Course
        </label>
      </div>

      {/* Form */}
      <form onSubmit={handleAdd} className="space-y-4">
        {mode === 'department' ? (
          <div>
            <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">Department Name</label>
            <input
              type="text"
              placeholder="Enter department name"
              className="w-full border px-3 py-2 rounded dark:bg-gray-800 dark:text-white"
              value={department.name}
              onChange={(e) => setDepartment({ ...department, name: e.target.value })}
              required
            />
          </div>
        ) : (
          <>
            <div>
              <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">Select Department</label>
              <select
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className="w-full border px-3 py-2 rounded dark:bg-gray-800 dark:text-white"
                required
              >
                <option value="">-- Select Department --</option>
                {availableDepartments.map((dep, i) => (
                  <option key={i} value={dep.name}>
                    {dep.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">Course Name</label>
              <input
                type="text"
                placeholder="Enter course name"
                className="w-full border px-3 py-2 rounded dark:bg-gray-800 dark:text-white"
                value={course.name}
                onChange={(e) => setCourse({ ...course, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">Course Level</label>
              <select
                value={course.level}
                onChange={(e) => setCourse({ ...course, level: e.target.value })}
                className="w-full border px-3 py-2 rounded dark:bg-gray-800 dark:text-white"
              >
                <option value="UG">UG</option>
                <option value="PG">PG</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">Duration</label>
              <input
                type="text"
                placeholder="e.g. 4 Years"
                className="w-full border px-3 py-2 rounded dark:bg-gray-800 dark:text-white"
                value={course.duration}
                onChange={(e) => setCourse({ ...course, duration: e.target.value })}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">Semesters</label>
              <input
                type="number"
                placeholder="e.g. 8"
                className="w-full border px-3 py-2 rounded dark:bg-gray-800 dark:text-white"
                value={course.semesters}
                onChange={(e) =>
                  setCourse({ ...course, semesters: parseInt(e.target.value || '0') })
                }
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition"
        >
          {mode === 'department' ? 'Add Department' : 'Add Course'}
        </button>
      </form>
    </div>
  );
};

export default AddDepartmentOrCourse;
