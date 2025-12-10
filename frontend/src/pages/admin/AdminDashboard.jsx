import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Users", value: 42 },
    { label: "Interview Experiences", value: 15 },
    { label: "Coding Questions", value: 20 },
    { label: "Forum Posts", value: 18 },
  ];

  const cardStyle = {
    width: "200px",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#f8f8f8",
    marginRight: "16px",
    marginBottom: "16px",
  };

  const buttonStyle = {
    padding: "10px 18px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "12px",
    marginBottom: "12px",
  };

  return (
    <div style={{ padding: "32px" }}>
      <h2>Admin Dashboard</h2>

      <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "32px" }}>
        {stats.map((stat, index) => (
          <div key={index} style={cardStyle}>
            <h3>{stat.label}</h3>
            <h2>{stat.value}</h2>
          </div>
        ))}
      </div>

      <h3>Manage Portal</h3>

      <div>
        <button style={buttonStyle} onClick={() => navigate("/admin/user")}>
          Manage Users
        </button>

        <button
          style={buttonStyle}
          onClick={() => navigate("/admin/experiences")}
        >
          Manage Experiences
        </button>

        <button
          style={buttonStyle}
          onClick={() => navigate("/admin/questions")}
        >
          Manage Coding Questions
        </button>

        <button style={buttonStyle} onClick={() => navigate("/admin/forum")}>
          Manage Forum Posts
        </button>
      </div>
    </div>
  );
}
