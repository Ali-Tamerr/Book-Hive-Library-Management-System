import { createPortal } from 'react-dom';
import { useBranches } from '../hooks/useBranches';
import LogoIcon from '../assets/logo.svg?react';

function BranchesPopup({ isOpen, onClose }) {
    const { data: branches = [], isLoading } = useBranches();

    if (!isOpen) return null;

    const popupContent = (
        <div
            className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-[95%] max-w-[900px] max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl bg-white"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-8">
                    <div className="flex justify-between items-start mb-8">
                        <h2 className="text-3xl font-bold text-[#0a0f33]">Our Branches</h2>
                        <div className="flex items-center gap-2">
                            <LogoIcon className="w-16 h-16 text-[#0a0f33]" />
                            <div className="flex flex-col">
                                <span className="text-xl text-[#0a0f33]">BookHive</span>
                                <span className="text-lg text-center text-[#0a0f33] font-['Mynerve',cursive]">Library</span>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-[#0a0f33]">
                                    <th className="text-left py-4 px-4 font-semibold text-[#0a0f33]">Name</th>
                                    <th className="text-left py-4 px-4 font-semibold text-[#0a0f33]">Contact No</th>
                                    <th className="text-center py-4 px-4 font-semibold text-[#0a0f33]">Location</th>
                                    <th className="text-center py-4 px-4 font-semibold text-[#0a0f33]">Book Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={4} className="text-center py-8 text-gray-500">
                                            Loading branches...
                                        </td>
                                    </tr>
                                ) : branches.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center py-8 text-gray-500">
                                            No branches found.
                                        </td>
                                    </tr>
                                ) : (
                                    branches.map((branch, index) => (
                                        <tr key={branch.branch_id || index} className="border-b border-gray-200">
                                            <td className="py-6 px-4 text-[#0a0f33]">{branch.name || 'N/A'}</td>
                                            <td className="py-6 px-4 text-[#0a0f33]">{branch.phone_number || branch.contact_no || 'N/A'}</td>
                                            <td className="py-6 px-4 text-center text-[#0a0f33]">{branch.location || branch.address || 'N/A'}</td>
                                            <td className="py-6 px-4 text-center text-[#0a0f33]">{branch.book_quantity || branch.total_books || 0}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center mt-8">
                        <button
                            onClick={onClose}
                            className="px-8 py-3 bg-[#0a0f33] text-white font-semibold rounded-[20px] hover:bg-[#192261] transition-colors cursor-pointer"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(popupContent, document.body);
}

export default BranchesPopup;
