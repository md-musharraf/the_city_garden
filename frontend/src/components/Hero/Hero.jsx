import { Link } from "react-router-dom";
import { FaLeaf, FaWhatsapp } from "react-icons/fa";
import ScrollReveal from "../ScrollReveal";
import "./Hero.scss";

const WA_URL =
  "https://wa.me/919934080104?text=Hello!%20I'd%20like%20to%20book%20THE%20CITY%20GARDEN%20for%20my%20event.";

const Hero = () => (
  <section
    className="hero"
    id="hero"
    aria-label="Hero banner"
  >
    {/* Ken Burns Animated Background Layer */}
    <div className="hero__bg" aria-hidden="true" />
    <div className="hero__overlay" aria-hidden="true" />

    <div className="hero__content">
      <ScrollReveal animation="fade-up" delay="1">
        <div className="hero__badge">
          <FaLeaf />
          Premium Garden Venue · Dumka
        </div>
      </ScrollReveal>

      <ScrollReveal animation="reveal-blur" delay="2">
        <h1 className="hero__heading">
          Celebrate Your
          <br />
          Special Moments <em>in Elegance</em>
        </h1>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" delay="3">
        <p className="hero__sub">
          Elegant garden venue in Dumka for weddings, receptions, engagements,
          <br />
          birthday parties &amp; corporate events
        </p>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" delay="4">
        <div className="hero__btns">
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
      </ScrollReveal>
    </div>

    <div
      className="hero__scroll"
      aria-hidden="true"
    >
      <div className="hero__scroll-dot" />
      Scroll
    </div>
  </section>
);

export default Hero;
