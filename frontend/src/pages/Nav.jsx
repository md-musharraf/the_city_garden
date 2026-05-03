import { NavLink } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openOption = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="nav">
        <button
          className="three-outline"
          onClick={() => openOption()}
        >
          <IoReorderThreeOutline />
        </button>
        <div className="logo">
          <h1>The City Garden</h1>
        </div>

        <div className="nav-menu">
          <NavLink
            className="nav-link"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="nav-link"
            to="/#about"
          >
            About
          </NavLink>
          <NavLink
            className="nav-link"
            to="/#services"
          >
            Services
          </NavLink>
          <NavLink
            className="nav-link"
            to="/#gallery"
          >
            Gallery
          </NavLink>
          <NavLink
            className="nav-link"
            to="/#packages"
          >
            Packages
          </NavLink>
          <NavLink
            className="nav-link"
            to="/#contact"
          >
            Contact
          </NavLink>

          <button className="book-btn">Book Now</button>
        </div>
      </div>

      <div className={isOpen ? "sidebar" : "sidebar-close"}>
        <button
          className="close-btn"
          onClick={() => {
            isOpen ? setIsOpen(false) : setIsOpen(true);
          }}
        >
          <IoMdClose />
        </button>
        <div className="logo">
          <h1>The City Garden</h1>
        </div>
        <div className="sidebar-content">
          <NavLink
            onClick={() => setIsOpen(false)}
            className="nav-link"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setIsOpen(false)}
            className="nav-link"
            to="/#about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setIsOpen(false)}
            className="nav-link"
            to="/#services"
          >
            Services
          </NavLink>
          <NavLink
            onClick={() => setIsOpen(false)}
            className="nav-link"
            to="/#gallery"
          >
            Gallery
          </NavLink>
          <NavLink
            onClick={() => setIsOpen(false)}
            className="nav-link"
            to="/#packages"
          >
            Packages
          </NavLink>
          <NavLink
            onClick={() => setIsOpen(false)}
            className="nav-link"
            to="/#contact"
          >
            Contact
          </NavLink>

          <button
            className="book-btn"
            onClick={() => setIsOpen(false)}
          >
            Book Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Nav;
