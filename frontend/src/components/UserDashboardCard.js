import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUniversity,
  FaStickyNote,
  FaBookOpen,
  FaFileAlt,
  FaChalkboardTeacher
} from "react-icons/fa";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE
});

const UserDashboardCard = () => {
  const [stats, setStats] = useState({
    totalUniversities: 0,
    totalCourses: 0,
    notesCount: 0,
    syllabusCount: 0,
    papersCount: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/api/user/stats") // ✅ User-specific stats endpoint
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch stats:", err);
        setLoading(false);
      });
  }, []);

  const cards = [
    {
      title: "Total Universities",
      value: stats.totalUniversities,
      icon: <FaUniversity className="text-4xl text-blue-600" />,
      bg: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      title: "Total Courses",
      value: stats.totalCourses,
      icon: <FaChalkboardTeacher className="text-4xl text-orange-500" />,
      bg: "bg-orange-100 dark:bg-orange-900/30"
    },
    {
      title: "Notes Uploaded",
      value: stats.notesCount,
      icon: <FaStickyNote className="text-4xl text-green-600" />,
      bg: "bg-green-100 dark:bg-green-900/30"
    },
    {
      title: "Syllabus Entries",
      value: stats.syllabusCount,
      icon: <FaBookOpen className="text-4xl text-yellow-600" />,
      bg: "bg-yellow-100 dark:bg-yellow-900/30"
    },
    {
      title: "Question Papers",
      value: stats.papersCount,
      icon: <FaFileAlt className="text-4xl text-purple-600" />,
      bg: "bg-purple-100 dark:bg-purple-900/30"
    }
  ];

  return (
    <div className="w-full px-2 sm:px-4 lg:px-8 py-6">
      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          Loading dashboard...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl transition duration-300 ${card.bg}`}
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                {card.title}
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-yellow-300">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboardCard;
