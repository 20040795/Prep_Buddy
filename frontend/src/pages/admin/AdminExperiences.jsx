export default function AdminExperiences() {
  const experiences = [
    {
      id: 1,
      company: "Google",
      role: "Software Engineer Intern",
      difficulty: "Medium",
    },
    {
      id: 2,
      company: "Amazon",
      role: "SDE Intern",
      difficulty: "Hard",
    },
    {
      id: 3,
      company: "Deloitte",
      role: "Analyst",
      difficulty: "Easy",
    },
  ];

  const handleDelete = (id) => {
    alert("Experience deleted (placeholder): " + id);
  };

  const cardStyle = {
    padding: "16px",
    marginBottom: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#f9f9f9",
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
      <h2>Manage Interview Experiences</h2>

      {experiences.map((exp) => (
        <div key={exp.id} style={cardStyle}>
          <h3>{exp.company}</h3>
          <p><strong>Role:</strong> {exp.role}</p>
          <p><strong>Difficulty:</strong> {exp.difficulty}</p>

          <button
            style={deleteButtonStyle}
            onClick={() => handleDelete(exp.id)}
          >
            Delete Experience
          </button>
        </div>
      ))}
    </div>
  );
}
