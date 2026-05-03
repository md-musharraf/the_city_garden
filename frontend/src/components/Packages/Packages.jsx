import { useEffect, useRef } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import "./Packages.scss";

const packages = [
  {
    name: "Essential",
    price: "₹15,000",
    per: "starting per event",
    features: [
      { ok: true, text: "Venue for up to 150 guests" },
      { ok: true, text: "Basic floral decoration" },
      { ok: true, text: "Standard lighting setup" },
      { ok: true, text: "Parking facility" },
      { ok: true, text: "6 hours venue access" },
      { ok: false, text: "Catering not included" },
    ],
    wa: "I'm%20interested%20in%20the%20Essential%20package%20at%20THE%20CITY%20GARDEN.",
    cta: "Enquire Now",
    featured: false,
  },
  {
    name: "Grand",
    price: "₹35,000",
    per: "starting per event",
    badge: "Most Popular",
    features: [
      { ok: true, text: "Venue for up to 400 guests" },
      { ok: true, text: "Premium floral decoration" },
      { ok: true, text: "Premium LED lighting" },
      { ok: true, text: "Stage & seating setup" },
      { ok: true, text: "Sound system included" },
      { ok: true, text: "12 hours venue access" },
    ],
    wa: "I'm%20interested%20in%20the%20Grand%20package%20at%20THE%20CITY%20GARDEN.",
    cta: "Book This Package",
    featured: true,
  },
  {
    name: "Royal",
    price: "₹60,000",
    per: "starting per event",
    features: [
      { ok: true, text: "Venue for 500+ guests" },
      { ok: true, text: "Luxury decor & theming" },
      { ok: true, text: "Full lighting production" },
      { ok: true, text: "Full AV & sound setup" },
      { ok: true, text: "Event coordinator" },
      { ok: true, text: "Full day access" },
    ],
    wa: "I'm%20interested%20in%20the%20Royal%20package%20at%20THE%20CITY%20GARDEN.",
    cta: "Enquire Now",
    featured: false,
  },
];

const Packages = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 },
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="section section--tint packages"
      id="packages"
      ref={ref}
    >
      <div className="section-header fade-up">
        <div className="section-tag">Our Packages</div>
        <h2>Choose What Suits You Best</h2>
        <div className="divider" />
        <p>Flexible packages designed to fit every celebration style and budget.</p>
      </div>

      <div className="packages__grid fade-up">
        {packages.map(({ name, price, per, badge, features, wa, cta, featured }) => (
          <div
            key={name}
            className={`packages__card${featured ? " packages__card--featured" : ""}`}
          >
            {badge && <div className="packages__badge">{badge}</div>}
            <div className="packages__name">{name}</div>
            <div className="packages__price">{price}</div>
            <div className="packages__per">{per}</div>

            <ul className="packages__features">
              {features.map(({ ok, text }) => (
                <li key={text}>
                  {ok ? (
                    <FaCheck className="packages__check" />
                  ) : (
                    <FaTimes className="packages__cross" />
                  )}
                  {text}
                </li>
              ))}
            </ul>

            <a
              href={`https://wa.me/918084737646?text=${wa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="packages__btn"
            >
              {cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Packages;
