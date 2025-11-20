import React from 'react'
import {Plus} from 'lucide-react'
const ButtonOne = ({ buttonBehaviour }) => {
    return (
        <button
            onClick={buttonBehaviour}
            className="bg-[#0b0b3b]  cursor-pointer h-full max-[856px]:text-xs text-white px-4 rounded hover:bg-[#1a1a6a] transition-colors text-sm font-medium flex items-center gap-2"
        >
            <Plus size={15}/> Add User
        </button>)
}

export default ButtonOne