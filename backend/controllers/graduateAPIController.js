export const getGraduateAPI = async (req, res) => {
  try {
    const JOOBLE_KEY = process.env.JOOBLE_KEY;

    if (!JOOBLE_KEY) {
      return res.status(500).json({ message: "JOOBLE_KEY missing in .env" });
    }

    const response = await fetch(`https://jooble.org/api/${JOOBLE_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        keywords: "graduate",
        location: "Ireland"
      })
    });

    const data = await response.json();

    console.log("JOOBLE RESPONSE:", data);

    if (!data || !data.jobs) {
      return res.json([]);
    }

    res.json(data.jobs);
  } catch (err) {
    console.log("Jooble Error:", err);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};
