import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import "../style/booklist.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [userRole, setUserRole] = useState(null);

  // Fetch books from Firestore
  const fetchBooks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'books'));
      const booksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error.message);
    }
  };

  // Fetch user role
  const fetchUserRole = async () => {
    try {
      if (auth.currentUser) {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      }
    } catch (error) {
      console.error("Error fetching user role:", error.message);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchUserRole();
  }, []);

  // Add book to cart
  const handleAddToCart = async (book) => {
    try {
      if (!auth.currentUser) {
        alert("Please log in to add items to cart.");
        return;
      }

      const userId = auth.currentUser.uid;

      await addDoc(collection(db, 'cart'), {
        userId,
        bookId: book.id,
        title: book.title,
        price: book.price,
        quantity: 1,
      });

      alert("Book added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error.message);
      alert("Error adding to cart: " + error.message);
    }
  };

  // Delete book (only for sellers or admins)
  const handleDeleteBook = async (bookId) => {
    try {
      if (!auth.currentUser || !(userRole === "seller" || userRole === "admin")) {
        alert("You are not authorized to delete books.");
        return;
      }

      await deleteDoc(doc(db, "books", bookId));
      alert("Book deleted successfully.");
      fetchBooks(); // Refresh book list
    } catch (error) {
      console.error("Delete book error:", error.message);
      alert("Error deleting book: " + error.message);
    }
  };

  return (
    <div className="book-list">
      <h2>Available Books</h2>
      <div className="books-grid">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <img src={book.imageURL} alt={book.title} />
            <h3>{book.title}</h3>
            <p>By {book.author}</p>
            <p>₹{book.price}</p>
            <div className='card-btns'>
              <button onClick={() => handleAddToCart(book)} className='card-btn'>Add to Cart</button>
              {(userRole === "seller" || userRole === "admin") && (
                <button onClick={() => handleDeleteBook(book.id)} className='card-btn'>Delete</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
