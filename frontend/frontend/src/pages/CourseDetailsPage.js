import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaBook } from 'react-icons/fa'; // React Icon

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE
});

const CourseDetailsPage = () => {
  const { universityId, department, courseName } = useParams();
  const [semesterCount, setSemesterCount] = useState(0);
  const [resources, setResources] = useState({});
  const [loading, setLoading] = useState({});
  const [university, setUniversity] = useState(null);

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const res = await API.get(`/api/universities/${universityId}`);
        const uni = res.data;
        setUniversity(uni);
        const dept = uni.departments.find((d) => d.name === department);
        const course = dept?.courses.find((c) => c.name === courseName);
        if (course) setSemesterCount(course.semesters);
      } catch (err) {
        console.error('Error fetching course:', err);
      }
    };
    fetchUniversity();
  }, [universityId, department, courseName]);

  const fetchSingleResource = async (semester, type) => {
    const key = `${semester}-${type}`;
    setLoading((prev) => ({ ...prev, [key]: true }));

    try {
      const res = await API.get(`/api/resources/${universityId}/${department}/${courseName}/${semester}`);
      const filtered = res.data.filter((item) => item.type === type);

      setResources((prev) => ({
        ...prev,
        [semester]: {
          ...prev[semester],
          [type]: filtered,
        },
      }));
    } catch (err) {
      console.error(`Error fetching ${type} for semester ${semester}:`, err);
    }

    setLoading((prev) => ({ ...prev, [key]: false }));
  };

  const renderLinks = (data, type) => {
    if (!data || data.length === 0)
      return <p className="text-gray-500 italic">No {type} available</p>;

    return (
      <ul className="list-disc pl-5 space-y-1 text-sm">
        {data.map((item, idx) => (
          <li key={idx}>
            <a
              href={`${process.env.REACT_APP_API_BASE}/uploads/resources/${item.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 transition"
            >
              {item.title} {item.year ? `(${item.year})` : ''}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="px-6 py-10 min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      {university && (
        <div className="max-w-5xl mx-auto text-center mb-12">
          {university.logo && (
            <img src={university.logo} alt="Logo" className="h-24 mx-auto mb-6 rounded-full shadow-md" />
          )}
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 dark:text-blue-300 mb-2">
            {university.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{university.description}</p>
          <p className="text-sm text-gray-500 mt-1">{university.location}</p>
        </div>
      )}

      {/* Department and Course Heading */}
      <div className="text-center mb-10">
        <h3 className="text-lg text-blue-700 uppercase font-semibold tracking-wide mb-1">
          {department}
        </h3>
        <h2 className="text-3xl font-semibold inline-flex items-center gap-2 justify-center">
          <FaBook className="text-blue-600" />
          {courseName}
        </h2>
      </div>

      {semesterCount > 0 ? (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(semesterCount)].map((_, i) => {
            const sem = i + 1;
            const semData = resources[sem] || {};

            return (
              <div
                key={sem}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-bold text-blue-700 mb-5 text-center">
                  📘 Semester {sem}
                </h3>

                <div className="flex flex-col gap-4">
                  {['syllabus', 'notes', 'papers'].map((type) => (
                    <div key={type}>
                      <button
                        onClick={() => fetchSingleResource(sem, type)}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                      >
                        {loading[`${sem}-${type}`]
                          ? `Loading ${type}...`
                          : `View ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                      </button>

                      {semData[type] && (
                        <div
                          className={`mt-3 p-3 rounded-md border-l-4 text-sm ${
                            type === 'syllabus'
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                              : type === 'notes'
                              ? 'border-green-500 bg-green-50 dark:bg-green-900'
                              : 'border-red-500 bg-red-50 dark:bg-red-900'
                          }`}
                        >
                          {renderLinks(semData[type], type)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 italic mt-10">No semester data available.</p>
      )}
    </div>
  );
};

export default CourseDetailsPage;
