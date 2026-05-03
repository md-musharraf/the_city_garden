import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios/config";
import "./Dashboard.scss";

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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [eventName, setEventName] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("success");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingEvent, setBookingEvent] = useState("");
  const [bookedDates, setBookedDates] = useState([]);
  const [calDate, setCalDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState({});

  // Fetch booked dates on mount
  useEffect(() => {
    fetchBookedDates();
  }, []);

  const fetchBookedDates = async () => {
    try {
      const res = await axios.get("/api/booked");
      setBookedDates(res.data.dates || []);
      // Build selectedDates map
      const map = {};
      (res.data.dates || []).forEach((d) => {
        const dateStr = d.date.slice(0, 10);
        map[dateStr] = true;
      });
      setSelectedDates(map);
    } catch (err) {
      console.error("Failed to fetch booked dates", err);
    }
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(f);
    }
  };

  const showMsg = (text, type = "success") => {
    setMsg(text);
    setMsgType(type);
    setTimeout(() => setMsg(""), 4000);
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    if (!file || !eventName) return showMsg("Select image and event name", "error");
    const fd = new FormData();
    fd.append("image", file);
    fd.append("event", eventName);
    try {
      const res = await axios.post("/api/upload/image", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showMsg(res.data.message || "Image uploaded successfully!");
      setFile(null);
      setPreview("");
      setEventName("");
    } catch (err) {
      console.error(err);
      showMsg(err.response?.data?.message || "Upload failed", "error");
    }
  };

  const createOffline = async (e) => {
    e.preventDefault();
    if (!bookingDate || !bookingEvent) return showMsg("Provide date and event", "error");
    try {
      const res = await axios.post("/api/admin/book-offline", {
        date: bookingDate,
        event: bookingEvent,
      });
      showMsg(res.data.message || "Date marked as booked!");
      setBookingDate("");
      setBookingEvent("");
      fetchBookedDates();
    } catch (err) {
      console.error(err);
      showMsg(err.response?.data?.message || "Booking failed", "error");
    }
  };

  const toggleDate = async (dateStr) => {
    const isBooked = selectedDates[dateStr];
    if (isBooked) {
      // Delete booking
      try {
        await axios.delete(`/api/admin/unbook/${dateStr}`);
        setSelectedDates((prev) => {
          const updated = { ...prev };
          delete updated[dateStr];
          return updated;
        });
        fetchBookedDates();
        showMsg("Date marked as available");
      } catch (err) {
        console.error(err);
        showMsg(err.response?.data?.message || "Failed to unbook date", "error");
      }
    } else {
      // Add booking
      try {
        await axios.post("/api/admin/book-offline", {
          date: dateStr,
          event: "Admin",
        });
        setSelectedDates((prev) => ({ ...prev, [dateStr]: true }));
        fetchBookedDates();
        showMsg("Date marked as booked!");
      } catch (err) {
        showMsg(err.response?.data?.message || "Failed to book date", "error");
      }
    }
  };

  // Calendar rendering
  const year = calDate.getFullYear();
  const month = calDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const handleLogout = () => {
    localStorage.removeItem("hm_admin_token");
    localStorage.removeItem("hm_admin_auth");
    delete axios.defaults.headers.common.Authorization;
    navigate("/admin-login");
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard__top">
        <h2>📊 Admin Dashboard</h2>
        <button
          className="admin-dashboard__logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Upload Image Section */}
      <section className="admin-section">
        <h3>📸 Upload Image</h3>
        <form
          onSubmit={uploadImage}
          className="upload-form"
        >
          <div className="file-input-wrapper">
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
            <label
              htmlFor="fileInput"
              className="file-label"
            >
              Choose Image
            </label>
          </div>
          {preview && (
            <div className="preview">
              <img
                src={preview}
                alt="Preview"
              />
            </div>
          )}
          <input
            type="text"
            placeholder="Event name (Wedding, Reception, etc.)"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <button type="submit">Upload Image</button>
        </form>
      </section>

      {/* Calendar Section */}
      <section className="admin-section">
        <h3>📅 Manage Calendar</h3>
        <div className="calendar-wrapper">
          <div className="calendar-header">
            <button onClick={() => setCalDate(new Date(year, month - 1))}>←</button>
            <h4>
              {MONTH_NAMES[month]} {year}
            </h4>
            <button onClick={() => setCalDate(new Date(year, month + 1))}>→</button>
          </div>
          <div className="calendar-grid">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div
                key={d}
                className="calendar-day-header"
              >
                {d}
              </div>
            ))}
            {calendarDays.map((day, idx) => {
              if (day === null)
                return (
                  <div
                    key={`empty-${idx}`}
                    className="empty"
                  />
                );
              const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const isBooked = selectedDates[dateStr];
              return (
                <button
                  key={day}
                  className={`calendar-day ${isBooked ? "booked" : "available"}`}
                  onClick={() => toggleDate(dateStr)}
                  title={isBooked ? "Click to mark available" : "Click to mark booked"}
                >
                  {day}
                </button>
              );
            })}
          </div>
          <div className="calendar-legend">
            <div>
              <span className="legend-available" /> Available
            </div>
            <div>
              <span className="legend-booked" /> Booked
            </div>
          </div>
        </div>
      </section>

      {/* Quick Book Section */}
      <section className="admin-section">
        <h3>⚡ Quick Book Date</h3>
        <form onSubmit={createOffline}>
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Event name"
            value={bookingEvent}
            onChange={(e) => setBookingEvent(e.target.value)}
          />
          <button type="submit">Mark Booked</button>
        </form>
      </section>

      {/* Booked Dates List */}
      <section className="admin-section">
        <h3>📋 Booked Dates</h3>
        {bookedDates.length > 0 ? (
          <div className="booked-list">
            {bookedDates.map((b, idx) => (
              <div
                key={idx}
                className="booked-item"
              >
                <span className="date">{new Date(b.date).toLocaleDateString()}</span>
                <span className="event">{b.event}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">No booked dates yet</p>
        )}
      </section>

      {/* Message */}
      {msg && <div className={`admin-msg ${msgType}`}>{msg}</div>}
    </div>
  );
};

export default AdminDashboard;
