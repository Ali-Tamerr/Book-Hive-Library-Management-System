import React from 'react'
import { Plus } from 'lucide-react'
const ButtonOne = ({ buttonBehaviour, text }) => {
    return (
        <button
            onClick={buttonBehaviour}
            className="bg-[#0b0b3b] dark:bg-[#E8E8E8] dark:text-[#121317] cursor-pointer h-full max-[856px]:text-xs max-[856px]:w-full max-[856px]:justify-center px-3 whitespace-nowrap text-white rounded-xl hover:bg-[#1a1a6a] dark:hover:bg-[#d4d4d4] transition-colors text-sm font-medium flex items-center gap-2 justify-center"
        >
            <Plus className='p-0.1 w-4 h-4 font-nold rounded-full bg-white text-[#0b0b3b] dark:bg-[#121317] dark:text-[#E8E8E8] hover:bg-[#1a1a6a] transition-colors' />
            {text}
        </button>)
}

export default ButtonOne