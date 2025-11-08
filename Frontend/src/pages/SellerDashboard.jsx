import React, { useState } from 'react';
import { db, auth } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import "../style/sell.css"

const SellerDashboard = () => {
  const [book, setBook] = useState({ title: '', author: '', price: '', imageURL: '' });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'books'), {
        ...book,
        price: parseFloat(book.price),
        sellerId: auth.currentUser.uid,
        createdAt: new Date()
      });
      alert('Book added successfully!');
      setBook({ title: '', author: '', price: '', imageURL: '' });
    } catch (err) {
      alert('Failed to add book: ' + err.message);
    }
  };

  return (
    <div className="dashboard seller-dashboard">
      <h2>Seller Dashboard</h2>
      <form onSubmit={handleAddBook} className="book-form">
        <input name="title" placeholder="Book Title" value={book.title} onChange={handleChange} required />
        <input name="author" placeholder="Author" value={book.author} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={book.price} onChange={handleChange} required />
        <input name="imageURL" placeholder="Image URL" value={book.imageURL} onChange={handleChange} required />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default SellerDashboard;
