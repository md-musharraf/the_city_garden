import "./styles/global.scss";
import Navbar from "./components/Navbar/Navbar";
import FloatingButtons from "./components/FloatingButtons/FloatingButtons";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/Routes";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
  const isAdminRoute = ADMIN_ROUTES.some((r) =>
    location.pathname.startsWith(r)
  );

  return (
    <div className="app">
      {!isAdminRoute && <Navbar />}
      <ScrollToAnchor />

      <main style={isAdminRoute ? {} : { paddingTop: "70px" }}>
        <AppRoutes />
      </main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FloatingButtons />}
    </div>
  );
};

export default App;

