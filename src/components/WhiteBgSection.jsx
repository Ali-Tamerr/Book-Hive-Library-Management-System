import ColorableLogo from "./ColorableLogo";


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
  isDarkMode = false,
}) => {
  const visibilityClass = mobileOnly
    ? "max-[67.5rem]:flex hidden max-[67.5rem]:w-full max-[67.5rem]:h-full"
    : desktopOnly
      ? "max-[67.5rem]:hidden flex flex-1"
      : "flex flex-1";

  const bgClass = isDarkMode ? "bg-[#121317]" : "bg-white";
  const textClass = isDarkMode ? "text-white" : "text-[#000035]";
  const headingFontClass = "font-['Bebas_Neue',sans-serif]";
  const contentFontClass = "font-['Noto_Sans_Georgian',sans-serif]";


  if (customLayout) {
    return (
      <div
        className={`${visibilityClass} ${bgClass} w-full flex-col items-center justify-center p-8 max-[48rem]:p-4 ${!mobileOnly && !desktopOnly ? "relative" : ""}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`${visibilityClass} ${bgClass} w-full flex-col items-center justify-center max-[48rem]:justify-center gap-2 px-6 py-8 max-[48rem]:px-4 max-[48rem]:py-6 ${!mobileOnly && !desktopOnly ? "relative" : ""}`}
    >
      {backButton && (
        <button
          onClick={backButton.onClick}
          className={`absolute ${backButton.position === "left" ? "left-0 top-4 rounded-l border-l-0" : "right-0 top-4 rounded-r border-r-0"} ${
            isDarkMode
              ? "border border-white text-white hover:bg-white hover:text-[#121317]"
              : "border border-[#000035] text-[#000035] hover:bg-[#000035] hover:text-white"
          } ${contentFontClass} cursor-pointer rounded-full px-4 py-1 text-xs font-medium transition-colors`}
        >
          {backButton.text}
        </button>
      )}

      <div
        className={`flex flex-col items-center justify-center gap-2 ${contentFontClass} ${mobileOnly ? "w-[85%] max-w-[40.625rem] max-[67.5rem]:min-h-[100svh] max-[67.5rem]:w-full" : "w-full"}`}
      >
        {logoWithTitle ? (
          <div className="flex items-center gap-4 max-[48rem]:gap-2">
            <h2
              className={`inline text-4xl font-semibold max-[48rem]:text-2xl ${headingFontClass} ${textClass}`}
            >
              {title}
            </h2>
            <ColorableLogo 
              className={`h-12 w-12 max-[48rem]:h-10 max-[48rem]:w-10 ${isDarkMode ? "text-[#F2F2F2]" : "text-[#000035]"}`} 
            />
          </div>
        ) : (
          <>
            <ColorableLogo 
              className={`mb-2 h-20 w-20 max-[48rem]:h-16 max-[48rem]:w-16 ${isDarkMode ? "text-[#F2F2F2]" : "text-[#000035]"}`} 
            />
            <h2
              className={`text-3xl font-semibold max-[67.5rem]:text-2xl max-[48rem]:text-xl ${headingFontClass} ${textClass} mb-2`}
            >
              {title}
            </h2>
          </>
        )}

        <p
          className={`${textClass} ${isDarkMode ? "opacity-70" : ""} mb-4 text-center text-lg max-[48rem]:text-base`}
        >
          {subtitle}
        </p>

        {children}
      </div>
    </div>
  );
};

export default WhiteBgSection;
