import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductStyle/BestSeller.css';

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await axios.get(
          'https://www.googleapis.com/books/v1/volumes?q=bestseller'
        );
        setBestSellers(response.data.items);
      } catch (error) {
        console.error('Error fetching best sellers:', error);
      }
    };

    fetchBestSellers();
  }, []);

  const handleShow = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleClose = () => {
    setSelectedBook(null);
    setShowModal(false);
  };

  return (
    <>
      <div className='best-seller-container'>
        <div className="best-seller-header">
          <h2>Best Sellers</h2>
          <p>
            <strong>Kampanj just nu</strong>
            <br />
            Här hittas böcker som har gått ut med högsta antal boklådor i samma år. Klicka på en bok för att se mer info.
            <br />
            Kolla gärna om böckerna har någon nytta för dig!
            <br />
          </p>
        </div>
        <br />
        <ul className='best-seller-list'>
          {bestSellers.map((book) => (
            <li key={book.id} className='best-seller-item' onClick={() => handleShow(book)}>
              <h6>{book.volumeInfo.title}</h6>
              {book.volumeInfo.imageLinks?.thumbnail && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                />
              )}
              <p>Author: {book.volumeInfo.authors?.join(', ')}</p>
              <p>Pages: {book.volumeInfo.pageCount}</p>
              <p>Published: {book.volumeInfo.publishedDate}</p>
              <br />
              <div className="cart-btn">
                <button>Mer info</button>
                
              </div>
            </li>
          ))}
        </ul>

        {showModal && selectedBook && (
          <div className={`modal-bestseller ${showModal ? 'show' : ''}`}>
            <div className='modal-content-bestseller'>
              <h6><strong>{selectedBook.volumeInfo.title}</strong> </h6>
              <img className='modal-img'
                src={selectedBook.volumeInfo.imageLinks?.thumbnail || 'placeholder.jpg'}
                alt={selectedBook.volumeInfo.title}
              />
              <p><strong>Description:</strong> {selectedBook.volumeInfo.description}</p>
              <p>Author: {selectedBook.volumeInfo.authors?.join(', ')}</p>
              <p>Publisher: {selectedBook.volumeInfo.publisher}</p>
              <p>Pages: {selectedBook.volumeInfo.pageCount}</p>
              <p>Published: {selectedBook.volumeInfo.publishedDate}</p>
              <div className="modal-actions">
                <button onClick={handleClose}>Close</button>
                <button className='btn btn-success' >Add to Cart</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BestSeller;
