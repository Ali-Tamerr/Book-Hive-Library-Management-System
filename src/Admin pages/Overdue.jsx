import { useOverdueBooks } from '../hooks/useOverdueBooks';
import CommonLayout from '../Layouts/CommonLayout.jsx';

function Overdue({ searchValue, setSearchValue, customTitle }) {
  // Search searches: Book Title, User Name
  const { data: overdueBooks = [], isLoading } = useOverdueBooks();

  const filteredOverdueBooks = searchValue
    ? overdueBooks.filter(
      (book) =>
        book.book_title?.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.user_name?.toLowerCase().includes(searchValue.toLowerCase())
    )
    : overdueBooks;

  const columns = [
    // { header: 'ID', accessor: 'transaction_id' },
    // { header: 'User ID', accessor: 'user_id' },
    // { header: 'Amount', accessor: 'fine_amount' },
    { header: "User Name", accessor: "user_name_display" },
    { header: "Book Name", accessor: "book_name" },
    { header: 'Due Date', accessor: 'due_date' },
    { header: 'Date & Time', accessor: 'created_at' },
    // { header: 'Action', accessor: 'action' },
  ];

  return (
    <CommonLayout
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      buttonBehaviour={() => { }}
      isLoading={isLoading}
      data={filteredOverdueBooks}
      handleEdit={() => { }}
      handleDelete={() => { }}
      title="Overdue Borrowers"
      buttonText=""
      columns={columns}
      formPopup={null}
      customTitle={customTitle}
    />
  );
}

export default Overdue;