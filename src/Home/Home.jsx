import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPopup from "../shared/LoginPopup";
import SignupPopup from "../shared/SignupPopup";
import ForgotPasswordPopup from "../shared/ForgotPasswordPopup";
import OTPPopup from "../shared/OTPPopup";
import ResetPasswordPopup from "../shared/ResetPasswordPopup";
import AboutBranchesPopup from "../components/AboutBranchesPopup";
import FeaturedBookPopup from "../components/FeaturedBookPopup";
import logoIcon from "./assets/bookhive_icon_only_black-removebg-preview 2.svg";
import testimonialImg1 from "./assets/img/testimonial-perfil-1.png";
import freeShippingIcon from "./assets/free shipping.png";
import secureInfoIcon from "./assets/secure information.png";
import chatbotIcon from "./assets/chatbot.png";
import "./css/swiper-bundle.min.css";
import "./css/styles.css";
import "./css/stylesNew.css";

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
      // Use setTimeout so the React render has a chance to execute and put items in DOM
      setTimeout(() => setIsContentReady(true), 100);
    });

    const handleFeedbackUpdate = () => loadFeedbacks();
    window.addEventListener("mockFeedbackUpdated", handleFeedbackUpdate);
    return () =>
      window.removeEventListener("mockFeedbackUpdated", handleFeedbackUpdate);
  }, []);

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
    if (!isContentReady) return;

    const loadScript = (src, id) => {
      return new Promise((resolve, reject) => {
        const existingScript = document.getElementById(id);
        if (existingScript) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.id = id;
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.body.appendChild(script);
      });
    };

    const initScripts = async () => {
      try {
        await loadScript(
          new URL("./js/scrollreveal.min.js", import.meta.url).href,
          "scrollreveal",
        );
        await loadScript(
          new URL("./js/swiper-bundle.min.js", import.meta.url).href,
          "swiper",
        );
        await loadScript(new URL("./js/main.js", import.meta.url).href, "main");
      } catch (error) {
        console.error("Error loading scripts:", error);
      }
    };

    initScripts();
  }, [navigate, isContentReady]);

  return (
    <div className="home-page">
      <header
        className="header duration-400 fixed top-0 z-[100] w-full bg-[var(--body-color)] transition-[box-shadow,background-color]"
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
            />
          </a>

          <div className="nav__menu">
            <ul className="nav__list flex items-center justify-between">
              <li className="nav__item">
                <a
                  href="#home"
                  className="nav__link inline-flex min-h-[2.4rem] items-center justify-center rounded-md bg-transparent px-[1.4rem] py-[0.45rem] leading-none text-[var(--text-color)] transition-[color,background-color,box-shadow] duration-300"
                  onClick={(e) => scrollToSection(e, "home")}
                >
                  <i className="ri-home-4-line"></i>
                  <span className="hidden">Home</span>
                </a>
              </li>
              <li className="nav__item">
                <a
                  href="#about"
                  className="nav__link inline-flex min-h-[2.4rem] items-center justify-center rounded-md bg-transparent px-[1.4rem] py-[0.45rem] leading-none text-[var(--text-color)] transition-[color,background-color,box-shadow] duration-300"
                  onClick={(e) => scrollToSection(e, "about")}
                >
                  <i className="ri-information-line"></i>
                  <span className="hidden">About</span>
                </a>
              </li>
              <li className="nav__item">
                <a
                  href="#featured"
                  className="nav__link inline-flex min-h-[2.4rem] items-center justify-center rounded-md bg-transparent px-[1.4rem] py-[0.45rem] leading-none text-[var(--text-color)] transition-[color,background-color,box-shadow] duration-300"
                  onClick={(e) => scrollToSection(e, "featured")}
                >
                  <i className="ri-book-3-line"></i>
                  <span className="hidden">Featured</span>
                </a>
              </li>
              <li className="nav__item">
                <a
                  href="#plans"
                  className="nav__link inline-flex min-h-[2.4rem] items-center justify-center rounded-md bg-transparent px-[1.4rem] py-[0.45rem] leading-none text-[var(--text-color)] transition-[color,background-color,box-shadow] duration-300"
                  onClick={(e) => scrollToSection(e, "plans")}
                >
                  <i className="ri-price-tag-3-line"></i>
                  <span className="hidden">Plans</span>
                </a>
              </li>
              <li className="nav__item">
                <a
                  href="#testimonial"
                  className="nav__link inline-flex min-h-[2.4rem] items-center justify-center rounded-md bg-transparent px-[1.4rem] py-[0.45rem] leading-none text-[var(--text-color)] transition-[color,background-color,box-shadow] duration-300"
                  onClick={(e) => scrollToSection(e, "testimonial")}
                >
                  <i className="ri-message-3-line"></i>
                  <span className="hidden">Testimonial</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="nav__actions flex items-center gap-x-4">
            <i
              className="ri-search-line search-button duration-400 cursor-pointer text-xl text-[var(--title-color)] transition-colors"
              id="search-button"
            ></i>
            <i
              className="ri-user-line login-button duration-400 cursor-pointer text-xl text-[var(--title-color)] transition-colors"
              id="login-button"
              onClick={() => setIsLoginOpen(true)}
              style={{ cursor: "pointer" }}
            ></i>
            <i
              className={`${themeIcon} change-theme duration-400 cursor-pointer text-xl text-[var(--title-color)] transition-colors`}
              onClick={toggleTheme}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        </nav>
      </header>

      {/*==================== SEARCH ====================*/}
      <div
        className="search duration-400 fixed left-0 top-[-100%] z-[100] h-full w-full bg-[hsla(230,12%,96%,0.6)] px-6 pt-32 backdrop-blur-[12px] transition-[top]"
        id="search-content"
      >
        <form
          action=""
          className="search__form flex items-center gap-x-2 rounded-xl border border-[var(--border-color)] bg-[var(--container-color)] px-4"
        >
          <i className="ri-search-line search__icon"></i>
          <input
            type="search"
            placeholder="What are you looking for?"
            className="search__input w-full border-none bg-[var(--container-color)] py-4 text-[var(--text-color)] outline-none"
          />
        </form>
        <i
          className="ri-close-line search__close absolute right-8 top-8 cursor-pointer text-[2rem] text-[var(--title-color)]"
          id="search-close"
        ></i>
      </div>

      {/*==================== MAIN ====================*/}
      <main className="main overflow-hidden">
        {/*==================== HOME ====================*/}
        <section className="home section py-20 pb-4" id="home">
          <div className="home__container container grid gap-y-10 pt-8">
            <div className="home__data text-center">
              <h1 className="home__title mb-4 text-[var(--biggest-font-size)] text-[var(--title-color)]">
                One Library, <br />
                Infinite Stories
              </h1>
              <p className="home__description mb-8 font-[family-name:var(--second-font)] font-medium">
                With Bookhive, every book has a place and every reader has a
                path: search, borrow, and renew in a few clicks, while
                librarians track everything effortlessly.
              </p>
              <a
                href="#featured"
                className="button duration-400 inline-block rounded-xl border border-[#f7f7f7] bg-[#111214] px-6 py-4 font-[family-name:Montserrat,sans-serif] font-bold text-[#f7f7f7] transition-[box-shadow] hover:border-[#111214] hover:bg-[#f7f7f7] hover:text-[#111214]"
                onClick={(e) => scrollToSection(e, "featured")}
              >
                Explore Now
              </a>
            </div>
            <div className="home__images grid">
              <div className="home__swiper swiper !m-0">
                <div className="swiper-wrapper">
                  {heroBooks.length > 0
                    ? heroBooks.map((book) => (
                        <article
                          key={book.book_id}
                          className="home__article swiper-slide duration-400 w-[220px] scale-[0.8] transition-transform"
                        >
                          <img
                            src={book.image}
                            alt={book.name}
                            className="home__img !h-[310px] !w-[220px] rounded-lg object-cover"
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
        <section className="services section py-20 pb-4">
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
            <article className="services__card mt-10 flex flex-col items-center text-center">
              <div className="mb-4 flex h-20 items-end justify-center">
                <img
                  src={freeShippingIcon}
                  alt="Free Shipping"
                  className="block max-h-full w-auto object-contain"
                />
              </div>
              <h3 className="services__title mb-2 font-[family-name:var(--body-font)] text-[30px] font-normal text-[var(--first-color)]">
                Smart Catalog
              </h3>
              <p className="services__description font-[family-name:var(--second-font)] font-bold text-[#525252]">
                Search, filter, and explore every book in your library easily
              </p>
            </article>
            <article className="services__card mt-10 flex flex-col items-center text-center">
              <div className="mb-4 flex h-20 items-end justify-center">
                <img
                  src={secureInfoIcon}
                  alt="Secure Information"
                  className="block max-h-full w-auto object-contain"
                />
              </div>
              <h3 className="services__title mb-2 font-[family-name:var(--body-font)] text-[30px] font-normal text-[var(--first-color)]">
                Secure Information
              </h3>
              <p className="services__description font-[family-name:var(--second-font)] font-bold text-[#525252]">
                100% Secure Information
              </p>
            </article>
            <article className="services__card mt-10 flex flex-col items-center text-center">
              <div className="mb-4 flex h-20 items-end justify-center">
                <img
                  src={chatbotIcon}
                  alt="Chatbot"
                  className="block max-h-full w-auto object-contain"
                />
              </div>
              <h3 className="services__title mb-2 font-[family-name:var(--body-font)] text-[30px] font-normal text-[var(--first-color)]">
                ChatBot
              </h3>
              <p className="services__description font-[family-name:var(--second-font)] font-bold text-[#525252]">
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
          <div className="container mx-auto max-w-[var(--max-w)] px-5">
            <h2
              id="about-heading"
              className="about-title mb-7 text-center font-[family-name:var(--body-font)] text-[34px] font-normal text-[var(--accent)]"
            >
              About Us
            </h2>
            <div className="about-grid grid grid-cols-[1fr_minmax(300px,420px)] items-center gap-8 max-[980px]:grid-cols-1 max-[980px]:text-center">
              <div className="about-left mx-auto max-w-[760px]">
                <p className="about-text mb-[30px] text-center font-[family-name:var(--second-font)] text-base font-bold leading-relaxed text-[var(--muted)]">
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
                    <div className="num mb-1.5 font-[family-name:var(--body-font)] text-xl font-normal text-[var(--accent)]">
                      {stats.branches}+
                    </div>
                    <div className="label font-[family-name:var(--second-font)] text-[13px] font-bold text-[var(--muted)]">
                      Branches
                    </div>
                  </div>
                  <div
                    className="stat min-w-[90px] text-center"
                    role="listitem"
                  >
                    <div className="num mb-1.5 font-[family-name:var(--body-font)] text-xl font-normal text-[var(--accent)]">
                      {stats.books}+
                    </div>
                    <div className="label font-[family-name:var(--second-font)] text-[13px] font-bold text-[var(--muted)]">
                      Books
                    </div>
                  </div>
                  <div
                    className="stat min-w-[90px] text-center"
                    role="listitem"
                  >
                    <div className="num mb-1.5 font-[family-name:var(--body-font)] text-xl font-normal text-[var(--accent)]">
                      {stats.categories}+
                    </div>
                    <div className="label font-[family-name:var(--second-font)] text-[13px] font-bold text-[var(--muted)]">
                      Categories
                    </div>
                  </div>
                </div>
                <div>
                  <a
                    className="about-cta inline-block rounded-xl border border-[#f7f7f7] bg-[#111214] px-6 py-3 font-[family-name:var(--second-font)] font-bold text-[#f7f7f7] no-underline transition-[background-color,color,border-color] duration-300 hover:border-[#111214] hover:bg-[#f7f7f7] hover:text-[#111214]"
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
                      className="book back absolute left-4 z-[1] h-[320px] w-[220px] origin-center -translate-y-1.5 -rotate-12 rounded-md bg-white object-cover shadow-[0_18px_30px_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[520px]:h-[230px] max-[520px]:w-[160px]"
                      src={aboutBooks[0].image}
                      alt={aboutBooks[0].name}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <img
                      className="book front absolute right-[10px] z-[2] h-[320px] w-[220px] origin-center translate-y-1.5 rotate-12 rounded-md bg-white object-cover shadow-[0_18px_30px_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[520px]:h-[230px] max-[520px]:w-[160px]"
                      src={aboutBooks[1].image}
                      alt={aboutBooks[1].name}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/*==================== FEATURED ====================*/}
        <section className="featured section py-20 pb-4" id="featured">
          <h2 className="section__title mb-8 text-center font-[family-name:var(--body-font)] font-normal text-[var(--h1-font-size)]">
            Featured Books
          </h2>
          <div className="featured__container container">
            <div className="featured__swiper swiper">
              <div className="swiper-wrapper">
                {featuredBooks.map((book) => (
                  <article
                    key={book.book_id}
                    className="featured__card swiper-slide duration-400 relative overflow-hidden text-center transition-[box-shadow,background-color]"
                  >
                    <img
                      src={book.image}
                      alt={book.name}
                      className="featured__img mx-auto mb-3 !h-[220px] !w-[150px] rounded-[10px] object-cover"
                    />
                    <h2 className="featured__title mb-2 font-[family-name:var(--second-font)] text-[15px] font-bold text-[#525252]">
                      {book.name}
                    </h2>
                    <button
                      className="button duration-400 inline-block cursor-pointer rounded-xl border border-[var(--first-color)] bg-[var(--first-color)] px-6 py-4 font-[family-name:var(--second-font)] font-bold text-[var(--white-color)] transition-[box-shadow] hover:border-[#000035] hover:bg-white hover:text-[#000035]"
                      onClick={() => setSelectedFeaturedBook(book)}
                    >
                      Book Now
                    </button>
                  </article>
                ))}
              </div>
              <div className="swiper-button-prev !flex !h-11 !w-11 !items-center !justify-center !rounded-lg !bg-[var(--first-color)] !text-white">
                <i className="ri-arrow-left-s-line !text-xl"></i>
              </div>
              <div className="swiper-button-next !flex !h-11 !w-11 !items-center !justify-center !rounded-lg !bg-[var(--first-color)] !text-white">
                <i className="ri-arrow-right-s-line !text-xl"></i>
              </div>
            </div>
          </div>
        </section>

        {/*==================== choose the best plan ====================*/}
        <section
          className="section px-5 py-14 pb-[72px]"
          id="plans"
          aria-labelledby="pricing-heading"
        >
          <div className="container mx-auto max-w-[var(--max-w)] px-5 text-center">
            <h1
              id="pricing-heading"
              className="heading mb-2.5 font-[family-name:var(--body-font)] text-[44px] font-normal text-[var(--accent)] max-[680px]:text-[32px]"
            >
              Choose The best Plan
            </h1>
            <p className="subheading mb-10 font-[family-name:var(--second-font)] font-medium text-[var(--muted)] max-[680px]:text-sm">
              choose a plan that's right for your growing team. Simple pricing
              &amp; No hidden charges.
            </p>

            <div
              className="plans grid grid-cols-3 items-stretch gap-[var(--gap)] rounded-[18px] border border-[rgba(10,11,43,0.08)] bg-white p-9 shadow-[var(--card-shadow)] max-[1000px]:grid-cols-2 max-[1000px]:p-7 max-[680px]:grid-cols-1 max-[680px]:p-[22px]"
              role="list"
            >
              <article
                className="plan flex min-h-[420px] flex-col justify-start rounded-[var(--card-radius)] border-none bg-[var(--card-bg)] px-7 py-[34px] text-[var(--accent)] shadow-[0_10px_18px_rgba(10,10,35,0.08)] transition-[transform,box-shadow] duration-[280ms] ease-in-out hover:shadow-[var(--card-shadow-hover)] max-[680px]:min-h-[380px]"
                role="listitem"
                aria-labelledby="plan-discover"
              >
                <div
                  id="plan-discover"
                  className="plan-title mb-[18px] font-[family-name:var(--body-font)] text-2xl font-normal uppercase tracking-wider text-[var(--accent)]"
                >
                  Discover
                </div>
                <div className="price mb-6 font-[family-name:Inter,sans-serif] text-[30px] font-normal text-[var(--accent)]">
                  <span className="small-price text-[30px]">$99</span>
                  <small className="ml-2 text-lg font-normal text-[var(--accent)]">
                    / Per Month
                  </small>
                </div>
                <div className="features mb-7 mt-1.5 flex-1 text-left">
                  <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-[15px] font-normal text-[var(--accent)]">
                    <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)]">
                      &#10003;
                    </span>
                    Borrow up to 3 books per month.
                  </div>
                  <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-[15px] font-normal text-[var(--accent)]">
                    <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)]">
                      &#10003;
                    </span>
                    Loan period: 7 days per book.
                  </div>
                  <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-[15px] font-normal text-[var(--accent)]">
                    <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)]">
                      &#10003;
                    </span>
                    1 renewal per book
                  </div>
                </div>
                <a
                  className="btn mx-auto mt-3 inline-block rounded-xl border border-[var(--accent)] bg-white px-8 py-2.5 font-[family-name:var(--second-font)] font-normal text-[var(--accent)] no-underline transition-[background,color,transform,box-shadow] duration-[180ms] ease-in-out hover:border-[#D7D7D7] hover:bg-[#D7D7D7] hover:text-[#0a0b2b]"
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
                className="plan center -mt-2.5 flex min-h-[450px] flex-col justify-start rounded-[var(--card-radius)] border-2 border-[var(--center-border)] bg-[var(--center-bg)] px-7 py-[34px] pt-10 text-[var(--accent)] shadow-[0_16px_28px_rgba(10,10,35,0.14)] transition-[transform,box-shadow] duration-[280ms] ease-in-out hover:shadow-[0_18px_32px_rgba(10,10,35,0.16)] max-[1000px]:mt-0 max-[1000px]:min-h-[420px] max-[680px]:min-h-[380px]"
                role="listitem"
                aria-labelledby="plan-enterprise"
              >
                <div
                  id="plan-enterprise"
                  className="plan-title mb-[18px] font-[family-name:var(--body-font)] text-[26px] font-normal uppercase tracking-wider text-[var(--accent)]"
                >
                  Enterprise
                </div>
                <div className="price mb-6 font-[family-name:Inter,sans-serif] text-[34px] font-normal text-[var(--accent)]">
                  <span>$299</span>
                  <small className="ml-2 text-lg font-normal text-[var(--accent)]">
                    / Per Month
                  </small>
                </div>
                <div className="features mb-7 mt-1.5 flex-1 text-left">
                  <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-base font-normal text-[var(--accent)]">
                    <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)]">
                      &#10003;
                    </span>
                    Borrow up to 15 books per month
                  </div>
                  <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-base font-normal text-[var(--accent)]">
                    <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)]">
                      &#10003;
                    </span>
                    Loan period: 21 days per book.
                  </div>
                  <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-base font-normal text-[var(--accent)]">
                    <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)]">
                      &#10003;
                    </span>
                    3 renewal per book
                  </div>
                </div>
                <a
                  className="btn mx-auto mt-3 inline-block rounded-xl border border-[var(--accent)] bg-[var(--accent)] px-8 py-2.5 font-[family-name:var(--second-font)] font-normal text-white no-underline shadow-[0_8px_16px_rgba(10,11,43,0.18)] transition-[background,color,transform,box-shadow] duration-[180ms] ease-in-out"
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
                className="plan flex min-h-[420px] flex-col justify-start rounded-[var(--card-radius)] border-none bg-[var(--card-bg)] px-7 py-[34px] text-[var(--accent)] shadow-[0_10px_18px_rgba(10,10,35,0.08)] transition-[transform,box-shadow] duration-[280ms] ease-in-out hover:shadow-[var(--card-shadow-hover)] max-[680px]:min-h-[380px]"
                role="listitem"
                aria-labelledby="plan-pro"
              >
                <div
                  id="plan-pro"
                  className="plan-title mb-[18px] font-[family-name:var(--body-font)] text-2xl font-normal uppercase tracking-wider text-[var(--accent)]"
                >
                  Professional
                </div>
                <div className="price mb-6 font-[family-name:Inter,sans-serif] text-[30px] font-normal text-[var(--accent)]">
                  <span className="small-price text-[30px]">$199</span>
                  <small className="ml-2 text-lg font-normal text-[var(--accent)]">
                    / Per Month
                  </small>
                </div>
                <div className="features mb-7 mt-1.5 flex-1 text-left">
                  <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-[15px] font-normal text-[var(--accent)]">
                    <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)]">
                      &#10003;
                    </span>
                    Borrow up to 10 books per month
                  </div>
                  <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-[15px] font-normal text-[var(--accent)]">
                    <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)]">
                      &#10003;
                    </span>
                    Loan period: 14 days per book.
                  </div>
                  <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-[15px] font-normal text-[var(--accent)]">
                    <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)]">
                      &#10003;
                    </span>
                    2 renewal per book
                  </div>
                </div>
                <a
                  className="btn mx-auto mt-3 inline-block rounded-xl border border-[var(--accent)] bg-white px-8 py-2.5 font-[family-name:var(--second-font)] font-normal text-[var(--accent)] no-underline transition-[background,color,transform,box-shadow] duration-[180ms] ease-in-out hover:border-[#D7D7D7] hover:bg-[#D7D7D7] hover:text-[#0a0b2b]"
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
        <section className="testimonial section py-20 pb-4" id="testimonial">
          <h2 className="section__title mb-8 text-center font-[family-name:var(--body-font)] font-normal text-[var(--h1-font-size)]">
            Customer Opinions
          </h2>
          <div className="testimonial__container container">
            <div className="testimonial__swiper swiper">
              <div className="swiper-wrapper">
                {feedbacks.length > 0 ? (
                  feedbacks.map((fb) => {
                    const fullStars = Math.floor(fb.rate);
                    const hasHalf = fb.rate % 1 >= 0.5;
                    return (
                      <article
                        key={fb.request_id}
                        className="testimonial__card swiper-slide duration-400 border-2 border-[var(--border-color)] bg-[var(--container-color)] px-12 py-8 pb-10 text-center transition-[border,background-color]"
                      >
                        <img
                          src={testimonialImg1}
                          alt={fb.user_id}
                          className="testimonial__img mx-auto mb-6 w-[100px] rounded-full"
                        />
                        <h2 className="testimonial__title mb-3 font-[family-name:var(--body-font)] font-normal text-[var(--h2-font-size)]">
                          {fb.user_id}
                        </h2>
                        <p className="testimonial__description mb-5 font-[family-name:var(--second-font)] font-bold text-[var(--small-font-size)]">
                          {fb.description || "Great experience!"}
                        </p>
                        <div className="testimonial__stars text-[var(--first-color)]">
                          {Array.from({ length: fullStars }, (_, i) => (
                            <i key={`full-${i}`} className="ri-star-fill"></i>
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
                      No feedback yet. Be the first to share your experience!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/*==================== FOOTER ====================*/}
      <footer className="footer px-5 pb-[30px] pt-[60px] font-[family-name:var(--second-font)] text-[#525252]">
        <div className="footer-container mx-auto grid max-w-[1200px] grid-cols-[340px_repeat(3,1fr)] items-start gap-10 max-[950px]:grid-cols-2 max-[950px]:text-center max-[600px]:grid-cols-1">
          <div className="footer-col footer-brand max-[950px]:col-span-2 max-[600px]:col-span-1">
            <a
              href="#"
              className="footer-logo flex items-center gap-2.5 text-[#0a0b2b] no-underline"
            >
              <img
                src={logoIcon}
                alt="Book Hive Logo"
                style={{ width: "60px", height: "auto" }}
              />
              <div className="logo-text">
                <span className="name font-[family-name:var(--body-font)] text-[22px] font-normal">
                  BookHive
                </span>
                <span className="sub -mt-1 block font-[family-name:var(--second-font)] text-xs font-normal">
                  Library
                </span>
              </div>
            </a>
            <p className="footer-description mt-2.5 font-normal leading-relaxed text-[#555]">
              Find and explore the best <br />
              eBooks from all your <br />
              favorite writers.
            </p>
          </div>
          <div className="footer-col">
            <h3 className="footer-title mb-4 font-[family-name:var(--body-font)] text-lg font-normal">
              About
            </h3>
            <ul className="footer-links list-none">
              <li className="mb-2.5 font-bold text-[#333]">
                <a
                  href="#"
                  className="inline-flex items-center rounded-full px-3 py-1.5 text-[#333] no-underline transition-[color,background-color,transform] duration-200 hover:-translate-y-px hover:bg-[#f2f2f6] hover:text-[#0a0b2b]"
                >
                  Who are we ?
                </a>
              </li>
              <li className="mb-2.5 font-semibold text-[#333]">
                <a
                  href="#"
                  className="inline-flex items-center rounded-full px-3 py-1.5 text-[#333] no-underline transition-[color,background-color,transform] duration-200 hover:-translate-y-px hover:bg-[#f2f2f6] hover:text-[#0a0b2b]"
                >
                  Our Branches
                </a>
              </li>
              <li className="mb-2.5 font-semibold text-[#333]">
                <a
                  href="#"
                  className="inline-flex items-center rounded-full px-3 py-1.5 text-[#333] no-underline transition-[color,background-color,transform] duration-200 hover:-translate-y-px hover:bg-[#f2f2f6] hover:text-[#0a0b2b]"
                >
                  Customer Feedback
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h3 className="footer-title mb-4 font-[family-name:var(--body-font)] text-lg font-normal">
              Contact
            </h3>
            <ul className="footer-links list-none">
              <li className="mb-2.5 font-bold text-[#333]">Cairo, Egypt</li>
              <li className="mb-2.5 font-semibold text-[#333]">
                BookHive@gmail.com
              </li>
              <li className="mb-2.5 font-semibold text-[#333]">01122334455</li>
            </ul>
          </div>
          <div className="footer-col">
            <h3 className="footer-title mb-4 font-[family-name:var(--body-font)] text-lg font-normal">
              Social
            </h3>
            <div className="footer-social">
              <a
                href="#"
                className="mr-3 text-[22px] text-[#0a0b2b] transition-all duration-200 hover:opacity-60"
              >
                <i className="ri-facebook-circle-line"></i>
              </a>
              <a
                href="#"
                className="mr-3 text-[22px] text-[#0a0b2b] transition-all duration-200 hover:opacity-60"
              >
                <i className="ri-instagram-line"></i>
              </a>
              <a
                href="#"
                className="mr-3 text-[22px] text-[#0a0b2b] transition-all duration-200 hover:opacity-60"
              >
                <i className="ri-twitter-x-line"></i>
              </a>
            </div>
          </div>
        </div>
        <p className="footer-copy mt-10 text-center font-[family-name:var(--second-font)] font-bold text-[#333]">
          &copy; All Rights Reserved By BookHive
        </p>
      </footer>

      {/*========== SCROLL UP ==========*/}
      <a
        href="#"
        className="scrollup duration-400 fixed -bottom-1/2 right-4 z-10 inline-flex bg-[var(--container-color)] p-1.5 text-xl text-[var(--title-color)] shadow-[0_2px_8px_hsla(0,0%,0%,0.1)] transition-[bottom,transform,background-color] hover:-translate-y-2"
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
  );
};

export default Home;
