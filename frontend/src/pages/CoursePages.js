import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaUniversity, FaMapMarkerAlt, FaBookOpen, FaClock, FaLayerGroup } from 'react-icons/fa';
import { FaBook } from 'react-icons/fa';

// Axios instance
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
});

const CoursePages = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const res = await API.get(`/api/universities/${id}`);
        setUniversity(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch university details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversity();
  }, [id]);

  if (loading) return <div className="text-center mt-20 text-gray-500 text-lg">Loading university details...</div>;
  if (!university) return <div className="text-center mt-20 text-red-500 text-lg">University not found.</div>;

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      {/* University Header */}
      <div className="max-w-5xl mx-auto text-center mb-14">
        {university.logo && (
          <img src={university.logo} alt="University Logo" className="h-24 mx-auto mb-4 object-contain rounded-xl shadow" />
        )}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 dark:text-yellow-300 flex items-center justify-center gap-3">
          <FaUniversity className="text-yellow-400" /> {university.name}
        </h1>
        {university.location && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
            <FaMapMarkerAlt /> {university.location}
          </p>
        )}
        {university.description && (
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{university.description}</p>
        )}
      </div>

      {/* Departments and Courses */}
      <div className="max-w-7xl mx-auto px-4">
        {university.departments.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No departments found.</p>
        ) : (
          university.departments.map((dept, i) => (
            <div
              key={i}
              className={`mb-12 rounded-xl shadow-md ring-1 ring-blue-200 dark:ring-blue-500 p-6 bg-gradient-to-br ${i % 3 === 0
                  ? 'from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800'
                  : i % 3 === 1
                    ? 'from-green-50 to-green-100 dark:from-green-900 dark:to-green-800'
                    : 'from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800'
                } transition-transform hover:scale-[1.01]`}
            >
              <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 text-center uppercase tracking-wide mb-6 hover:text-blue-500 transition">
                {dept.name}
              </h2>

             

              {dept.courses.length === 0 ? (
                <p className="text-gray-500 text-sm text-center">No courses available in this department.</p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dept.courses.map((course, j) => (
                    <div
                      key={j}
                      className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-blue-700 dark:text-yellow-200 mb-4 text-center">
                          {course.name}
                        </h3>

                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                          <p className="flex items-center gap-2">
                            <FaLayerGroup className="text-blue-500 dark:text-yellow-300" />
                            <span><strong>Level:</strong> {course.level}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <FaClock className="text-blue-500 dark:text-yellow-300" />
                            <span><strong>Duration:</strong> {course.duration} years</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <FaBookOpen className="text-blue-500 dark:text-yellow-300" />
                            <span><strong>Semesters:</strong> {course.semesters}</span>
                          </p>
                        </div>
                      </div>

                      <Link
                        to={`/course/${id}/${encodeURIComponent(dept.name)}/${encodeURIComponent(course.name)}`}
                        className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-md text-center transition-all flex items-center justify-center gap-2"
                      >
                        <FaBook className="text-white text-lg" /> Explore Resources
                      </Link>

                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CoursePages;
