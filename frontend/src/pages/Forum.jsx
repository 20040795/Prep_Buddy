import { useNavigate } from "react-router-dom";

export default function Forum() {
  const navigate = useNavigate();

  const posts = [
    { id: 1, title: "How to prepare  for the google interview", tags: "coding" },
    { id: 2, title: "What questions are asked in Deloitte tech round?", tags: "HR" },
    { id: 3, title: "Tips for Amazon OA?", tags: "Amazon, OA" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Forum</h2>

      <button onClick={() => navigate("/forum/ask")}>
        Ask a Question
      </button>

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginTop: "10px",
            cursor: "pointer"
          }}
          onClick={() => navigate(`/forum/${post.id}`)}
        >
          <h3>{post.title}</h3>
          <p>Tags: {post.tags}</p>
        </div>
      ))}
    </div>
  );
}
