import LogoIcon from '../assets/logo.svg?react';

const DarkBgSection = ({ message, buttonText, onButtonClick, position = "left" }) => {
    const roundedClass = position === "left"
        ? "rounded-tr-[80px] rounded-br-[80px]"
        : "rounded-tl-[80px] rounded-bl-[80px]";

    return (
        <div className={`w-1/2 max-[1080px]:hidden bg-[#0a0f33] text-white flex flex-col items-center justify-center gap-12 p-16 ${roundedClass}`}>
            <LogoIcon className="w-[280px] h-min" />
            <h1 className="text-[64px] text-center -mt-12 text-white">
                BookHive
                <br />
                <span className="block font-['Caveat',cursive] text-[64px] -mt-6 font-medium">Library</span>
            </h1>
            <p className="text-xl text-white max-w-100 text-center cursor-default">{message}</p>
            {buttonText && onButtonClick && (
                <button
                    onClick={onButtonClick}
                    className="border-2 border-white text-white font-semibold text-lg w-full max-w-[300px] px-10 py-4 rounded-[20px] hover:bg-white hover:text-[#0a0f33] transition-colors"
                >
                    {buttonText}
                </button>
            )}
        </div>
    );
};

export default DarkBgSection;
