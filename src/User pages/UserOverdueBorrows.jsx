import React from "react";
import CommonLayout from "../Layouts/CommonLayout";
import { useBorrowedBooks } from "../hooks/useBorrowedBooks";
import { useBooks } from "../hooks/useBooks";
import { useBookCopies } from "../hooks/useBookCopies";
import { useCategories } from "../hooks/useCategories";
import { getCurrentUser } from "../services/auth.api";

function UserOverdueBorrows({ searchValue, customTitle }) {
  const currentUser = getCurrentUser();
  const { data: borrowedBooks = [], isLoading } = useBorrowedBooks();
  const { data: books = [] } = useBooks();
  const { data: bookCopies = [] } = useBookCopies();
  const { data: categories = [] } = useCategories();

  const getBookName = (bookCopyId) => {
    const copy = bookCopies.find(
      (c) => String(c.book_copy_id) === String(bookCopyId),
    );
    if (copy) {
      const book = books.find((b) => String(b.book_id) === String(copy.book_id));
      return book?.name || "Unknown";
    }
    return "Unknown";
  };

  const getBookCategory = (bookCopyId) => {
    const copy = bookCopies.find(
      (c) => String(c.book_copy_id) === String(bookCopyId),
    );
    if (copy) {
      const book = books.find((b) => String(b.book_id) === String(copy.book_id));
      if (book) {
        const category = categories.find(
          (c) => String(c.category_id) === String(book.category_id),
        );
        return category?.category_name || "Unknown";
      }
    }
    return "Unknown";
  };

  const isOverdue = (transaction) => {
    if (!transaction || transaction.return_date) {
      return false;
    }

    if (transaction.status === "Overdue") {
      return true;
    }

    if (!transaction.due_date) {
      return false;
    }

    const dueDate = new Date(transaction.due_date);
    if (Number.isNaN(dueDate.getTime())) {
      return false;
    }

    const now = new Date();
    return dueDate < now;
  };

  const userOverdueBorrows = borrowedBooks.filter(
    (transaction) =>
      String(transaction.user_id) === String(currentUser?.user_id) &&
      isOverdue(transaction),
  );

  const filteredOverdueBorrows = searchValue
    ? userOverdueBorrows.filter((transaction) => {
        const bookName = getBookName(transaction.book_id)?.toLowerCase() || "";
        const categoryName =
          getBookCategory(transaction.book_id)?.toLowerCase() || "";
        const q = searchValue.toLowerCase();
        return (
          bookName.includes(q) ||
          categoryName.includes(q) ||
          transaction.transaction_id?.toString().includes(searchValue)
        );
      })
    : userOverdueBorrows;

  const formatDate = (value) => {
    if (!value) return "N/A";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "N/A";

    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, " - ");
  };

  const formatDateTime = (value) => {
    if (!value) return "N/A";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "N/A";

    const datePart = date.toLocaleDateString("en-GB").replace(/\//g, "-");
    const timePart = date.toLocaleTimeString("en-GB", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return `${datePart} ${timePart}`;
  };

  const columns = [
    { header: "NAME", accessor: "name" },
    { header: "TYPE", accessor: "type" },
    { header: "DUE DATE", accessor: "due_date" },
    { header: "DATE & TIME", accessor: "date_time" },
  ];

  const tableData = filteredOverdueBorrows.map((transaction) => {
    return {
      ...transaction,
      name: getBookName(transaction.book_id),
      type: getBookCategory(transaction.book_id),
      due_date: formatDate(transaction.due_date),
      date_time: formatDateTime(transaction.created_at),
    };
  });

  return (
    <CommonLayout
      searchValue={searchValue}
      buttonBehaviour={() => {}}
      isLoading={isLoading}
      data={tableData}
      handleEdit={() => {}}
      handleDelete={() => {}}
      title="My Overdue Borrows"
      buttonText=""
      columns={columns}
      formPopup={null}
      isUserPage={true}
      customTitle={customTitle}
    />
  );
}

export default UserOverdueBorrows;