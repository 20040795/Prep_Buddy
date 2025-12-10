import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AskQuestion() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const handleSubmit = () => {
    console.log({
      title,
      description,
      tags
    });
    alert("Question submitted (placeholder).");
    navigate("/forum");
  };

  return (
    <div>
      <h2>Ask a Question</h2>

      <div>
        <label>Question Title:</label>
        <br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label>Description:</label>
        <br />
        <textarea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label>Tags (comma separated):</label>
        <br />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <button onClick={handleSubmit}>Submit Question</button>
    </div>
  );
}
