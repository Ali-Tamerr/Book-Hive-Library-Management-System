import { useOverdueBooks } from '../hooks/useOverdueBooks';
import CommonLayout from '../Layouts/CommonLayout.jsx';

function Overdue({ searchValue, customTitle }) {
  const { data: overdueBooks = [], isLoading } = useOverdueBooks();

  const filteredOverdueBooks = searchValue
    ? overdueBooks.filter(
      (book) =>
        book.book_title?.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.user_name?.toLowerCase().includes(searchValue.toLowerCase())
    )
    : overdueBooks;

  const columns = [
    { header: 'Book Title', accessor: 'book_title' },
    { header: 'User Name', accessor: 'user_name' },
    { header: 'Due Date', accessor: 'due_date' },
  ];

  return (
    <CommonLayout
      searchValue={searchValue}
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