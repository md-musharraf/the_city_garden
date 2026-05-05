import { FaWhatsapp, FaCalendarCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./FloatingButtons.scss";

const WA_URL =
  "https://wa.me/919934080104?text=Hello!%20I'd%20like%20to%20book%20THE%20CITY%20GARDEN%20for%20my%20event.";

const FloatingButtons = () => (
  <>
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="float-wa"
      title="Chat on WhatsApp"
      id="float-whatsapp"
    >
      <FaWhatsapp />
    </a>

    <Link to="/booking" className="float-book" id="float-book">
      <FaCalendarCheck /> Book Now
    </Link>
  </>
);

export default FloatingButtons;
