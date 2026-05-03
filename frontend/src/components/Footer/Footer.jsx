import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => (
  <footer className="footer">
    <div className="footer__top">
      <div className="footer__brand">
        <Link
          to="/"
          className="footer__logo"
        >
          THE CITY GARDEN
        </Link>
        <p>
          A premium outdoor garden venue in Dumka, Jharkhand — the perfect setting for weddings,
          receptions, engagements, and all your special celebrations.
        </p>
      </div>

      <div className="footer__col">
        <h4>Quick Links</h4>
        <ul>
          <li>
            <Link to="/#about">About Us</Link>
          </li>
          <li>
            <Link to="/#services">Services</Link>
          </li>
          <li>
            <Link to="/#gallery">Gallery</Link>
          </li>
          <li>
            <Link to="/#packages">Packages</Link>
          </li>
          <li>
            <Link to="/#booking">Book Now</Link>
          </li>
        </ul>
      </div>

      <div className="footer__col">
        <h4>Events</h4>
        <ul>
          <li>
            <Link to="/#services">Weddings</Link>
          </li>
          <li>
            <Link to="/#services">Receptions</Link>
          </li>
          <li>
            <Link to="/#services">Engagements</Link>
          </li>
          <li>
            <Link to="/#services">Birthday Parties</Link>
          </li>
          <li>
            <Link to="/#services">Corporate Events</Link>
          </li>
        </ul>
      </div>

      <div className="footer__col">
        <h4>Contact</h4>
        <ul>
          <li>
            <a href="tel:+919934080104">+91 99340 80104</a>
          </li>
          <li>
            <a
              href="https://wa.me/919934080104"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </li>
          <li>
            <a
              href="https://maps.app.goo.gl/QYyVi1ParKdE6db16"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </li>
          <li>
            <span>New, Police Line Road, LIC colony, Dumka, Jharkhand 814101</span>
          </li>
        </ul>
      </div>
    </div>

    <div className="footer__bottom">
      <span>© 2025 THE CITY GARDEN, Dumka. All rights reserved.</span>
      <span>
        Design <span className="footer__heart">&</span> Develop by{" "}
        <span className="footer__heart">Md Musharraf</span>
        <div
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <h4>Contact :-</h4>
          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() =>
              window.open(
                "https://wa.me/916299019431?text=Hello!%20I'd%20like%20to%20inquire%20about%20THE%20CITY%20GARDEN.",
                "_blank",
              )
            }
          >
            <a
              style={{ color: "#ffff" }}
              href="tel:+916299019431"
            >
              +91 62990 19431
            </a>
          </span>
        </div>
      </span>
    </div>
  </footer>
);

export default Footer;
