import { useState } from "react";
export default function AdminQuestions() {
  const [questions, setQuestions] = useState([
    { id: 1, title: "Two Sum", difficulty: "Easy" },
    { id: 2, title: "Reverse Linked List", difficulty: "Easy" },
    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newDifficulty, setNewDifficulty] = useState("");

  const handleAddQuestion = () => {
    if (!newTitle.trim() || !newDifficulty.trim()) {
      alert("Please enter both fields");
      return;
    }

    const newQuestion = {
      id: questions.length + 1,
      title: newTitle,
      difficulty: newDifficulty,
    };

    setQuestions([...questions, newQuestion]);
    setNewTitle("");
    setNewDifficulty("");

    alert("Question added (placeholder)");
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
    alert("Question deleted (placeholder): " + id);
  };

  const cardStyle = {
    padding: "16px",
    marginBottom: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#f9f9f9",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    marginTop: "12px",
    padding: "10px 18px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  };

  const deleteButtonStyle = {
    marginTop: "10px",
    padding: "8px 16px",
    border: "none",
    backgroundColor: "#d9534f",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  };

  return (
    <div style={{ padding: "32px" }}>
      <h2>Manage Coding Questions</h2>
      <div style={{ marginBottom: "32px" }}>
        <h3>Add New Question</h3>

        <input
          style={inputStyle}
          placeholder="Question Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <input
          style={inputStyle}
          placeholder="Difficulty (Easy / Medium / Hard)"
          value={newDifficulty}
          onChange={(e) => setNewDifficulty(e.target.value)}
        />

        <button style={buttonStyle} onClick={handleAddQuestion}>
          Add Question
        </button>
      </div>
      <h3>Existing Questions</h3>
      {questions.map((q) => (
        <div key={q.id} style={cardStyle}>
          <h4>{q.title}</h4>
          <p>
            <strong>Difficulty:</strong> {q.difficulty}
          </p>

          <button style={deleteButtonStyle} onClick={() => handleDelete(q.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
