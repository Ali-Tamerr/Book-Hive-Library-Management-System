import React, { useState, useMemo } from "react";
import { useDashboardBooks } from "../hooks/useBooks";
import { useCategories } from "../hooks/useCategories";
import LazyImage from "./LazyImage";
import BookCard from "./BookCard";
import { getImageUrl } from "../services/api.config";

const SearchOverlay = ({ isOpen, onClose, onBookClick, setIsLoginOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: booksSource } = useDashboardBooks({ enabled: isOpen });
  const { data: categoriesData } = useCategories({ enabled: isOpen });

  const books = useMemo(() => {
    if (Array.isArray(booksSource)) return booksSource;
    return booksSource?.data || [];
  }, [booksSource]);

  const categories = useMemo(() => {
    if (Array.isArray(categoriesData)) return categoriesData;
    return categoriesData?.data || [];
  }, [categoriesData]);

  const filteredBooks = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const lowerSearch = searchTerm.toLowerCase();

    return books
      .map((book) => {
        let score = 0;
        const nameMatch = book.name?.toLowerCase().includes(lowerSearch);
        
        // Find category name for this book
        const category = categories.find(cat => String(cat.category_id) === String(book.category_id));
        const categoryMatch = category?.category_name?.toLowerCase().includes(lowerSearch);
        
        const descriptionMatch = book.description?.toLowerCase().includes(lowerSearch);

        if (nameMatch) score += 1000;
        if (categoryMatch) score += 100;
        if (descriptionMatch) score += 10;

        return { ...book, searchScore: score };
      })
      .filter((book) => book.searchScore > 0)
      .sort((a, b) => b.searchScore - a.searchScore || (a.name || "").localeCompare(b.name || ""))
      .slice(0, 20);
  }, [books, categories, searchTerm]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col bg-[#F2F2F2] pt-32 transition-all duration-500 dark:bg-[#121317] max-[42.5rem]:pt-24 ${
        isOpen ? "pointer-events-auto translate-y-0" : "pointer-events-none -translate-y-full"
      }`}
    >
      <div className="container relative mx-auto flex h-full max-w-[71.875rem] flex-col px-6">
        {/* Close Button */}
        <i
          className="ri-close-line absolute -top-24 left-1/2 -translate-x-1/2 cursor-pointer text-[3rem] text-[#000035] transition-transform hover:scale-110 dark:text-[#D7D7D7] max-[42.5rem]:-top-20 max-[42.5rem]:text-[2.5rem]"
          onClick={() => {
            onClose();
            setSearchTerm("");
          }}
        ></i>

        <div className="flex h-full flex-col items-center gap-y-12 overflow-hidden">
          {/* Search Input Container */}
          <div className="relative w-full max-w-[50rem] shrink-0 overflow-hidden rounded-2xl border border-[#000035] transition-all focus-within:border-[#000053] dark:border-[#D7D7D7] dark:focus-within:border-white">
            <i className="ri-search-line absolute left-8 top-1/2 -translate-y-1/2 text-[2rem] text-[#000035] dark:text-[#D7D7D7] max-[42.5rem]:left-5 max-[42.5rem]:text-[1.5rem]"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="What are you looking for ?"
              className="w-full bg-transparent py-8 pl-20 pr-10 font-[family-name:var(--title-font)] text-[1.625rem] text-[#000035] outline-none placeholder:text-[#000035] dark:text-[#D7D7D7] dark:placeholder:text-[#D7D7D7] max-[42.5rem]:py-5 max-[42.5rem]:pl-14 max-[42.5rem]:text-[1.125rem] [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
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
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 min-[32.5rem]:grid-cols-2 md:grid-cols-3 md:gap-y-16 lg:grid-cols-4">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.book_id}
                  book={{
                    ...book,
                    image: getImageUrl(book.image_url),
                  }}
                  scale={window.innerWidth < 680 ? 0.9 : 1.2}
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
