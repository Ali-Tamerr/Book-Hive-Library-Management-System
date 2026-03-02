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
import freeShippingIcon from "../assets/smart catalog.png";
import secureInfoIcon from "../assets/secure information.png";
import chatbotIcon from "../assets/chatbot.png";

import { apiGet, getImageUrl } from "../services/api.config";
import { useBooks } from "../hooks/useBooks";
import { useApprovedFeedbacks } from "../hooks/useFeedbacks";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import Services from "./Components/Services";
import AboutUs from "./Components/AboutUs";
import FeaturedSection from "./Components/FeaturedSection";
import Pricing from "./Components/Pricing";
import Testimonials from "./Components/Testimonials";
import Footer from "./Components/Footer";
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
  const { data: booksSource } = useBooks();
  const [stats, setStats] = useState({ branches: 0, books: 0, categories: 0 });
  const { data: approvedFeedbacks = [], isLoading: isFeedbacksLoading } =
    useApprovedFeedbacks();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showShadowHeader, setShowShadowHeader] = useState(false);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [heroIndex, setHeroIndex] = useState(0);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const heroIntervalRef = useRef(null);
  const homeRef = useRef(null);
  const heroContainerRef = useRef(null);

  // 1. Stats (numbers) gate — only waits for the tiny /Stats endpoint.
  //    Books (with base64 image payloads) are fetched independently via
  //    useBooks() so that large image data never holds up the loader.
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const maybeStats = await apiGet("/Stats").catch(() => null);

        let branches = 0;
        let categories = 0;
        let booksCount = 0;

        if (maybeStats && typeof maybeStats === "object") {
          branches = Number.isFinite(+maybeStats.branches)
            ? +maybeStats.branches
            : 0;
          categories = Number.isFinite(+maybeStats.categories)
            ? +maybeStats.categories
            : 0;
          booksCount = Number.isFinite(+maybeStats.books)
            ? +maybeStats.books
            : 0;
        }

        if (!branches && !categories) {
          try {
            const [branchData, catData] = await Promise.all([
              apiGet("/Branches").catch(() => null),
              apiGet("/Categories").catch(() => null),
            ]);
            branches = Array.isArray(branchData)
              ? branchData.length
              : branchData?.data?.length || 0;
            categories = Array.isArray(catData)
              ? catData.length
              : catData?.data?.length || 0;
          } catch {}
        }

        setStats({ branches, categories, books: booksCount });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        requestAnimationFrame(() => {
          setTimeout(() => setPageLoaded(true), 50);
        });
      }
    };
    fetchStats();
  }, []);

  // 2a. Restore cached home book covers (if any) after loading screen disappears
  useEffect(() => {
    if (!pageLoaded) return;

    try {
      const raw = localStorage.getItem("homeBooksCache.v1");
      if (!raw) return;
      const cached = JSON.parse(raw);

      if (Array.isArray(cached.heroBooks) && cached.heroBooks.length) {
        setHeroBooks(cached.heroBooks);
      }
      if (Array.isArray(cached.aboutBooks) && cached.aboutBooks.length) {
        setAboutBooks(cached.aboutBooks);
      }
      if (Array.isArray(cached.featuredBooks) && cached.featuredBooks.length) {
        setFeaturedBooks(cached.featuredBooks);
      }
    } catch (error) {
      console.error("Failed to restore home books cache:", error);
    }
  }, [pageLoaded]);

  // 2b/2c. Derive hero/about/featured books from React Query's `useBooks`.
  useEffect(() => {
    const rawArray = Array.isArray(booksSource)
      ? booksSource
      : booksSource?.data || [];

    if (!rawArray.length) {
      setHeroBooks([]);
      setAboutBooks([]);
      setFeaturedBooks([]);
      return;
    }

    const sortedRawByDate = [...rawArray].sort(
      (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0),
    );

    const heroRaw = sortedRawByDate.slice(0, 12);
    const featuredRaw = sortedRawByDate.slice(0, 12);

    const toViewModel = (book) => ({
      book_id: book.book_id,
      name: book.name,
      category_id: book.category_id,
      quantity: book.quantity,
      created_at: book.created_at,
      image: getImageUrl(book.image_url) || "",
    });

    const heroList = heroRaw
      .map(toViewModel)
      .filter((b) => b.image)
      .slice(0, 10);

    const featuredList = featuredRaw
      .map(toViewModel)
      .filter((b) => b.image)
      .slice(0, 10);

    const poolMap = new Map();
    [...heroList, ...featuredList].forEach((b) => {
      if (!b?.book_id) return;
      poolMap.set(b.book_id, b);
    });
    const pool = poolMap.size
      ? Array.from(poolMap.values())
      : heroList.length
        ? heroList
        : featuredList;

    const pickTwo = (list) => {
      if (!list.length) return [];
      if (list.length === 1) return [list[0], list[0]];
      const first = Math.floor(Math.random() * list.length);
      let second = Math.floor(Math.random() * (list.length - 1));
      if (second >= first) second += 1;
      return [list[first], list[second]];
    };

    const aboutSelected = pickTwo(pool || []);
    while (aboutSelected.length < 2 && heroList.length) {
      aboutSelected.push(heroList[aboutSelected.length % heroList.length]);
    }

    setHeroBooks(heroList);
    setFeaturedBooks(featuredList);
    setAboutBooks(aboutSelected);
  }, [pageLoaded, booksSource]);

  // 2d. Persist processed home book covers in local storage for faster reloads
  useEffect(() => {
    if (!heroBooks.length && !aboutBooks.length && !featuredBooks.length) {
      return;
    }

    try {
      const payload = {
        heroBooks,
        aboutBooks,
        featuredBooks,
      };
      localStorage.setItem("homeBooksCache.v1", JSON.stringify(payload));
    } catch (error) {
      console.error("Failed to cache home books:", error);
    }
  }, [heroBooks, aboutBooks, featuredBooks]);

  // books count is populated during initial `fetchStats` prefetch.

  // Feedbacks are loaded via `useApprovedFeedbacks` (React Query).

  useEffect(() => {
    const selectedTheme = localStorage.getItem("selected-theme");

    if (selectedTheme === "dark") {
      document.body.classList.add("dark-theme");
      setThemeIcon("ri-moon-line");
    } else {
      document.body.classList.remove("dark-theme");
      setThemeIcon("ri-sun-line");
    }

    document.body.classList.add("home-page-active");
    return () => document.body.classList.remove("home-page-active");
  }, []);

  const toggleTheme = () => {
    const body = document.body;
    const isDark = body.classList.contains("dark-theme");

    if (isDark) {
      body.classList.remove("dark-theme");
      setThemeIcon("ri-sun-line");
      localStorage.setItem("selected-theme", "light");
      localStorage.setItem("selected-icon", "ri-sun-line");
    } else {
      body.classList.add("dark-theme");
      setThemeIcon("ri-moon-line");
      localStorage.setItem("selected-theme", "dark");
      localStorage.setItem("selected-icon", "ri-moon-line");
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

  const aboutBooksForDisplay = (() => {
    if (aboutBooks.length >= 2) return aboutBooks;
    if (heroBooks.length >= 2) return heroBooks.slice(0, 2);
    if (featuredBooks.length >= 2) return featuredBooks.slice(0, 2);
    return aboutBooks;
  })();

  return (
    <>
      {!pageLoaded && (
        <PageLoader className="!fixed !z-[9999] bg-[#E8E8E8] dark:bg-[#111214]" />
      )}
      <div
        className="duration-400 m-0 mx-auto max-w-[1920px] scroll-smooth bg-[var(--body-color)] font-[family-name:Montserrat,system-ui,Arial,sans-serif] text-[var(--text-color)] antialiased transition-[background-color]"
        ref={homeRef}
        style={{
          visibility: pageLoaded ? "visible" : "hidden",
          zoom: 0.8,
        }}
      >
        <Header
          logoIcon={logoIcon}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          setIsSearchOpen={setIsSearchOpen}
          setIsLoginOpen={setIsLoginOpen}
          themeIcon={themeIcon}
          toggleTheme={toggleTheme}
          showShadowHeader={showShadowHeader}
          isSearchOpen={isSearchOpen}
        />

        <main className="overflow-hidden">
          <Hero
            scrollToSection={scrollToSection}
            heroContainerRef={heroContainerRef}
            heroIndex={heroIndex}
            heroBooks={heroBooks}
          />

          <Services
            freeShippingIcon={freeShippingIcon}
            secureInfoIcon={secureInfoIcon}
            chatbotIcon={chatbotIcon}
          />

          <AboutUs
            stats={stats}
            setActivePopup={setActivePopup}
            aboutBooks={aboutBooksForDisplay}
          />

          <FeaturedSection
            featuredBooks={featuredBooks}
            featuredIndex={featuredIndex}
            featuredPerView={featuredPerView}
            setSelectedFeaturedBook={setSelectedFeaturedBook}
            featuredPrev={featuredPrev}
            featuredNext={featuredNext}
          />

          <Pricing setIsLoginOpen={setIsLoginOpen} />

          <Testimonials
            feedbacks={approvedFeedbacks}
            testimonialPerView={testimonialPerView}
            testimonialImg1={testimonialImg1}
            isLoading={isFeedbacksLoading}
          />
        </main>

        <Footer logoIcon={logoIcon} />

        {/* <a
          href="#"
          className={`duration-400 fixed right-4 z-10 inline-flex bg-[var(--container-color)] p-1.5 text-xl text-[var(--title-color)] shadow-[0_2px_8px_hsla(0,0%,0%,0.1)] transition-[bottom,transform,background-color] hover:-translate-y-2 dark:shadow-[0_2px_8px_hsla(0,0%,0%,0.4)] ${showScrollUp ? "bottom-24 min-[1150px]:bottom-12" : "-bottom-1/2"}`}
          id="scroll-up"
        >
          <i className="ri-arrow-up-line"></i>
        </a> */}

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
