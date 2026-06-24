import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.scss";

const navItems = [
  { label: "About", to: "/#about" },
  { label: "Services", to: "/#services" },
  { label: "Gallery", to: "/#gallery" },
  { label: "Packages", to: "/#packages" },
  { label: "Contact", to: "/#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
        <nav className="navbar__inner">
          <Link
            to="/"
            className="navbar__logo"
          >
            The<span>CITY</span> Garden
          </Link>

          <ul className="navbar__links">
            {navItems.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="navbar__link"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/#booking"
                className="navbar__book-btn"
              >
                Book Now
              </Link>
            </li>
          </ul>

          <button
            id="hamburger-btn"
            className="navbar__hamburger"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div className={`navbar__mobile${open ? " navbar__mobile--open" : ""}`}>
        {navItems.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            onClick={close}
            className="navbar__mobile-link"
          >
            {label}
          </Link>
        ))}
        <Link
          to="/#booking"
          onClick={close}
          className="navbar__mobile-book"
        >
          Book Now
        </Link>
      </div>
    </>
  );
};

export default Navbar;
