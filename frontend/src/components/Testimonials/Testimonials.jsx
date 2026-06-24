import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "../ScrollReveal";
import "./Testimonials.scss";

const reviews = [
  {
    stars: 5,
    text: "THE CITY GARDEN made our wedding absolutely magical. The garden setting was stunning in the evening light, and the team was incredibly attentive to every detail. Our guests couldn't stop talking about how beautiful everything looked.",
    author: "Priya & Rahul Sharma",
    event: "Wedding Ceremony — March 2025",
  },
  {
    stars: 5,
    text: "We hosted our daughter's engagement ceremony here and it was beyond our expectations. The floral arrangements were gorgeous and the venue has a naturally elegant feel. Very professional team and smooth coordination throughout.",
    author: "Anjali Mehta",
    event: "Engagement Ceremony — January 2025",
  },
  {
    stars: 5,
    text: "Hosted our company annual event at THE CITY GARDEN — it was a refreshing change from the usual indoor venues. The open-air setting energized the whole team. Great facilities, excellent coordination. Would highly recommend for corporate events.",
    author: "Vikram Singh",
    event: "Corporate Event — December 2024",
  },
  {
    stars: 5,
    text: "My son's birthday party at THE CITY GARDEN was spectacular! The garden lights in the evening created such a festive atmosphere. Kids had a blast, adults loved the ambiance. Very reasonable pricing too for the quality provided.",
    author: "Sunita Devi",
    event: "Birthday Celebration — November 2024",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % reviews.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="section section--mid testimonials"
      id="testimonials"
    >
      <ScrollReveal
        animation="fade-up"
        className="section-header"
      >
        <div className="section-tag">Testimonials</div>
        <h2>What Our Guests Say</h2>
        <div className="divider" />
      </ScrollReveal>

      <ScrollReveal
        animation="scale-in"
        className="testi"
      >
        <motion.div
          className="testi__track"
          id="testiSlides"
          animate={{ x: `-${current * 100}%` }}
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
        >
          {reviews.map(({ stars, text, author, event }) => (
            <div
              key={author}
              className="testi__slide"
            >
              <div className="testi__card">
                <div className="testi__stars">{"★".repeat(stars)}</div>
                <p className="testi__text">{text}</p>
                <div className="testi__author">{author}</div>
                <div className="testi__event">{event}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Timeline progress indicator */}
        <div className="testi__progress">
          <div
            key={current}
            className="testi__progress-bar"
          />
        </div>

        <div
          className="testi__dots"
          id="testiDots"
        >
          {reviews.map((_, i) => (
            <button
              key={i}
              className={`testi__dot${i === current ? " testi__dot--active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Testimonials;
