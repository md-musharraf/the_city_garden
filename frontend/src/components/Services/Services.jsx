import { useEffect, useRef } from "react";
import {
  FaRing,
  FaHeart,
  FaGem,
  FaBirthdayCake,
  FaBriefcase,
  FaMusic,
  FaBed,
} from "react-icons/fa";
import "./Services.scss";

const services = [
  {
    icon: <FaRing />,
    title: "Weddings",
    desc: "Grand wedding ceremonies and receptions in an enchanting garden setting with full decoration support.",
    delay: "delay-1",
  },
  {
    icon: <FaHeart />,
    title: "Receptions",
    desc: "Elegant post-wedding reception gatherings with customized themes, lighting, and dining arrangements.",
    delay: "delay-2",
  },
  {
    icon: <FaGem />,
    title: "Engagements",
    desc: "Romantic engagement ceremonies with beautifully arranged floral backdrops and intimate lighting.",
    delay: "delay-3",
  },
  {
    icon: <FaBirthdayCake />,
    title: "Birthday Parties",
    desc: "Fun and festive birthday celebrations for all ages — from kids' parties to grand milestone events.",
    delay: "delay-4",
  },
  {
    icon: <FaBriefcase />,
    title: "Corporate Events",
    desc: "Professional outdoor corporate meets, team events, and company celebrations in a refreshing open setting.",
    delay: "delay-1",
  },
  {
    icon: <FaMusic />,
    title: "Cultural Programs",
    desc: "Sangeet nights, cultural shows, and community celebrations with stage setup and sound arrangements.",
    delay: "delay-2",
  },
  {
    icon: <FaBed />,
    title: "Stay Rooms",
    desc: "Available stay rooms for guests with AC and Non-AC options for comfortable rest during your event.",
    delay: "delay-3",
  },
];

const Services = () => {
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
      className="section section--dark services"
      id="services"
      ref={ref}
    >
      <div className="section-header fade-up">
        <div className="section-tag">What We Host</div>
        <h2>Events for Every Occasion</h2>
        <div className="divider" />
        <p>
          From intimate engagements to grand wedding celebrations — we create spaces that match the
          scale and soul of every event.
        </p>
      </div>

      <div className="services__grid">
        {services.map(({ icon, title, desc, delay }) => (
          <article
            key={title}
            className={`services__card fade-up ${delay}`}
          >
            <div className="services__icon">{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
