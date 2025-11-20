import { useOverdueBooks } from '../hooks/useOverdueBooks';

function Overdue({ searchValue }) {
  const { data: overdueBooks = [], isLoading } = useOverdueBooks();

  const filteredOverdueBooks = searchValue
    ? overdueBooks.filter(
        (book) =>
          book.book_title?.toLowerCase().includes(searchValue.toLowerCase()) ||
          book.user_name?.toLowerCase().includes(searchValue.toLowerCase())
      )
    : overdueBooks;

  return (
    <div className="flex flex-col h-full">
    <div className="overflow-x-auto flex-1">
      <table className="w-full border-collapse text-left text-sm min-w-max">
        <thead>
          <tr>
            <th className="p-3 border-b border-gray-300 font-semibold">Book Title</th>
            <th className="p-3 border-b border-gray-300 font-semibold">User Name</th>
            <th className="p-3 border-b border-gray-300 font-semibold">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="3" className="p-3 text-center text-gray-500">Loading...</td>
            </tr>
          ) : filteredOverdueBooks.length === 0 ? (
            <tr>
              <td colSpan="3" className="p-3 text-center text-gray-500">No overdue books found</td>
            </tr>
          ) : (
            filteredOverdueBooks.map((book) => (
              <tr key={book.id} className="border-b border-gray-200">
                <td className="p-3">{book.book_title}</td>
                <td className="p-3">{book.user_name}</td>
                <td className="p-3">{book.due_date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Overdue;