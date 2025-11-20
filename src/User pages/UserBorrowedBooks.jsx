import React from 'react';
import { ArrowLeft } from 'lucide-react';
import styles from './UserBorrowedBooks.module.css';
import { useBorrowedBooks } from '../hooks/useBorrowedBooks';

function UserBorrowedBooks() {
  const { data: borrowedBooks = [], isLoading, error } = useBorrowedBooks();

  return (
    <div className="flex flex-col h-full">
      <div className={`${styles.tableContainer} flex-1 overflow-x-auto`}>
        <table className={`${styles.table} min-w-max`}>
          <thead>
            <tr>
              <th className={styles.th}>ID</th>
              <th className={styles.th}>User ID</th>
              <th className={styles.th}>Amount</th>
              <th className={styles.th}>Due Date</th>
              <th className={styles.th}>Date & Time</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan="6" className="text-center">Loading...</td></tr>}
            {error && <tr><td colSpan="6" className="text-center text-red-500">{error.message}</td></tr>}
            {!isLoading && !error && borrowedBooks.map((book) => (
              <tr key={book.id}>
                <td className={styles.td}>{book.id}</td>
                <td className={styles.td}>{book.user_id}</td>
                <td className={styles.td}>{book.book_id}</td>
                <td className={styles.td}>{book.due_date}</td>
                <td className={styles.td}>{book.borrow_date}</td>
                <td className={styles.td}>
                  <button className={styles.returnBtn}>
                    <ArrowLeft size={15} /> Return
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserBorrowedBooks;
