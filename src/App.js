import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import axios from "axios";
import "./App.css";
import iPhone16 from "./Assets/iphone15.png"; // Phone image
import Iphone16left from "./Assets/iphone15left.png";

function App() {
  const { scrollYProgress } = useScroll();

  // Section 2: Phone image animation (bottom to top)
  const phoneImageY = useTransform(scrollYProgress, [0.2, 0.4], ["100%", "0%"]); // Faster range
  const phoneImageOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]); // Faster fade-in

  // Section 4: Phone image animation (left to center) - Faster Animation
  const phoneImageXSec4 = useTransform(scrollYProgress, [0.5, 0.7], ["-100%", "0%"]); // Faster range
  const phoneImageOpacitySec4 = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  // Ref for Section 5
  const sectionFiveRef = useRef(null);

  // State for modal visibility and message
  const [modalMessage, setModalMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Form submit handler
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const fullName = event.target.fullName.value.trim();
    const email = event.target.email.value.trim();

    if (!fullName || !email) {
      setModalMessage("Error: Please fill out all fields.");
      setIsModalVisible(true);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setModalMessage("Error: Please enter a valid email address.");
      setIsModalVisible(true);
      return;
    }

    setModalMessage("We will get in touch with you soon!");
    setIsModalVisible(true);

    // Send data to backend
    try {
      await axios.post("http://localhost:5000/request-demo", { fullName, email });
      console.log("Data sent to backend successfully");
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalVisible(false); // Trigger exit animation
  };

  // Custom Smooth Scroll Function
  const smoothScrollTo = (target) => {
    const element = target.current;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = elementPosition - startPosition;
    const duration = 4000; // Duration of scrolling in milliseconds
    let startTime = null;

    const ease = (time, start, change, duration) => {
      time /= duration / 2;
      if (time < 1) return (change / 2) * time * time + start;
      time--;
      return (-change / 2) * (time * (time - 2) - 1) + start;
    };

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };

  // Handle Click to Scroll to Section 5
  const handleDemoClick = () => {
    smoothScrollTo(sectionFiveRef);
  };

  return (
    <div className="App">
      {/* Section 1 */}
      <section className="section section-one">
        <div className="header">
          <div className="logo">
            Pigeon <span className="post">Post</span>
          </div>
          <button className="demo-button" onClick={handleDemoClick}>
            Request Demo
          </button>
        </div>
        <h1>
          Creativity <span>Beyond Limits</span>
        </h1>
        <p>
          Pigeon Post is built for boundless. For creators who want to break
          through barriers.
        </p>
      </section>

      {/* Section 2 */}
      <section className="section section-two">
        <motion.div
          className="image-container"
          style={{
            y: phoneImageY,
            opacity: phoneImageOpacity,
          }}
        >
          <img src={iPhone16} alt="iPhone 16" />
        </motion.div>
        <div className="text-container">
          <h1>
            Platform of <span>Possibilities</span>
          </h1>
          <p>Everything you need to create, connect, and thrive.</p>
        </div>
      </section>

      {/* Section 3 */}
      <section className="section section-three">
        <div className="text-container">
          <h2>Not Just a Platform</h2>
          <h3>A New Era</h3>
          <p>
            A place where creators write the future together. <br />
            Welcome to the next generation of creativity.
          </p>
        </div>
      </section>

      {/* Section 4 */}
      <section className="section section-four">
        <motion.div
          className="image-container section-four-image"
          style={{
            x: phoneImageXSec4,
            opacity: phoneImageOpacitySec4,
          }}
        >
          <img src={Iphone16left} alt="iPhone 16" />
        </motion.div>
        <div className="text-container">
          <h1>
            Experience <span>Innovation</span>
          </h1>
          <p>
            Discover cutting-edge technology that empowers you to achieve the
            extraordinary.
          </p>
        </div>
      </section>

      {/* Section 5 */}
      <section className="section section-five" ref={sectionFiveRef}>
        <div className="form-container">
          <h1>Request Demo</h1>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="input-field"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input-field"
            />
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isModalVisible && (
          <motion.div
            className="modal"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={() => {
              if (!isModalVisible) setModalMessage(""); // Clear message after exit
            }}
          >
            <div className="modal-content">
              <p>{modalMessage}</p>
              <button className="ok-button" onClick={handleCloseModal}>
                OK
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
