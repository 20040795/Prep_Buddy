export default function GraduatePrograms() {
  const programs = [
    {
      id: 1,
      company: "Google",
      description: "Graduate Software Engineer Program – Europe",
      link: "https://careers.google.com",
    },
    {
      id: 2,
      company: "Amazon",
      description: "AWS Graduate Cloud Associate Program",
      link: "https://www.amazon.jobs/",
    },
    {
      id: 3,
      company: "Deloitte",
      description: "Deloitte Graduate Analyst Programme",
      link: "https://www2.deloitte.com/global/en/careers.html",
    },
    {
      id: 4,
      company: "Accenture",
      description: "Accenture Graduate Technology Programme",
      link: "https://www.accenture.com",
    },
  ];

  const cardStyle = {
    width: "320px",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#f9f9f9",
    marginBottom: "16px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    padding: "10px 18px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  const gridStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
  };

  return (
    <div style={{ padding: "32px" }}>
      <h2 style={{ marginBottom: "24px" }}>Graduate Programs</h2>

      <div style={gridStyle}>
        {programs.map((p) => (
          <div key={p.id} style={cardStyle}>
            <h3 style={{ fontWeight: "bold" }}>{p.company}</h3>
            <p style={{ marginBottom: "16px" }}>{p.description}</p>
            <button style={buttonStyle} onClick={() => window.open(p.link, "_blank")}>
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
