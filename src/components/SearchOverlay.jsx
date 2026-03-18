import React, { useState, useMemo } from "react";
import { useBooks } from "../hooks/useBooks";
import LazyImage from "./LazyImage";
import BookCard from "./BookCard";
import { getImageUrl } from "../services/api.config";

const SearchOverlay = ({ isOpen, onClose, onBookClick, setIsLoginOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: booksSource } = useBooks();

  const books = useMemo(() => {
    return Array.isArray(booksSource) ? booksSource : booksSource?.data || [];
  }, [booksSource]);

  const filteredBooks = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const lowerSearch = searchTerm.toLowerCase();
    return books.filter((book) =>
      book.name?.toLowerCase().includes(lowerSearch)
    ).slice(0, 15); // Increased limit for better browse experience
  }, [books, searchTerm]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col bg-[#F2F2F2] pt-32 transition-all duration-500 dark:bg-[#121317] ${
        isOpen ? "pointer-events-auto translate-y-0" : "pointer-events-none -translate-y-full"
      }`}
    >
      <div className="container relative mx-auto flex h-full max-w-[1150px] flex-col px-6">
        {/* Close Button */}
        <i
          className="ri-close-line absolute -top-24 left-1/2 -translate-x-1/2 cursor-pointer text-[48px] text-[#000035] transition-transform hover:scale-110 dark:text-[#D7D7D7]"
          onClick={() => {
            onClose();
            setSearchTerm("");
          }}
        ></i>

        <div className="flex h-full flex-col items-center gap-y-12 overflow-hidden">
          {/* Search Input Container */}
          <div className="relative w-full max-w-[800px] shrink-0 overflow-hidden rounded-2xl border border-[#000035]  transition-all focus-within:border-[#000053] dark:border-[#D7D7D7]  dark:focus-within:border-white">
            <i className="ri-search-line absolute left-8 top-1/2 -translate-y-1/2 text-[32px] text-[#000035] dark:text-[#D7D7D7]"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="What are you looking for ?"
              className="w-full bg-transparent py-8 pl-20 pr-10 font-[family-name:var(--title-font)] text-[26px] text-[#000035] outline-none placeholder:text-[#000035] dark:text-[#D7D7D7] dark:placeholder:text-[#D7D7D7] [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
              autoFocus={isOpen}
            />
          </div>

          {/* Results Section - Scrollable Area */}
          <div className="mb-8 w-full flex-1 overflow-y-auto pr-4 scrollbar-thin">
            {searchTerm && filteredBooks.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-y-4 py-20">
                <i className="ri-book-3-line text-6xl text-[#00003520] dark:text-[#D7D7D720]"></i>
                <div className="text-2xl font-bold  tracking-widest text-[#000035] opacity-60 dark:text-[#D7D7D7]">
                  No matching books found
                </div>
              </div>
            ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.book_id}
                  book={{
                    ...book,
                    image: getImageUrl(book.image_url),
                  }}
                  scale={1.3}
                  onClick={() => {
                    onClose?.();
                    setIsLoginOpen?.(true);
                  }}
                />
              ))}
            </div>

            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
