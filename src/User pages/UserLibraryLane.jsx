import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import styles from './Styles/UserLibraryLane.module.css';
import { useBooks } from '../hooks/useBooks';
import { useCategories } from '../hooks/useCategories';

function UserLibraryLane() {
  const { data: books = [], isLoading, error } = useBooks();
  const { data: categories = [] } = useCategories();

  return (
    <div className="flex flex-col h-full">
      <div className={styles.headerBar}>
        <h2>Library Lane Books</h2>

        <div className={styles.actions}>
          <button className={`${styles.addUserBtn} cursor-pointer`}>
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
              <th className={styles.th}>Category</th>
              <th className={styles.th}>Quantity</th>
              <th className={styles.th}>Availability</th>
              <th className={styles.th}>Add to Cart</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan="6" className="text-center">Loading...</td></tr>}
            {error && <tr><td colSpan="6" className="text-center text-red-500">{error.message}</td></tr>}
            {!isLoading && !error && books.map((book) => (
              <tr key={book.book_id}>
                <td className={styles.td}>{book.book_id}</td>
                <td className={styles.td}>{book.name}</td>
                <td className={styles.td}>{categories.find(cat => cat.category_id === book.category_id)?.category_name || 'N/A'}</td>
                <td className={styles.td}>{book.quantity}</td>
                <td className={styles.td}>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium text-black`}>
                    {book.quantity > 0 ? 'Available' : 'Borrowed'}
                  </span>
                </td>
                <td className={styles.td}>
                  <button className={`${styles.iconBtn} cursor-pointer`} title="Add to Cart">
                    <Plus size={20} />
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
