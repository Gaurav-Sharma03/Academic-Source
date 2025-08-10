import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaTrash,
  FaUniversity,
  FaBookOpen,
  FaLayerGroup,
  FaGraduationCap,
} from 'react-icons/fa';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
});

const Courses = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const res = await API.get('/api/universities');
      setUniversities(res.data);
    } catch (err) {
      console.error('Failed to fetch universities:', err);
    }
  };

  const handleDelete = async (universityId, departmentName, courseName) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await API.patch(`/api/universities/${universityId}/remove-course`, {
        departmentName,
        courseName,
      });
      fetchUniversities(); // Refresh list
    } catch (err) {
      console.error('Failed to delete course:', err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10 flex items-center justify-center gap-3">
        <FaBookOpen className="text-yellow-500" />
        Course Catalog by University
      </h2>

      {universities.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No universities or courses found.
        </p>
      ) : (
        <div className="space-y-10">
          {universities.map((uni) => (
            <div
              key={uni._id}
              className="bg-white border-l-4 border-indigo-600 shadow-md rounded-lg p-6"
            >
              {/* University Heading - Centered */}
              <div className="text-center mb-4">
                <h3 className="text-3xl font-extrabold text-indigo-700 flex items-center justify-center gap-2">
                  <FaUniversity className="text-indigo-600" />
                  {uni.name}
                </h3>
                {uni.location && (
                  <p className="text-gray-500 text-sm mt-1">{uni.location}</p>
                )}
              </div>

              {/* Departments */}
              {uni.departments?.length > 0 ? (
                uni.departments.map((dept, deptIndex) => (
                  <div
                    key={deptIndex}
                    className="mb-10 border-t pt-6 border-gray-300"
                  >
                    {/* Department Heading - Centered */}
                    <div className="text-center mb-4">
                      <h4 className="text-2xl font-semibold text-gray-800 flex justify-center items-center gap-2">
                        <FaLayerGroup className="text-gray-600" />
                        Department of {dept.name}
                      </h4>
                    </div>

                    {/* Courses Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
                      {dept.courses?.length > 0 ? (
                        dept.courses.map((course, cIndex) => (
                          <div
                            key={cIndex}
                            className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-lg transition"
                          >
                            <h5 className="text-lg font-semibold text-blue-800 mb-1 flex items-center gap-2">
                              <FaGraduationCap /> {course.name}
                            </h5>
                            <p className="text-sm text-gray-600 mb-1">
                              Level: <span className="font-medium">{course.level}</span>
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                              Duration: <span className="font-medium">{course.duration} years</span>
                            </p>
                            <p className="text-sm text-gray-600 mb-3">
                              Semesters: <span className="font-medium">{course.semesters}</span>
                            </p>

                            <button
                              onClick={() =>
                                handleDelete(uni._id, dept.name, course.name)
                              }
                              className="inline-flex items-center gap-2 text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded"
                            >
                              <FaTrash /> Delete
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 italic col-span-full text-center">
                          No courses available.
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic text-center mt-4">
                  No departments found in this university.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
