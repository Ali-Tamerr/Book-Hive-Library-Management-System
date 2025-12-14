import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPopup from '../shared/LoginPopup';
import SignupPopup from '../shared/SignupPopup';
import ForgotPasswordPopup from '../shared/ForgotPasswordPopup';
import OTPPopup from '../shared/OTPPopup';
import ResetPasswordPopup from '../shared/ResetPasswordPopup';
import './css/swiper-bundle.min.css';
import './css/styles.css';
import './css/stylesNew.css';


const Home = () => {
   const navigate = useNavigate();
   const [isLoginOpen, setIsLoginOpen] = useState(false);
   const [isSignupOpen, setIsSignupOpen] = useState(false);
   const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
   const [isOTPOpen, setIsOTPOpen] = useState(false);
   const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

   useEffect(() => {
      const loadScript = (src, id) => {
         return new Promise((resolve, reject) => {
            const existingScript = document.getElementById(id);
            if (existingScript) {
               resolve();
               return;
            }

            const script = document.createElement('script');
            script.src = src;
            script.id = id;
            script.onload = () => resolve();
            script.onerror = () => reject();
            document.body.appendChild(script);
         });
      };

      const initScripts = async () => {
         try {
            await loadScript(new URL('./js/scrollreveal.min.js', import.meta.url).href, 'scrollreveal');
            await loadScript(new URL('./js/swiper-bundle.min.js', import.meta.url).href, 'swiper');

            setTimeout(async () => {
               await loadScript(new URL('./js/main.js', import.meta.url).href, 'main');

               setTimeout(() => {
                  const themeButton = document.getElementById('theme-button');
                  const selectedTheme = localStorage.getItem('selected-theme');
                  const selectedIcon = localStorage.getItem('selected-icon');

                  if (selectedTheme) {
                     document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove']('dark-theme');
                     if (themeButton) {
                        themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove']('ri-sun-line');
                     }
                  }
               }, 200);
            }, 300);
         } catch (error) {
            console.error('Error loading scripts:', error);
         }
      };

      initScripts();
   }, [navigate]);

   return (
      <div className="home-page">
         <header className="header" id="header">
            <nav className="nav">
               <a href="#" className="nav__logo" >
                  <img src={new URL('./assets/logo.svg', import.meta.url).href} alt="Book Hive Logo" style={{ width: '60px', height: 'auto' }} />
               </a>

               <div className="nav__menu">
                  <ul className="nav__list">
                     <li className="nav__item">
                        <a href="#home" className="nav__link">
                           <i className="ri-home-4-line"></i>
                           <span>Home</span>
                        </a>
                     </li>

                     <li className="nav__item">
                        <a href="#featured" className="nav__link">
                           <i className="ri-book-3-line"></i>
                           <span>Featured</span>
                        </a>
                     </li>

                     <li className="nav__item">
                        <a href="#about" className="nav__link">
                           <i className="ri-information-line"></i>
                           <span>About Us</span>
                        </a>
                     </li>

                     <li className="nav__item">
                        <a href="#new" className="nav__link">
                           <i className="ri-bookmark-line"></i>
                           <span>New Books</span>
                        </a>
                     </li>

                     <li className="nav__item">
                        <a href="#testimonial" className="nav__link">
                           <i className="ri-message-3-line"></i>
                           <span>Testimonial</span>
                        </a>
                     </li>
                  </ul>
               </div>

               <div className="nav__actions">
                  {/* Search button */}
                  <i className="ri-search-line search-button" id="search-button"></i>

                  {/* Login button */}
                  <i
                     className="ri-user-line login-button"
                     id="login-button"
                     onClick={() => setIsLoginOpen(true)}
                     style={{ cursor: 'pointer' }}
                  ></i>

                  {/* Theme button */}
                  <i className="ri-moon-line change-theme" id="theme-button"></i>
               </div>
            </nav>
         </header>

         {/*==================== SEARCH ====================*/}
         <div className="search" id="search-content">
            <form action="" className="search__form">
               <i className="ri-search-line search__icon"></i>
               <input type="search" placeholder="What are you looking for?" className="search__input" />
            </form>

            <i className="ri-close-line search__close" id="search-close"></i>
         </div>

         {/*==================== LOGIN ====================*/}
         {/* <div className="login grid" id="login-content">
            <form action="" className="login__form grid">
               <h3 className="login__title">Log In</h3>

               <div className="login__group grid">
                  <div>
                     <label htmlFor="login-mail" className="login__label">Email</label>
                     <input type="email" placeholder="Write your email" className="login__input" id="login-email" />
                  </div>

                  <div>
                     <label htmlFor="login-pass" className="login__label">Password</label>
                     <input type="password" placeholder="Enter your password" className="login__input" id="login-pass" />
                  </div>
               </div>

               <div>
                  <span className="login__signup">
                     You do not have an account? <a href="#">Sign up</a>
                  </span>

                  <a href="#" className="login__forgot">
                     You forgot your password
                  </a>

                  <button type="submit" className="login__button button cursor-pointer">Log In</button>
               </div>
            </form>

            <i className="ri-close-line login__close" id="login-close"></i>
         </div> */}

             {/*==================== MAIN ====================*/}
             <main className="main">

            {/*==================== HOME ====================*/}
         <section className="home section" id="home">
         <div className="home__container container grid">
            <div className="home__data">
               <h1 className="home__title">
                  Browse & <br />
                  Select E-Books
               </h1>

               <p className="home__description">
                  Find the best e-books from your favorite
                  writers, explore hundreds of books with all
                  possible categories, take advantage of the
                  50% discount and much more.
               </p>

               <a href="#" className="button">Explore Now</a>
            </div>

            <div className="home__images">
               <div className="home__swiper swiper">
                  <div className="swiper-wrapper">
                     <article className="home__article swiper-slide">
                        <img src={new URL('./assets/img/81VT2VfXZYL._AC_UF894,1000_QL80_.jpg', import.meta.url).href} alt="image" className="home__img" />
                     </article>

                     <article className="home__article swiper-slide">
                        <img src={new URL('./assets/img/91mNmA7i+kL._AC_UF1000,1000_QL80_.jpg', import.meta.url).href} alt="image" className="home__img" />
                     </article>

                     <article className="home__article swiper-slide">
                        <img src={new URL('./assets/img/18469883.jpg', import.meta.url).href} alt="image" className="home__img" />
                     </article>
                  </div>
               </div>
            </div>
         </div>
      </section>
       
      
      {/*==================== SERVICES ====================*/}
         <section className="services section">
            <div className="services__container container grid">
               <article className="services__card">
                  <i className="ri-truck-line"></i>
                  <h3 className="services__title">Free Shipping</h3>
                  <p className="services__description">Order More Than $100</p>
               </article>

               <article className="services__card">
                  <i className="ri-lock-2-line"></i>
                  <h3 className="services__title">Secure Payment</h3>
                  <p className="services__description">100% Secure Payment</p>
               </article>

               <article className="services__card">
                  <i className="ri-customer-service-2-line"></i>
                  <h3 className="services__title">24/7 Support</h3>
                  <p className="services__description">Call us anytime</p>
               </article>
            </div>
         </section>

      {/*==================== about us====================*/}
      
   <section className="section-about" aria-labelledby="about-heading">
      <div className="container">
         <h2 id="about-heading" className="about-title">About Us</h2>

         <div className="about-grid">
         {/* LEFT: text, stats, CTA */}
            <div className="about-left">
               <p className="about-text">
            We are a smart, technology-driven library system that uses RFID to make book management faster and easier.
            Our platform helps students and staff search, borrow, and track books efficiently with a modern and user-friendly design.
          </p>

               <div className="stats" role="list" aria-label="Quick facts">
                  <div className="stat" role="listitem">
                     <div className="num">5+</div>
                     <div className="label">Branches</div>
                  </div>

                  <div className="stat" role="listitem">
                     <div className="num">1K+</div>
                     <div className="label">Books</div>
                  </div>

                  <div className="stat" role="listitem">
                     <div className="num">100+</div>
                     <div className="label">Category</div>
                  </div>
               </div>

               <div>
                  <a className="about-cta" href="#">Where are we?</a>
               </div>
            </div>

         {/* RIGHT: decorative overlapping books */}
            <div className="about-right" aria-hidden="true">
               {/* back (left) */}
                <img className="book back" src={new URL('./assets/img/71STVuBmK+L._AC_UF1000,1000_QL80_.jpg', import.meta.url).href}
                   alt="Sir Bobby Charlton book cover" onError={(e)=> (e.currentTarget.style.display='none')} />
               {/* front (right) */}
                <img className="book front" src={new URL('./assets/img/81dugtP5foL._AC_UF894,1000_QL80_.jpg', import.meta.url).href}
                   alt="Arsene Wenger book cover" onError={(e)=> (e.currentTarget.style.display='none')} />
            </div>
      </div>
    </div>
  </section>

     
      {/*==================== FEATURED ====================*/}
        <section className="featured section" id="featured">
         <h2 className="section__title">
            Featured Books
         </h2>
         <div className="featured__container container">
            <div className="featured__swiper swiper">
               <div className="swiper-wrapper">


                  <article className="featured__card swiper-slide">
                     <img src={new URL('./assets/img/91mNmA7i+kL._AC_UF1000,1000_QL80_.jpg', import.meta.url).href} alt="img" className="featured__img" />

                     <h2 className="featured__title">Featured Book</h2>
                     <button className="button">Explore Now</button>

                     <div className="featured__actions">
                        <button><i className="ri-search-line"></i></button>
                        <button><i className="ri-heart-3-line"></i></button>
                        <button><i className="ri-eye-line"></i></button>
                     </div>
                  </article>

                  <article className="featured__card swiper-slide">
                     <img src={new URL('./assets/img/23036917.jpg', import.meta.url).href} alt="img" className="featured__img" />

                     <h2 className="featured__title">Featured Book</h2>
                     <button className="button">Explore Now</button>

                     <div className="featured__actions">
                        <button><i className="ri-search-line"></i></button>
                        <button><i className="ri-heart-3-line"></i></button>
                        <button><i className="ri-eye-line"></i></button>
                     </div>
                  </article>

                  <article className="featured__card swiper-slide">
                     <img src={new URL('./assets/img/61WcybNpt9L.jpg', import.meta.url).href} alt="img" className="featured__img" />

                     <h2 className="featured__title">Featured Book</h2>
                     <button className="button">Explore Now</button>

                     <div className="featured__actions">
                        <button><i className="ri-search-line"></i></button>
                        <button><i className="ri-heart-3-line"></i></button>
                        <button><i className="ri-eye-line"></i></button>
                     </div>
                  </article>

                  <article className="featured__card swiper-slide">
                     <img src={new URL('./assets/img/81e85tPVJpL._AC_UF1000,1000_QL80_.jpg', import.meta.url).href} alt="img" className="featured__img" />

                     <h2 className="featured__title">Featured Book</h2>
                     <button className="button">Explore Now</button>

                     <div className="featured__actions">
                        <button><i className="ri-search-line"></i></button>
                        <button><i className="ri-heart-3-line"></i></button>
                        <button><i className="ri-eye-line"></i></button>
                     </div>
                  </article>
               </div>

               <div className="swiper-button-prev">
                  <i className="ri-arrow-left-s-line"></i>
               </div>

               <div className="swiper-button-next">
                  <i className="ri-arrow-right-s-line"></i>
               </div>
            </div>
         </div>
      </section>

      {/*==================== choose the best plan ====================*/}
   <section className="section" aria-labelledby="pricing-heading">
      <div className="container">
         <h1 id="pricing-heading" className="heading">Choose The best Plan</h1>
         <p className="subheading">choose a plan that's right for your growing team. Simple pricing &amp; No hidden charges.</p>

         <div className="plans" role="list">
         {/* Left plan */}
            <article className="plan" role="listitem" aria-labelledby="plan-discover">
               <div id="plan-discover" className="plan-title">Discover</div>
               <div className="price">
                  <span className="small-price">$99</span>
                  <small>/ Per Month</small>
               </div>

               <div className="features">
                  <div className="feature"><span className="tick">✓</span>Reserve Book Online</div>
                  <div className="feature"><span className="tick">✓</span>Return Book Online</div>
                  <div className="feature"><span className="tick">✓</span>Borrow + 3 books Monthly</div>
               </div>

               <a className="btn" href="#" role="button" aria-label="Subscribe to Discover">Subscribe</a>
            </article>

         {/* Center plan - highlighted */}
            <article className="plan center" role="listitem" aria-labelledby="plan-enterprise">
               <div id="plan-enterprise" className="plan-title">Enterprise</div>
               <div className="price">
                  <span>$299</span>
                  <small>/ Per Month</small>
               </div>

               <div className="features">
                  <div className="feature"><span className="tick">✓</span>Reserve Book Online</div>
                  <div className="feature"><span className="tick">✓</span>Return Book Online</div>
                  <div className="feature"><span className="tick">✓</span>Borrow + 15 books Monthly</div>
               </div>

               <a className="btn" href="#" role="button" aria-label="Subscribe to Enterprise">Subscribe</a>
            </article>

         {/* Right plan */}
            <article className="plan" role="listitem" aria-labelledby="plan-pro">
               <div id="plan-pro" className="plan-title">Professional</div>
               <div className="price">
                  <span className="small-price">$199</span>
                  <small>/ Per Month</small>
               </div>

               <div className="features">
                  <div className="feature"><span className="tick">✓</span>Reserve Book Online</div>
                  <div className="feature"><span className="tick">✓</span>Return Book Online</div>
                  <div className="feature"><span className="tick">✓</span>Borrow + 10 books Monthly</div>
               </div>

               <a className="btn" href="#" role="button" aria-label="Subscribe to Professional">Subscribe</a>
            </article>
         </div>
      </div>
   </section>
   {/*==================== TESTIMONIAL ====================*/}
  <section className="testimonial section" id="testimonial">
         <h2 className="section__title">
            Customer Opinions
         </h2>

         <div className="testimonial__container container">
            <div className="testimonial__swiper swiper">
               <div className="swiper-wrapper">
                  <article className="testimonial__card swiper-slide">
                     <img src={new URL('./assets/img/testimonial-perfil-1.png', import.meta.url).href} alt="image" className="testimonial__img" />

                     <h2 className="testimonial__title">Rial Loz</h2>
                     <p className="testimonial__description">
                        The best website to buy books, the purchase
                        is very easy to make and has great discounts.
                     </p>

                     <div className="testimonial__stars">
                        <i className="ri-star-fill"></i>
                        <i className="ri-star-fill"></i>
                        <i className="ri-star-fill"></i>
                        <i className="ri-star-fill"></i>
                        <i className="ri-star-half-fill"></i>
                     </div>
                  </article>

                  <article className="testimonial__card swiper-slide">
                     <img src={new URL('./assets/img/testimonial-perfil-2.png', import.meta.url).href} alt="image" className="testimonial__img" />

                     <h2 className="testimonial__title">Rial Loz</h2>
                     <p className="testimonial__description">
                        The best website to buy books, the purchase
                        is very easy to make and has great discounts.
                     </p>

                     <div className="testimonial__stars">
                        <i className="ri-star-fill"></i>
                        <i className="ri-star-fill"></i>
                        <i className="ri-star-fill"></i>
                        <i className="ri-star-fill"></i>
                        <i className="ri-star-half-fill"></i>
                     </div>
                  </article>

                  <article className="testimonial__card swiper-slide">
                     <img src={new URL('./assets/img/WhatsApp Image 2025-03-07 at 22.33.54_3c91cbcf.jpg', import.meta.url).href} alt="image" className="testimonial__img" />

                     <h2 className="testimonial__title">Mohammed Hussein</h2>
                     <p className="testimonial__description">
                        The best website to buy books, the purchase
                        is very easy to make and has great discounts.
                     </p>

                     <div className="testimonial__stars">
                        <i className="ri-star-fill"></i>
                        <i className="ri-star-fill"></i>
                        <i className="ri-star-fill"></i>
                        <i className="ri-star-fill"></i>
                        <i className="ri-star-half-fill"></i>
                     </div>
                  </article>

                  <article className="testimonial__card swiper-slide">
                     <img src={new URL('./assets/img/WhatsApp Image 2025-03-07 at 22.33.54_3c91cbcf.jpg', import.meta.url).href} alt="image" className="testimonial__img" />

                     <h2 className="testimonial__title">Rial Loz</h2>
                     <p className="testimonial__description">
                        The best website to buy books, the purchase
                        is very easy to make and has great discounts.
                     </p>

                     <div className="testimonial__stars">
                        <i className="ri-star-fill"></i>
                        <i className="ri-star-fill"></i>
                        <i className="ri-star-fill"></i>
                        <i className="ri-star-fill"></i>
                        <i className="ri-star-half-fill"></i>
                     </div>
                  </article>
               </div>
            </div>
         </div>
      </section>
   </main>
   {/*==================== FOOTER ====================*/}

   
<footer className="footer">
   <div className="footer-container">

    {/* LEFT: LOGO + TEXT */}
      <div className="footer-col footer-brand">
         <a href="#" className="footer-logo">
            <img src="logo.png" alt="BookHive Logo" />
            <div className="logo-text">
               <span className="name">BookHive</span>
               <span className="sub">Library</span>
            </div>
         </a>

         <p className="footer-description">
            Find and explore the best <br />
            eBooks from all your <br />
            favorite writers.
         </p>
      </div>

    {/* ABOUT */}
      <div className="footer-col">
         <h3 className="footer-title">About</h3>
         <ul className="footer-links">
            <li><a href="#">Who are we ?</a></li>
            <li><a href="#">Our Branches</a></li>
            <li><a href="#">Customer Feedback</a></li>
         </ul>
      </div>

    {/* CONTACT */}
      <div className="footer-col">
         <h3 className="footer-title">Contact</h3>
         <ul className="footer-links">
            <li>Cairo, Egypt</li>
            <li>BookHive@gmail.com</li>
            <li>01122334455</li>
         </ul>
      </div>

    {/* SOCIAL */}
      <div className="footer-col">
         <h3 className="footer-title">Social</h3>
         <div className="footer-social">
            <a href="#"><i className="ri-facebook-circle-line"></i></a>
            <a href="#"><i className="ri-instagram-line"></i></a>
            <a href="#"><i className="ri-twitter-x-line"></i></a>
         </div>
      </div>

   </div>

   <p className="footer-copy">© All Rights Reserved By BookHive</p>
</footer>

         {/*========== SCROLL UP ==========*/}
         <a href="#" className="scrollup" id="scroll-up">
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
      </div>
   );
};

export default Home;
