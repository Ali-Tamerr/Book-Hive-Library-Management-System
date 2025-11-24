import LogoIcon from '../assets/logo.svg?react';

const WhiteBgSection = ({
    title,
    subtitle,
    children,
    backButton = null,
    logoWithTitle = false,
    loginLayout = false,
    mobileOnly = false,
    desktopOnly = false,
    customLayout = false
}) => {
    const visibilityClass = mobileOnly
        ? "max-[1080px]:flex hidden max-[1080px]:w-full max-[1080px]:h-full"
        : desktopOnly
            ? "max-[1080px]:hidden flex flex-1"
            : "flex flex-1";

    if (customLayout) {
        return (
            <div className={`${visibilityClass} bg-white flex-col items-center justify-center p-16 w-full ${!mobileOnly && !desktopOnly ? 'relative' : ''}`}>
                {children}
            </div>
        );
    }



    return (
        <div className={`${visibilityClass} bg-white flex-col gap-4 justify-center p-8 items-center w-full ${!mobileOnly && !desktopOnly ? 'relative' : ''}`}>
            {backButton && (
                <button
                    onClick={backButton.onClick}
                    className={`absolute ${backButton.position === 'left' ? 'top-8 left-8' : 'top-8 right-8'} border border-[#0a0f33] text-[#0a0f33] rounded-[30px] px-6 py-2 text-base hover:bg-[#0a0f33] hover:text-white transition-colors`}
                >
                    {backButton.text}
                </button>
            )}

            <div className={`flex flex-col gap-4 justify-center items-center ${mobileOnly ? 'max-[1080px]:h-screen w-[85%] max-[1080px]:w-full max-w-[650px]' : 'w-full'}`}>
                {logoWithTitle ? (
                    <div className='flex gap-6 items-center'>
                        <h2 className="text-4xl inline font-semibold text-[#0a0f33]">{title}</h2>
                        <LogoIcon className="w-36 text-[#0a0f33]" />
                    </div>
                ) : (
                    <>
                        <LogoIcon className="w-32 h-min text-[#0a0f33] mb-6" />
                        <h2 className="text-3xl max-[1080px]:text-2xl font-semibold text-[#0a0f33] mb-4">{title}</h2>
                    </>
                )}

                <p className="text-[#0a0f33] text-lg mb-8 text-center">{subtitle}</p>

                {children}
            </div>
        </div>
    );
};

export default WhiteBgSection;
