import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaWhatsapp, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "./Contact.scss";

const Contact = () => {
  const ref = useRef(null);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 },
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const onSubmit = ({ name, phone, event, message }) => {
    const text =
      `🌿 *THE CITY GARDEN Inquiry*\n\n` +
      `👤 Name: ${name || "Not provided"}\n` +
      `📞 Phone: ${phone || "Not provided"}` +
      (event ? `\n🎉 Event: ${event}` : "") +
      (message ? `\n💬 Message: ${message}` : "");
    window.open(`https://wa.me/919934080104?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section
      className="section section--light contact"
      id="contact"
      ref={ref}
    >
      <div className="section-header fade-up">
        <div className="section-tag">Get In Touch</div>
        <h2>We'd Love to Hear From You</h2>
        <div className="divider" />
      </div>

      <div className="contact__grid">
        {/* Left col */}
        <div className="fade-up">
          <div className="contact__info">
            <h2>Visit or Call Us</h2>
            <p className="contact__lead">
              We're here to help you plan your perfect event. Reach out via WhatsApp, call, or drop
              by to see the venue in person.
            </p>

            <div className="contact__cards">
              <a
                className="contact__card"
                href="https://wa.me/919934080104?text=Hello!%20I'd%20like%20to%20inquire%20about%20THE%20CITY%20GARDEN."
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="contact__card-icon contact__card-icon--green">
                  <FaWhatsapp />
                </div>
                <div className="contact__card-text">
                  <strong>Chat on WhatsApp</strong>
                  <span>+91 99340 80104 — Quick responses</span>
                </div>
              </a>

              <a
                className="contact__card"
                href="tel:+919934080104"
              >
                <div className="contact__card-icon contact__card-icon--blue">
                  <FaPhone />
                </div>
                <div className="contact__card-text">
                  <strong>Call Us Directly</strong>
                  <span>+91 99340 80104</span>
                </div>
              </a>

              <a
                className="contact__card"
                href="https://maps.app.goo.gl/QYyVi1ParKdE6db16"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="contact__card-icon contact__card-icon--gold">
                  <FaMapMarkerAlt />
                </div>
                <div className="contact__card-text">
                  <strong>Find Us on Map</strong>
                  <span>New, Police Line Road, LIC colony, Dumka, Jharkhand 814101</span>
                </div>
              </a>
            </div>

            <div className="contact__map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.5!2d87.25!3d24.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDE2JzEyLjAiTiA4N8KwMTUnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="THE CITY GARDEN location"
              />
            </div>
          </div>
        </div>

        {/* Right col — contact form */}
        <form
          className="contact__form fade-up delay-2"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h3>Send a Message</h3>
          <p className="contact__sub">We'll get back to you within a few hours.</p>

          <div className="form-group">
            <label htmlFor="cName">Your Name</label>
            <input
              id="cName"
              type="text"
              placeholder="Full name"
              {...register("name")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cPhone">Phone / WhatsApp</label>
            <input
              id="cPhone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              {...register("phone")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cEvent">Event Type</label>
            <select
              id="cEvent"
              {...register("event")}
            >
              <option value="">Select event type</option>
              {[
                "Wedding",
                "Reception",
                "Engagement",
                "Birthday Party",
                "Corporate Event",
                "Other",
              ].map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cMessage">Message</label>
            <textarea
              id="cMessage"
              rows={4}
              placeholder="Tell us about your event and requirements..."
              {...register("message")}
            />
          </div>

          <button
            type="submit"
            className="contact__send-btn"
          >
            <FaWhatsapp /> Send via WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
