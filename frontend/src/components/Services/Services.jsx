import {
  FaRing,
  FaHeart,
  FaGem,
  FaBirthdayCake,
  FaBriefcase,
  FaMusic,
  FaBed,
} from "react-icons/fa";
import ScrollReveal from "../ScrollReveal";
import "./Services.scss";

const services = [
  {
    icon: <FaRing />,
    title: "Weddings",
    desc: "Grand wedding ceremonies and receptions in an enchanting garden setting with full decoration support.",
    delay: "1",
  },
  {
    icon: <FaHeart />,
    title: "Receptions",
    desc: "Elegant post-wedding reception gatherings with customized themes, lighting, and dining arrangements.",
    delay: "2",
  },
  {
    icon: <FaGem />,
    title: "Engagements",
    desc: "Romantic engagement ceremonies with beautifully arranged floral backdrops and intimate lighting.",
    delay: "3",
  },
  {
    icon: <FaBirthdayCake />,
    title: "Birthday Parties",
    desc: "Fun and festive birthday celebrations for all ages — from kids' parties to grand milestone events.",
    delay: "4",
  },
  {
    icon: <FaBriefcase />,
    title: "Corporate Events",
    desc: "Professional outdoor corporate meets, team events, and company celebrations in a refreshing open setting.",
    delay: "1",
  },
  {
    icon: <FaMusic />,
    title: "Cultural Programs",
    desc: "Sangeet nights, cultural shows, and community celebrations with stage setup and sound arrangements.",
    delay: "2",
  },
  {
    icon: <FaBed />,
    title: "Stay Rooms",
    desc: "Available stay rooms for guests with AC and Non-AC options for comfortable rest during your event.",
    delay: "3",
  },
];

const Services = () => {
  return (
    <section
      className="section section--dark services"
      id="services"
    >
      <ScrollReveal
        animation="fade-up"
        className="section-header"
      >
        <div className="section-tag">What We Host</div>
        <h2>Events for Every Occasion</h2>
        <div className="divider" />
        <p>
          From intimate engagements to grand wedding celebrations — we create spaces that match the
          scale and soul of every event.
        </p>
      </ScrollReveal>

      <div className="services__grid">
        {services.map(({ icon, title, desc, delay }) => (
          <ScrollReveal
            as="article"
            key={title}
            animation="scale-in"
            delay={delay}
            className="services__card"
          >
            <div className="services__icon">{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Services;
