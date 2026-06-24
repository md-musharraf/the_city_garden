import "./styles/global.scss";
import Navbar from "./components/Navbar/Navbar";
import FloatingButtons from "./components/FloatingButtons/FloatingButtons";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/Routes";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StayRoomPopup from "./components/StayRoomPopup/StayRoomPopup";

const ADMIN_ROUTES = ["/admin", "/admin-login"];

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

const App = () => {
  const location = useLocation();
  const isAdminRoute = ADMIN_ROUTES.some((r) => location.pathname.startsWith(r));
  const [showStayPopup, setShowStayPopup] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!isAdminRoute) setShowStayPopup(true);
  }, [isAdminRoute]);

  useEffect(() => {
    if (isAdminRoute) return undefined;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAdminRoute]);

  return (
    <div className="app">
      {!isAdminRoute && (
        <div
          className="scroll-progress"
          style={{ width: `${scrollProgress}%` }}
        />
      )}
      {!isAdminRoute && <Navbar />}
      <ScrollToAnchor />

      <main style={isAdminRoute ? {} : { paddingTop: "70px" }}>
        <AppRoutes />
      </main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FloatingButtons onStayRoomClick={() => setShowStayPopup(true)} />}
      {!isAdminRoute && (
        <StayRoomPopup
          isOpen={showStayPopup}
          onClose={() => setShowStayPopup(false)}
        />
      )}
    </div>
  );
};

export default App;
