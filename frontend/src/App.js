import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', category: '', publishedYear: '', availableCopies: '' });

  const fetchBooks = async () => {
    const res = await axios.get('http://localhost:5000/api/books');
    setBooks(res.data);
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/books', form);
    setForm({ title: '', author: '', category: '', publishedYear: '', availableCopies: '' });
    fetchBooks();
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:5000/api/books/${id}`);
    fetchBooks();
  };

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h2>Library Management System</h2>
      
      {/* ADD BOOK FORM (CREATE) */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'grid', gap: '10px' }}>
        <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <input placeholder="Author" value={form.author} onChange={e => setForm({...form, author: e.target.value})} required />
        <input placeholder="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
        <input type="number" placeholder="Year" value={form.publishedYear} onChange={e => setForm({...form, publishedYear: e.target.value})} />
        <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', padding: '10px', border: 'none' }}>Add Book</button>
      </form>

      {/* BOOK TABLE (READ & DELETE) */}
      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f4f4f4' }}>
            <th>Title</th><th>Author</th><th>Year</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publishedYear}</td>
              <td><button onClick={() => deleteBook(book._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;