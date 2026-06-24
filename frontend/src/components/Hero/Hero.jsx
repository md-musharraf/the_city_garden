import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaLeaf, FaWhatsapp } from "react-icons/fa";
import { gsap } from "gsap";
import "./Hero.scss";

const WA_URL =
  "https://wa.me/919934080104?text=Hello!%20I'd%20like%20to%20book%20THE%20CITY%20GARDEN%20for%20my%20event.";

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Phase 1: Background image fade & blur release
      tl.fromTo(
        ".hero__bg",
        { filter: "blur(12px)", opacity: 0 },
        { filter: "blur(0px)", opacity: 1, duration: 2.2 }
      );

      // Phase 2: Stagger reveal of content elements (y-offset slide and opacity)
      tl.fromTo(
        [".hero__badge", ".hero__heading", ".hero__sub", ".hero__btns", ".hero__scroll"],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.15 },
        "-=1.6" // Overlap with background animation
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero"
      id="hero"
      aria-label="Hero banner"
    >
      {/* Ken Burns Animated Background Layer */}
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__content">
        <div className="hero__badge" style={{ opacity: 0 }}>
          <FaLeaf />
          Premium Garden Venue · Dumka
        </div>

        <h1 className="hero__heading" style={{ opacity: 0 }}>
          Celebrate Your
          <br />
          Special Moments <em>in Elegance</em>
        </h1>

        <p className="hero__sub" style={{ opacity: 0 }}>
          Elegant garden venue in Dumka for weddings, receptions, engagements,
          <br />
          birthday parties &amp; corporate events
        </p>

        <div className="hero__btns" style={{ opacity: 0 }}>
          <Link
            to="/booking"
            className="btn-primary"
          >
            Check Availability
          </Link>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <FaWhatsapp /> Book Now
          </a>
        </div>
      </div>

      <div
        className="hero__scroll"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <div className="hero__scroll-dot" />
        Scroll
      </div>
    </section>
  );
};

export default Hero;
