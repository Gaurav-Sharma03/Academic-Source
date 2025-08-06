import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaBook,
  FaUser,
  FaEnvelope,
  FaRupeeSign,
  FaImage,
  FaEdit,
  FaTrash,
  FaSearch,
} from 'react-icons/fa';

// Create reusable Axios instance
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || 'http://localhost:5000',
});

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [form, setForm] = useState({
    name: '',
    seller: '',
    email: '',
    price: '',
    image: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();
    const filtered = books.filter(
      (b) =>
        b.name.toLowerCase().includes(term) ||
        b.seller.toLowerCase().includes(term)
    );
    setFilteredBooks(filtered);
    setCurrentPage(1);
  }, [search, books]);

  const fetchBooks = async () => {
    try {
      const res = await API.get('/api/books');
      setBooks(res.data);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setForm((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('seller', form.seller);
      formData.append('email', form.email);
      formData.append('price', form.price);
      if (imageFile) formData.append('image', imageFile);

      if (editingId) {
        await API.put(`/api/books/${editingId}`, formData);
      } else {
        await API.post('/api/books', formData);
      }

      setForm({ name: '', seller: '', email: '', price: '', image: '' });
      setImageFile(null);
      setEditingId(null);
      fetchBooks();
    } catch (err) {
      console.error('Error saving book:', err);
    }
  };

  const handleEdit = (book) => {
    setForm({
      name: book.name,
      seller: book.seller,
      email: book.email,
      price: book.price,
      image: book.image,
    });
    setImageFile(null);
    setEditingId(book._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await API.delete(`/api/books/${id}`);
        fetchBooks();
      } catch (err) {
        console.error('Error deleting book:', err);
      }
    }
  };

  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 flex items-center justify-center gap-2">
        <FaBook /> Manage Books
      </h2>

      {/* Search */}
      <label className="flex items-center gap-2 mb-6 border border-gray-300 rounded-lg shadow-sm px-3 py-2 bg-white">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by book name or seller"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none"
        />
      </label>

      {/* Book Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-6 mb-10 border"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center gap-2">
            <FaBook />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Book Name"
              className="w-full p-2 border rounded"
              required
            />
          </label>

          <label className="flex items-center gap-2">
            <FaUser />
            <input
              type="text"
              name="seller"
              value={form.seller}
              onChange={handleChange}
              placeholder="Seller Name"
              className="w-full p-2 border rounded"
              required
            />
          </label>

          <label className="flex items-center gap-2">
            <FaEnvelope />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Seller Email"
              className="w-full p-2 border rounded"
              required
            />
          </label>

          <label className="flex items-center gap-2">
            <FaRupeeSign />
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full p-2 border rounded"
              required
            />
          </label>

          <label className="flex items-center gap-2 col-span-1 md:col-span-2">
            <FaImage />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
              required={!editingId}
            />
          </label>
        </div>

        {form.image && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">📸 Image Preview:</p>
            <img
              src={form.image}
              alt="Book Preview"
              className="w-24 h-32 border rounded object-cover"
            />
          </div>
        )}

        <button
          type="submit"
          className="mt-6 bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded shadow"
        >
          {editingId ? 'Update Book' : 'Add Book'}
        </button>
      </form>

      {/* Table Container */}
<div className="overflow-x-auto mt-6">
  <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-md">
    <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-sm uppercase tracking-wide font-semibold">
      <tr>
        <th className="p-4 text-left">Image</th>
        <th className="p-4 text-left">Name</th>
        <th className="p-4 text-left">Seller</th>
        <th className="p-4 text-left">Email</th>
        <th className="p-4 text-left">Price</th>
        <th className="p-4 text-center">Actions</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-100">
      {paginatedBooks.map((book) => (
        <tr key={book._id} className="hover:bg-gray-50 transition duration-150">
          <td className="p-4">
            <img
              src={book.image}
              alt={book.name}
              className="w-16 h-20 object-cover rounded-md border border-gray-300"
            />
          </td>
          <td className="p-4 font-medium text-gray-800">{book.name}</td>
          <td className="p-4 text-gray-700">{book.seller}</td>
          <td className="p-4 text-gray-600">{book.email}</td>
          <td className="p-4 font-semibold text-green-600">₹{book.price}</td>
          <td className="p-4">
            <div className="flex justify-center items-center gap-3">
              <button
                onClick={() => handleEdit(book)}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-sm transition"
                title="Edit"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(book._id)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-sm transition"
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          </td>
        </tr>
      ))}
      {paginatedBooks.length === 0 && (
        <tr>
          <td colSpan="6" className="p-6 text-center text-gray-400 italic">
            No books found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-3">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-1 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-gray-600 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-1 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminBooks;
