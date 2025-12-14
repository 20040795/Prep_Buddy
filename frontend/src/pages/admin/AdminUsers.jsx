import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config.js";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.log("Error loading users:", err));
  }, []);

  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/api/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => setUsers(users.filter(u => u.id !== id)))
      .catch(err => console.log("Delete error:", err));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Manage Users</Typography>

      {users.map((user) => (
        <Card key={user.id} sx={{ p: 2, mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{user.name}</Typography>
            <Typography>{user.email}</Typography>
            <Typography>Role: {user.role}</Typography>

            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
