import React from "react";

const RequestsTable = ({ data = [], columns = [], keyExtractor }) => {
  const resolveCell = (row, column) => {
    if (typeof column.render === "function") {
      return column.render(row);
    }
    return row?.[column.accessor] ?? "-";
  };

  return (
    <table className="w-full min-w-[980px] border-collapse text-left">
      <thead>
        <tr className="border-b border-[#000035] bg-[#0000350d] dark:border-[#D7D7D7] dark:bg-[#D7D7D712]">
          {columns.map((column, index) => (
            <th
              key={`${column.accessor || column.header}-${index}`}
              className="px-4 py-3 text-center text-[13px] font-bold uppercase tracking-wide text-[#000035] dark:text-[#D7D7D7]"
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={
              (keyExtractor && keyExtractor(row, rowIndex)) ||
              `${rowIndex}-${row?.request_id || row?.transaction_id || row?.id || "row"}`
            }
            className="border-b border-[#00003526] last:border-b-0 dark:border-[#D7D7D733]"
          >
            {columns.map((column, colIndex) => (
              <td
                key={`${column.accessor || column.header}-${colIndex}`}
                className="px-4 py-3 text-center text-[13px] font-medium text-[#000035] dark:text-[#D7D7D7]"
              >
                {resolveCell(row, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RequestsTable;
