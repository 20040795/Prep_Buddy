export default function AdminForum() {
  const posts = [
    {
      id: 1,
      title: "How to prepare for google coding round?",
      tags: "coding, interview",
    },
    {
      id: 2,
      title: "What topics are asked in Deloitte test?",
      tags: "aptitude, Deloitte",
    },
    {
      id: 3,
      title: "Amazon OA tips",
      tags: "amazon, online assessment",
    },
  ];

  const handleDelete = (id) => {
    alert("Forum post deleted (placeholder): " + id);
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
      <h2>Manage Forum Posts</h2>

      {posts.map((post) => (
        <div key={post.id} style={cardStyle}>
          <h3>{post.title}</h3>
          <p><strong>Tags:</strong> {post.tags}</p>

          <button
            style={deleteButtonStyle}
            onClick={() => handleDelete(post.id)}
          >
            Delete Post
          </button>
        </div>
      ))}
    </div>
  );
}
