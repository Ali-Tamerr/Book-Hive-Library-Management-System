import { useState } from "react";
import LazyImage from "./LazyImage";
import BookPopup from "./BookPopup";
import "./BookPopup.css";

const books = [
  {
    name: "MY TURN",
    category: "Education",
    language: "English",
    branch: "Cairo",
    available: true,
    image: "/books/myturn.jpg",
  },
  {
    name: "My Autobiography",
    category: "Biography",
    language: "English",
    branch: "Giza",
    available: true,
    image: "/books/alex.jpg",
  },
];

const FeaturedBooks = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <>
      <h2 className="section__title">Featured Books</h2>

      <div className="featured__container container">
        <div className="books-grid">
          {books.map((book, index) => (
            <div
              key={index}
              className="book-card"
              onClick={() => setSelectedBook(book)}
            >
              <LazyImage src={book.image} alt={book.name} className="w-full h-auto object-cover" />
              <h4>{book.name}</h4>
              <button className="button">Explore Now</button>
            </div>
          ))}
        </div>
      </div>

      <BookPopup
        isOpen={!!selectedBook}
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </>
  );
};

export default FeaturedBooks;
