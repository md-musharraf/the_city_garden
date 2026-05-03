import "./styles/global.scss";
import Navbar from "./components/Navbar/Navbar";
import FloatingButtons from "./components/FloatingButtons/FloatingButtons";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/Routes";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToAnchor = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));

      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }

      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.hash]);

  return null;
};

const App = () => (
  <div className="app">
    {/* Fixed navigation — always visible */}
    <Navbar />
    <ScrollToAnchor />

    {/* Offset for the 70px fixed header */}
    <main style={{ paddingTop: "70px" }}>
      <AppRoutes />
    </main>

    <Footer />

    {/* Floating WhatsApp & Book Now buttons */}
    <FloatingButtons />
  </div>
);

export default App;
