import React, { useState, useMemo } from "react";
import {
  Search,
  X,
  FilePenLine,
  Trash2,
  ReceiptText,
  BookOpen,
  Users,
  Building,
  FolderOpen,
} from "lucide-react";
import { useBooks } from "../hooks/useBooks";
import { useUsers } from "../hooks/useUsers";
import { useBranches } from "../hooks/useBranches";
import { useCategories } from "../hooks/useCategories";
import { useNavigate } from "react-router-dom";

function GlobalSearchPopup({ show, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { data: books = [], isLoading: loadingBooks } = useBooks();
  const { data: usersData, isLoading: loadingUsers } = useUsers();
  const users = usersData
    ? usersData.pages.flatMap((page) => page.data || [])
    : [];
  const { data: branches = [], isLoading: loadingBranches } = useBranches();
  const { data: categories = [], isLoading: loadingCategories } =
    useCategories();

  const isLoading =
    loadingBooks || loadingUsers || loadingBranches || loadingCategories;

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const term = searchTerm.toLowerCase();
    const results = [];

    books.forEach((book) => {
      if (book.name?.toLowerCase().includes(term)) {
        results.push({
          id: book.book_id,
          name: book.name,
          source: "Books",
          icon: BookOpen,
          route: "/books",
          data: book,
        });
      }
    });

    users.forEach((user) => {
      const fullName = `${user.first_name || ""} ${user.last_name || ""}`
        .trim()
        .toLowerCase();

      if (fullName.includes(term)) {
        results.push({
          id: user.user_id,
          name:
            `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
            user.user_id,
          source: "Users",
          icon: Users,
          route: "/user-management",
          data: user,
        });
      }
    });

    branches.forEach((branch) => {
      if (branch.name?.toLowerCase().includes(term)) {
        results.push({
          id: branch.branch_id,
          name: branch.name,
          source: "Branches",
          icon: Building,
          route: "/branches",
          data: branch,
        });
      }
    });

    categories.forEach((category) => {
      if (category.category_name?.toLowerCase().includes(term)) {
        results.push({
          id: category.category_id,
          name: category.category_name,
          source: "Categories",
          icon: FolderOpen,
          route: "/categories",
          data: category,
        });
      }
    });

    return results;
  }, [searchTerm, books, users, branches, categories]);

  const handleEdit = (result) => {
    onClose();
    navigate(result.route, { state: { action: "edit", item: result.data } });
  };

  const handleDelete = (result) => {
    onClose();
    navigate(result.route, { state: { action: "delete", item: result.data } });
  };

  const handleViewDetails = (result) => {
    onClose();
    navigate(result.route, { state: { action: "view", item: result.data } });
  };

  const getSourceBadge = (source) => {
    // const styles = {
    //     'Books': 'bg-blue-100 text-blue-700',
    //     'Users': 'bg-green-100 text-green-700',
    //     'Branches': 'bg-purple-100 text-purple-700',
    //     'Categories': 'bg-orange-100 text-orange-700'
    // };
    return (
      <span className={`rounded-full px-3 py-1 text-xs font-medium`}>
        {source}
      </span>
    );
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="popup-typography flex h-full max-h-none w-full flex-col rounded-none bg-white p-4 min-[769px]:h-auto min-[769px]:max-h-[80vh] min-[769px]:w-11/12 min-[769px]:max-w-[1000px] min-[769px]:p-8 min-[769px]:rounded-lg max-[768px]:justify-center">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#D7D7D7] p-4 text-[#0b0b3b]">
              <Search size={24} />
            </div>
            <span className="font-['Bebas_Neue',sans-serif] text-lg font-bold text-[#000035]">
              Global Search
            </span>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer text-[#0b0b3b] transition-colors hover:text-red-600"
            type="button"
          >
            <X
              size={24}
              strokeWidth={2.9}
              className="rounded-[7px] border-[2px] p-1 text-[#000035]"
            />
          </button>
        </div>

        <div className="mb-6 h-[1px] w-full bg-[#000035]"></div>

        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 transform text-[#000035]"
              size={20}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search books, users, branches, categories..."
              className="h-[50px] w-full rounded-xl border border-[#D7D7D7] pl-12 pr-4 text-[14px] outline-none"
              autoFocus
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden rounded-[10px] border border-[#8787A3]">
          <div className="min-w-[100px] flex-1 overflow-auto">
            {isLoading ? (
              <div className="p-8 text-center text-[#000035]">Loading...</div>
            ) : searchTerm === "" ? (
              <div className="p-8 text-center text-[#000035]">
                <Search size={48} className="mx-auto mb-4 opacity-30" />
                <p>
                  Start typing to search across books, users, branches, and
                  categories
                </p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="p-8 text-center text-[#000035]">
                No results found for "{searchTerm}"
              </div>
            ) : (
              <table className="w-full">
                <thead className="sticky top-0 bg-white">
                  <tr>
                    <th className="p-4 text-center text-sm font-semibold text-[#333]">
                      Name
                    </th>
                    <th className="p-4 text-center text-sm font-semibold text-[#333]">
                      Source
                    </th>
                    <th className="p-4 text-center text-sm font-semibold text-[#333]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="border-t border-[#000035]">
                  {searchResults.map((result, index) => {
                    const IconComponent = result.icon;
                    return (
                      <tr key={`${result.source}-${result.id}-${index}`}>
                        <td className="whitespace-nowrap p-4 text-center text-sm">
                          <div className="flex items-center justify-center gap-2">
                            <IconComponent
                              size={16}
                              className="text-[#000035]"
                            />
                            <span>{result.name}</span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap p-4 text-center text-sm">
                          {getSourceBadge(result.source)}
                        </td>
                        <td className="p-4">
                          <div className="mx-auto flex w-max items-center justify-center">
                            <button
                              onClick={() => handleEdit(result)}
                              className="mr-2 cursor-pointer text-lg transition-transform hover:scale-125"
                              title="Edit"
                            >
                              <FilePenLine size={20} />
                            </button>
                            <button
                              onClick={() => handleDelete(result)}
                              className="mr-2 cursor-pointer text-lg transition-transform hover:scale-125"
                              title="Delete"
                            >
                              <Trash2 size={20} />
                            </button>
                            <button
                              onClick={() => handleViewDetails(result)}
                              className="cursor-pointer text-lg transition-transform hover:scale-125"
                              title="View Details"
                            >
                              <ReceiptText size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-[#000035]">
          {searchTerm && searchResults.length > 0 && (
            <span>
              Found {searchResults.length} result
              {searchResults.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default GlobalSearchPopup;
