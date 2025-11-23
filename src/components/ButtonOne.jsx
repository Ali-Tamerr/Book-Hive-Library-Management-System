import React from 'react'
import {Plus} from 'lucide-react'
const ButtonOne = ({ buttonBehaviour, text }) => {
    return (
        <button
            onClick={buttonBehaviour}
            className="bg-[#0b0b3b]  cursor-pointer h-full max-[856px]:text-xs text-white px-4 rounded-xl hover:bg-[#1a1a6a] transition-colors text-sm font-medium flex items-center gap-2"
        >
            <Plus size={15}/> {text}
        </button>)
}

export default ButtonOne