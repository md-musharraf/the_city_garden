import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaTree, FaStar, FaRoad, FaUsers, FaConciergeBell } from "react-icons/fa";
import "./About.scss";

const features = [
  {
    icon: <FaTree />,
    text: "Lush open garden with beautifully manicured landscapes and natural ambiance",
  },
  { icon: <FaStar />, text: "Thoughtfully designed event spaces with elegant decor setups" },
  { icon: <FaRoad />, text: "Conveniently located with easy access and ample parking" },
  {
    icon: <FaUsers />,
    text: "Accommodates intimate gatherings to large celebrations of 500+ guests",
  },
  { icon: <FaConciergeBell />, text: "Dedicated event coordination and hospitality team" },
];

const About = () => {
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
      className="section section--light about"
      id="about"
      ref={ref}
    >
      <div className="about__grid">
        <div className="about__img-wrap fade-up">
          <img
            src="https://ik.imagekit.io/ts2hm0adf/the-city-garden/IMG-20260527-WA0034.jpg?updatedAt=1780237999486"
            alt="THE CITY GARDEN Venue"
          />
          <div className="about__badge">
            <div className="about__badge-num">5★</div>
            <div className="about__badge-lbl">Rated Venue</div>
          </div>
        </div>

        <div className="about__text fade-up delay-2">
          <div className="section-tag">Discover THE CITY GARDEN</div>
          <h2>Dumka's Elegant Garden Venue</h2>
          <p className="about__lead">
            Located in the heart of Dumka, THE CITY GARDEN offers a refined open-air setting that
            turns every occasion into a memorable celebration. Our beautifully landscaped garden
            creates the perfect backdrop for your special moments.
          </p>

          <ul className="about__features">
            {features.map(({ icon, text }) => (
              <li
                key={text}
                className="about__feature"
              >
                <span>{icon}</span>
                <p>{text}</p>
              </li>
            ))}
          </ul>

          <Link
            to="/booking"
            className="btn-primary"
          >
            Reserve Your Date
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
