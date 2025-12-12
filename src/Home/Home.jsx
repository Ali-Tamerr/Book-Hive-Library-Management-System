import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/swiper-bundle.min.css';
import './css/styles.css';
import './css/stylesNew.css';


const Home = () => {
   const navigate = useNavigate();

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
                     onClick={() => navigate('/login')}
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
         <div className="login grid" id="login-content">
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

                  <button type="submit" className="login__button button">Log In</button>
               </div>
            </form>

            <i className="ri-close-line login__close" id="login-close"></i>
         </div>

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
                              <img src={new URL('./assets/img/Jose Mourinho.png', import.meta.url).href} alt="image" className="home__img" />
                           </article>

                           <article className="home__article swiper-slide">
                              <img src={new URL('./assets/img/Juhan Cruyff.png', import.meta.url).href} alt="image" className="home__img" />
                           </article>

                           <article className="home__article swiper-slide">
                              <img src={new URL('./assets/img/Pep Guardiola.png', import.meta.url).href} alt="image" className="home__img" />
                           </article>

                           <article className="home__article swiper-slide">
                              <img src={new URL('./assets/img/Arsene Wenger.png', import.meta.url).href} alt="image" className="home__img" />
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
            {/*==================== ABOUT US ====================*/}
            <section className="about section" id="about">
               <h2 className="about__title section__title">
                  About Us
               </h2>
               <div className="about__container container">

                  <div className="about__content">
                     <div className="about__info">
                        <p className="about__description">
                           We are a smart, technology-driven library system that uses RFID to make book management faster and easier. Our platform helps students and staff search, borrow, and track books efficiently with a modern and user-friendly design.
                        </p>

                        <div className="about__stats">
                           <div className="about__stat">
                              <span className="about__stat-number">5+</span>
                              <span className="about__stat-label">Branches</span>
                           </div>
                           <div className="about__stat">
                              <span className="about__stat-number">1K+</span>
                              <span className="about__stat-label">Books</span>
                           </div>
                           <div className="about__stat">
                              <span className="about__stat-number">100+</span>
                              <span className="about__stat-label">Category</span>
                           </div>
                        </div>

                        <a href="#" className="about__button button">Where are we ?</a>
                     </div>

                     <div className="about__images">
                        <div className="about__book about__book--left">
                           <img src={new URL('./assets/img/Bobby Charlton.png', import.meta.url).href} alt="Book" className="about__book-img" />
                        </div>
                        <div className="about__book about__book--right">
                           <img src={new URL('./assets/img/Arsene Wenger.png', import.meta.url).href} alt="Book" className="about__book-img" />
                        </div>
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
                           <img src={new URL('./assets/img/book-1.png', import.meta.url).href} alt="img" className="featured__img" />
                           <h2 className="featured__title">Featured Book</h2>
                           <button className="button">Add To Card</button>
                           <div className="featured__actions">
                              <button><i className="ri-search-line"></i></button>
                              <button><i className="ri-heart-3-line"></i></button>
                              <button><i className="ri-eye-line"></i></button>
                           </div>
                        </article>

                        <article className="featured__card swiper-slide">
                           <img src={new URL('./assets/img/book-2.png', import.meta.url).href} alt="img" className="featured__img" />
                           <h2 className="featured__title">Featured Book</h2>
                           <button className="button">Add To Card</button>

                           <div className="featured__actions">
                              <button><i className="ri-search-line"></i></button>
                              <button><i className="ri-heart-3-line"></i></button>
                              <button><i className="ri-eye-line"></i></button>
                           </div>
                        </article>

                        <article className="featured__card swiper-slide">
                           <img src={new URL('./assets/img/book-3.png', import.meta.url).href} alt="img" className="featured__img" />
                           <h2 className="featured__title">Featured Book</h2>
                           <button className="button">Add To Card</button>

                           <div className="featured__actions">
                              <button><i className="ri-search-line"></i></button>
                              <button><i className="ri-heart-3-line"></i></button>
                              <button><i className="ri-eye-line"></i></button>
                           </div>
                        </article>

                        <article className="featured__card swiper-slide">
                           <img src={new URL('./assets/img/book-4.png', import.meta.url).href} alt="img" className="featured__img" />
                           <h2 className="featured__title">Featured Book</h2>
                           <button className="button">Add To Card</button>

                           <div className="featured__actions">
                              <button><i className="ri-search-line"></i></button>
                              <button><i className="ri-heart-3-line"></i></button>
                              <button><i className="ri-eye-line"></i></button>
                           </div>
                        </article>

                        <article className="featured__card swiper-slide">
                           <img src={new URL('./assets/img/book-5.png', import.meta.url).href} alt="img" className="featured__img" />
                           <h2 className="featured__title">Featured Book</h2>
                           <button className="button">Add To Card</button>

                           <div className="featured__actions">
                              <button><i className="ri-search-line"></i></button>
                              <button><i className="ri-heart-3-line"></i></button>
                              <button><i className="ri-eye-line"></i></button>
                           </div>
                        </article>

                        <article className="featured__card swiper-slide">
                           <img src={new URL('./assets/img/book-6.png', import.meta.url).href} alt="img" className="featured__img" />
                           <h2 className="featured__title">Featured Book</h2>
                           <button className="button">Add To Card</button>

                           <div className="featured__actions">
                              <button><i className="ri-search-line"></i></button>
                              <button><i className="ri-heart-3-line"></i></button>
                              <button><i className="ri-eye-line"></i></button>
                           </div>
                        </article>

                        <article className="featured__card swiper-slide">
                           <img src={new URL('./assets/img/book-7.png', import.meta.url).href} alt="img" className="featured__img" />
                           <h2 className="featured__title">Featured Book</h2>
                           <button className="button">Add To Card</button>

                           <div className="featured__actions">
                              <button><i className="ri-search-line"></i></button>
                              <button><i className="ri-heart-3-line"></i></button>
                              <button><i className="ri-eye-line"></i></button>
                           </div>
                        </article>

                        <article className="featured__card swiper-slide">
                           <img src={new URL('./assets/img/book-8.png', import.meta.url).href} alt="img" className="featured__img" />
                           <h2 className="featured__title">Featured Book</h2>
                           <button className="button">Add To Card</button>

                           <div className="featured__actions">
                              <button><i className="ri-search-line"></i></button>
                              <button><i className="ri-heart-3-line"></i></button>
                              <button><i className="ri-eye-line"></i></button>
                           </div>
                        </article>

                        <article className="featured__card swiper-slide">
                           <img src={new URL('./assets/img/book-9.png', import.meta.url).href} alt="img" className="featured__img" />
                           <h2 className="featured__title">Featured Book</h2>
                           <button className="button">Add To Card</button>

                           <div className="featured__actions">
                              <button><i className="ri-search-line"></i></button>
                              <button><i className="ri-heart-3-line"></i></button>
                              <button><i className="ri-eye-line"></i></button>
                           </div>
                        </article>

                        <article className="featured__card swiper-slide">
                           <img src={new URL('./assets/img/book-10.png', import.meta.url).href} alt="img" className="featured__img" />
                           <h2 className="featured__title">Featured Book</h2>
                           <button className="button">Add To Card</button>

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

            {/* ===========CHOOSE THE BEST PLAN=========== */}
            <section className="section" aria-labelledby="pricing-heading">
               <div className="container container-best-plan">
                  <h1 id="pricing-heading" className="heading">Choose The best Plan</h1>
                  <p className="subheading">choose a plan that's right for your growing team. Simple pricing &amp; No hidden charges.</p>

                  <div className="plans" role="list">
                     {/* <!-- Left plan --> */}
                     <article className="plan" role="listitem" aria-labelledby="plan-discover">
                        <div id="plan-discover" className="plan-title">Discover</div>
                        <div className="price">
                           <span className="small-price">$99 <small>/ Per Month</small></span>

                        </div>

                        <div className="features">
                           <div className="feature"><span className="tick">✓</span>Reserve Book Online</div>
                           <div className="feature"><span className="tick">✓</span>Return Book Online</div>
                           <div className="feature"><span className="tick">✓</span>Borrow + 3 books Monthly</div>
                        </div>

                        <a className="btn" href="#" role="button" aria-label="Subscribe to Discover">Subscribe</a>
                     </article>

                     {/* <!-- Center plan - highlighted --> */}
                     <article className="plan plan-center" role="listitem" aria-labelledby="plan-enterprise">
                        <div id="plan-enterprise" className="plan-title">Enterprise</div>
                        <div className="price">
                           <span>$299 <small>/ Per Month</small></span>

                        </div>

                        <div className="features">
                           <div className="feature"><span className="tick">✓</span>Reserve Book Online</div>
                           <div className="feature"><span className="tick">✓</span>Return Book Online</div>
                           <div className="feature"><span className="tick">✓</span>Borrow + 15 books Monthly</div>
                        </div>

                        <a className="btn" href="#" role="button" aria-label="Subscribe to Enterprise">Subscribe</a>
                     </article>

                     {/* <!-- Right plan --> */}
                     <article className="plan" role="listitem" aria-labelledby="plan-pro">
                        <div id="plan-pro" className="plan-title">Professional</div>
                        <div className="price">
                           <span className="small-price">$199<small>/ Per Month</small></span>
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
                           <img src={new URL('./assets/img/testimonial-perfil-3.png', import.meta.url).href} alt="image" className="testimonial__img" />

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
                           <img src={new URL('./assets/img/testimonial-perfil-4.png', import.meta.url).href} alt="image" className="testimonial__img" />

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
            <div className="footer__container container grid">
               <div>
                  <a href="#" className="footer__logo" style={{ color: 'black' }}>
                     <img src={new URL('./assets/logo.svg', import.meta.url).href} alt="Book Hive Logo" style={{ width: '30px', height: 'auto' }} /> Book Hive
                  </a>

                  <p className="footer__description">
                     Find and explore the best <br />
                     eBooks from all your <br />
                     favorite writers.
                  </p>
               </div>

               <div className="footer__data grid">
                  <div>
                     <h3 className="footer__title">About</h3>

                     <ul className="footer__links">
                        <li>
                           <a href="#" className="footer__link">Awards</a>
                        </li>

                        <li>
                           <a href="#" className="footer__link">FAQs</a>
                        </li>

                        <li>
                           <a href="#" className="footer__link">Privacy policy</a>
                        </li>

                        <li>
                           <a href="#" className="footer__link">Terms of services</a>
                        </li>
                     </ul>
                  </div>

                  <div>
                     <h3 className="footer__title">Company</h3>

                     <ul className="footer__links">
                        <li>
                           <a href="#" className="footer__link">Blogs</a>
                        </li>

                        <li>
                           <a href="#" className="footer__link">Community</a>
                        </li>

                        <li>
                           <a href="#" className="footer__link">Our team</a>
                        </li>

                        <li>
                           <a href="#" className="footer__link">Help center</a>
                        </li>
                     </ul>
                  </div>

                  <div>
                     <h3 className="footer__title">Contact</h3>

                     <ul className="footer__links">
                        <li>
                           <address className="footer__info">
                              Cairo, Egypt
                           </address>
                        </li>

                        <li>
                           <address className="footer__info">
                              abdelmohymen21@gmail.com <br />
                              01124422202
                           </address>
                        </li>
                     </ul>
                  </div>

                  <div>
                     <h3 className="footer__title">Social</h3>

                     <div className="footer__social">
                        <a href="https://www.facebook.com/" target="_blank" className="footer__social-link">
                           <i className="ri-facebook-circle-line"></i>
                        </a>

                        <a href="https://www.instagram.com/" target="_blank" className="footer__social-link">
                           <i className="ri-instagram-line"></i>
                        </a>

                        <a href="https://twitter.com/" target="_blank" className="footer__social-link">
                           <i className="ri-twitter-x-line"></i>
                        </a>
                     </div>
                  </div>
               </div>
            </div>

            <span className="footer__copy">
               &#169; All Rights Reserved By Abdelmohymen
            </span>
         </footer>

         {/*========== SCROLL UP ==========*/}
         <a href="#" className="scrollup" id="scroll-up">
            <i className="ri-arrow-up-line"></i>
         </a>
      </div>
   );
};

export default Home;
