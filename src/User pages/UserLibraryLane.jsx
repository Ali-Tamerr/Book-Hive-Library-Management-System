import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import styles from './Styles/UserLibraryLane.module.css';
import { useBooks } from '../hooks/useBooks';

function UserLibraryLane() {
  const { data: books = [], isLoading, error } = useBooks();

  return (
    <div className="flex flex-col h-full">
      <div className={styles.headerBar}>
        <h2>Library Lane Books</h2>

        <div className={styles.actions}>
          <button className={styles.addUserBtn}>
            <Plus size={15} /> Add User
          </button>
        </div>
      </div>

      <div className={`${styles.tableContainer} flex-1 overflow-x-auto`}>
        <table id="userTable" className={`${styles.table} min-w-max`}>
          <thead>
            <tr>
              <th className={styles.th}>ID</th>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Type</th>
              <th className={styles.th}>Availability</th>
              <th className={styles.th}>Add to Cart</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan="5" className="text-center">Loading...</td></tr>}
            {error && <tr><td colSpan="5" className="text-center text-red-500">{error.message}</td></tr>}
            {!isLoading && !error && books.map((book) => (
              <tr key={book.id}>
                <td className={styles.td}>{book.id}</td>
                <td className={styles.td}>{book.Title}</td>
                <td className={styles.td}>{book.CategoryId}</td>
                <td className={styles.td}>{book.AvailableCopies > 0 ? 'Available' : 'Not Available'}</td>
                <td className={styles.td}>
                  <button className={styles.iconBtn} title="Delete">
                    <Trash2 size={20} />
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

export default UserLibraryLane;
