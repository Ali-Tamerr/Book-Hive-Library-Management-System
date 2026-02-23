import logoDark from '../assets/logo.svg';
import logoLight from '../Home/assets/bookhive_icon_only-removebg-preview 2.svg';

const WhiteBgSection = ({
    title,
    subtitle,
    children,
    backButton = null,
    logoWithTitle = false,
    loginLayout = false,
    mobileOnly = false,
    desktopOnly = false,
    customLayout = false,
    isDarkMode = false
}) => {
    const visibilityClass = mobileOnly
        ? "max-[1080px]:flex hidden max-[1080px]:w-full max-[1080px]:h-full"
        : desktopOnly
            ? "max-[1080px]:hidden flex flex-1"
            : "flex flex-1";

    const bgClass = isDarkMode ? "bg-[#121317]" : "bg-white";
    const textClass = isDarkMode ? "text-white" : "text-[#0a0f33]";
    const headingFontClass = "font-['Bebas_Neue',sans-serif]";
    const contentFontClass = "font-['Noto_Sans_Georgian',sans-serif]";
    const logoSrc = isDarkMode ? logoLight : logoDark;
    const logoAlt = "BookHive Logo";

    
    if (customLayout) {
        return (
            <div className={`${visibilityClass} ${bgClass} flex-col items-center justify-center p-16 w-full ${!mobileOnly && !desktopOnly ? 'relative' : ''}`}>
                {children}
            </div>
        );
    }

    return (
        <div className={`${visibilityClass} ${bgClass} flex-col gap-4 justify-center p-8 items-center w-full ${!mobileOnly && !desktopOnly ? 'relative' : ''}`}>
            {backButton && (
                <button
                    onClick={backButton.onClick}
                    className={`absolute ${backButton.position === 'left' ? 'top-4 left-0 border-l-0 rounded-l' : 'top-4 right-0 border-r-0 rounded-r'} ${isDarkMode
                        ? 'border border-white text-white hover:bg-white hover:text-[#121317]'
                        : 'border border-[#0a0f33] text-[#0a0f33] hover:bg-[#0a0f33] hover:text-white'
                        } ${contentFontClass} rounded-full px-4 py-1 text-xs font-medium transition-colors cursor-pointer`}
                >
                    {backButton.text}
                </button>
            )}

            <div className={`flex flex-col gap-4 justify-center items-center ${contentFontClass} ${mobileOnly ? 'max-[1080px]:h-screen w-[85%] max-[1080px]:w-full max-w-[650px]' : 'w-full'}`}>
                {logoWithTitle ? (
                    <div className="flex gap-6 items-center">
                        <h2 className={`text-4xl inline font-semibold ${headingFontClass} ${textClass}`}>{title}</h2>
                        <img src={logoSrc} alt={logoAlt} className="w-36 h-auto" />
                    </div>
                ) : (
                    <>
                        <img src={logoSrc} alt={logoAlt} className="w-32 h-auto mb-6" />
                        <h2 className={`text-3xl max-[1080px]:text-2xl font-semibold ${headingFontClass} ${textClass} mb-4`}>{title}</h2>
                    </>
                )}

                <p className={`${textClass} ${isDarkMode ? 'opacity-70' : ''} text-lg mb-8 text-center`}>{subtitle}</p>

                {children}
            </div>
        </div>
    );
};

export default WhiteBgSection;
