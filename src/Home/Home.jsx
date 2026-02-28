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
  const [stats, setStats] = useState({ branches: 0, books: 0, categories: 0 });
  const [feedbacks, setFeedbacks] = useState([]);
  const [isFeedbacksLoading, setIsFeedbacksLoading] = useState(false);
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
    console.debug("Home: mount - starting data fetch effects");
    const fetchBooks = async () => {
      console.debug("Home: fetchBooks called");
      try {
        const data = await apiGet("/Books");
        console.debug("Home: fetchBooks apiGet returned", data && (Array.isArray(data) ? data.length : (data.data || []).length));
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
        setHeroBooks(recent10);

        const shuffled = [...withImages].sort(() => 0.5 - Math.random());
        setAboutBooks(shuffled.slice(0, 2));
      } catch (error) {
        console.error("Failed to fetch featured books:", error);
      }
    };

    const fetchStats = async () => {
      console.debug("Home: fetchStats called");
      try {
        const [branchData, bookData, catData] = await Promise.all([
          apiGet("/Branches"),
          apiGet("/Books"),
          apiGet("/Categories"),
        ]);
        console.debug("Home: fetchStats returned", {
          branches: branchData && branchData.length,
          books: bookData && bookData.length,
          categories: catData && catData.length,
        });
        setStats({
          branches: Array.isArray(branchData) ? branchData.length : 0,
          books: Array.isArray(bookData) ? bookData.length : 0,
          categories: Array.isArray(catData) ? catData.length : 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    const loadFeedbacks = async () => {
      console.debug("Home: loadFeedbacks called");
      try {
        setIsFeedbacksLoading(true);
        const approved = await apiGet("/Feedbacks/approved");
        console.debug("Home: loadFeedbacks returned", approved && (Array.isArray(approved) ? approved.length : (approved.data || []).length));
        const dataArray = Array.isArray(approved)
          ? approved
          : approved.data || [];
        setFeedbacks(dataArray);
        setIsFeedbacksLoading(false);
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
        setFeedbacks([]);
        setIsFeedbacksLoading(false);
      }
    };

    Promise.all([fetchBooks(), fetchStats()]).then(async () => {
      await loadFeedbacks();
      setTimeout(() => setIsContentReady(true), 100);
    });

    const handleFeedbackUpdate = () => loadFeedbacks();
    window.addEventListener("mockFeedbackUpdated", handleFeedbackUpdate);
    window.addEventListener("userUpdated", handleFeedbackUpdate);
    return () => {
      window.removeEventListener("mockFeedbackUpdated", handleFeedbackUpdate);
      window.removeEventListener("userUpdated", handleFeedbackUpdate);
    };
  }, []);

  useEffect(() => {
    if (!isContentReady) return;

    // When basic HTML/CSS/text is ready, show the page loader immediately
    // Do NOT wait for all images to load — images will lazy-load individually.
    const rafId = requestAnimationFrame(() => {
      setTimeout(() => setPageLoaded(true), 50);
    });

    return () => cancelAnimationFrame(rafId);
  }, [isContentReady]);

  useEffect(() => {
    const selectedTheme = localStorage.getItem("selected-theme");

    if (selectedTheme === "dark") {
      document.body.classList.add("dark-theme");
      setThemeIcon("ri-moon-line");
    } else {
      document.body.classList.remove("dark-theme");
      setThemeIcon("ri-sun-line");
    }

    // specific Home page body background color fix
    document.body.classList.add("home-page-active");
    // mark content ready very early so the loader can hide while images load lazily
    requestAnimationFrame(() => setIsContentReady(true));

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
            aboutBooks={aboutBooks}
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
            testimonialIndex={testimonialIndex}
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
