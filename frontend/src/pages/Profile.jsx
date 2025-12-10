export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const experiences = [
    { id: 1, title: "Google Interview - Software Intern" },
    { id: 2, title: "Amazon Coding Round Experience" },
  ];

  const forumPosts = [
    { id: 1, title: "How to prepare for DBS coding round?" },
    { id: 2, title: "What topics to study for Deloitte exam?" },
  ];

  const cardStyle = {
    padding: "16px",
    marginBottom: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#fafafa",
  };

  return (
    <div style={{ padding: "32px" }}>
      <h2>My Profile</h2>
      <div style={cardStyle}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      <h3 style={{ marginTop: "32px" }}>My Interview Experiences</h3>

      {experiences.map((exp) => (
        <div key={exp.id} style={cardStyle}>
          <p>{exp.title}</p>
        </div>
      ))}
      <h3 style={{ marginTop: "32px" }}>My Forum Questions</h3>

      {forumPosts.map((post) => (
        <div key={post.id} style={cardStyle}>
          <p>{post.title}</p>
        </div>
      ))}
    </div>
  );
}
