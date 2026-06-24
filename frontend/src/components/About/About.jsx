import { Link } from "react-router-dom";
import { FaTree, FaStar, FaRoad, FaUsers, FaConciergeBell } from "react-icons/fa";
import ScrollReveal from "../ScrollReveal";
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
  return (
    <section
      className="section section--light about"
      id="about"
    >
      <div className="about__grid">
        <ScrollReveal
          animation="slide-in-left"
          className="about__img-wrap"
        >
          <div className="about__img-inner">
            <img
              src="https://ik.imagekit.io/ts2hm0adf/the-city-garden/IMG-20260527-WA0034.jpg?updatedAt=1780237999486"
              alt="THE CITY GARDEN Venue"
            />
          </div>
          <div className="about__badge">
            <div className="about__badge-num">5★</div>
            <div className="about__badge-lbl">Rated Venue</div>
          </div>
        </ScrollReveal>

        <ScrollReveal
          animation="slide-in-right"
          className="about__text"
        >
          <div className="section-tag">Discover THE CITY GARDEN</div>
          <h2>Dumka's Elegant Garden Venue</h2>
          <p className="about__lead">
            Located in the heart of Dumka, THE CITY GARDEN offers a refined open-air setting that
            turns every occasion into a memorable celebration. Our beautifully landscaped garden
            creates the perfect backdrop for your special moments.
          </p>

          <ul className="about__features">
            {features.map(({ icon, text }, idx) => (
              <ScrollReveal
                as="li"
                key={text}
                animation="fade-up"
                delay={idx + 1}
                className="about__feature"
              >
                <span>{icon}</span>
                <p>{text}</p>
              </ScrollReveal>
            ))}
          </ul>

          <Link
            to="/booking"
            className="btn-primary"
          >
            Reserve Your Date
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;
