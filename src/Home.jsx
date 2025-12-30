import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./Home.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { color, motion } from "framer-motion";

function Home() {
  // ✅ First carousel (food items slider)
  const settings1 = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    arrows: true,
  };

  // ✅ Categories carousel
  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    cssEase: "linear",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  // ✅ Fade carousel for promotions
  const fadeSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };

  // ✅ Categories
  const categories = [
    { id: 1, name: "Veg", img: "/images/veg.jpg", link: "/veg" },
    { id: 2, name: "Non-Veg", img: "/images/nonveg.jpg", link: "/nonveg" },
    { id: 3, name: "Milk Shakes", img: "/images/milk.jpg", link: "/milk" },
    {
      id: 4,
      name: "Chocolate",
      img: "/images/chocolate.jpg",
      link: "/chocolate",
    },
    { id: 5, name: "Bakery Items", img: "/images/bakery.jpg", link: "/bakery" },
  ];

  const fadeItems = [
    { id: 1, img: "/images/cc1.jpg", link: "/bakery" },
    { id: 2, img: "/images/c2.jpg", link: "/nonveg" },
    { id: 3, img: "/images/c3.jpg", link: "/bakery" },
  ];

  const reviews = [
    {
      img: "/images/lokesh.jpg",
      name: "Lokesh Surisetti",
      stars: "⭐⭐⭐⭐⭐",
      text: "FoodiePlace is my go-to site...",
      color: "card-blue",
    },
    {
      img: "/images/kmr.jpeg",
      name: "Mohan Kanapakala",
      stars: "⭐⭐⭐⭐",
      text: "Great website with lots of options...",
      color: "card-pink",
    },
    {
      img: "/images/butterfly.jpg",
      name: "Bhargavi Nelli",
      stars: "⭐⭐⭐⭐⭐",
      text: "I absolutely love FoodiePlace...",
      color: "card-green",
    },
    {
      img: "/images/kl.jpg",
      name: "KL Rahul",
      stars: "⭐⭐⭐⭐⭐",
      text: "FoodiePlace is a foodie’s paradise...",
      color: "card-purple",
    },
    {
      img: "/images/kranthi.jpeg",
      name: "Kranthi Gara",
      stars: "⭐⭐⭐⭐⭐",
      text: "FoodiePlace is a foodie’s paradise...",
      color: "card-purple",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 4000); // change every 4 seconds
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <div>
      {/* ===== Fullscreen Video Section ===== */}
      <div className="video-container">
        <video
          className="hero-video"
          src="/images/video2.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="video-overlay">
          <h1>
            Welcome To <span>FoodiePlace</span>
          </h1>
          <h1>
            Exquisite <span>Flavors</span>
          </h1>
          <h2>
            Memorable <span>Moments</span>
          </h2>
          <div className="hero-buttons">
            <Link to="/veg" className="btn-primary">
              Order Now
            </Link>
            <Link to="/contactus" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* ===== Fade Carousel Section (New) ===== */}
      <div className="carousel-container1">
        <h2 className="carousel-title1">
          😋 <span>Treat Yourself Today</span>
        </h2>
        <Slider {...fadeSettings}>
          {fadeItems.map((item) => (
            <div key={item.id} className="category-card1">
              <Link to={item.link}>
                <motion.div
                  className="category-box1"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <img
                    src={item.img}
                    alt={`fade-${item.id}`}
                    className="category-image1"
                  />
                </motion.div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>

      {/* ===== Marquee Section (unchanged) ===== */}
      <br />
      <div className="food-carousel">
        <h2 className="food-sec">
          <span> Visit Our Best Food Items </span>👀
        </h2>

        <div className="marquee-background">
          <marquee behavior="scroll" direction="right" scrollamount="10">
            <div className="marquee-items">
              {/* All your food-item divs */}
              <div className="food-item">
                <a href="/nonveg">
                  <img
                    src="/images/chicken-biryani.png"
                    alt="Chicken Biryani"
                  />
                </a>
                <strong>Chicken Biryani</strong>
              </div>
              <div className="food-item">
                <a href="/nonveg">
                  <img src="/images/tandoori.webp" alt="Tandoori Chicken" />
                </a>
                <strong>Tandoori Chicken</strong>
              </div>
              <div className="food-item">
                <a href="/nonveg">
                  <img src="/images/mutton-curry.png" alt="Mutton Curry" />
                </a>
                <strong>Mutton Curry</strong>
              </div>
              <div className="food-item">
                <a href="/veg">
                  <img src="/images/paneer-butter.png" alt="Paneer Butter" />
                </a>
                <strong>Paneer Butter</strong>
              </div>
              <div className="food-item">
                <a href="/veg">
                  <img src="/images/masala-dosa.png" alt="Masala Dosa" />
                </a>
                <strong>Masala Dosa</strong>
              </div>
              <div className="food-item">
                <a href="/veg">
                  <img src="/images/veg munchuria.png" alt="Veg Munchuria" />
                </a>
                <strong>Veg Munchuria</strong>
              </div>
              <div className="food-item">
                <a href="/bakery">
                  <img src="/images/pizza.png" alt="Pizza" />
                </a>
                <strong>Pizza</strong>
              </div>
              <div className="food-item">
                <a href="/bakery">
                  <img src="/images/burger.png" alt="Burger" />
                </a>
                <strong>Burger</strong>
              </div>
              <div className="food-item">
                <a href="/bakery">
                  <img src="/images/cake.png" alt="Cake" />
                </a>
                <strong>Cake</strong>
              </div>
              <div className="food-item">
                <a href="/bakery">
                  <img src="/images/chicken-roll.webp" alt="Chicken Roll" />
                </a>
                <strong>Chicken Roll</strong>
              </div>
              <div className="food-item">
                <a href="/milk">
                  <img src="/images/milk-6.png" alt="Vanilla" />
                </a>
                <strong>Vanilla</strong>
              </div>
              <div className="food-item">
                <a href="/milk">
                  <img src="/images/milk-7.png" alt="Oreo" />
                </a>
                <strong>Oreo</strong>
              </div>
              <div className="food-item">
                <a href="/milk">
                  <img src="/images/lassi.png" alt="Lassi" />
                </a>
                <strong>Lassi</strong>
              </div>
              <div className="food-item">
                <a href="/bakery">
                  <img src="/images/ice-cream.png" alt="Ice Cream" />
                </a>
                <strong>Ice Cream</strong>
              </div>
              <div className="food-item">
                <a href="/bakery">
                  <img src="/images/samosa1.png" alt="Samosa" />
                </a>
                <strong>Samosa</strong>
              </div>
              <div className="food-item">
                <a href="/veg">
                  <img src="/images/noodles.png" alt="Noodles" />
                </a>
                <strong>Noodles</strong>
              </div>
            </div>
          </marquee>
        </div>
      </div>

      {/* ===== Categories Carousel ===== */}
      <div className="carousel-container">
        <h2 className="carousel-title">🍴 Foods Categories</h2>
        <Slider {...settings2}>
          {categories.map((cat) => (
            <div key={cat.id} className="category-card">
              <Link to={cat.link}>
                <div className="category-box">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="category-image"
                  />
                  <h4>
                    <strong
                      style={{
                        color: "#ff0000d0",
                        textTransform: "uppercase",
                        textDecoration:"none",
                        textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
                      }}
                    >
                      {cat.name}
                    </strong>
                  </h4>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>

      {/* ===== Our Achievements Section ===== */}
      <div className="container-fluid" style={{ marginTop: "1px" }}>
        <h2 className="heading">Our Achievements</h2>
        <div className="row rowStyle">
          <div className="col-sm-6 p-4">
            <div className="colFirst">
              <h3>Our story</h3>
              <h5>Crafting Culinary Excellence Since 2025</h5>
              <p>
                At FoodiePlace, we believe that great food brings people
                together. Our passionate chefs combine traditional techniques
                with modern innovation to create extraordinary dining
                experiences that celebrate the art of cuisine.
              </p>
              <p>
                Every dish tells a story of carefully sourced ingredients,
                masterful preparation, and unwavering commitment to quality.
                We're not just serving food – we're creating memories.
              </p>
            </div>
          </div>
          <div className="col-sm-6 p-4">
            <div className="colSecond">
              <div className="achieve-card">
                <i className="bi bi-award icons"></i>
                <br />
                <strong className="achieves">15+</strong>
                <h6 style={{ color: "white" }}>Awards Won</h6>
              </div>
              <div className="achieve-card">
                <i className="bi bi-emoji-smile-fill icons"></i>
                <br />
                <strong className="achieves">10K+</strong>
                <h6 style={{ color: "white" }}>Happy Customers</h6>
              </div>
              <div className="achieve-card">
                <i className="bi bi-heart icons"></i>
                <br />
                <strong className="achieves">Fast Delivery</strong>
                <h6 style={{ color: "white" }}>Quick and reliable service</h6>
              </div>
              <div className="achieve-card">
                <i className="bi bi-clock icons"></i>
                <br />
                <strong className="achieves">50+</strong>
                <h6 style={{ color: "white" }}>Daily Fresh Dishes</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Contact & Reviews Section ===== */}
      <div className="container-fluid text-center">
        <h2 className="get-heading">Get In Touch</h2>
        <br />
        <h3 className="sub-heading">Visit FoodiePlace Today</h3>
        <p className=" mb-5 text-dark">
          We'd love to welcome you to our restaurant. Reach out for reservations
          or any inquiries
        </p>

        {/* Row of 4 cards */}
        <div className="row g-3">
          <div className="col-md-3">
            <div className="card shadow-sm p-4 h-100">
              <i className="bi bi-geo-alt-fill fs-1 text-warning mb-3"></i>
              <h5>Visit Us</h5>
              <p>Kotturu</p>
              <p>Srikakulam District, AP, 532455</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm p-4 h-100">
              <i className="bi bi-telephone-fill fs-1 text-success mb-3"></i>
              <h5>Call Us</h5>
              <p>6305927818</p>
              <p>6306927818</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm p-4 h-100">
              <i className="bi bi-envelope-fill fs-1 text-primary mb-3"></i>
              <h5>Email Us</h5>
              <p>hello@foodieplace.com</p>
              <p>kanapakalamohanrao@gmail.com</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm p-4 h-100">
              <i className="bi bi-clock-fill fs-1 text-danger mb-3"></i>
              <h5>Opening Hours</h5>
              <p>Mon-Thu: 11AM - 10PM</p>
              <p>Fri-Sun: 11AM - 11PM</p>
            </div>
          </div>
        </div>

        <p className="text-dark mt-3">
          For large group bookings or special events, please call us directly
        </p>
      </div>

      {/* Customer Reviews */}
      <div>
        <h2 className="review-heading">What Our Customer Says..</h2>
      </div>
      <div className="reviews-section">
        <div className="reviews-container">
          {reviews.map((r, index) => (
            <div
              key={index}
              className={`review-card ${index === current ? "active" : ""}`}
            >
              <img src={r.img} alt={r.name} />
              <strong>{r.name}</strong>
              <p className="stars">{r.stars}</p>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div
        className="container-fluid row-section"
        style={{ marginTop: "10px" }}
      >
        <div className="row">
          <div className="col-sm-3 foodiePlace">
            <h2>FoodiePlace</h2>
            <p>
              Creating exceptional dining experiences with passion, quality, and
              innovation since 2025.
            </p>
            <div className="icons-grid">
              <a href="https://www.facebook.com/mohanrao.kanapakala">
                <h5 className="fb-color">
                  <i className="bi bi-facebook"></i>
                </h5>
              </a>
              <a href="https://www.instagram.com/mohan_kanapakala/">
                <h5 className="insta-color">
                  <i className="bi bi-instagram"></i>
                </h5>
              </a>
              <a
                href="https://wa.me/916305927818?text=Hello%20Mohan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h5 className="whatsapp-color">
                  <i className="bi bi-whatsapp"></i>
                </h5>
              </a>
            </div>
          </div>

          <div className="col-sm-3">
            <h4 className="quick-link">Quick Links</h4>
            <div className="quick-links">
              <a href="/veg">Veg</a>
              <br />
              <a href="/nonveg">NonVeg</a>
              <br />
              <a href="/milk">MilkItems</a>
              <br />
              <a href="/chocolate">Chocolates</a>
              <br />
              <a href="/aboutus">About US</a>
              <br />
              <a href="/contactus">Contact Us</a>
            </div>
          </div>

          <div className="col-sm-3">
            <h4 className="menuHeading">Menu</h4>
            <ul className="menu-list">
              <li>Veg Items</li>
              <li>Non-veg Items</li>
              <li>Milk Items</li>
              <li>Chocolates</li>
              <li>Bakery Items</li>
            </ul>
          </div>

          <div className="col-sm-3">
            <h4 className="contactInfo">Contact Info</h4>
            <div className="contact-text">
              <p>
                <i className="bi bi-telephone" style={{ color: "orange" }}></i>{" "}
                91 6305927818
              </p>
              <p>
                <i className="bi bi-envelope" style={{ color: "orange" }}></i>
                &nbsp;hello@foodieplace.com
              </p>
              <p>
                <i className="bi bi-clock" style={{ color: "orange" }}></i>
                &emsp;
                <strong>Opening Hours:</strong>
              </p>
              <ul>
                <li>Mon-Thu: 11AM - 10PM</li>
                <li>Fri-Sun: 11AM - 11PM</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="copy-rights">
              <hr />
              <p>
                &copy; 2025 FoodiePlace. All rights reserved. | Crafted with
                love for food enthusiasts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
