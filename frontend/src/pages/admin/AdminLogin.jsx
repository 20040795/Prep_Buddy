import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = () => {
    if (email === "admin@dbs.com" && password === "admin123") {
      const adminUser = {
        email: email,
        role: "admin",
      };

      localStorage.setItem("user", JSON.stringify(adminUser));
      localStorage.setItem("token", "admin-token-placeholder");

      navigate("/admin/dashboard");
    } else {
      alert("Invalid admin credentials");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "16px",
  };

  const buttonStyle = {
    padding: "10px 18px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    marginTop: "20px",
    cursor: "pointer",
  };

  return (
    <div style={{ padding: "32px" }}>
      <h2>Admin Login</h2>

      <input
        style={inputStyle}
        placeholder="Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={inputStyle}
        type="password"
        placeholder="Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button style={buttonStyle} onClick={handleAdminLogin}>
        Login as Admin
      </button>
    </div>
  );
}
