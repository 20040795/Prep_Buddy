import { Box, Typography, Card, CardContent, Button, Grid } from "@mui/material";
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

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Graduate Programs
      </Typography>

      <Grid container spacing={3}>
        {programs.map((p) => (
          <Grid item key={p.id}>
            <Card sx={{ width: 320, p: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {p.company}
                </Typography>

                <Typography sx={{ mb: 2 }}>
                  {p.description}
                </Typography>

                <Button
                  variant="contained"
                  onClick={() => window.open(p.link, "_blank")}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
