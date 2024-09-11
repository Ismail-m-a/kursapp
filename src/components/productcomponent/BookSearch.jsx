import React, { useEffect, useState, useRef } from 'react';
import './ProductStyle/BookSearch.css';

const BookSearch = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const inputRef = useRef(null);

  const searchBooks = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }

    setLoading(true);
    setNoResult(false);

    fetch(`https://openlibrary.org/search.json?q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.docs.length > 0) {
          setBooks(data.docs);
        } else {
          setBooks([]);
          setNoResult(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setNoResult(true);
      });
  };

  const handleShowModal = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setShowModal(false);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="booksearch-container">
      <div className="booksearch-title">
        <h2>Book Tips</h2>
        <p>Welcome to Book Tips! Discover books you'll love and explore exciting titles.</p>
        <ul>
          <li>Use the search bar to find books that match your interests.</li>
          <li>Click a book cover for more details.</li>
        </ul>
      </div>

      <form onSubmit={searchBooks} className="booksearch-form">
        <input
          type="text"
          placeholder="Search for books"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!e.target.value) setBooks([]);
          }}
          ref={inputRef}
          className="booksearch-input"
        />
        <button type="submit" className="booksearch-submit-btn">
          Search
        </button>
      </form>

      {loading && <div className="booksearch-loading-spinner">Loading...</div>}
      {noResult && <div className="booksearch-no-results">No books found.</div>}

      <div className="booksearch-grid">
        {books.map((book) => (
          <div key={book.key} className="booksearch-card">
            <div className="booksearch-card-image-wrapper">
              <img
                src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : 'placeholder.jpg'}
                alt={book.title}
                className="booksearch-card-img"
                onClick={() => handleShowModal(book)}
              />
            </div>
            <div className="booksearch-card-body">
              <h3 className="booksearch-card-title">
                {book.title.length > 40 ? `${book.title.substring(0, 37)}...` : book.title}
              </h3>
              <p className="booksearch-card-text">
                {book.author_name?.join(', ').length > 40
                  ? `${book.author_name.join(', ').substring(0, 37)}...`
                  : book.author_name?.join(', ')}
              </p>
              <br />
              <button className="booksearch-more-info-btn" onClick={() => handleShowModal(book)}>
                More Info
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedBook && (
        <div className="booksearch-modal">
          <div className="booksearch-modal-content">
            <div className="booksearch-modal-header">
              {/* <h3>{selectedBook.title}</h3> */}
              <br />
              <button onClick={handleCloseModal} className="booksearch-close-btn">
                &times;
              </button>
            </div>
            <div className="booksearch-modal-body">
              <img
                src={selectedBook.cover_i ? `https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg` : 'placeholder.jpg'}
                alt={selectedBook.title}
                className="booksearch-modal-img"
              />
              <p><strong>Title:</strong> {selectedBook.title}</p>
              <p><strong>Description:</strong> {selectedBook.description || 'No description available.'}</p>
              <p><strong>Author:</strong> {selectedBook.author_name?.join(', ')}</p>
              <p><strong>First published:</strong> {selectedBook.first_publish_year || 'N/A'}</p>
              <p><strong>ISBN:</strong> {selectedBook.isbn?.[0] || 'N/A'}</p>
            </div>
            <div className="booksearch-modal-footer">
              <button onClick={handleCloseModal} className="booksearch-close-btn">
                Close
              </button>
              <button className="booksearch-add-btn">Add to Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSearch;
