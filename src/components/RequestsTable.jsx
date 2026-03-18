import React from "react";

const RequestsTable = ({ columns, data, keyExtractor }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th
              key={idx}
              className={`sticky top-0 z-10 bg-[#F2F2F2] p-4 text-center font-['Bebas_Neue',sans-serif] text-xl uppercase tracking-wider text-[#000035] shadow-[inset_0_-1px_0_0_#000035] dark:bg-[#121317] dark:text-[#D7D7D7] dark:shadow-[inset_0_-1px_0_0_#D7D7D7] ${col.headerClassName || ""}`}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>


      <tbody className="">
        {data.map((item, index) => (
          <tr key={keyExtractor ? keyExtractor(item, index) : index}>
            {columns.map((col, idx) => (
              <td
                key={idx}
                className={`whitespace-nowrap p-4 text-center text-sm text-[#000035] dark:text-[#D7D7D7] ${col.cellClassName || ""}`}
              >
                {col.render ? col.render(item, index) : item[col.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RequestsTable;
