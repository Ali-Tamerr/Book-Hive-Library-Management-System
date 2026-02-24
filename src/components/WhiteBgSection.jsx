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
    ? "max-[1080px]:flex hidden max-[1080px]:w-full max-[1080px]:h-full"
    : desktopOnly
      ? "max-[1080px]:hidden flex flex-1"
      : "flex flex-1";

  const bgClass = isDarkMode ? "bg-[#121317]" : "bg-white";
  const textClass = isDarkMode ? "text-white" : "text-[#0a0f33]";
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
              : "border border-[#0a0f33] text-[#0a0f33] hover:bg-[#0a0f33] hover:text-white"
          } cursor-pointer rounded-full px-4 py-1 text-xs font-medium transition-colors`}
        >
          {backButton.text}
        </button>
      )}

      <div
        className={`flex flex-col items-center justify-center gap-4 ${mobileOnly ? "w-[85%] max-w-[650px] max-[1080px]:h-screen max-[1080px]:w-full" : "w-full"}`}
      >
        {logoWithTitle ? (
          <div className="flex items-center gap-6">
            <h2 className={`inline text-4xl font-semibold ${textClass}`}>
              {title}
            </h2>
            <img src={logoSrc} alt={logoAlt} className="h-auto w-36" />
          </div>
        ) : (
          <>
            <img src={logoSrc} alt={logoAlt} className="mb-6 h-auto w-32" />
            <h2
              className={`text-3xl font-semibold max-[1080px]:text-2xl ${textClass} mb-4`}
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
