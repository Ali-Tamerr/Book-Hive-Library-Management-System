import React, { useState, useMemo } from 'react';
import { Search, X, FilePenLine, Trash2, ReceiptText, BookOpen, Users, Building, FolderOpen } from 'lucide-react';
import { useBooks } from '../hooks/useBooks';
import { useUsers } from '../hooks/useUsers';
import { useBranches } from '../hooks/useBranches';
import { useCategories } from '../hooks/useCategories';
import { useNavigate } from 'react-router-dom';

function GlobalSearchPopup({ show, onClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const { data: books = [], isLoading: loadingBooks } = useBooks();
    const { data: users = [], isLoading: loadingUsers } = useUsers();
    const { data: branches = [], isLoading: loadingBranches } = useBranches();
    const { data: categories = [], isLoading: loadingCategories } = useCategories();

    const isLoading = loadingBooks || loadingUsers || loadingBranches || loadingCategories;

    const searchResults = useMemo(() => {
        if (!searchTerm.trim()) return [];

        const term = searchTerm.toLowerCase();
        const results = [];

        books.forEach(book => {
            if (book.name?.toLowerCase().includes(term)) {
                results.push({
                    id: book.book_id,
                    name: book.name,
                    source: 'Books',
                    icon: BookOpen,
                    route: '/books',
                    data: book
                });
            }
        });

        users.forEach(user => {
            if (user.name?.toLowerCase().includes(term)) {
                results.push({
                    id: user.user_id,
                    name: user.name,
                    source: 'Users',
                    icon: Users,
                    route: '/user-management',
                    data: user
                });
            }
        });

        branches.forEach(branch => {
            if (branch.name?.toLowerCase().includes(term)) {
                results.push({
                    id: branch.branch_id,
                    name: branch.name,
                    source: 'Branches',
                    icon: Building,
                    route: '/branches',
                    data: branch
                });
            }
        });

        categories.forEach(category => {
            if (category.category_name?.toLowerCase().includes(term)) {
                results.push({
                    id: category.category_id,
                    name: category.category_name,
                    source: 'Categories',
                    icon: FolderOpen,
                    route: '/categories',
                    data: category
                });
            }
        });

        return results;
    }, [searchTerm, books, users, branches, categories]);

    const handleEdit = (result) => {
        onClose();
        navigate(result.route, { state: { action: 'edit', item: result.data } });
    };

    const handleDelete = (result) => {
        onClose();
        navigate(result.route, { state: { action: 'delete', item: result.data } });
    };

    const handleViewDetails = (result) => {
        onClose();
        navigate(result.route, { state: { action: 'view', item: result.data } });
    };

    const getSourceBadge = (source) => {
        // const styles = {
        //     'Books': 'bg-blue-100 text-blue-700',
        //     'Users': 'bg-green-100 text-green-700',
        //     'Branches': 'bg-purple-100 text-purple-700',
        //     'Categories': 'bg-orange-100 text-orange-700'
        // };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium`}>
                {source}
            </span>
        );
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white w-11/12 max-w-[1000px] rounded-lg p-8 h-[80vh] flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="text-[#0b0b3b] bg-[#D7D7D7] p-4 rounded-lg">
                            <Search size={24} />
                        </div>
                        <span className="font-bold text-lg text-[#000035]">Global Search</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-[#0b0b3b] hover:text-red-600 transition-colors cursor-pointer"
                        type="button"
                    >
                        <X size={24} strokeWidth={2.9} className="border-[2px] p-1 rounded-[7px] text-[#525252]" />
                    </button>
                </div>

                <div className="h-[1px] bg-[#000035] w-full mb-6"></div>

                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search books, users, branches, categories..."
                            className="w-full h-[50px] pl-12 pr-4 rounded-xl border border-[#3D3E3E] outline-none focus:border-[#1e255e] text-[14px]"
                            autoFocus
                        />
                    </div>
                </div>

                <div className='border border-[#8787A3] rounded-[10px] overflow-hidden flex-1 flex flex-col'>
                    <div className='flex-1 min-w-[100px] overflow-auto'>
                        {isLoading ? (
                            <div className='p-8 text-center text-gray-500'>
                                Loading...
                            </div>
                        ) : searchTerm === '' ? (
                            <div className='p-8 text-center text-gray-500'>
                                <Search size={48} className="mx-auto mb-4 opacity-30" />
                                <p>Start typing to search across books, users, branches, and categories</p>
                            </div>
                        ) : searchResults.length === 0 ? (
                            <div className='p-8 text-center text-gray-500'>
                                No results found for "{searchTerm}"
                            </div>
                        ) : (
                            <table className='w-full'>
                                <thead className='sticky top-0 bg-white'>
                                    <tr>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Name</th>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Source</th>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='border-t border-[#0a0f33]'>
                                    {searchResults.map((result, index) => {
                                        const IconComponent = result.icon;
                                        return (
                                            <tr key={`${result.source}-${result.id}-${index}`}>
                                                <td className='p-4 text-sm whitespace-nowrap text-center'>
                                                    <div className='flex items-center justify-center gap-2'>
                                                        <IconComponent size={16} className="text-gray-500" />
                                                        <span>{result.name}</span>
                                                    </div>
                                                </td>
                                                <td className='p-4 text-sm whitespace-nowrap text-center'>
                                                    {getSourceBadge(result.source)}
                                                </td>
                                                <td className='p-4'>
                                                    <div className='w-max mx-auto flex justify-center items-center'>
                                                        <button
                                                            onClick={() => handleEdit(result)}
                                                            className="mr-2 text-lg hover:scale-125 transition-transform cursor-pointer"
                                                            title="Edit"
                                                        >
                                                            <FilePenLine size={20} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(result)}
                                                            className="mr-2 text-lg hover:scale-125 transition-transform cursor-pointer"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={20} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleViewDetails(result)}
                                                            className="text-lg hover:scale-125 transition-transform cursor-pointer"
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

                <div className='mt-4 text-sm text-gray-500 text-center'>
                    {searchTerm && searchResults.length > 0 && (
                        <span>Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GlobalSearchPopup;
