import { Card, CardContent, Typography } from "@mui/material";
export default function StatsCard({ title, value }) {
  return (
    <Card sx={{ width: 220, p: 2 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
