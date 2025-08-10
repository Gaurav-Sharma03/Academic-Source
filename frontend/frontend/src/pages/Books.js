import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaEnvelope,
  FaBook,
  FaUser,
  FaTag,
  FaImage,
  FaMoneyBillWave,
  FaClock,
} from 'react-icons/fa';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
});

const Books = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  const fetchBooks = async () => {
    try {
      const res = await API.get('/api/books');
      const booksWithState = res.data.map((book) => ({
        ...book,
        showEmail: false,
      }));
      setBooks(booksWithState);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-700 dark:text-yellow-300 flex justify-center items-center gap-3">
        <FaBook className="text-blue-600 dark:text-yellow-400" />
        Academic Source Available Books
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {currentBooks.map((book) => (
          <div
            key={book._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition hover:shadow-xl border dark:border-gray-700"
          >
            {/* Image */}
            <div className="w-full h-48 overflow-hidden flex items-center justify-center bg-white dark:bg-gray-700">
              {book.image ? (
                <img
                  src={`${process.env.REACT_APP_API_BASE}${book.image}`}
                  alt={book.name}
                  className="h-full w-auto object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
              ) : (
                <FaImage className="text-gray-400 text-5xl" />
              )}
            </div>

            {/* Book Details */}
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                <FaTag /> {book.name}
              </h2>

              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <p className="flex items-center gap-2">
                  <FaUser /> <strong>Seller:</strong> {book.seller}
                </p>
                <p className="flex items-center gap-2">
                  <FaMoneyBillWave /> <strong>Price:</strong> ₹{book.price}
                </p>
                <p className="flex items-center gap-2">
                  <FaClock /> <strong>Uploaded:</strong>{' '}
                  {new Date(book.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Contact Seller Button */}
              {book.email ? (
                <>
                  <button
                    onClick={() =>
                      setBooks((prevBooks) =>
                        prevBooks.map((b) =>
                          b._id === book._id
                            ? { ...b, showEmail: !b.showEmail }
                            : b
                        )
                      )
                    }
                    className="inline-flex items-center gap-2 mt-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition"
                  >
                    <FaEnvelope /> Contact Seller
                  </button>
                  {book.showEmail && (
                    <p className="mt-2 text-blue-700 dark:text-blue-300 text-sm font-medium">
                      {book.email}
                    </p>
                  )}
                </>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center gap-2 mt-2 text-white bg-gray-400 px-4 py-2 rounded-lg text-sm cursor-not-allowed"
                >
                  <FaEnvelope /> Email Not Available
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center items-center gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === idx + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            {idx + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Books;
