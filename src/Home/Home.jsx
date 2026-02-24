import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import LoginPopup from "../shared/LoginPopup";
import SignupPopup from "../shared/SignupPopup";
import ForgotPasswordPopup from "../shared/ForgotPasswordPopup";
import OTPPopup from "../shared/OTPPopup";
import ResetPasswordPopup from "../shared/ResetPasswordPopup";
import AboutBranchesPopup from "../components/AboutBranchesPopup";
import FeaturedBookPopup from "../components/FeaturedBookPopup";
import PageLoader from "../components/PageLoader";
import logoIcon from "../assets/bookhive_icon_only_black-removebg-preview 2.svg";
import testimonialImg1 from "../assets/img/testimonial-perfil-1.png";
import freeShippingIcon from "../assets/free shipping.png";
import secureInfoIcon from "../assets/secure information.png";
import chatbotIcon from "../assets/chatbot.png";

import { apiGet, getImageUrl } from "../services/api.config";

const Home = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isOTPOpen, setIsOTPOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const [selectedFeaturedBook, setSelectedFeaturedBook] = useState(null);
  const [themeIcon, setThemeIcon] = useState("ri-moon-line");
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [heroBooks, setHeroBooks] = useState([]);
  const [aboutBooks, setAboutBooks] = useState([]);
  const [stats, setStats] = useState({ branches: 0, books: 0, categories: 0 });
  const [feedbacks, setFeedbacks] = useState([]);
  const [isContentReady, setIsContentReady] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showShadowHeader, setShowShadowHeader] = useState(false);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [heroIndex, setHeroIndex] = useState(0);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const heroIntervalRef = useRef(null);
  const homeRef = useRef(null);
  const heroContainerRef = useRef(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await apiGet("/Books");
        const books = Array.isArray(data) ? data : data.data || [];
        const sorted = [...books].sort(
          (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0),
        );
        const mapped = sorted.map((book) => ({
          book_id: book.book_id,
          name: book.name,
          category_id: book.category_id,
          quantity: book.quantity,
          image: getImageUrl(book.image_url) || "",
        }));

        const withImages = mapped.filter((b) => b.image);
        const recent10 = withImages.slice(0, 10);
        setFeaturedBooks(recent10);

        const shuffled = [...withImages].sort(() => 0.5 - Math.random());
        setHeroBooks(shuffled.slice(0, 3));
        setAboutBooks(
          shuffled.length >= 5
            ? shuffled.slice(3, 5)
            : shuffled.slice(0, Math.min(2, shuffled.length)),
        );
      } catch (error) {
        console.error("Failed to fetch featured books:", error);
      }
    };

    const fetchStats = async () => {
      try {
        const [branchData, bookData, catData] = await Promise.all([
          apiGet("/Branches"),
          apiGet("/Books"),
          apiGet("/Categories"),
        ]);
        setStats({
          branches: Array.isArray(branchData) ? branchData.length : 0,
          books: Array.isArray(bookData) ? bookData.length : 0,
          categories: Array.isArray(catData) ? catData.length : 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    const loadFeedbacks = () => {
      try {
        const stored = JSON.parse(
          localStorage.getItem("mock_feedback_requests") || "[]",
        );
        const approved = stored.filter((f) => f.status === "Approved");
        setFeedbacks(approved);
      } catch {
        setFeedbacks([]);
      }
    };

    Promise.all([fetchBooks(), fetchStats()]).then(() => {
      loadFeedbacks();
      setTimeout(() => setIsContentReady(true), 100);
    });

    const handleFeedbackUpdate = () => loadFeedbacks();
    window.addEventListener("mockFeedbackUpdated", handleFeedbackUpdate);
    return () =>
      window.removeEventListener("mockFeedbackUpdated", handleFeedbackUpdate);
  }, []);

  useEffect(() => {
    if (!isContentReady) return;

    const waitForImages = () => {
      const container = homeRef.current;
      if (!container) {
        setPageLoaded(true);
        return;
      }
      const imgs = Array.from(container.querySelectorAll("img"));
      const promises = imgs.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      });

      const timeout = new Promise((resolve) => setTimeout(resolve, 5000));
      Promise.race([Promise.all(promises), timeout]).then(() =>
        setPageLoaded(true),
      );
    };

    requestAnimationFrame(waitForImages);
  }, [isContentReady]);

  useEffect(() => {
    const selectedTheme = localStorage.getItem("selected-theme");

    if (selectedTheme === "dark") {
      document.body.classList.add("dark-theme");
      setThemeIcon("ri-sun-line");
    } else {
      document.body.classList.remove("dark-theme");
      setThemeIcon("ri-moon-line");
    }
  }, []);

  const toggleTheme = () => {
    const body = document.body;
    const isDark = body.classList.contains("dark-theme");

    if (isDark) {
      body.classList.remove("dark-theme");
      setThemeIcon("ri-moon-line");
      localStorage.setItem("selected-theme", "light");
      localStorage.setItem("selected-icon", "ri-moon-line");
    } else {
      body.classList.add("dark-theme");
      setThemeIcon("ri-sun-line");
      localStorage.setItem("selected-theme", "dark");
      localStorage.setItem("selected-icon", "ri-sun-line");
    }
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowShadowHeader(scrollY >= 50);
      setShowScrollUp(scrollY >= 350);

      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 58;
        const sectionId = section.getAttribute("id");
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (heroBooks.length === 0) return;
    heroIntervalRef.current = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroBooks.length);
    }, 3000);
    return () => clearInterval(heroIntervalRef.current);
  }, [heroBooks]);

  const featuredPerView =
    typeof window !== "undefined" && window.innerWidth >= 1150 ? 4 : 1;
  const testimonialPerView =
    typeof window !== "undefined" && window.innerWidth >= 1150 ? 3 : 1;

  const featuredMaxIndex = Math.max(0, featuredBooks.length - featuredPerView);
  const testimonialMaxIndex = Math.max(
    0,
    feedbacks.length - testimonialPerView,
  );

  const featuredPrev = useCallback(() => {
    setFeaturedIndex((prev) => (prev <= 0 ? featuredMaxIndex : prev - 1));
  }, [featuredMaxIndex]);

  const featuredNext = useCallback(() => {
    setFeaturedIndex((prev) => (prev >= featuredMaxIndex ? 0 : prev + 1));
  }, [featuredMaxIndex]);

  useEffect(() => {
    if (!pageLoaded) return;

    const els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pageLoaded]);

  return (
    <>
      {!pageLoaded && (
        <PageLoader className="!fixed !z-[9999] bg-[hsl(230,100%,96%)] dark:bg-[#111214]" />
      )}
      <div
        className="duration-400 m-0 scroll-smooth bg-[var(--body-color)] font-[family-name:Montserrat,system-ui,Arial,sans-serif] text-[var(--text-color)] antialiased transition-[background-color]"
        ref={homeRef}
        style={{ visibility: pageLoaded ? "visible" : "hidden" }}
      >
        <header
          className={`duration-400 fixed top-0 z-[100] w-full bg-[var(--body-color)] transition-[box-shadow,background-color] dark:border-b dark:border-[rgba(255,255,255,0.06)] dark:bg-[#15161a] ${showShadowHeader ? "shadow-[0_2px_16px_hsla(0,0%,0%,0.1)] dark:shadow-[0_2px_16px_hsla(0,0%,0%,0.4)]" : ""}`}
          id="header"
        >
          <nav className="nav flex h-[var(--header-height)] items-center justify-between px-[4.5rem]">
            <a
              href="#"
              className="nav__logo inline-flex items-center gap-x-2 font-medium text-[var(--first-color)]"
            >
              <img
                src={logoIcon}
                alt="Book Hive Logo"
                style={{ width: "60px", height: "auto" }}
                className="dark:brightness-[1.2] dark:invert"
              />
            </a>

            <div className="max-[1150px]:duration-400 max-[1150px]:fixed max-[1150px]:inset-x-0 max-[1150px]:bottom-0 max-[1150px]:w-full max-[1150px]:bg-[var(--container-color)] max-[1150px]:px-16 max-[1150px]:py-5 max-[1150px]:shadow-[0_-8px_32px_hsla(0,0%,0%,0.1)] max-[1150px]:transition-[background-color] min-[1150px]:mx-auto min-[1150px]:flex min-[1150px]:flex-1 min-[1150px]:justify-center dark:bg-[#15161a] dark:shadow-[0_-8px_32px_hsla(0,0%,0%,0.4)] dark:min-[1150px]:shadow-none">
              <ul className="flex items-center justify-between min-[1150px]:gap-x-24">
                <li className="">
                  <a
                    href="#home"
                    className={`inline-flex min-h-[2.4rem] items-center justify-center rounded-md bg-transparent !px-[1.4rem] !py-[0.45rem] leading-none text-[var(--text-color)] transition-[color,background-color,box-shadow] duration-300 hover:bg-[#e9e9e9] hover:text-[#1b1c20] hover:shadow-[0_8px_18px_rgba(0,0,0,0.25)] max-[1150px]:rounded-[10px] max-[1150px]:px-[0.65rem] max-[1150px]:py-[0.35rem] min-[1150px]:font-medium ${activeSection === "home" ? "!bg-[#e9e9e9] !text-[#1b1c20] !shadow-[0_8px_18px_rgba(0,0,0,0.25)]" : ""}`}
                    onClick={(e) => scrollToSection(e, "home")}
                  >
                    <i className="ri-home-4-line text-xl text-inherit min-[1150px]:hidden"></i>
                    <span className="hidden min-[1150px]:block">Home</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className={`inline-flex min-h-[2.4rem] items-center justify-center rounded-md bg-transparent !px-[1.4rem] !py-[0.45rem] leading-none text-[var(--text-color)] transition-[color,background-color,box-shadow] duration-300 hover:bg-[#e9e9e9] hover:text-[#1b1c20] hover:shadow-[0_8px_18px_rgba(0,0,0,0.25)] max-[1150px]:rounded-[10px] max-[1150px]:px-[0.65rem] max-[1150px]:py-[0.35rem] min-[1150px]:font-medium ${activeSection === "about" ? "!bg-[#e9e9e9] !text-[#1b1c20] !shadow-[0_8px_18px_rgba(0,0,0,0.25)]" : ""}`}
                    onClick={(e) => scrollToSection(e, "about")}
                  >
                    <i className="ri-information-line text-xl text-inherit min-[1150px]:hidden"></i>
                    <span className="hidden min-[1150px]:block">About</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#featured"
                    className={`inline-flex min-h-[2.4rem] items-center justify-center rounded-md bg-transparent !px-[1.4rem] !py-[0.45rem] leading-none text-[var(--text-color)] transition-[color,background-color,box-shadow] duration-300 hover:bg-[#e9e9e9] hover:text-[#1b1c20] hover:shadow-[0_8px_18px_rgba(0,0,0,0.25)] max-[1150px]:rounded-[10px] max-[1150px]:px-[0.65rem] max-[1150px]:py-[0.35rem] min-[1150px]:font-medium ${activeSection === "featured" ? "!bg-[#e9e9e9] !text-[#1b1c20] !shadow-[0_8px_18px_rgba(0,0,0,0.25)]" : ""}`}
                    onClick={(e) => scrollToSection(e, "featured")}
                  >
                    <i className="ri-book-3-line text-xl text-inherit min-[1150px]:hidden"></i>
                    <span className="hidden min-[1150px]:block">Featured</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#plans"
                    className={`inline-flex min-h-[2.4rem] items-center justify-center rounded-md bg-transparent !px-[1.4rem] !py-[0.45rem] leading-none text-[var(--text-color)] transition-[color,background-color,box-shadow] duration-300 hover:bg-[#e9e9e9] hover:text-[#1b1c20] hover:shadow-[0_8px_18px_rgba(0,0,0,0.25)] max-[1150px]:rounded-[10px] max-[1150px]:px-[0.65rem] max-[1150px]:py-[0.35rem] min-[1150px]:font-medium ${activeSection === "plans" ? "!bg-[#e9e9e9] !text-[#1b1c20] !shadow-[0_8px_18px_rgba(0,0,0,0.25)]" : ""}`}
                    onClick={(e) => scrollToSection(e, "plans")}
                  >
                    <i className="ri-price-tag-3-line text-xl text-inherit min-[1150px]:hidden"></i>
                    <span className="hidden min-[1150px]:block">Plans</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonial"
                    className={`inline-flex min-h-[2.4rem] items-center justify-center rounded-md bg-transparent !px-[1.4rem] !py-[0.45rem] leading-none text-[var(--text-color)] transition-[color,background-color,box-shadow] duration-300 hover:bg-[#e9e9e9] hover:text-[#1b1c20] hover:shadow-[0_8px_18px_rgba(0,0,0,0.25)] max-[1150px]:rounded-[10px] max-[1150px]:px-[0.65rem] max-[1150px]:py-[0.35rem] min-[1150px]:font-medium ${activeSection === "testimonial" ? "!bg-[#e9e9e9] !text-[#1b1c20] !shadow-[0_8px_18px_rgba(0,0,0,0.25)]" : ""}`}
                    onClick={(e) => scrollToSection(e, "testimonial")}
                  >
                    <i className="ri-message-3-line text-xl text-inherit min-[1150px]:hidden"></i>
                    <span className="hidden min-[1150px]:block">
                      Testimonial
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="nav__actions flex items-center gap-x-4">
              <i
                className="ri-search-line duration-400 cursor-pointer text-xl text-[var(--title-color)] transition-colors dark:hover:!text-[#c7c9cf]"
                onClick={() => setIsSearchOpen(true)}
              ></i>
              <i
                className="ri-user-line login-button duration-400 cursor-pointer text-xl text-[var(--title-color)] transition-colors dark:hover:!text-[#c7c9cf]"
                id="login-button"
                onClick={() => setIsLoginOpen(true)}
                style={{ cursor: "pointer" }}
              ></i>
              <i
                className={`${themeIcon} change-theme duration-400 cursor-pointer text-xl text-[var(--title-color)] transition-colors dark:hover:!text-[#c7c9cf]`}
                onClick={toggleTheme}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </nav>
        </header>

        <div
          className={`duration-400 fixed left-0 z-[100] h-full w-full bg-[hsla(230,12%,96%,0.6)] px-6 pt-32 backdrop-blur-[12px] transition-[top] dark:bg-[rgba(17,18,20,0.88)] ${isSearchOpen ? "top-0" : "top-[-100%]"}`}
        >
          <form
            action=""
            className="flex items-center gap-x-2 rounded-xl border border-[var(--border-color)] bg-[var(--container-color)] px-4 dark:border-[#2a2c31] dark:bg-[#1d1e23]"
          >
            <i className="ri-search-line dark:text-[#f1f1f3]"></i>
            <input
              type="search"
              placeholder="What are you looking for?"
              className="w-full border-none bg-[var(--container-color)] py-4 font-[family-name:var(--body-font)] text-[length:var(--normal-font-size)] text-[var(--text-color)] outline-none dark:bg-[#1d1e23] dark:text-[#f1f1f3]"
            />
          </form>
          <i
            className="ri-close-line absolute right-8 top-8 cursor-pointer text-[2rem] text-[var(--title-color)] dark:text-[#f1f1f3]"
            onClick={() => setIsSearchOpen(false)}
          ></i>
        </div>

        {/*==================== MAIN ====================*/}
        <main className="overflow-hidden">
          {/*==================== HOME ====================*/}
          <section className="home py-20 pb-4" id="home">
            <div className="home__container mx-auto grid w-full max-w-[1220px] gap-x-6 gap-y-10 px-6 pt-8 min-[1220px]:grid-cols-[435px_745px] min-[1220px]:items-center min-[1220px]:pb-8 min-[1220px]:pt-28">
              <div
                className="home__data text-center min-[1220px]:text-left"
                data-reveal
              >
                <h1 className="home__title mb-4 font-[family-name:var(--body-font)] text-[length:var(--biggest-font-size)] text-[var(--title-color)]">
                  One Library, <br />
                  Infinite Stories
                </h1>
                <p className="home__description mb-8 font-[family-name:var(--second-font)] font-medium min-[1220px]:mb-16 dark:!text-[#b9bbc1]">
                  With Bookhive, every book has a place and every reader has a
                  path: search, borrow, and renew in a few clicks, while
                  librarians track everything effortlessly.
                </p>
                <a
                  href="#featured"
                  className="button duration-400 inline-block rounded-xl border border-[#f7f7f7] bg-[#111214] px-6 py-4 font-[family-name:Montserrat,sans-serif] font-bold text-[#f7f7f7] transition-[box-shadow] hover:border-[#111214] hover:bg-[#f7f7f7] hover:text-[#111214] dark:border-[#f7f7f7] dark:bg-[#111214] dark:text-[#f7f7f7] dark:hover:border-[#111214] dark:hover:bg-[#f7f7f7] dark:hover:text-[#111214] dark:hover:shadow-[0_6px_30px_rgba(0,0,0,0.25)]"
                  onClick={(e) => scrollToSection(e, "featured")}
                >
                  Explore Now
                </a>
              </div>
              <div className="home__images grid gap-6" data-reveal>
                <div
                  className="relative overflow-hidden"
                  ref={heroContainerRef}
                >
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: (() => {
                        const container = heroContainerRef.current;
                        if (!container) return "translateX(0px)";
                        const firstSlide =
                          container.querySelector(".home__article");
                        const slideWidth = firstSlide
                          ? firstSlide.offsetWidth
                          : 220;
                        const slideGap = 20;
                        const slideStep = slideWidth + slideGap;
                        const containerWidth = container.offsetWidth;
                        const offset =
                          containerWidth / 2 -
                          heroIndex * slideStep -
                          slideWidth / 2;
                        return `translateX(${offset}px)`;
                      })(),
                    }}
                  >
                    {heroBooks.length > 0
                      ? heroBooks.map((book, i) => (
                          <article
                            key={book.book_id}
                            className="home__article shrink-0 transition-[scale] duration-500 ease-in-out min-[1220px]:w-[290px] dark:!rounded-[6px] dark:!shadow-[0_16px_30px_rgba(0,0,0,0.35)]"
                            style={{
                              marginRight: "20px",
                              scale: i === heroIndex ? "1" : "0.8",
                            }}
                          >
                            <img
                              src={book.image}
                              alt={book.name}
                              className="home__img !h-[310px] !w-[220px] !max-w-none rounded-lg !object-cover min-[1220px]:!w-[290px] dark:!rounded-[6px]"
                            />
                          </article>
                        ))
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/*==================== SERVICES ====================*/}
          <section className="services py-20 pb-4">
            <div
              className="services__container grid max-w-6xl px-5"
              style={{
                gridTemplateColumns: "repeat(3, 1fr)",
                columnGap: 0,
                rowGap: "3rem",
                justifyContent: "stretch",
                margin: "0 auto",
              }}
            >
              <article
                className="services__card mt-10 flex flex-col items-center text-center"
                data-reveal
              >
                <div className="mb-4 flex h-20 items-end justify-center">
                  <img
                    src={freeShippingIcon}
                    alt="Free Shipping"
                    className="block max-h-full w-auto object-contain dark:brightness-0 dark:invert"
                  />
                </div>
                <h3 className="services__title mb-2 font-[family-name:var(--body-font)] text-[30px] font-normal text-[var(--first-color)] dark:!text-[#f1f1f3]">
                  Smart Catalog
                </h3>
                <p className="services__description font-[family-name:var(--second-font)] font-bold text-[#525252] dark:!text-[#a9abb2]">
                  Search, filter, and explore every book in your library easily
                </p>
              </article>
              <article
                className="services__card mt-10 flex flex-col items-center text-center"
                data-reveal
              >
                <div className="mb-4 flex h-20 items-end justify-center">
                  <img
                    src={secureInfoIcon}
                    alt="Secure Information"
                    className="block max-h-full w-auto object-contain dark:brightness-0 dark:invert"
                  />
                </div>
                <h3 className="services__title mb-2 font-[family-name:var(--body-font)] text-[30px] font-normal text-[var(--first-color)] dark:!text-[#f1f1f3]">
                  Secure Information
                </h3>
                <p className="services__description font-[family-name:var(--second-font)] font-bold text-[#525252] dark:!text-[#a9abb2]">
                  100% Secure Information
                </p>
              </article>
              <article
                className="services__card mt-10 flex flex-col items-center text-center"
                data-reveal
              >
                <div className="mb-4 flex h-20 items-end justify-center">
                  <img
                    src={chatbotIcon}
                    alt="Chatbot"
                    className="block max-h-full w-auto object-contain dark:brightness-0 dark:invert"
                  />
                </div>
                <h3 className="services__title mb-2 font-[family-name:var(--body-font)] text-[30px] font-normal text-[var(--first-color)] dark:!text-[#f1f1f3]">
                  ChatBot
                </h3>
                <p className="services__description font-[family-name:var(--second-font)] font-bold text-[#525252] dark:!text-[#a9abb2]">
                  Talk with us anytime
                </p>
              </article>
            </div>
          </section>

          {/*==================== about us====================*/}
          <section
            className="section-about px-5 py-14 pb-[72px]"
            id="about"
            aria-labelledby="about-heading"
          >
            <div className="mx-auto max-w-[var(--max-w)] px-5">
              <h2
                id="about-heading"
                className="about-title mb-7 text-center font-[family-name:var(--body-font)] text-[34px] font-normal text-[var(--accent)] dark:!text-[var(--title-color)]"
              >
                About Us
              </h2>
              <div className="about-grid grid grid-cols-[1fr_minmax(300px,420px)] items-center gap-8 max-[980px]:grid-cols-1 max-[980px]:text-center">
                <div className="about-left mx-auto max-w-[760px]">
                  <p className="about-text mb-[30px] text-center font-[family-name:var(--second-font)] text-base font-bold leading-relaxed text-[var(--muted)] dark:!text-[var(--muted)]">
                    We are a smart, technology-driven library system that uses
                    RFID to make book management faster and easier. Our platform
                    helps students and staff search, borrow, and track books
                    efficiently with a modern and user-friendly design.
                  </p>
                  <div
                    className="stats mb-7 flex flex-wrap items-start justify-center gap-12"
                    role="list"
                    aria-label="Quick facts"
                  >
                    <div
                      className="stat min-w-[90px] text-center"
                      role="listitem"
                    >
                      <div className="num mb-1.5 font-[family-name:var(--body-font)] text-xl font-normal text-[var(--accent)] dark:!text-[var(--title-color)]">
                        {stats.branches}+
                      </div>
                      <div className="label font-[family-name:var(--second-font)] text-[13px] font-bold text-[var(--muted)] dark:!text-[#9ea1a8]">
                        Branches
                      </div>
                    </div>
                    <div
                      className="stat min-w-[90px] text-center"
                      role="listitem"
                    >
                      <div className="num mb-1.5 font-[family-name:var(--body-font)] text-xl font-normal text-[var(--accent)] dark:!text-[var(--title-color)]">
                        {stats.books}+
                      </div>
                      <div className="label font-[family-name:var(--second-font)] text-[13px] font-bold text-[var(--muted)] dark:!text-[#9ea1a8]">
                        Books
                      </div>
                    </div>
                    <div
                      className="stat min-w-[90px] text-center"
                      role="listitem"
                    >
                      <div className="num mb-1.5 font-[family-name:var(--body-font)] text-xl font-normal text-[var(--accent)] dark:!text-[var(--title-color)]">
                        {stats.categories}+
                      </div>
                      <div className="label font-[family-name:var(--second-font)] text-[13px] font-bold text-[var(--muted)] dark:!text-[#9ea1a8]">
                        Categories
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full justify-center">
                    <a
                      className="about-cta inline-block rounded-xl border border-[#f7f7f7] bg-[#111214] px-6 py-3 font-[family-name:var(--second-font)] font-bold text-[#f7f7f7] no-underline transition-[background-color,color,border-color] duration-300 hover:border-[#111214] hover:bg-[#f7f7f7] hover:text-[#111214] dark:border-[#f7f7f7] dark:bg-[#111214] dark:text-[#f7f7f7] dark:hover:border-[#111214] dark:hover:bg-[#f7f7f7] dark:hover:text-[#111214] dark:hover:shadow-[0_6px_30px_rgba(0,0,0,0.25)]"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setActivePopup("branches");
                      }}
                    >
                      Where are we?
                    </a>
                  </div>
                </div>
                <div
                  className="about-right pointer-events-none relative flex h-[360px] items-center justify-center max-[980px]:order-[-1] max-[980px]:mb-[18px] max-[980px]:h-[280px] max-[520px]:h-[220px]"
                  aria-hidden="true"
                >
                  {aboutBooks.length >= 2 ? (
                    <>
                      <img
                        className="book back absolute left-4 z-[1] h-[320px] w-[220px] origin-center -translate-y-1.5 -rotate-12 rounded-md bg-white object-cover shadow-[0_18px_30px_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[520px]:h-[230px] max-[520px]:w-[160px] dark:shadow-[0_18px_32px_rgba(0,0,0,0.55)]"
                        src={aboutBooks[0].image}
                        alt={aboutBooks[0].name}
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                      />
                      <img
                        className="book front absolute right-[10px] z-[2] h-[320px] w-[220px] origin-center translate-y-1.5 rotate-12 rounded-md bg-white object-cover shadow-[0_18px_30px_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[520px]:h-[230px] max-[520px]:w-[160px] dark:shadow-[0_18px_32px_rgba(0,0,0,0.55)]"
                        src={aboutBooks[1].image}
                        alt={aboutBooks[1].name}
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                      />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          {/*==================== FEATURED ====================*/}
          <section className="featured py-20 pb-4" id="featured">
            <h2 className="section__title mb-8 text-center font-[family-name:var(--body-font)] text-[length:var(--h1-font-size)] font-extrabold">
              Featured Books
            </h2>
            <div
              className="featured__container mx-auto w-full max-w-[1220px] px-6"
              data-reveal
            >
              <div className="relative">
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${featuredIndex * (100 / featuredPerView)}%)`,
                    }}
                  >
                    {featuredBooks.map((book) => (
                      <article
                        key={book.book_id}
                        className="duration-400 relative flex h-[500px] shrink-0 flex-col items-center overflow-hidden rounded-[18px] border-none bg-white p-[20px_25px] text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-[box-shadow,background-color] dark:border-[#e4e4e7] dark:bg-[#f7f7f7] dark:shadow-[0_10px_26px_rgba(0,0,0,0.28)]"
                        style={{
                          width: `${100 / featuredPerView}%`,
                          margin: "0 8px",
                        }}
                      >
                        <img
                          src={book.image}
                          alt={book.name}
                          className="mx-auto mb-6 !h-[280px] !w-full !max-w-none rounded-[10px] object-cover"
                        />
                        <h2 className="mb-4 flex grow items-end justify-center font-[family-name:var(--second-font)] text-[28px] font-bold text-[#000035] dark:!text-[#1b1c20]">
                          {book.name}
                        </h2>
                        <button
                          className="button duration-400 inline-block cursor-pointer rounded-xl border border-[var(--first-color)] bg-[var(--first-color)] px-6 py-4 font-[family-name:var(--second-font)] font-bold text-[var(--white-color)] transition-[box-shadow] hover:border-[#000035] hover:bg-white hover:text-[#000035] dark:!border-[#1b1c20] dark:!bg-[#1b1c20] dark:!text-white dark:hover:!border-[#1b1c20] dark:hover:!bg-white dark:hover:!text-[#1b1c20]"
                          onClick={() => setSelectedFeaturedBook(book)}
                        >
                          Book Now
                        </button>
                      </article>
                    ))}
                  </div>
                </div>
                <button
                  onClick={featuredPrev}
                  className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border-none bg-[var(--first-color)] font-[family-name:var(--body-font)] text-[length:var(--normal-font-size)] text-white"
                >
                  <i className="ri-arrow-left-s-line text-xl"></i>
                </button>
                <button
                  onClick={featuredNext}
                  className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border-none bg-[var(--first-color)] font-[family-name:var(--body-font)] text-[length:var(--normal-font-size)] text-white"
                >
                  <i className="ri-arrow-right-s-line text-xl"></i>
                </button>
              </div>
            </div>
          </section>

          {/*==================== choose the best plan ====================*/}
          <section
            className="section px-5 py-14 pb-[72px]"
            id="plans"
            aria-labelledby="pricing-heading"
          >
            <div className="mx-auto max-w-[var(--max-w)] px-5 text-center">
              <h1
                id="pricing-heading"
                className="heading mb-2.5 font-[family-name:var(--body-font)] text-[44px] font-normal text-[var(--accent)] max-[680px]:text-[32px] dark:text-[#e3e4e8]"
              >
                Choose The best Plan
              </h1>
              <p className="subheading mb-10 font-[family-name:var(--second-font)] font-medium text-[var(--muted)] max-[680px]:text-sm dark:text-[#b3b6bd]">
                choose a plan that's right for your growing team. Simple pricing
                &amp; No hidden charges.
              </p>

              <div
                className="plans grid grid-cols-3 items-stretch gap-[var(--gap)] rounded-[18px] border border-[rgba(10,11,43,0.08)] bg-white p-9 shadow-[var(--card-shadow)] max-[1000px]:grid-cols-2 max-[1000px]:p-7 max-[680px]:grid-cols-1 max-[680px]:p-[22px] dark:!border-none dark:!bg-transparent dark:!shadow-none"
                role="list"
              >
                <article
                  className="plan flex min-h-[420px] flex-col justify-start rounded-[var(--card-radius)] border-none bg-[var(--card-bg)] px-7 py-[34px] text-[var(--accent)] shadow-[0_10px_18px_rgba(10,10,35,0.08)] transition-[transform,box-shadow] duration-[280ms] ease-in-out hover:shadow-[var(--card-shadow-hover)] max-[680px]:min-h-[380px] dark:border-none dark:shadow-[0_18px_28px_rgba(0,0,0,0.4)]"
                  role="listitem"
                  aria-labelledby="plan-discover"
                >
                  <div
                    id="plan-discover"
                    className="plan-title mb-[18px] font-[family-name:var(--body-font)] text-2xl font-normal uppercase tracking-wider text-[var(--accent)]"
                  >
                    Discover
                  </div>
                  <div className="price mb-6 font-[family-name:Inter,sans-serif] text-[30px] font-normal text-[var(--accent)] dark:!text-[#e3e4e8]">
                    <span className="small-price text-[30px]">$99</span>
                    <small className="ml-2 text-lg font-normal text-[var(--accent)] dark:!text-[#b9bbc1]">
                      / Per Month
                    </small>
                  </div>
                  <div className="features mb-7 mt-1.5 flex-1 text-left">
                    <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-[15px] font-normal text-[var(--accent)] dark:!text-[#cfd1d7]">
                      <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)] dark:!text-[#e3e4e8]">
                        &#10003;
                      </span>
                      Borrow up to 3 books per month.
                    </div>
                    <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-[15px] font-normal text-[var(--accent)] dark:!text-[#cfd1d7]">
                      <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)] dark:!text-[#e3e4e8]">
                        &#10003;
                      </span>
                      Loan period: 7 days per book.
                    </div>
                    <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-[15px] font-normal text-[var(--accent)] dark:!text-[#cfd1d7]">
                      <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)] dark:!text-[#e3e4e8]">
                        &#10003;
                      </span>
                      1 renewal per book
                    </div>
                  </div>
                  <a
                    className="btn mx-auto mt-3 inline-block rounded-xl border border-[var(--accent)] bg-white px-8 py-2.5 font-[family-name:var(--second-font)] font-normal text-[var(--accent)] no-underline transition-[background,color,transform,box-shadow] duration-[180ms] ease-in-out hover:border-[#D7D7D7] hover:bg-[#D7D7D7] hover:text-[#0a0b2b] dark:!border-[#7b7f88] dark:!bg-transparent dark:!text-[#e3e4e8] dark:!shadow-none dark:hover:!border-[#d7d7d7] dark:hover:!bg-[#d7d7d7] dark:hover:!text-[#0a0b2b]"
                    href="#"
                    role="button"
                    aria-label="Subscribe to Discover"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsLoginOpen(true);
                    }}
                  >
                    Subscribe
                  </a>
                </article>

                <article
                  className="plan center -mt-2.5 flex min-h-[450px] flex-col justify-start rounded-[var(--card-radius)] border-2 border-[var(--center-border)] bg-[var(--center-bg)] px-7 py-[34px] pt-10 text-[var(--accent)] shadow-[0_16px_28px_rgba(10,10,35,0.14)] transition-[transform,box-shadow] duration-[280ms] ease-in-out hover:shadow-[0_18px_32px_rgba(10,10,35,0.16)] max-[1000px]:mt-0 max-[1000px]:min-h-[420px] max-[680px]:min-h-[380px] dark:!border-2 dark:!border-[#d7d7d7] dark:!shadow-[0_18px_28px_rgba(0,0,0,0.4)]"
                  role="listitem"
                  aria-labelledby="plan-enterprise"
                >
                  <div
                    id="plan-enterprise"
                    className="plan-title mb-[18px] font-[family-name:var(--body-font)] text-[26px] font-normal uppercase tracking-wider text-[var(--accent)]"
                  >
                    Enterprise
                  </div>
                  <div className="price mb-6 font-[family-name:Inter,sans-serif] text-[34px] font-normal text-[var(--accent)] dark:!text-[#e3e4e8]">
                    <span>$299</span>
                    <small className="ml-2 text-lg font-normal text-[var(--accent)] dark:!text-[#b9bbc1]">
                      / Per Month
                    </small>
                  </div>
                  <div className="features mb-7 mt-1.5 flex-1 text-left">
                    <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-base font-normal text-[var(--accent)] dark:!text-[#cfd1d7]">
                      <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)] dark:!text-[#e3e4e8]">
                        &#10003;
                      </span>
                      Borrow up to 15 books per month
                    </div>
                    <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-base font-normal text-[var(--accent)] dark:!text-[#cfd1d7]">
                      <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)] dark:!text-[#e3e4e8]">
                        &#10003;
                      </span>
                      Loan period: 21 days per book.
                    </div>
                    <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-base font-normal text-[var(--accent)] dark:!text-[#cfd1d7]">
                      <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)] dark:!text-[#e3e4e8]">
                        &#10003;
                      </span>
                      3 renewal per book
                    </div>
                  </div>
                  <a
                    className="btn mx-auto mt-3 inline-block rounded-xl border border-[var(--accent)] bg-[var(--accent)] px-8 py-2.5 font-[family-name:var(--second-font)] font-normal text-white no-underline shadow-[0_8px_16px_rgba(10,11,43,0.18)] transition-[background,color,transform,box-shadow] duration-[180ms] ease-in-out dark:!border-[#d7d7d7] dark:!bg-[#d7d7d7] dark:!text-[#111214] dark:!shadow-[0_10px_18px_rgba(0,0,0,0.35)] dark:hover:!border-[#f0f0f0] dark:hover:!bg-[#f0f0f0] dark:hover:!text-[#15161b]"
                    href="#"
                    role="button"
                    aria-label="Subscribe to Enterprise"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsLoginOpen(true);
                    }}
                  >
                    Subscribe
                  </a>
                </article>

                <article
                  className="plan flex min-h-[420px] flex-col justify-start rounded-[var(--card-radius)] border-none bg-[var(--card-bg)] px-7 py-[34px] text-[var(--accent)] shadow-[0_10px_18px_rgba(10,10,35,0.08)] transition-[transform,box-shadow] duration-[280ms] ease-in-out hover:shadow-[var(--card-shadow-hover)] max-[680px]:min-h-[380px] dark:border-none dark:shadow-[0_18px_28px_rgba(0,0,0,0.4)]"
                  role="listitem"
                  aria-labelledby="plan-pro"
                >
                  <div
                    id="plan-pro"
                    className="plan-title mb-[18px] font-[family-name:var(--body-font)] text-2xl font-normal uppercase tracking-wider text-[var(--accent)]"
                  >
                    Professional
                  </div>
                  <div className="price mb-6 font-[family-name:Inter,sans-serif] text-[30px] font-normal text-[var(--accent)] dark:!text-[#e3e4e8]">
                    <span className="small-price text-[30px]">$199</span>
                    <small className="ml-2 text-lg font-normal text-[var(--accent)] dark:!text-[#b9bbc1]">
                      / Per Month
                    </small>
                  </div>
                  <div className="features mb-7 mt-1.5 flex-1 text-left">
                    <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-[15px] font-normal text-[var(--accent)] dark:!text-[#cfd1d7]">
                      <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)] dark:!text-[#e3e4e8]">
                        &#10003;
                      </span>
                      Borrow up to 10 books per month
                    </div>
                    <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-[15px] font-normal text-[var(--accent)] dark:!text-[#cfd1d7]">
                      <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)] dark:!text-[#e3e4e8]">
                        &#10003;
                      </span>
                      Loan period: 14 days per book.
                    </div>
                    <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-[15px] font-normal text-[var(--accent)] dark:!text-[#cfd1d7]">
                      <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)] dark:!text-[#e3e4e8]">
                        &#10003;
                      </span>
                      2 renewal per book
                    </div>
                  </div>
                  <a
                    className="btn mx-auto mt-3 inline-block rounded-xl border border-[var(--accent)] bg-white px-8 py-2.5 font-[family-name:var(--second-font)] font-normal text-[var(--accent)] no-underline transition-[background,color,transform,box-shadow] duration-[180ms] ease-in-out hover:border-[#D7D7D7] hover:bg-[#D7D7D7] hover:text-[#0a0b2b] dark:!border-[#7b7f88] dark:!bg-transparent dark:!text-[#e3e4e8] dark:!shadow-none dark:hover:!border-[#d7d7d7] dark:hover:!bg-[#d7d7d7] dark:hover:!text-[#0a0b2b]"
                    href="#"
                    role="button"
                    aria-label="Subscribe to Professional"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsLoginOpen(true);
                    }}
                  >
                    Subscribe
                  </a>
                </article>
              </div>
            </div>
          </section>

          {/*==================== TESTIMONIAL ====================*/}
          <section className="testimonial py-20 pb-4" id="testimonial">
            <h2 className="section__title mb-8 text-center font-[family-name:var(--body-font)] text-[length:var(--h1-font-size)] font-extrabold">
              Customer Opinions
            </h2>
            <div
              className="testimonial__container mx-auto w-full max-w-[1220px] px-6"
              data-reveal
            >
              <div className="relative">
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform:
                        feedbacks.length > 0
                          ? `translateX(-${testimonialIndex * (100 / testimonialPerView)}%)`
                          : "none",
                    }}
                  >
                    {feedbacks.length > 0 ? (
                      feedbacks.map((fb) => {
                        const fullStars = Math.floor(fb.rate);
                        const hasHalf = fb.rate % 1 >= 0.5;
                        return (
                          <article
                            key={fb.request_id}
                            className="testimonial__card duration-400 shrink-0 border-2 border-[var(--border-color)] bg-[var(--container-color)] px-12 py-8 pb-10 text-center transition-[border,background-color] dark:border-[#e4e4e7] dark:bg-[#f7f7f7] dark:shadow-[0_10px_26px_rgba(0,0,0,0.28)]"
                            style={{ width: `${100 / testimonialPerView}%` }}
                          >
                            <img
                              src={testimonialImg1}
                              alt={fb.user_id}
                              className="testimonial__img mx-auto mb-6 w-[100px] rounded-full"
                            />
                            <h2 className="testimonial__title mb-3 font-[family-name:var(--body-font)] text-[length:var(--h2-font-size)] font-normal dark:!text-[#1b1c20]">
                              {fb.user_id}
                            </h2>
                            <p className="testimonial__description mb-5 font-[family-name:var(--second-font)] text-[length:var(--small-font-size)] font-bold dark:!text-[#5f6167]">
                              {fb.description || "Great experience!"}
                            </p>
                            <div className="testimonial__stars text-[var(--first-color)]">
                              {Array.from({ length: fullStars }, (_, i) => (
                                <i
                                  key={`full-${i}`}
                                  className="ri-star-fill"
                                ></i>
                              ))}
                              {hasHalf && <i className="ri-star-half-fill"></i>}
                              {Array.from(
                                { length: 5 - fullStars - (hasHalf ? 1 : 0) },
                                (_, i) => (
                                  <i
                                    key={`empty-${i}`}
                                    className="ri-star-line"
                                  ></i>
                                ),
                              )}
                            </div>
                          </article>
                        );
                      })
                    ) : (
                      <div className="flex w-full items-center justify-center py-16">
                        <p className="font-[family-name:var(--second-font)] text-lg font-bold text-[var(--muted)]">
                          No feedback yet. Be the first to share your
                          experience!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/*==================== FOOTER ====================*/}
        <footer
          className="footer px-5 pb-[30px] pt-[60px] font-[family-name:var(--second-font)] text-[#525252] dark:!bg-[#101114]"
          data-reveal
        >
          <div className="footer-container mx-auto grid max-w-[1200px] grid-cols-[340px_repeat(3,1fr)] items-start gap-10 max-[950px]:grid-cols-2 max-[950px]:text-center max-[600px]:grid-cols-1">
            <div className="footer-col footer-brand max-[950px]:col-span-2 max-[600px]:col-span-1">
              <a
                href="#"
                className="footer-logo flex items-center gap-2.5 text-[#0a0b2b] no-underline dark:!text-white"
              >
                <img
                  src={logoIcon}
                  alt="Book Hive Logo"
                  style={{ width: "60px", height: "auto" }}
                  className="dark:brightness-[1.2] dark:invert"
                />
                <div className="logo-text">
                  <span className="name font-[family-name:var(--body-font)] text-[22px] font-extrabold dark:!text-white">
                    BookHive
                  </span>
                  <span className="sub -mt-1 block font-[family-name:var(--second-font)] text-xs font-semibold dark:!text-white">
                    Library
                  </span>
                </div>
              </a>
              <p className="footer-description mt-2.5 font-semibold leading-relaxed text-[#555] dark:!text-white">
                Find and explore the best <br />
                eBooks from all your <br />
                favorite writers.
              </p>
            </div>
            <div className="footer-col">
              <h3 className="footer-title mb-4 font-[family-name:var(--body-font)] text-lg font-extrabold dark:!text-white">
                About
              </h3>
              <ul className="footer-links list-none">
                <li className="mb-2.5 font-bold text-[#333] dark:!text-white">
                  <a
                    href="#"
                    className="inline-flex items-center rounded-full px-3 py-1.5 text-[#333] no-underline transition-[color,background-color,transform] duration-200 hover:-translate-y-px hover:bg-[#f2f2f6] hover:text-[#0a0b2b] dark:!text-white dark:hover:!bg-white dark:hover:!text-[#111214]"
                  >
                    Who are we ?
                  </a>
                </li>
                <li className="mb-2.5 font-semibold text-[#333] dark:!text-white">
                  <a
                    href="#"
                    className="inline-flex items-center rounded-full px-3 py-1.5 text-[#333] no-underline transition-[color,background-color,transform] duration-200 hover:-translate-y-px hover:bg-[#f2f2f6] hover:text-[#0a0b2b] dark:!text-white dark:hover:!bg-white dark:hover:!text-[#111214]"
                  >
                    Our Branches
                  </a>
                </li>
                <li className="mb-2.5 font-semibold text-[#333] dark:!text-white">
                  <a
                    href="#"
                    className="inline-flex items-center rounded-full px-3 py-1.5 text-[#333] no-underline transition-[color,background-color,transform] duration-200 hover:-translate-y-px hover:bg-[#f2f2f6] hover:text-[#0a0b2b] dark:!text-white dark:hover:!bg-white dark:hover:!text-[#111214]"
                  >
                    Customer Feedback
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h3 className="footer-title mb-4 font-[family-name:var(--body-font)] text-lg font-extrabold dark:!text-white">
                Contact
              </h3>
              <ul className="footer-links list-none">
                <li className="mb-2.5 font-bold text-[#333] dark:!text-white">
                  Cairo, Egypt
                </li>
                <li className="mb-2.5 font-semibold text-[#333] dark:!text-white">
                  BookHive@gmail.com
                </li>
                <li className="mb-2.5 font-semibold text-[#333] dark:!text-white">
                  01122334455
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h3 className="footer-title mb-4 font-[family-name:var(--body-font)] text-lg font-extrabold dark:!text-white">
                Social
              </h3>
              <div className="footer-social">
                <a
                  href="#"
                  className="mr-3 text-[22px] text-[#0a0b2b] transition-all duration-200 hover:opacity-60 dark:!text-white"
                >
                  <i className="ri-facebook-circle-line"></i>
                </a>
                <a
                  href="#"
                  className="mr-3 text-[22px] text-[#0a0b2b] transition-all duration-200 hover:opacity-60 dark:!text-white"
                >
                  <i className="ri-instagram-line"></i>
                </a>
                <a
                  href="#"
                  className="mr-3 text-[22px] text-[#0a0b2b] transition-all duration-200 hover:opacity-60 dark:!text-white"
                >
                  <i className="ri-twitter-x-line"></i>
                </a>
              </div>
            </div>
          </div>
          <p className="footer-copy mt-10 text-center font-[family-name:var(--second-font)] font-bold text-[#333] dark:!text-white">
            &copy; All Rights Reserved By BookHive
          </p>
        </footer>

        {/*========== SCROLL UP ==========*/}
        <a
          href="#"
          className={`duration-400 fixed right-4 z-10 inline-flex bg-[var(--container-color)] p-1.5 text-xl text-[var(--title-color)] shadow-[0_2px_8px_hsla(0,0%,0%,0.1)] transition-[bottom,transform,background-color] hover:-translate-y-2 dark:shadow-[0_2px_8px_hsla(0,0%,0%,0.4)] ${showScrollUp ? "bottom-24 min-[1150px]:bottom-12" : "-bottom-1/2"}`}
          id="scroll-up"
        >
          <i className="ri-arrow-up-line"></i>
        </a>

        {/*========== AUTH POPUPS ==========*/}
        <LoginPopup
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onForgotPassword={() => setIsForgotPasswordOpen(true)}
          onSignup={() => setIsSignupOpen(true)}
        />
        <SignupPopup
          isOpen={isSignupOpen}
          onClose={() => setIsSignupOpen(false)}
          onLogin={() => setIsLoginOpen(true)}
        />
        <ForgotPasswordPopup
          isOpen={isForgotPasswordOpen}
          onClose={() => setIsForgotPasswordOpen(false)}
          onOTP={() => setIsOTPOpen(true)}
          onBack={() => setIsLoginOpen(true)}
        />
        <OTPPopup
          isOpen={isOTPOpen}
          onClose={() => setIsOTPOpen(false)}
          onResetPassword={() => setIsResetPasswordOpen(true)}
          onBack={() => setIsForgotPasswordOpen(true)}
        />
        <ResetPasswordPopup
          isOpen={isResetPasswordOpen}
          onClose={() => setIsResetPasswordOpen(false)}
          onLogin={() => setIsLoginOpen(true)}
          onBack={() => setIsOTPOpen(true)}
        />
        <AboutBranchesPopup
          isOpen={activePopup === "branches"}
          onClose={() => setActivePopup(null)}
        />
        <FeaturedBookPopup
          isOpen={Boolean(selectedFeaturedBook)}
          book={selectedFeaturedBook}
          onClose={() => setSelectedFeaturedBook(null)}
        />
      </div>
    </>
  );
};

export default Home;
