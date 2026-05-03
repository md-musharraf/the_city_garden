import { MdOutlineLocationOn } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { FaLeaf, FaWhatsapp } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa6";
import About from "./About";

const Home = () => {
  const openWhatsApp = () => {
    const phoneNumber = "918084737646"; // Replace with your phone number
    const message = "Hello, I want to know more about your services";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  const callNow = () => {
    window.location.href = "tel:8084737646";
  };

  const openMap = () => {
    const address = "HM GARDEN MARRIAGE HALL";
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="page home-page">
      <div className="highlight">
        <button
          onClick={openMap}
          className="highlight-content"
        >
          <span>
            <MdOutlineLocationOn />
          </span>

          <span className="highlight-text">7733+MJP, Dumka, Jharkhand 814101</span>
        </button>
        <button
          onClick={callNow}
          className="highlight-content"
        >
          <span>
            <IoCallOutline />
          </span>
          <span className="highlight-text">+91 80847 37646</span>
        </button>
        <button
          onClick={openWhatsApp}
          className="highlight-content"
        >
          <span>
            <FaWhatsapp />
          </span>
          <span className="highlight-text">WhatsApp Us</span>
        </button>
        <button className="highlight-content">
          <span>
            <FaRegCalendarCheck />
          </span>
          <span className="highlight-text">Wedding : Event : Parties</span>
        </button>
      </div>

      <div className="hero-section">
        <img
          className="hero-bg-image"
          src="https://unsplash.com/photos/elegant-event-space-set-with-round-tables-for-dining-EJQnHC6GEe8"
          alt="home"
        />

        <div className="hero-container">
          <p className="hero-title">
            <FaLeaf /> Premium Garden Venue · Dumka
          </p>
          <h1 className="hero-header">
            Create Beautiful <br /> Celebrations <br />
            in a <span className="hero-header-style">Perfect setting</span>
          </h1>
          <p className="hero-text">
            Elegant garden venue in Dumka for weddings, receptions, engagements,birthday parties &
            corporate events
          </p>

          <div className="hero-btns">
            <button className="check-ability-btn">Check Availability</button>
            <button
              onClick={openWhatsApp}
              className="book-now-btn-hero"
            >
              <FaWhatsapp /> Book Now
            </button>
          </div>
        </div>
      </div>

      <About />
    </div>
  );
};

export default Home;
