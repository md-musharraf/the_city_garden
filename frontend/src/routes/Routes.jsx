import { Navigate, Routes as RouterRoutes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ServicesPage from "../pages/ServicesPage";
import GalleryPage from "../pages/GalleryPage";
import PackagesPage from "../pages/PackagesPage";
import ContactPage from "../pages/ContactPage";
import BookingPage from "../pages/BookingPage";
import AdminPage from "../pages/AdminPage";
import AdminLoginPage from "../pages/AdminLoginPage";


const ProtectedAdmin = () => {
  const token = localStorage.getItem("hm_admin_token");
  return token ? <AdminPage /> : <Navigate to="/admin-login" replace />;
};


const AppRoutes = () => (
  <RouterRoutes>
    <Route
      path="/"
      element={<HomePage />}
    />
    <Route
      path="/about"
      element={<AboutPage />}
    />
    <Route
      path="/services"
      element={<ServicesPage />}
    />
    <Route
      path="/gallery"
      element={<GalleryPage />}
    />
    <Route
      path="/packages"
      element={<PackagesPage />}
    />
    <Route
      path="/contact"
      element={<ContactPage />}
    />
    <Route
      path="/booking"
      element={<BookingPage />}
    />
    <Route
      path="/admin-login"
      element={<AdminLoginPage />}
    />
    <Route
      path="/admin"
      element={<ProtectedAdmin />}
    />
  </RouterRoutes>
);

export default AppRoutes;
