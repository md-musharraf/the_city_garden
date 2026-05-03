import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaWhatsapp } from "react-icons/fa";
import "./Booking.scss";
import axios from "../../axios/config";

// Booked dates are fetched from backend and converted to day numbers for current month

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar = ({ onDateSelect }) => {
  const [calDate, setCalDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [selected, setSelected] = useState(null);
  const today = new Date();

  const year = calDate.getFullYear();
  const month = calDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  useEffect(() => {
    let mounted = true;
    const fetchBooked = async () => {
      try {
        const res = await axios.get("/api/booked");
        if (!mounted) return;
        // convert to YYYY-MM-DD strings
        const dates = (res.data.dates || []).map((d) => d.date.slice(0, 10));
        setBookedDates(dates);
      } catch (err) {
        console.error("Failed to fetch booked dates", err);
      }
    };
    fetchBooked();
    return () => {
      mounted = false;
    };
  }, []);

  const isPast = (d) =>
    new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const pick = (d) => {
    const curDateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    if (bookedDates.includes(curDateStr) || isPast(d)) return;
    setSelected(d);
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    onDateSelect(dateStr);
  };
  const dayClass = (d) => {
    let cls = "cal__day";
    const curDateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    if (bookedDates.includes(curDateStr)) cls += " cal__day--booked";
    else if (!isPast(d)) cls += " cal__day--available";
    if (today.getDate() === d && today.getMonth() === month && today.getFullYear() === year)
      cls += " cal__day--today";
    if (selected === d && !bookedDates.includes(curDateStr) && !isPast(d))
      cls += " cal__day--selected";
    return cls;
  };

  const prev = () => {
    setCalDate(new Date(year, month - 1, 1));
    setSelected(null);
  };
  const next = () => {
    setCalDate(new Date(year, month + 1, 1));
    setSelected(null);
  };

  return (
    <div className="cal">
      <div className="cal__header">
        <button
          className="cal__nav"
          id="prevMonth"
          onClick={prev}
          aria-label="Previous month"
        >
          ‹
        </button>
        <h3 id="calTitle">
          {MONTH_NAMES[month]} {year}
        </h3>
        <button
          className="cal__nav"
          id="nextMonth"
          onClick={next}
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className="cal__days-header">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div
        className="cal__grid"
        id="calGrid"
      >
        {Array.from({ length: firstDay }, (_, i) => (
          <div
            key={`e-${i}`}
            className="cal__day cal__day--empty"
          />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const d = i + 1;
          return (
            <div
              key={d}
              className={dayClass(d)}
              onClick={() => pick(d)}
            >
              {d}
            </div>
          );
        })}
      </div>

      <div className="cal__legend">
        <div className="cal__legend-item">
          <div className="cal__dot cal__dot--available" />
          Available
        </div>
        <div className="cal__legend-item">
          <div className="cal__dot cal__dot--booked" />
          Booked
        </div>
        <div className="cal__legend-item">
          <div className="cal__dot cal__dot--selected" />
          Selected
        </div>
      </div>
    </div>
  );
};

const Booking = () => {
  const ref = useRef(null);
  const [bookingMsg, setBookingMsg] = useState("");
  const [bookingError, setBookingError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 },
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    setBookingError("");
    setBookingMsg("");

    try {
      const res = await axios.post("/api/book", data);
      console.log("Booking saved:", res.data);
      setBookingMsg("Booking saved successfully!");
    } catch (err) {
      console.error("Booking error:", err);
      setBookingError(err.response?.data?.message || "Failed to save booking");
    }

    const { name, phone, event, date, guests, message } = data;
    const text =
      `🌿 *THE CITY GARDEN Booking Request*\n\n` +
      `👤 Name: ${name}\n📞 Phone: ${phone}\n🎉 Event: ${event}\n` +
      `📅 Date: ${date}\n👥 Guests: ${guests}` +
      (message ? `\n💬 Message: ${message}` : "") +
      `\n\nPlease confirm availability.`;
    window.open(`https://wa.me/918084737646?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section
      className="section section--dark booking"
      id="booking"
      ref={ref}
    >
      <div className="section-header fade-up">
        <div className="section-tag">Availability &amp; Booking</div>
        <h2>Reserve Your Perfect Date</h2>
        <div className="divider" />
        <p>
          Check availability and submit your booking request — we'll confirm within 24 hours via
          WhatsApp.
        </p>
      </div>

      <div className="booking__wrap fade-up">
        <Calendar onDateSelect={(val) => setValue("date", val)} />

        <form
          className="booking__form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h3>Booking Details</h3>
          <p className="booking__sub">Fill in your details and we'll confirm via WhatsApp.</p>

          {bookingMsg && <div className="booking__success">{bookingMsg}</div>}
          {bookingError && <div className="booking__error-msg">{bookingError}</div>}

          <div className="form-group">
            <label htmlFor="bName">Your Name *</label>
            <input
              id="bName"
              type="text"
              placeholder="Enter your full name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <span className="booking__error">{errors.name.message}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bPhone">Phone Number *</label>
              <input
                id="bPhone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                {...register("phone", { required: "Phone is required" })}
              />
              {errors.phone && <span className="booking__error">{errors.phone.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="bEvent">Event Type *</label>
              <select
                id="bEvent"
                {...register("event", { required: "Select an event type" })}
              >
                <option value="">Select event</option>
                {[
                  "Wedding",
                  "Reception",
                  "Engagement",
                  "Birthday Party",
                  "Corporate Event",
                  "Cultural Program",
                  "Other",
                ].map((e) => (
                  <option key={e}>{e}</option>
                ))}
              </select>
              {errors.event && <span className="booking__error">{errors.event.message}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bDate">Event Date *</label>
              <input
                id="bDate"
                type="date"
                {...register("date", { required: "Please select a date" })}
              />
              {errors.date && <span className="booking__error">{errors.date.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="bGuests">Expected Guests</label>
              <select
                id="bGuests"
                {...register("guests")}
              >
                {["Up to 50", "50–150", "150–300", "300–500", "500+"].map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="bMessage">Additional Message</label>
            <textarea
              id="bMessage"
              rows={3}
              placeholder="Any special requirements or questions..."
              {...register("message")}
            />
          </div>

          <button
            type="submit"
            className="booking__confirm-btn"
          >
            <FaWhatsapp /> Confirm Booking via WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
};

export default Booking;
