import { Box, Typography, Card, CardContent, Button } from "@mui/material";

export default function AdminUsers() {
  const users = [
    { id: 1, name: "John Doe", email: "john@gmail.com", role: "student" },
    { id: 2, name: "Sarah Smith", email: "sarah@gmail.com", role: "student" },
    { id: 3, name: "Admin User", email: "admin@dbs.com", role: "admin" },
  ];

  const handleDelete = (id) => {
    alert("User deleted (placeholder): " + id);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>

      {users.map((user) => (
        <Card key={user.id} sx={{ p: 2, mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{user.name}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Role: {user.role}</Typography>

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              color="error"
              onClick={() => handleDelete(user.id)}
            >
              Delete User
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
