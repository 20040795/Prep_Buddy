import { Box, Typography, Card, CardContent, Button } from "@mui/material";
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

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Forum Posts
      </Typography>

      {posts.map((post) => (
        <Card key={post.id} sx={{ p: 2, mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{post.title}</Typography>
            <Typography>Tags: {post.tags}</Typography>

            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
