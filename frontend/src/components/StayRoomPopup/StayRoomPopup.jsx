import { useEffect } from "react";
import "./StayRoomPopup.scss";

const StayRoomPopup = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="stay-popup"
      role="dialog"
      aria-modal="true"
      aria-label="Stay room availability"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="stay-popup__card">
        <button
          className="stay-popup__close"
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>
        <div className="stay-popup__tag">Stay Room Available</div>
        <h3>Single &amp; Double Rooms</h3>
        <p>AC and Non-AC rooms available. Minimum price depends on season and dates.</p>
        <div className="stay-popup__grid">
          <div>
            <span className="stay-popup__label">Room Types</span>
            <span>Single, Double</span>
          </div>
          <div>
            <span className="stay-popup__label">Comfort</span>
            <span>AC / Non-AC</span>
          </div>
          <div>
            <span className="stay-popup__label">Minimum Price</span>
            <span>Contact us</span>
          </div>
          <div>
            <span className="stay-popup__label">WhatsApp / Phone</span>
            <span>+91 99340 80104</span>
          </div>
        </div>
        <div className="stay-popup__actions">
          <a
            className="stay-popup__btn"
            href="tel:+919934080104"
          >
            Call Now
          </a>
          <a
            className="stay-popup__btn stay-popup__btn--ghost"
            href="https://wa.me/919934080104?text=Hello!%20I%27d%20like%20to%20know%20about%20stay%20room%20availability%20(AC%2FNon-AC)%20and%20minimum%20price."
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <button
            type="button"
            className="stay-popup__btn stay-popup__btn--ghost"
            onClick={onClose}
          >
            Skip
          </button>
        </div>
        <div className="stay-popup__keywords">
          stay room available • single room • double room • ac room • non ac room
        </div>
      </div>
    </div>
  );
};

export default StayRoomPopup;
