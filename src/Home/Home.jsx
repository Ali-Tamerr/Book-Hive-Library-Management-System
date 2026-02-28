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
  const [booksSource, setBooksSource] = useState(null);
  const [stats, setStats] = useState({ branches: 0, books: 0, categories: 0 });
  const [feedbacks, setFeedbacks] = useState([]);
  const [isFeedbacksLoading, setIsFeedbacksLoading] = useState(false);
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

  // 1. Stats (numbers) must load before loading screen disappears
  useEffect(() => {
    console.debug("Home: mount - fetching stats (numbers) for loading gate");
    const fetchStats = async () => {
      try {
        // Include Books in the initial fetch so the books count is ready
        // before the loading screen is dismissed.
        const [branchData, catData, booksData] = await Promise.all([
          apiGet("/Branches"),
          apiGet("/Categories"),
          apiGet("/Books"),
        ]);
        const booksCount = Array.isArray(booksData)
          ? booksData.length
          : booksData?.data?.length || 0;

        setStats({
          branches: Array.isArray(branchData) ? branchData.length : 0,
          categories: Array.isArray(catData) ? catData.length : 0,
          books: Number.isFinite(+booksCount) ? +booksCount : 0,
        });

        // Numbers loaded — hide loading screen
        requestAnimationFrame(() => {
          setTimeout(() => setPageLoaded(true), 50);
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        // Still hide loading screen on error to avoid infinite loader
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

  // 2b. Fetch full books list once (in parallel with stats)
  useEffect(() => {
    if (booksSource) return;

    let cancelled = false;
    const fetchBooks = async () => {
      try {
        const data = await apiGet("/Books");
        if (cancelled) return;
        setBooksSource(data);
      } catch (error) {
        console.error("Failed to fetch books for home:", error);
      }
    };

    fetchBooks();
    return () => {
      cancelled = true;
    };
  }, [booksSource]);

  // 2c. Derive hero/about/featured books from a single Books response
  useEffect(() => {
    if (!booksSource) return;

    const rawArray = Array.isArray(booksSource)
      ? booksSource
      : booksSource?.data || [];

    if (!rawArray.length) {
      setHeroBooks([]);
      setAboutBooks([]);
      setFeaturedBooks([]);
      return;
    }

    // Work on raw data first (cheap), then convert images only for the
    // small subset of books we actually show on the homepage.
    const sortedRawByDate = [...rawArray].sort(
      (a, b) =>
        new Date(b.created_at || 0) - new Date(a.created_at || 0),
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

    // About Us should reuse covers already used in other sections (Hero/Featured),
    // to avoid picking slow/bad images from the full dataset.
    const poolMap = new Map();
    [...heroList, ...featuredList].forEach((b) => {
      if (!b?.book_id) return;
      poolMap.set(b.book_id, b);
    });
    const pool = poolMap.size ? Array.from(poolMap.values()) : heroList.length
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

    // If we didn't randomly pick two distinct books (e.g. only one exists),
    // pad the list so About Us always has two covers to render.
    while (aboutSelected.length < 2 && heroList.length) {
      aboutSelected.push(heroList[aboutSelected.length % heroList.length]);
    }

    setHeroBooks(heroList);
    setFeaturedBooks(featuredList);
    setAboutBooks(aboutSelected);
  }, [pageLoaded, booksSource]);

  // 2d. Persist processed home book covers in local storage for faster reloads
  useEffect(() => {
    if (
      !heroBooks.length &&
      !aboutBooks.length &&
      !featuredBooks.length
    ) {
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

  // 2e. Once booksSource is available, update the books count in stats
  useEffect(() => {
    if (!booksSource) return;
    try {
      const arr = Array.isArray(booksSource)
        ? booksSource
        : booksSource?.data || [];
      setStats((prev) => ({
        ...prev,
        books: Array.isArray(arr) ? arr.length : prev.books,
      }));
    } catch {
      // ignore count update errors
    }
  }, [booksSource]);

  // 3. Load feedbacks (non-blocking for loading screen)
  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        setIsFeedbacksLoading(true);
        const approved = await apiGet("/Feedbacks/approved");
        const dataArray = Array.isArray(approved)
          ? approved
          : approved.data || [];
        // Keep only the latest feedback per user so multiple approved
        // entries from the same person don't show up as separate cards.
        try {
          if (Array.isArray(dataArray) && dataArray.length) {
            const byUser = new Map();
            dataArray.forEach((fb) => {
              const userKey = fb.user_id || fb.user_name || fb.email || "anonymous";
              const existing = byUser.get(userKey);
              if (!existing) {
                byUser.set(userKey, fb);
                return;
              }

              // prefer the feedback with the newest timestamp (created_at or updated_at)
              const existingDate = new Date(existing.updated_at || existing.created_at || 0).getTime();
              const incomingDate = new Date(fb.updated_at || fb.created_at || 0).getTime();
              if (incomingDate >= existingDate) {
                byUser.set(userKey, fb);
              }
            });

            const unique = Array.from(byUser.values());
            setFeedbacks(unique);
          } else {
            setFeedbacks(dataArray);
          }
        } catch (err) {
          console.error("Failed to dedupe feedbacks:", err);
          setFeedbacks(dataArray);
        }
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
        setFeedbacks([]);
      } finally {
        setIsFeedbacksLoading(false);
      }
    };
    loadFeedbacks();

    const handleFeedbackUpdate = () => loadFeedbacks();
    window.addEventListener("mockFeedbackUpdated", handleFeedbackUpdate);
    window.addEventListener("userUpdated", handleFeedbackUpdate);
    return () => {
      window.removeEventListener("mockFeedbackUpdated", handleFeedbackUpdate);
      window.removeEventListener("userUpdated", handleFeedbackUpdate);
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
            feedbacks={feedbacks}
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
