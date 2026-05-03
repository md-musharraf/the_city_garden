import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaCalendarCheck, FaInstagram } from "react-icons/fa";
import "./InfoBar.scss";

const items = [
  {
    icon: <FaMapMarkerAlt />,
    label: "New, Police Line Road, LIC colony, Dumka, Jharkhand 814101",
    href: "https://maps.app.goo.gl/QYyVi1ParKdE6db16",
    external: true,
  },
  {
    icon: <FaPhone />,
    label: "+91 99340 80104",
    href: "tel:+91 99340 80104",
    external: false,
  },
  {
    icon: <FaWhatsapp />,
    label: "WhatsApp Us",
    href: "https://wa.me/919934080104",
    external: true,
  },
  {
    icon: <FaInstagram />,
    label: "@thecitygardendumka",
    href: "https://www.instagram.com/thecitygardendumka/",
    external: true,
  },
  {
    icon: <FaCalendarCheck />,
    label: "Weddings · Events · Parties",
    href: null,
    external: false,
  },
];

const InfoBar = () => (
  <div className="info-bar">
    {items.map(({ icon, label, href, external }) =>
      href ? (
        <a
          key={label}
          className="info-bar__item"
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {icon}
          <span className="info-bar__text">{label}</span>
        </a>
      ) : (
        <span
          key={label}
          className="info-bar__item"
        >
          {icon}
          <span className="info-bar__text">{label}</span>
        </span>
      ),
    )}
  </div>
);

export default InfoBar;
