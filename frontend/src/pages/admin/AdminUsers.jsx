export default function AdminUsers() {
  const users = [
    { id: 1, name: "John Doe", email: "john@gmail.com", role: "student" },
    { id: 2, name: "Sarah Smith", email: "sarah@gmail.com", role: "student" },
    { id: 3, name: "Admin User", email: "admin@dbs.com", role: "admin" },
  ];

  const handleDelete = (id) => {
    alert("User deleted (placeholder): " + id);
  };

  const cardStyle = {
    padding: "16px",
    marginBottom: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#f8f8f8",
  };

  const deleteButtonStyle = {
    marginTop: "12px",
    padding: "8px 16px",
    border: "none",
    backgroundColor: "#d9534f",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  };

  return (
    <div style={{ padding: "32px" }}>
      <h2>Manage Users</h2>

      {users.map((user) => (
        <div key={user.id} style={cardStyle}>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>

          <button
            style={deleteButtonStyle}
            onClick={() => handleDelete(user.id)}
          >
            Delete User
          </button>
        </div>
      ))}
    </div>
  );
}
