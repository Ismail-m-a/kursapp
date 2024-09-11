import React, { useEffect, useState } from 'react';
import './ProductStyle/BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=webdevelopment')
      .then((response) => response.json())
      .then((data) => setBooks(data.items));
  }, []);

  const handleShow = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleClose = () => {
    setSelectedBook(null);
    setShowModal(false);
  };

  const handleAddBook = (book) => {
    console.log('Added to cart:', book);
  };

  const handleRemoveBook = (book) => {
    console.log('Removed from cart:', book);
  };

  return (
    <div className="container">
      <div className="book-list-header">
        <h1 className="my-4">Book List</h1>
        <p>
          <strong>Kampanj just nu</strong>
          <br />
          Boka både när du vill läsa, samt för att få mer information när du väntar på att köpa.
          <br />
          Säkert att du får rabatt när du köper både när du köper.
          <br />
          Kolla gärna om bokarna har någon nytta för dig!
        </p>
      </div>

      <div className="row">
        {books.map((book) => (
          <div key={book.id} className="col-12 col-md-6 col-lg-4">
            <div className="card">
              <img
                src={book.volumeInfo.imageLinks?.thumbnail || 'placeholder.jpg'}
                alt={book.volumeInfo.title}
                className="card-img-top"
                onClick={() => handleShow(book)}
              />
              <div className="card-body">
                <h5 className="card-title">{book.volumeInfo.title}</h5>
                <p className="card-text">{book.volumeInfo.authors?.join(', ')}</p>
                <p className="card-text">Published: {book.volumeInfo.publishedDate}</p>
                <button className="btn btn-info" onClick={() => handleShow(book)}>
                  More Info
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{selectedBook.volumeInfo.title}</h5>
              <button className="close" onClick={handleClose}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <img
                src={selectedBook.volumeInfo.imageLinks?.thumbnail || 'placeholder.jpg'}
                alt={selectedBook.volumeInfo.title}
                className="img-fluid mb-3"
              />
              <p>{selectedBook.volumeInfo.description}</p>
              <p>Publisher: {selectedBook.volumeInfo.publisher}</p>
              <p>Pages: {selectedBook.volumeInfo.pageCount}</p>
              <p>Published Date: {selectedBook.volumeInfo.publishedDate}</p>
              <p>Categories: {selectedBook.volumeInfo.categories?.join(', ')}</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleClose}>
                Close
              </button>
              <button className="btn btn-success" onClick={() => handleAddBook(selectedBook)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
