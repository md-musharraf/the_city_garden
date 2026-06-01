import { useEffect, useRef, useState } from "react";
import axios from "../../axios/config";
import "./Gallery.scss";

const PAGE_SIZE = 9;

const Gallery = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 },
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const load = async (nextSkip = 0) => {
    try {
      const res = await axios.get(`/api/images?limit=${PAGE_SIZE}&skip=${nextSkip}`);
      if (nextSkip === 0) setMediaItems(res.data.images);
      else setMediaItems((prev) => [...prev, ...res.data.images]);
      setTotal(res.data.total || 0);
      setSkip(nextSkip + PAGE_SIZE);
    } catch (err) {
      console.error("Failed to load images", err);
    }
  };

  useEffect(() => {
    load(0);
  }, []);

  return (
    <section
      className="section section--light gallery"
      id="gallery"
      ref={ref}
    >
      <div className="section-header fade-up">
        <div className="section-tag">Our Gallery</div>
        <h2>Moments Captured at THE CITY GARDEN</h2>
        <div className="divider" />
        <p>A glimpse of the beautiful celebrations and memories created at our venue.</p>
      </div>

      <div className="gallery__grid fade-up">
        {mediaItems.map((item) => (
          <div
            key={item._id}
            className="gallery__item"
            role="button"
            tabIndex={0}
            aria-label={`View ${item.event}`}
            onClick={() => setLightbox({ src: item.image, alt: item.event, type: item.mediaType })}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              setLightbox({ src: item.image, alt: item.event, type: item.mediaType })
            }
          >
            {item.mediaType === "video" ? (
              <video
                className="gallery__media"
                src={item.image}
                muted
                loop
                playsInline
                autoPlay
              />
            ) : (
              <img
                className="gallery__media"
                src={item.image}
                alt={item.event}
                loading="lazy"
              />
            )}
            <div className="gallery__overlay">
              <span>{item.event}</span>
            </div>
          </div>
        ))}
      </div>

      {skip < total && (
        <div className="gallery__more">
          <button onClick={() => load(skip)}>View More</button>
        </div>
      )}

      {lightbox && (
        <div
          className="gallery__lightbox"
          id="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightbox(null);
          }}
        >
          <button
            className="gallery__lightbox-close"
            aria-label="Close lightbox"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          {lightbox.type === "video" ? (
            <video
              className="gallery__lightbox-media"
              src={lightbox.src}
              muted
              loop
              playsInline
              autoPlay
            />
          ) : (
            <img
              className="gallery__lightbox-media"
              src={lightbox.src}
              alt={lightbox.alt}
            />
          )}
        </div>
      )}
    </section>
  );
};

export default Gallery;
