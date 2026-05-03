import { Link } from "react-router-dom";
import { FaLeaf, FaWhatsapp } from "react-icons/fa";
import "./Hero.scss";

const WA_URL =
  "https://wa.me/919934080104?text=Hello!%20I'd%20like%20to%20book%20THE%20CITY%20GARDEN%20for%20my%20event.";

const Hero = () => (
  <section
    className="hero"
    id="hero"
    aria-label="Hero banner"
  >
    <div className="hero__content">
      <div className="hero__badge">
        <FaLeaf />
        Premium Garden Venue · Dumka
      </div>

      <h1 className="hero__heading">
        Celebrate Your
        <br />
        Special Moments <em>in Elegance</em>
      </h1>

      <p className="hero__sub">
        Elegant garden venue in Dumka for weddings, receptions, engagements,
        <br />
        birthday parties &amp; corporate events
      </p>

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
