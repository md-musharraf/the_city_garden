import { motion } from "framer-motion";
import { FaWhatsapp, FaCalendarCheck, FaBed } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./FloatingButtons.scss";

const WA_URL =
  "https://wa.me/919934080104?text=Hello!%20I'd%20like%20to%20book%20THE%20CITY%20GARDEN%20for%20my%20event.";

const MotionLink = motion(Link);

const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 18,
};

const FloatingButtons = ({ onStayRoomClick }) => (
  <div className="float-group">
    <motion.a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="float-wa"
      title="Chat on WhatsApp"
      id="float-whatsapp"
      whileHover={{ y: -3, scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={springTransition}
    >
      <FaWhatsapp />
    </motion.a>

    <MotionLink
      to="/booking"
      className="float-book"
      id="float-book"
      whileHover={{ y: -5, scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      transition={springTransition}
    >
      <FaCalendarCheck /> Book Now
    </MotionLink>

    <motion.button
      type="button"
      className="float-stay"
      onClick={onStayRoomClick}
      aria-label="Stay room availability"
      whileHover={{ y: -5, scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      transition={springTransition}
    >
      <FaBed /> <span className="float-stay__text">Stay Room</span>
    </motion.button>
  </div>
);

export default FloatingButtons;
