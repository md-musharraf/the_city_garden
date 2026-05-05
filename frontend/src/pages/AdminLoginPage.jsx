import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios/config";
import "./AdminLoginPage.scss";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/admin/login", { phone, password });
      const token = res.data.token;

      localStorage.setItem("hm_admin_token", token);
      localStorage.setItem("hm_admin_auth", "true");
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid phone or password");
    }
  };

  return (
    <div className="admin-login">
      <form
        className="admin-login__card"
        onSubmit={handleLogin}
      >
        <h2>Admin Login</h2>

        <label htmlFor="admin-phone">Phone</label>
        <input
          id="admin-phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone"
          required
        />

        <label htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />

        {error && <div className="admin-login__error">{error}</div>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
