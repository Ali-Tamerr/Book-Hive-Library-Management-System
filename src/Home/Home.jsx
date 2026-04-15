import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import LoginPopup from "../shared/LoginPopup";
import SignupPopup from "../shared/SignupPopup";
import ForgotPasswordPopup from "../shared/ForgotPasswordPopup";
import OTPPopup from "../shared/OTPPopup";
import ResetPasswordPopup from "../shared/ResetPasswordPopup";
import AboutBranchesPopup from "../components/AboutBranchesPopup";
import ViewDetailsPopup from "../components/ViewDetailsPopup";
import PageLoader from "../components/PageLoader";
import logoIcon from "../assets/bookhive_icon_only_black-removebg-preview 2.svg";
import testimonialImg1 from "../assets/img/testimonial-perfil-1.png";
import freeShippingIcon from "../assets/smart catalog.png";
import secureInfoIcon from "../assets/secure information.png";
import chatbotIcon from "../assets/chatbot.png";

import { apiGet, getImageUrl } from "../services/api.config";
import { useQueryClient } from "@tanstack/react-query";
import { useBookCovers, bookKeys } from "../hooks/useBooks";
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
  const [categories, setCategories] = useState({});
  const queryClient = useQueryClient();
  const { data: booksSource, isLoading: booksLoading } = useBookCovers();
  const [stats, setStats] = useState({ branches: 0, books: 0, categories: 0 });
  const { data: approvedFeedbacks = [], isLoading: isFeedbacksLoading } =
    useApprovedFeedbacks();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showShadowHeader, setShowShadowHeader] = useState(false);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [heroIndex, setHeroIndex] = useState(0);
  const [isDesktopLayout, setIsDesktopLayout] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1150 : true,
  );
  const [isCompactDesktop, setIsCompactDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1400 : false,
  );
  const [verificationEmail, setVerificationEmail] = useState("");
  const [isSignupOTP, setIsSignupOTP] = useState(false);
  const [signupData, setSignupData] = useState(null);
  const heroIntervalRef = useRef(null);
  const homeRef = useRef(null);
  const heroContainerRef = useRef(null);

  // 1. Stats (numbers) should load before loading screen disappears.
  //    We race the fetch against a hard timeout so the page always
  //    appears within a few seconds, even on slow cold-starts.
  useEffect(() => {
    console.debug("Home: mount - fetching stats (numbers) for loading gate");
    let done = false;

    const showPage = (statsData) => {
      if (done) return;
      done = true;
      if (statsData) setStats(statsData);
      requestAnimationFrame(() => {
        setTimeout(() => setPageLoaded(true), 50);
      });
    };

    // Hard timeout — never block more than 5 seconds
    const maxTimeout = setTimeout(() => {
      console.warn("Home: stats fetch timed out — showing page anyway");
      showPage(null);
    }, 5000);

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

        showPage({ branches, categories, books: booksCount });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        showPage(null);
      }
    };

    fetchStats();

    return () => clearTimeout(maxTimeout);
  }, []);

  // 2a. Restore cached home book covers (if any) after loading screen disappears
  useEffect(() => {
    if (!pageLoaded) return;

    try {
      const raw = localStorage.getItem("homeBooksCache.v2");
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

  // 2b/2c. Derive hero/about/featured books from React Query's `useBookCovers`.
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

    // If stats.books was not set by the Stats API, update it from the loaded books
    if (rawArray.length > 0 && stats.books === 0) {
      setStats((prev) => ({ ...prev, books: rawArray.length }));
    }
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
      localStorage.setItem("homeBooksCache.v2", JSON.stringify(payload));
    } catch (error) {
      console.error("Failed to cache home books:", error);
    }
  }, [heroBooks, aboutBooks, featuredBooks]);

  // books count is populated during initial `fetchStats` prefetch.

  // Feedbacks are loaded via `useApprovedFeedbacks` (React Query).

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopLayout(window.innerWidth >= 1150);
      setIsCompactDesktop(window.innerWidth >= 1400);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const featuredPerView = isDesktopLayout ? 4 : 1;
  const testimonialPerView = isDesktopLayout ? 3 : 1;

  const isEverythingLoaded = pageLoaded;

  useEffect(() => {
    if (!isEverythingLoaded) return;

    // Small delay to ensure DOM has updated visibility from PageLoader removal
    const timeout = setTimeout(() => {
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
        { threshold: 0.05, rootMargin: "50px" },
      );

      els.forEach((el) => {
        // Immediate check for elements already in or near viewport
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add("revealed");
        } else {
          observer.observe(el);
        }
      });
    }, 150);

    return () => clearTimeout(timeout);
  }, [isEverythingLoaded]);

  const aboutBooksForDisplay = (() => {
    if (aboutBooks.length >= 2) return aboutBooks;
    if (heroBooks.length >= 2) return heroBooks.slice(0, 2);
    if (featuredBooks.length >= 2) return featuredBooks.slice(0, 2);
    return aboutBooks;
  })();

  return (
    <>
      {!isEverythingLoaded && (
        <PageLoader className="!fixed !z-[9999] bg-[#E8E8E8] dark:bg-[#111214]" />
      )}
      <div
        className="duration-400 m-0 mx-auto max-w-[120rem] scroll-smooth bg-[var(--body-color)] font-[family-name:Montserrat,system-ui,Arial,sans-serif] text-[var(--text-color)] antialiased transition-[background-color]"
        ref={homeRef}
        style={{
          visibility: isEverythingLoaded ? "visible" : "hidden",
          zoom: isCompactDesktop ? 0.8 : 1,
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
          onBookClick={(book) => setSelectedFeaturedBook(book)}
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
            featuredPerView={featuredPerView}
            onExplore={() => setIsLoginOpen(true)}
          />

          <Pricing setIsLoginOpen={setIsLoginOpen} />

          <Testimonials
            feedbacks={approvedFeedbacks}
            testimonialPerView={testimonialPerView}
            testimonialImg1={testimonialImg1}
            isLoading={isFeedbacksLoading}
          />
        </main>

        <Footer logoIcon={logoIcon} setActivePopup={setActivePopup} />

        {/* <a
          href="#"
          className={`duration-400 fixed right-4 z-10 inline-flex bg-[var(--container-color)] p-1.5 text-xl text-[var(--title-color)] shadow-[0_0.125rem_0.5rem_hsla(0,0%,0%,0.1)] transition-[bottom,transform,background-color] hover:-translate-y-2 dark:shadow-[0_0.125rem_0.5rem_hsla(0,0%,0%,0.4)] ${showScrollUp ? "bottom-24 min-[71.875rem]:bottom-12" : "-bottom-1/2"}`}
          id="scroll-up"
        >
          <i className="ri-arrow-up-line"></i>
        </a> */}

        <LoginPopup
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onForgotPassword={() => setIsForgotPasswordOpen(true)}
          onSignup={() => setIsSignupOpen(true)}
          slideFromTop={true}
        />

        <SignupPopup
          isOpen={isSignupOpen}
          onClose={() => setIsSignupOpen(false)}
          onLogin={() => setIsLoginOpen(true)}
          onShowOTP={(email, data) => {
            setVerificationEmail(email);
            setSignupData(data);
            setIsSignupOTP(true);
            setIsOTPOpen(true);
          }}
          slideFromTop={true}
        />

        <ForgotPasswordPopup
          isOpen={isForgotPasswordOpen}
          onClose={() => setIsForgotPasswordOpen(false)}
          onOTP={() => setIsOTPOpen(true)}
          onBack={() => setIsLoginOpen(true)}
          slideFromTop={true}
        />

        <OTPPopup
          isOpen={isOTPOpen}
          onClose={() => {
            setIsOTPOpen(false);
            setIsSignupOTP(false);
            setSignupData(null);
          }}
          onResetPassword={() => setIsResetPasswordOpen(true)}
          onBack={() => {
            if (isSignupOTP) setIsSignupOpen(true);
            else setIsForgotPasswordOpen(true);
          }}
          email={verificationEmail}
          signupData={signupData}
          isSignupVerification={isSignupOTP}
          slideFromTop={true}
        />

        <ResetPasswordPopup
          isOpen={isResetPasswordOpen}
          onClose={() => setIsResetPasswordOpen(false)}
          onLogin={() => setIsLoginOpen(true)}
          onBack={() => setIsOTPOpen(true)}
          slideFromTop={true}
        />

        <AboutBranchesPopup
          isOpen={activePopup === "branches"}
          onClose={() => setActivePopup(null)}
          slideFromTop={true}
        />

        <ViewDetailsPopup
          show={Boolean(selectedFeaturedBook)}
          onClose={() => setSelectedFeaturedBook(null)}
          title="Book Details"
          imageUrl={selectedFeaturedBook?.image}
          imageAlt={selectedFeaturedBook?.name || "Book cover"}
          onRequireLogin={() => {
            setSelectedFeaturedBook(null);
            setIsLoginOpen(true);
          }}
          data={
            selectedFeaturedBook
              ? {
                  "Book ID": selectedFeaturedBook.book_id,
                  "Book Name": selectedFeaturedBook.name,
                  Category: selectedFeaturedBook.category,
                  Language: selectedFeaturedBook.language,
                  Availability: selectedFeaturedBook.availability,
                  Quantity: selectedFeaturedBook.quantity,
                }
              : null
          }
        />
      </div>
    </>
  );
};

export default Home;
