import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaUpload,
  FaUniversity,
  FaBook,
  FaFilePdf,
  FaClipboard,
  FaLayerGroup,
  FaBookReader,
  FaCalendarAlt,
} from 'react-icons/fa';

// API instance using environment variable
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
});

const UploadResources = () => {
  const [universities, setUniversities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [semesterOptions, setSemesterOptions] = useState([]);

  const [formData, setFormData] = useState({
    university: '',
    department: '',
    course: '',
    semester: '',
    type: 'notes',
    title: '',
    file: null,
  });

  useEffect(() => {
    // ✅ Use API instance instead of hardcoded URL
    API.get('/api/universities')
      .then(res => setUniversities(res.data))
      .catch(err => console.error('Failed to fetch universities:', err));
  }, []);

  useEffect(() => {
    const selectedUni = universities.find(u => u._id === formData.university);
    if (selectedUni) {
      setDepartments(selectedUni.departments);
      setFormData(prev => ({ ...prev, department: '', course: '', semester: '' }));
      setCourses([]);
      setSemesterOptions([]);
    }
  }, [formData.university]);

  useEffect(() => {
    const selectedDept = departments.find(d => d.name === formData.department);
    if (selectedDept) {
      setCourses(selectedDept.courses || []);
      setFormData(prev => ({ ...prev, course: '', semester: '' }));
      setSemesterOptions([]);
    }
  }, [formData.department]);

  useEffect(() => {
    const selectedCourse = courses.find(c => c.name === formData.course);
    if (selectedCourse) {
      const total = parseInt(selectedCourse.semesters);
      const semesters = Array.from({ length: total }, (_, i) => i + 1);
      setSemesterOptions(semesters);
    }
  }, [formData.course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'file') data.append(key, value);
    });
    data.append('file', formData.file);

    try {
      // ✅ Use API instance here too
      const res = await API.post('/api/resources/upload', data);
      alert('✅ Uploaded successfully');
      setFormData({
        university: '',
        department: '',
        course: '',
        semester: '',
        type: 'notes',
        title: '',
        file: null,
      });
      setDepartments([]);
      setCourses([]);
      setSemesterOptions([]);
    } catch (err) {
      console.error('Upload error:', err.response?.data || err.message);
      alert('❌ Failed to upload resource');
    }
  };


  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8 flex items-center justify-center gap-2">
        <FaUpload className="text-indigo-600" /> Upload Academic Resource
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* University */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
            <FaUniversity /> University
          </label>
          <select
            name="university"
            value={formData.university}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select University</option>
            {universities.map(u => (
              <option key={u._id} value={u._id}>{u.name}</option>
            ))}
          </select>
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
            <FaLayerGroup /> Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            disabled={!departments.length}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Department</option>
            {departments.map((d, i) => (
              <option key={i} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Course */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
            <FaBookReader /> Course
          </label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
            disabled={!courses.length}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Course</option>
            {courses.map((c, i) => (
              <option key={i} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Semester */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
            <FaCalendarAlt /> Semester
          </label>
          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
            disabled={!semesterOptions.length}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Semester</option>
            {semesterOptions.map(s => (
              <option key={s} value={s}>Semester {s}</option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
            <FaClipboard /> Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="notes">Notes</option>
            <option value="papers">Question Paper</option>
            <option value="syllabus">Syllabus</option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
            <FaBook /> Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Operating System Notes"
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* File */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
            <FaFilePdf /> Upload PDF
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg bg-white"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <FaUpload /> Upload Resource
        </button>
      </form>
    </div>
  );
};

export default UploadResources;
