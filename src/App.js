import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./App.css";
import iPhone16 from "./Assets/iphone15.png"; // Phone image

function App() {
  const { scrollYProgress } = useScroll();

  // Phone image animation: Moves from bottom to top
  const phoneImageY = useTransform(scrollYProgress, [0.2, 0.5], ["100%", "0%"]);
  const phoneImageOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.5],
    [0, 1]
  );

  return (
    <div className="App">
      {/* Section 1 */}
      <section className="section section-one">
        <div className="header">
          <div className="logo">
            Pigeon <span className="post">Post</span>
          </div>
          <button className="demo-button">Request Demo</button>
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
        {/* Phone Image */}
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
          <h2>Platform of Possibilities</h2>
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

    </div>
  );
}

export default App;
