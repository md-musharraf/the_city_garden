import { Navigate, Routes as RouterRoutes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ServicesPage from "../pages/ServicesPage";
import GalleryPage from "../pages/GalleryPage";
import PackagesPage from "../pages/PackagesPage";
import ContactPage from "../pages/ContactPage";
import BookingPage from "../pages/BookingPage";
import AdminPage from "../pages/AdminPage";
import AdminLoginPage from "../pages/AdminLoginPage";
import axios from "../axios/config";

const ProtectedAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;

    const verify = async () => {
      try {
        const token = localStorage.getItem("hm_admin_token");
        if (!token) {
          if (mounted) {
            setIsAuthed(false);
            setLoading(false);
          }
          return;
        }

        await axios.post("/api/admin/verify");
        if (mounted) {
          setIsAuthed(true);
          setLoading(false);
        }
      } catch (_err) {
        localStorage.removeItem("hm_admin_token");
        localStorage.removeItem("hm_admin_auth");
        delete axios.defaults.headers.common.Authorization;
        if (mounted) {
          setIsAuthed(false);
          setLoading(false);
        }
      }
    };

    verify();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div>Checking admin access...</div>;
  return isAuthed ? (
    <AdminPage />
  ) : (
    <Navigate
      to="/admin-login"
      replace
    />
  );
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
