import logoDark from "../assets/logo.svg";
import logoLight from "../assets/bookhive_icon_only-removebg-preview 2.svg";

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
  const logoSrc = isDarkMode ? logoLight : logoDark;
  const logoAlt = "BookHive Logo";

  if (customLayout) {
    return (
      <div
        className={`${visibilityClass} ${bgClass} w-full flex-col items-center justify-center p-16 ${!mobileOnly && !desktopOnly ? "relative" : ""}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`${visibilityClass} ${bgClass} w-full flex-col items-center justify-center gap-4 p-8 ${!mobileOnly && !desktopOnly ? "relative" : ""}`}
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
        className={`flex flex-col items-center justify-center gap-4 ${contentFontClass} ${mobileOnly ? "w-[85%] max-w-[40.625rem] max-[67.5rem]:h-screen max-[67.5rem]:w-full" : "w-full"}`}
      >
        {logoWithTitle ? (
          <div className="flex items-center gap-6">
            <h2
              className={`inline text-4xl font-semibold ${headingFontClass} ${textClass}`}
            >
              {title}
            </h2>
            <img src={logoSrc} alt={logoAlt} className="h-auto w-36" />
          </div>
        ) : (
          <>
            <img src={logoSrc} alt={logoAlt} className="mb-6 h-auto w-32" />
            <h2
              className={`text-3xl font-semibold max-[67.5rem]:text-2xl ${headingFontClass} ${textClass} mb-4`}
            >
              {title}
            </h2>
          </>
        )}

        <p
          className={`${textClass} ${isDarkMode ? "opacity-70" : ""} mb-8 text-center text-lg`}
        >
          {subtitle}
        </p>

        {children}
      </div>
    </div>
  );
};

export default WhiteBgSection;
